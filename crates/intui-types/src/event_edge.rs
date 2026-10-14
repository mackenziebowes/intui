//! The event edge: the one place JSON from a wire becomes an `Event`.
//!
//! Core checks an event with a zod schema, so the issues come in zod's order and carry zod's
//! quirks, which this edge keeps: every problem is listed, known props in the order the
//! schema declares them and unknown ones last; an object's keys are read in the order
//! JavaScript lists them (whole numbers first); a submitted value under the key `__proto__`
//! is skipped unchecked, as zod's record skips it.

use crate::event::{ComponentId, Event, FieldValue, Source, Values};
use crate::event_refusal::{EventIssue, EventIssueKind, EventRefusal, ACTIONS};
use crate::generated::event as gen;
use crate::json::{self, Json, JsonObject, JsonType, Unreadable};
use crate::refusal::Expected;

/// Parses an event from JSON text.
pub fn parse_event(text: &str) -> Result<Event, EventRefusal> {
    let input = json::parse(text).map_err(|why| match why {
        Unreadable::NotJson(fault) => EventRefusal::NotJson(fault),
        Unreadable::TooDeep { limit } => EventRefusal::TooDeep { limit },
    })?;
    parse_event_json(&input)
}

/// Parses an event from JSON that was already read.
pub fn parse_event_json(input: &Json) -> Result<Event, EventRefusal> {
    let mut edge = EventEdge { input, issues: Vec::new() };
    match edge.event() {
        Some(event) if edge.issues.is_empty() => Ok(event),
        _ => Err(EventRefusal::Schema(edge.issues)),
    }
}

/// Fails to compile when core's event schema gains an action this build doesn't handle yet.
#[allow(dead_code)]
fn action_of_generated(event: &gen::IntuiEvent) -> &'static str {
    match event {
        gen::IntuiEvent::PressEvent(_) => ACTIONS[0],
        gen::IntuiEvent::SubmitEvent(_) => ACTIONS[1],
    }
}

/// The keys of an object in the order `Object.keys` lists them: whole-number keys ascending, then the rest as written.
fn js_key_order(object: &JsonObject) -> Vec<&str> {
    let index_of = |key: &str| -> Option<u32> {
        let canonical = key == "0" || (!key.starts_with('0') && !key.is_empty() && key.bytes().all(|byte| byte.is_ascii_digit()));
        canonical.then(|| key.parse::<u32>().ok()).flatten().filter(|index| *index != u32::MAX)
    };
    let mut numbered: Vec<(u32, &str)> = object.keys().filter_map(|key| index_of(key).map(|index| (index, key))).collect();
    numbered.sort_by_key(|(index, _)| *index);
    let named = object.keys().filter(|key| index_of(key).is_none());
    numbered.into_iter().map(|(_, key)| key).chain(named).collect()
}

struct EventEdge<'j> {
    input: &'j Json,
    issues: Vec<EventIssue>,
}

impl<'j> EventEdge<'j> {
    /// Core's path format for a place in the event: `value.name`, with a component's type after any key that holds one.
    fn path(&self, keys: &[&str]) -> String {
        if keys.is_empty() {
            return "(top level)".to_string();
        }
        let mut text = String::new();
        let mut value = Some(self.input);
        for key in keys {
            value = value.and_then(Json::as_object).and_then(|object| object.get(key));
            if !text.is_empty() {
                text.push('.');
            }
            text.push_str(key);
            if let Some(kind) = value.and_then(Json::as_object).and_then(|object| object.get("type")).and_then(Json::as_str) {
                text.push_str(&format!(" ({kind})"));
            }
        }
        text
    }

    fn report(&mut self, at: &[&str], kind: EventIssueKind) {
        let path = self.path(at);
        self.issues.push(EventIssue { path, kind });
    }

    fn event(&mut self) -> Option<Event> {
        let Json::Object(object) = self.input else {
            self.report(&[], EventIssueKind::WrongType { expected: Expected::Type(JsonType::Object), got: self.input.type_of() });
            return None;
        };
        let action = match object.get("action") {
            Some(Json::String(name)) if ACTIONS.contains(&name.as_str()) => name.as_str(),
            _ => {
                self.report(&["action"], EventIssueKind::NotAnAction);
                return None;
            }
        };
        if object.get("v") != Some(&Json::Number(1.0)) {
            self.report(&["v"], EventIssueKind::NotVersionOne);
        }
        let source = self.id(object, "source");
        let target = self.id(object, "target");
        let (option, values) = if action == ACTIONS[0] { (self.id(object, "value"), None) } else { (None, self.values(object)) };
        let known = ["v", "source", "target", "action", "value"];
        let unknown: Vec<String> = js_key_order(object).into_iter().filter(|key| !known.contains(key)).map(str::to_string).collect();
        if !unknown.is_empty() {
            self.report(&[], EventIssueKind::UnknownProps { keys: unknown });
        }
        let (source, target) = (Source::new(&source?), ComponentId::new(&target?));
        Some(match (option, values) {
            (Some(option), _) => Event::Press { source, target, option },
            (None, Some(values)) => Event::Submit { source, target, values },
            (None, None) => return None,
        })
    }

    /// A prop that must be a string of at least one character.
    fn id(&mut self, object: &'j JsonObject, name: &str) -> Option<String> {
        match object.get(name) {
            None => self.report(&[name], EventIssueKind::Required { field: name.to_string(), expected: Expected::Type(JsonType::String) }),
            Some(Json::String(text)) if text.is_empty() => self.report(&[name], EventIssueKind::Empty),
            Some(Json::String(text)) => return Some(text.clone()),
            Some(other) => self.report(&[name], EventIssueKind::WrongType { expected: Expected::Type(JsonType::String), got: other.type_of() }),
        }
        None
    }

    fn values(&mut self, object: &'j JsonObject) -> Option<Values> {
        let entries = match object.get("value") {
            None => {
                self.report(&["value"], EventIssueKind::Required { field: "value".to_string(), expected: Expected::Record });
                return None;
            }
            Some(Json::Object(entries)) => entries,
            Some(other) => {
                self.report(&["value"], EventIssueKind::WrongType { expected: Expected::Record, got: other.type_of() });
                return None;
            }
        };
        let mut held = Vec::new();
        for key in js_key_order(entries).into_iter().filter(|key| *key != "__proto__") {
            match entries.get(key).and_then(field_value) {
                Some(value) => held.push((key.to_string(), value)),
                None => self.report(&["value", key], EventIssueKind::NotAFieldValue),
            }
        }
        Some(Values::new(held))
    }
}

fn field_value(value: &Json) -> Option<FieldValue> {
    match value {
        Json::String(text) => Some(FieldValue::Text(text.clone())),
        Json::Number(number) if number.is_finite() => Some(FieldValue::Number(*number)),
        Json::Bool(flag) => Some(FieldValue::Flag(*flag)),
        Json::Null | Json::Number(_) | Json::Array(_) | Json::Object(_) => None,
    }
}

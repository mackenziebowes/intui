//! What a person did with a Choice or Form, as the IntUI event the app sends on to the agent.
//!
//! The promise: an event is built by `intui-types`' own event edge, so it is one core would accept, and
//! `event_json` writes exactly `{v, source, target, action, value}`, with whole numbers written the way JSON
//! writes them.

use crate::controls::{ControlId, Source};
use intui_types::{Event, FieldValue};
use serde_json::{json, Map, Number, Value};

fn parsed(wire: Value) -> Event {
    intui_types::parse_event(&wire.to_string()).expect("a control builds only events the edge accepts: ids and options come from a parsed tree")
}

/// The event for pressing `option` in the Choice `choice`.
pub(crate) fn press(source: &Source, choice: &ControlId, option: &str) -> Event {
    parsed(json!({ "v": 1, "source": source.as_str(), "target": choice.as_str(), "action": "press", "value": option }))
}

/// The event for submitting the Form `form` with `values`.
pub(crate) fn submit(source: &Source, form: &ControlId, values: &[(String, FieldValue)]) -> Event {
    let mut wire = Map::new();
    for (id, value) in values {
        wire.insert(id.clone(), field_json(value));
    }
    parsed(json!({ "v": 1, "source": source.as_str(), "target": form.as_str(), "action": "submit", "value": Value::Object(wire) }))
}

fn field_json(value: &FieldValue) -> Value {
    match value {
        FieldValue::Text(text) => Value::String(text.clone()),
        FieldValue::Flag(flag) => Value::Bool(*flag),
        FieldValue::Number(number) if number.fract() == 0.0 && number.abs() < 9.0e15 => Value::Number(Number::from(*number as i64)),
        FieldValue::Number(number) => Number::from_f64(*number).map_or(Value::Null, Value::Number),
    }
}

/// The event as one line of JSON, in core's wire shape.
pub fn event_json(event: &Event) -> String {
    let (action, value) = match event {
        Event::Press { option, .. } => ("press", Value::String(option.clone())),
        Event::Submit { values, .. } => {
            let mut wire = Map::new();
            for (id, value) in values.iter() {
                wire.insert(id.to_string(), field_json(value));
            }
            ("submit", Value::Object(wire))
        }
    };
    let mut wire = Map::new();
    wire.insert("v".into(), json!(1));
    wire.insert("source".into(), json!(event.source().as_str()));
    wire.insert("target".into(), json!(event.target().as_str()));
    wire.insert("action".into(), json!(action));
    wire.insert("value".into(), value);
    Value::Object(wire).to_string()
}

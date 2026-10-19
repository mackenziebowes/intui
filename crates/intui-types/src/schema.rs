//! Core's committed JSON Schema, run against a node.
//!
//! The schema is the one place the protocol's shape is written, so this module reads it
//! rather than restating it: every rule it carries (types, required props, enums, lengths,
//! list minimums, unknown props) is checked here, and every violation in a node is listed,
//! in the order core lists them. Each is classified from the rule that failed and where, never from
//! the words of a library's error.

use crate::json::{self, Json, JsonObject, JsonType};
use crate::reading::Reading;
use crate::refusal::{Expected, LongRule, MinimumRule, ProblemKind, ShortRule};
use std::sync::OnceLock;

const SCHEMA_TEXT: &str = include_str!("../../../packages/core/schema/intui.tree.schema.json");

/// One step into a value: a key of an object or an index of a list.
#[derive(Clone, Debug, PartialEq, Eq)]
pub(crate) enum Seg {
    Key(String),
    Index(usize),
}

/// What checking a node found, in order: something wrong, or a child node for the edge to check in turn.
pub(crate) enum Finding<'j> {
    Problem { at: Vec<Seg>, kind: ProblemKind },
    Child { at: Vec<Seg>, value: &'j Json },
}

pub(crate) struct Schema {
    root: Json,
}

/// The schema this build was compiled with. The text is core's committed file, which the build
/// has already parsed, so reading it cannot fail.
pub(crate) fn schema() -> &'static Schema {
    static SCHEMA: OnceLock<Schema> = OnceLock::new();
    SCHEMA.get_or_init(|| Schema { root: json::parse(SCHEMA_TEXT).expect("core's committed schema is JSON; the build parsed it") })
}

/// The part of a named definition a message needs to know which words to use.
#[derive(Clone, Copy)]
struct Place<'s> {
    def: &'s str,
    prop: &'s str,
}

fn get<'a>(json: &'a Json, key: &str) -> Option<&'a Json> {
    json.as_object()?.get(key)
}

fn strings(json: Option<&Json>) -> Vec<String> {
    json.and_then(Json::as_array).into_iter().flatten().filter_map(|item| item.as_str().map(str::to_string)).collect()
}

fn count(json: Option<&Json>) -> Option<usize> {
    json.and_then(|value| value.as_finite()).map(|number| number as usize)
}

impl Schema {
    fn definition(&self, name: &str) -> Option<&Json> {
        get(get(&self.root, "$defs")?, name)
    }

    /// Follows a `$ref`: the definition's name when there was one, and the schema it names.
    fn resolve<'s>(&'s self, schema: &'s Json) -> (Option<&'s str>, &'s Json) {
        let name = get(schema, "$ref").and_then(Json::as_str).and_then(|reference| reference.strip_prefix("#/$defs/"));
        match name.and_then(|name| self.definition(name).map(|definition| (name, definition))) {
            Some((name, definition)) => (Some(name), definition),
            None => (None, schema),
        }
    }

    /// What the definition's `x-intui-writer` says, or `None` when it says nothing this build knows.
    pub(crate) fn writer_of(&self, def: &str) -> Option<&str> {
        get(self.definition(def)?, "x-intui-writer").and_then(Json::as_str)
    }

    /// The value the schema gives a prop that is left out, if it says one.
    pub(crate) fn default_of(&self, def: &str, prop: &str) -> Option<&Json> {
        get(get(self.definition(def)?, "properties")?, prop).and_then(|prop| get(prop, "default"))
    }

    /// Everything wrong with one node's own props, and the child nodes inside it.
    pub(crate) fn check_node<'j>(&self, def: &str, object: &'j JsonObject) -> Vec<Finding<'j>> {
        let mut walk = Walk { schema: self, out: Vec::new(), at: Vec::new() };
        if let Some(definition) = self.definition(def) {
            walk.object_against(def, definition, object);
        }
        walk.out
    }
}

struct Walk<'s, 'j> {
    schema: &'s Schema,
    out: Vec<Finding<'j>>,
    at: Vec<Seg>,
}

fn types_of(schema: &Json) -> Vec<JsonType> {
    match get(schema, "type") {
        Some(Json::String(name)) => JsonType::from_name(name).into_iter().collect(),
        Some(Json::Array(names)) => names.iter().filter_map(Json::as_str).filter_map(JsonType::from_name).collect(),
        _ => Vec::new(),
    }
}

fn is_a(value: &Json, kind: JsonType) -> bool {
    match value {
        Json::Number(number) => kind == JsonType::Number && number.is_finite(),
        other => other.type_of() == kind,
    }
}

impl<'s, 'j> Walk<'s, 'j> {
    fn problem(&mut self, kind: ProblemKind) {
        self.out.push(Finding::Problem { at: self.at.clone(), kind });
    }

    fn object_against(&mut self, def: &'s str, schema: &'s Json, object: &'j JsonObject) {
        let props = get(schema, "properties").and_then(Json::as_object);
        let required = strings(get(schema, "required"));
        for (name, prop_schema) in props.into_iter().flat_map(JsonObject::entries) {
            self.at.push(Seg::Key(name.to_string()));
            match object.get(name) {
                Some(value) => self.value_against(prop_schema, value, Place { def, prop: name }),
                None if required.iter().any(|field| field == name) => self.missing(prop_schema, name),
                None => {}
            }
            self.at.pop();
        }
        if get(schema, "additionalProperties") == Some(&Json::Bool(false)) {
            let keys: Vec<String> = object.keys().filter(|key| props.is_none_or(|props| !props.contains_key(key))).map(str::to_string).collect();
            if !keys.is_empty() {
                self.problem(ProblemKind::UnknownProps { keys });
            }
        }
    }

    fn missing(&mut self, schema: &'s Json, field: &str) {
        let field = field.to_string();
        let (name, resolved) = self.schema.resolve(schema);
        let kind = match name {
            Some("Node") => ProblemKind::Required { field, expected: Some(JsonType::Object) },
            Some("Reading") => ProblemKind::Reading(crate::refusal::ReadingProblem::NotAReading { got: crate::refusal::Seen::Missing }),
            _ => {
                if let Some(options) = get(resolved, "enum") {
                    ProblemKind::NotOneOf { options: strings(Some(options)) }
                } else if let Some(only) = get(resolved, "const") {
                    ProblemKind::NotExactly { expected: only.stringify() }
                } else {
                    match types_of(resolved).as_slice() {
                        [] => ProblemKind::Required { field, expected: None },
                        [only] => ProblemKind::Required { field, expected: Some(*only) },
                        several => ProblemKind::OneOfTypes { expected: several.to_vec() },
                    }
                }
            }
        };
        self.problem(kind);
    }

    fn value_against(&mut self, schema: &'s Json, value: &'j Json, place: Place<'s>) {
        let (name, resolved) = self.schema.resolve(schema);
        match name {
            Some("Node") => {
                self.out.push(Finding::Child { at: self.at.clone(), value });
                return;
            }
            Some("Reading") => {
                if let Err(problem) = Reading::read(Some(value)) {
                    self.problem(ProblemKind::Reading(problem));
                }
                return;
            }
            _ => {}
        }
        if let Some(options) = get(resolved, "enum") {
            let options = strings(Some(options));
            if !value.as_str().is_some_and(|text| options.iter().any(|option| option == text)) {
                self.problem(ProblemKind::NotOneOf { options });
            }
            return;
        }
        if let Some(only) = get(resolved, "const") {
            if only != value {
                self.problem(ProblemKind::NotExactly { expected: only.stringify() });
            }
            return;
        }
        let types = types_of(resolved);
        if !types.is_empty() && !types.iter().any(|kind| is_a(value, *kind)) {
            let kind = match types.as_slice() {
                [only] => {
                    let expected = if *only == JsonType::Object && get(resolved, "properties").is_none() { Expected::Record } else { Expected::Type(*only) };
                    ProblemKind::WrongType { expected, got: value.type_of() }
                }
                several => ProblemKind::OneOfTypes { expected: several.to_vec() },
            };
            self.problem(kind);
            return;
        }
        match value {
            Json::String(text) => {
                let length = text.chars().count();
                if let Some(min) = count(get(resolved, "minLength")).filter(|min| length < *min) {
                    let what = if (place.def, place.prop) == ("Text", "markdown") { ShortRule::TextMarkdown } else { ShortRule::Plain };
                    self.problem(ProblemKind::TooShort { min, what });
                }
                if let Some(max) = count(get(resolved, "maxLength")).filter(|max| length > *max) {
                    let what = if (place.def, place.prop) == ("Label", "text") { LongRule::LabelText } else { LongRule::Plain };
                    self.problem(ProblemKind::TooLong { max, what });
                }
            }
            Json::Array(items) => {
                if let Some(min) = count(get(resolved, "minItems")).filter(|min| items.len() < *min) {
                    self.problem(match minimum_rule(place) {
                        Some(rule) => ProblemKind::NeedsMore(rule),
                        None => ProblemKind::TooFewItems { min },
                    });
                }
                if let Some(item_schema) = get(resolved, "items") {
                    for (index, item) in items.iter().enumerate() {
                        self.at.push(Seg::Index(index));
                        self.value_against(item_schema, item, place);
                        self.at.pop();
                    }
                }
            }
            Json::Object(object) => {
                if get(resolved, "properties").is_some() {
                    self.object_against(name.unwrap_or(place.def), resolved, object);
                } else if let Some(each) = get(resolved, "additionalProperties").filter(|each| each.as_object().is_some()) {
                    for (key, inner) in object.entries() {
                        self.at.push(Seg::Key(key.to_string()));
                        self.value_against(each, inner, place);
                        self.at.pop();
                    }
                }
            }
            Json::Null | Json::Bool(_) | Json::Number(_) => {}
        }
    }
}

/// The advice for a list that can't be empty or short, by which list it is.
fn minimum_rule(place: Place<'_>) -> Option<MinimumRule> {
    match (place.def, place.prop) {
        ("Group", "children") => Some(MinimumRule::GroupChildren),
        ("Chart", "series") => Some(MinimumRule::ChartSeries),
        ("ChartSeries", "points") => Some(MinimumRule::SeriesPoints),
        ("Flow", "steps") => Some(MinimumRule::FlowSteps),
        ("Choice", "options") => Some(MinimumRule::ChoiceOptions),
        ("Form", "fields") => Some(MinimumRule::FormFields),
        ("Table", "columns") => Some(MinimumRule::TableColumns),
        ("Marks", "rows") => Some(MinimumRule::MarksRows),
        ("Ladder", "rungs") => Some(MinimumRule::LadderRungs),
        _ => None,
    }
}

//! A person's press or submit as the program sees it, past the edge.
//!
//! An `Event` exists only because `parse_event` checked it: a press names one option, a submit
//! carries values that are each a string, a finite number or a flag, and neither has an empty
//! id. Whether it fits a tree is a separate question, asked with `Tree::problem_with`.

use crate::json::Json;

/// The id of whatever drew the tree (a tool call, a reply).
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Source(String);

/// The id of the Choice or Form the person used.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ComponentId(String);

impl Source {
    pub(crate) fn new(text: &str) -> Source {
        Source(text.to_string())
    }
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl ComponentId {
    pub(crate) fn new(text: &str) -> ComponentId {
        ComponentId(text.to_string())
    }
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

/// What one field of a submitted form holds.
#[derive(Clone, Debug, PartialEq)]
pub enum FieldValue {
    Text(String),
    /// Always finite.
    Number(f64),
    Flag(bool),
}

/// The kind of value a field takes.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ValueType {
    String,
    Number,
    Boolean,
}

impl ValueType {
    pub fn name(self) -> &'static str {
        match self {
            ValueType::String => "string",
            ValueType::Number => "number",
            ValueType::Boolean => "boolean",
        }
    }
}

impl FieldValue {
    pub fn value_type(&self) -> ValueType {
        match self {
            FieldValue::Text(_) => ValueType::String,
            FieldValue::Number(_) => ValueType::Number,
            FieldValue::Flag(_) => ValueType::Boolean,
        }
    }

    /// As `JSON.stringify` writes it, which is how core quotes a value it refuses.
    pub fn stringify(&self) -> String {
        match self {
            FieldValue::Text(text) => Json::String(text.clone()).stringify(),
            FieldValue::Number(number) => Json::Number(if *number == 0.0 { 0.0 } else { *number }).stringify(),
            FieldValue::Flag(flag) => Json::Bool(*flag).stringify(),
        }
    }
}

/// The values of a submitted form, by field id, in the order JavaScript lists an object's keys.
#[derive(Clone, Debug, PartialEq)]
pub struct Values(Vec<(String, FieldValue)>);

impl Values {
    pub(crate) fn new(entries: Vec<(String, FieldValue)>) -> Values {
        Values(entries)
    }
    pub fn iter(&self) -> impl Iterator<Item = (&str, &FieldValue)> {
        self.0.iter().map(|(id, value)| (id.as_str(), value))
    }
    pub fn has(&self, id: &str) -> bool {
        self.0.iter().any(|(held, _)| held == id)
    }
}

/// What a person did with a component.
#[derive(Clone, Debug, PartialEq)]
pub enum Event {
    Press { source: Source, target: ComponentId, option: String },
    Submit { source: Source, target: ComponentId, values: Values },
}

impl Event {
    pub fn source(&self) -> &Source {
        match self {
            Event::Press { source, .. } | Event::Submit { source, .. } => source,
        }
    }

    pub fn target(&self) -> &ComponentId {
        match self {
            Event::Press { target, .. } | Event::Submit { target, .. } => target,
        }
    }
}

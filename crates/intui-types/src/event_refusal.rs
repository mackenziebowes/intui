//! Why an event was refused, and why one that parsed doesn't fit its tree, in one catalogue.
//!
//! Every message a model reads when an event fails lives here, written once, in the words
//! `packages/core/src/event.ts` and `problems.ts` use.

use crate::event::{FieldValue, ValueType};
use crate::json::{JsonFault, JsonType};
use crate::node::Kind;
use crate::refusal::{quoted, Expected};
use std::fmt;

/// The actions an event can name, in the order core lists them.
pub(crate) const ACTIONS: [&str; 2] = ["press", "submit"];

/// An event that can't be used. Displays as core's `IntuiError` does: a summary, then one
/// `- path: message` line per problem.
#[derive(Clone, Debug, PartialEq)]
pub enum EventRefusal {
    NotJson(JsonFault),
    TooDeep { limit: usize },
    Schema(Vec<EventIssue>),
}

#[derive(Clone, Debug, PartialEq)]
pub struct EventIssue {
    /// Where, as core writes it: `value.name`, or `(top level)`.
    pub path: String,
    pub kind: EventIssueKind,
}

#[derive(Clone, Debug, PartialEq)]
pub enum EventIssueKind {
    WrongType { expected: Expected, got: JsonType },
    Required { field: String, expected: Expected },
    NotAnAction,
    NotVersionOne,
    Empty,
    UnknownProps { keys: Vec<String> },
    NotAFieldValue,
}

fn expected_name(expected: &Expected) -> &'static str {
    match expected {
        Expected::Type(kind) => kind.name(),
        Expected::Record => "record",
    }
}

impl fmt::Display for EventIssueKind {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            EventIssueKind::WrongType { expected, got } => write!(f, "Invalid input: expected {}, received {}", expected_name(expected), got.name()),
            EventIssueKind::Required { field, expected } => write!(f, "this is required; add \"{field}\" ({})", expected_name(expected)),
            EventIssueKind::NotAnAction => {
                let list = ACTIONS.iter().map(|action| format!("'{action}'")).collect::<Vec<_>>().join(" | ");
                write!(f, "Invalid discriminator value. Expected {list}")
            }
            EventIssueKind::NotVersionOne => f.write_str("Invalid input: expected 1"),
            EventIssueKind::Empty => f.write_str("Too small: expected string to have >=1 characters"),
            EventIssueKind::UnknownProps { keys } => {
                let (verb, pronoun) = if keys.len() == 1 { ("isn't a known prop", "it") } else { ("aren't known props", "them") };
                write!(f, "{} {verb} here; check the spelling or remove {pronoun}", quoted(keys))
            }
            EventIssueKind::NotAFieldValue => f.write_str("Invalid input"),
        }
    }
}

impl fmt::Display for EventIssue {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "- {}: {}", self.path, self.kind)
    }
}

impl fmt::Display for EventRefusal {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            EventRefusal::NotJson(fault) => write!(
                f,
                "This isn't JSON ({fault}); send an event as JSON like {{ \"v\": 1, \"source\": \"...\", \"target\": \"...\", \"action\": \"press\", \"value\": \"...\" }}"
            ),
            EventRefusal::TooDeep { limit } => write!(f, "This event is nested more than {limit} levels deep; an event holds a flat list of values, so send it flat"),
            EventRefusal::Schema(issues) => {
                f.write_str("This event doesn't match the IntUI event schema:")?;
                for issue in issues {
                    write!(f, "\n{issue}")?;
                }
                Ok(())
            }
        }
    }
}

impl std::error::Error for EventRefusal {}

/// Why an event that parsed can't come from the component it names.
#[derive(Clone, Debug, PartialEq)]
pub enum EventProblem {
    NothingHasId { target: String },
    CannotBePressed { target: String, kind: Kind },
    CannotBeSubmitted { target: String, kind: Kind },
    NoSuchOption { choice: String, option: String, options: Vec<String> },
    NoSuchField { form: String, field: String },
    WrongValueType { label: String, expected: ValueType, got: FieldValue },
    NotAmongOptions { label: String, got: FieldValue, options: Vec<String> },
    RequiredLeftEmpty { labels: Vec<String> },
}

impl EventProblem {
    /// The sentence a host tells the model: the reason, after what it means.
    pub fn refusal(&self) -> String {
        format!("This event doesn't fit the tree it came from: {self}")
    }
}

impl fmt::Display for EventProblem {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            EventProblem::NothingHasId { target } => write!(f, "nothing in it has the id \"{target}\""),
            EventProblem::CannotBePressed { target, kind } => write!(f, "\"{target}\" is a {}, which can't be pressed", kind.name()),
            EventProblem::CannotBeSubmitted { target, kind } => write!(f, "\"{target}\" is a {}, which can't be submitted", kind.name()),
            EventProblem::NoSuchOption { choice, option, options } => {
                write!(f, "choice \"{choice}\" has no option \"{option}\"; its options are {}", options.join(", "))
            }
            EventProblem::NoSuchField { form, field } => write!(f, "form \"{form}\" has no field \"{field}\""),
            EventProblem::WrongValueType { label, expected, got } => write!(f, "field \"{label}\" takes a {}, got {}", expected.name(), got.stringify()),
            EventProblem::NotAmongOptions { label, got, options } => {
                write!(f, "field \"{label}\" has no option {}; its options are {}", got.stringify(), options.join(", "))
            }
            EventProblem::RequiredLeftEmpty { labels } => {
                let word = if labels.len() == 1 { "field" } else { "fields" };
                write!(f, "required {word} {} left empty", quoted(labels))
            }
        }
    }
}

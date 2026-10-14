//! Why a tree was refused, in one catalogue.
//!
//! Every message a person or a model reads when a tree fails lives here, written
//! once. Each names the path, the rule that failed and what to do next, in the
//! words `packages/core/src/problems.ts` and `reading.ts` use, so a model that
//! retries gets the same advice from either implementation.

use crate::json::{Json, JsonFault, JsonType};
use crate::node::Kind;
use crate::reading::ReadingKind;
use std::fmt;

/// A tree that can't be shown. Displays as core's `IntuiError` does: a summary,
/// then one `- path: message` line per problem.
#[derive(Clone, Debug, PartialEq)]
pub enum Refusal {
    NotJson(JsonFault),
    TooDeep { limit: usize },
    NoRoot,
    NoVersion,
    WrongVersion { found: String },
    Schema(Vec<Problem>),
    DuplicateIds(Vec<Problem>),
}

#[derive(Clone, Debug, PartialEq)]
pub struct Problem {
    /// Where, as core writes it: `root.children[1] (Chart).series`.
    pub path: String,
    pub kind: ProblemKind,
}

/// What a value was expected to be when it is a type: most are one JSON type, a table row is a record.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Expected {
    Type(JsonType),
    Record,
}

/// What is wrong at one path.
#[derive(Clone, Debug, PartialEq)]
pub enum ProblemKind {
    NeedsType,
    TypeNotText { found: String },
    WrongType { expected: Expected, got: JsonType },
    UnknownProps { keys: Vec<String> },
    Required { field: String, expected: Option<JsonType> },
    NotOneOf { options: Vec<String> },
    NotExactly { expected: String },
    TooShort { min: usize, what: ShortRule },
    TooLong { max: usize, what: LongRule },
    TooFewItems { min: usize },
    NeedsMore(MinimumRule),
    OneOfTypes { expected: Vec<JsonType> },
    Reading(ReadingProblem),
    LinkPointsNowhere { step: String, ids: Vec<String> },
    RowKeyNotColumn { key: String },
    SelectNeedsOptions,
    DuplicateId { id: String, first: String },
    /// The value passed every check but this build could not read it into its type.
    Unreadable { what: String, field: String },
}

impl ProblemKind {
    /// Whether the problem is the wrong kind of value, so checks that read the node's values can't run.
    /// A string that is too short or a list too small still leaves values to read.
    pub fn blocks_cross_checks(&self) -> bool {
        match self {
            ProblemKind::NeedsType
            | ProblemKind::TypeNotText { .. }
            | ProblemKind::WrongType { .. }
            | ProblemKind::Required { .. }
            | ProblemKind::NotOneOf { .. }
            | ProblemKind::NotExactly { .. }
            | ProblemKind::OneOfTypes { .. }
            | ProblemKind::Reading(_)
            | ProblemKind::Unreadable { .. } => true,
            ProblemKind::UnknownProps { .. }
            | ProblemKind::TooShort { .. }
            | ProblemKind::TooLong { .. }
            | ProblemKind::TooFewItems { .. }
            | ProblemKind::NeedsMore(_)
            | ProblemKind::LinkPointsNowhere { .. }
            | ProblemKind::RowKeyNotColumn { .. }
            | ProblemKind::SelectNeedsOptions
            | ProblemKind::DuplicateId { .. } => false,
        }
    }
}

/// Which "too short" message: most strings get the generic one.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ShortRule {
    Plain,
    TextMarkdown,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum LongRule {
    Plain,
    LabelText,
}

/// The lists that can't be empty, each with its own advice.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum MinimumRule {
    GroupChildren,
    ChartSeries,
    SeriesPoints,
    FlowSteps,
    ChoiceOptions,
    FormFields,
    TableColumns,
}

/// How core's `describe` names a value it was handed and didn't want.
#[derive(Clone, Debug, PartialEq)]
pub enum Seen {
    Missing,
    Null,
    List,
    Object,
    Flag,
    Number(String),
    Text(String),
}

impl Seen {
    pub fn of(value: &Json) -> Seen {
        match value {
            Json::Null => Seen::Null,
            Json::Array(_) => Seen::List,
            Json::Object(_) => Seen::Object,
            Json::Bool(_) => Seen::Flag,
            Json::Number(number) => Seen::of_number(*number),
            Json::String(text) => Seen::Text(text.chars().take(20).collect()),
        }
    }

    pub fn of_number(number: f64) -> Seen {
        Seen::Number(Json::number_text(number))
    }
}

impl fmt::Display for Seen {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Seen::Missing => f.write_str("undefined"),
            Seen::Null => f.write_str("null"),
            Seen::List => f.write_str("a list"),
            Seen::Object => f.write_str("an object"),
            Seen::Flag => f.write_str("boolean"),
            Seen::Number(text) => f.write_str(text),
            Seen::Text(text) => write!(f, "the string \"{text}\""),
        }
    }
}

/// Why a reading was refused.
#[derive(Clone, Debug, PartialEq)]
pub enum ReadingProblem {
    NotFinite { shown: Seen },
    NotAReading { got: Seen },
    NeedsKind,
    KindNotARecognisedWord { name: String },
    KindNotText { seen: Seen },
    UnknownHasValue,
    NeedsValue { kind: ReadingKind },
    ValueNotFinite { kind: ReadingKind, got: Seen },
    Extras { kind: ReadingKind, keys: Vec<String> },
}

const KIND_LIST: &str = "\"exact\", \"atLeast\", \"estimate\", \"unknown\"";

pub(crate) fn quoted(keys: &[String]) -> String {
    keys.iter().map(|key| format!("\"{key}\"")).collect::<Vec<_>>().join(", ")
}

fn component_list() -> String {
    Kind::ALL.iter().map(|kind| kind.name()).collect::<Vec<_>>().join(", ")
}

/// "a string or a number", "a string, number, boolean or null".
fn types_phrase(types: &[JsonType]) -> String {
    let names: Vec<&str> = types.iter().map(|kind| kind.name()).collect();
    match names.as_slice() {
        [] => String::from("a value"),
        [only] => format!("a {only}"),
        [first, second] => format!("a {first} or a {second}"),
        [first, middle @ .., last] => format!("a {first}, {} or {last}", middle.join(", ")),
    }
}

impl fmt::Display for ProblemKind {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ProblemKind::NeedsType => write!(f, "a component needs a \"type\"; use one of {}", component_list()),
            ProblemKind::TypeNotText { found } => write!(f, "\"{found}\" isn't a component; use one of {}", component_list()),
            ProblemKind::WrongType { expected, got } => {
                let expected = match expected {
                    Expected::Type(kind) => kind.name(),
                    Expected::Record => "record",
                };
                write!(f, "Invalid input: expected {expected}, received {}", got.name())
            }
            ProblemKind::UnknownProps { keys } => {
                let (verb, pronoun) = if keys.len() == 1 { ("isn't a known prop", "it") } else { ("aren't known props", "them") };
                write!(f, "{} {verb} here; check the spelling or remove {pronoun}", quoted(keys))
            }
            ProblemKind::Required { field, expected: Some(expected) } => write!(f, "this is required; add \"{field}\" ({})", expected.name()),
            ProblemKind::Required { field, expected: None } => write!(f, "this is required; add \"{field}\""),
            ProblemKind::NotOneOf { options } => {
                let list = options.iter().map(|option| format!("\"{option}\"")).collect::<Vec<_>>().join("|");
                write!(f, "Invalid option: expected one of {list}")
            }
            ProblemKind::NotExactly { expected } => write!(f, "Invalid input: expected {expected}"),
            ProblemKind::TooShort { what: ShortRule::TextMarkdown, .. } => {
                write!(f, "Text needs some markdown; leave the Text out if there's nothing to say")
            }
            ProblemKind::TooShort { min, .. } => write!(f, "Too small: expected string to have >={min} characters"),
            ProblemKind::TooLong { what: LongRule::LabelText, .. } => write!(f, "a Label is a short tag; put longer text in a Text"),
            ProblemKind::TooLong { max, .. } => write!(f, "Too big: expected string to have <={max} characters"),
            ProblemKind::TooFewItems { min } => write!(f, "Too small: expected array to have >={min} items"),
            ProblemKind::NeedsMore(rule) => f.write_str(match rule {
                MinimumRule::GroupChildren => "a Group needs at least one child",
                MinimumRule::ChartSeries => "a Chart needs at least one series",
                MinimumRule::SeriesPoints => "a series needs at least one point",
                MinimumRule::FlowSteps => "a Flow needs at least two steps; use a Text for one",
                MinimumRule::ChoiceOptions => "a Choice needs at least one option",
                MinimumRule::FormFields => "a Form needs at least one field",
                MinimumRule::TableColumns => "a Table needs at least one column",
            }),
            ProblemKind::OneOfTypes { expected } => write!(f, "Invalid input; give {}", types_phrase(expected)),
            ProblemKind::Reading(reading) => reading.fmt(f),
            ProblemKind::LinkPointsNowhere { step, ids } => {
                write!(f, "link points at step \"{step}\", which doesn't exist; use one of {}", ids.join(", "))
            }
            ProblemKind::RowKeyNotColumn { key } => write!(
                f,
                "row has a value for \"{key}\", which isn't a column; add a column with key \"{key}\" or remove the value"
            ),
            ProblemKind::SelectNeedsOptions => {
                write!(f, "a select field needs options; add an options list or use input: \"text\"")
            }
            ProblemKind::DuplicateId { id, first } => {
                write!(f, "id \"{id}\" is already used at {first}; give each Choice and Form its own id")
            }
            ProblemKind::Unreadable { what, field } => write!(
                f,
                "this {what}'s \"{field}\" passed the checks but this copy of intui-types couldn't read it; its schema is out of step with core's, so rebuild intui-types from packages/core/schema and report this tree"
            ),
        }
    }
}

impl fmt::Display for ReadingProblem {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ReadingProblem::NotFinite { shown } => write!(
                f,
                "{shown} isn't a finite number; give a finite number, or {{\"kind\":\"unknown\"}} if the source couldn't be read"
            ),
            ReadingProblem::NotAReading { got } => write!(
                f,
                "expected a number or a reading object like {{\"kind\":\"atLeast\",\"value\":216}}; got {got}"
            ),
            ReadingProblem::NeedsKind => write!(
                f,
                "a reading object needs a \"kind\"; add \"kind\" (one of {KIND_LIST}) or write a bare number for an exact one"
            ),
            ReadingProblem::KindNotARecognisedWord { name } => write!(f, "kind \"{name}\" isn't a reading; use one of {KIND_LIST}"),
            ReadingProblem::KindNotText { seen } => write!(f, "kind {seen} isn't a reading; use one of {KIND_LIST}"),
            ReadingProblem::UnknownHasValue => write!(
                f,
                "kind \"unknown\" has no value; remove value, or use kind \"atLeast\" or \"estimate\" if you have a number"
            ),
            ReadingProblem::NeedsValue { kind } => write!(
                f,
                "kind \"{}\" needs a value; add \"value\" (a number), or use kind \"unknown\" if the source couldn't be read",
                kind.name()
            ),
            ReadingProblem::ValueNotFinite { kind, got } => write!(
                f,
                "kind \"{}\" needs \"value\" to be a finite number, got {got}; fix it, or use kind \"unknown\" if the source couldn't be read",
                kind.name()
            ),
            ReadingProblem::Extras { kind, keys } => {
                let (verb, pronoun) = if keys.len() == 1 { ("isn't a known prop", "it") } else { ("aren't known props", "them") };
                write!(f, "{} {verb} of kind \"{}\"; remove {pronoun}", quoted(keys), kind.name())
            }
        }
    }
}

impl fmt::Display for Problem {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "- {}: {}", self.path, self.kind)
    }
}

impl fmt::Display for JsonFault {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            JsonFault::Empty => f.write_str("there is nothing in it"),
            JsonFault::EndsEarly => f.write_str("the text ends before the JSON is complete"),
            JsonFault::Unexpected { found, line, column } => write!(f, "unexpected {found:?} at line {line}, column {column}"),
            JsonFault::BadEscape { line, column } => write!(f, "a string escape at line {line}, column {column} isn't valid"),
            JsonFault::BadNumber { line, column } => write!(f, "the number at line {line}, column {column} isn't valid"),
            JsonFault::RawControl { line, column } => write!(f, "a string at line {line}, column {column} holds a raw control character (write it as an escape)"),
            JsonFault::TrailingText { line, column } => write!(f, "there is more text after the JSON ends, at line {line}, column {column}"),
        }
    }
}

fn list(f: &mut fmt::Formatter<'_>, summary: &str, problems: &[Problem]) -> fmt::Result {
    write!(f, "{summary}")?;
    for problem in problems {
        write!(f, "\n{problem}")?;
    }
    Ok(())
}

impl fmt::Display for Refusal {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Refusal::NotJson(fault) => write!(f, "This isn't JSON ({fault}); send a tree as JSON like {{ \"v\": 1, \"root\": {{ \"type\": \"Text\", ... }} }}"),
            Refusal::TooDeep { limit } => write!(
                f,
                "This tree is nested more than {limit} levels deep (a Group inside a Group costs two levels); flatten it, or split it into several trees"
            ),
            Refusal::NoRoot => write!(f, "A tree is an object like {{ \"v\": 1, \"root\": {{ \"type\": \"Text\", ... }} }}; this one has no \"root\""),
            Refusal::NoVersion => write!(f, "A tree needs a version: add \"v\": 1 next to \"root\""),
            Refusal::WrongVersion { found } => write!(
                f,
                "This tree is version {found}, and this copy of IntUI reads version 1; update intui-types to draw it"
            ),
            Refusal::Schema(problems) => list(f, "This tree doesn't match the IntUI schemas:", problems),
            Refusal::DuplicateIds(problems) => list(f, "This tree has duplicate ids:", problems),
        }
    }
}

impl std::error::Error for Refusal {}

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
    /// The author was the model, and the tree holds kinds only code may write.
    ModelCannotWrite(Vec<Problem>),
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
    Marks(crate::marks_rules::MarksProblem),
    /// A rule of Areas or Tabs the schema can't hold, said in core's words.
    Areas(String),
    DuplicateId { id: String, first: String },
    /// A component whose figures must come from code, written by someone who isn't code.
    ShowsNumbers,
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
            | ProblemKind::Marks(_)
            | ProblemKind::Areas(_)
            | ProblemKind::ShowsNumbers
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
    MarksRows,
    LadderRungs,
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

mod words;
pub(crate) use words::quoted;

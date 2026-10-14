//! Why a tree was refused, in one catalogue.
//!
//! Every message a person or a model reads when a tree fails lives here, written
//! once. Each names the path, the rule that failed and what to do next, in the
//! words `packages/core/src/problems.ts` and `reading.ts` use, so a model that
//! retries gets the same advice from either implementation.

use crate::node::Kind;
use std::fmt;

/// A tree that can't be shown. Displays as core's `IntuiError` does: a summary,
/// then one `- path: message` line per problem.
#[derive(Clone, Debug, PartialEq)]
pub enum Refusal {
    NotJson { why: String },
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

/// What is wrong at one path.
#[derive(Clone, Debug, PartialEq)]
pub enum ProblemKind {
    NeedsType,
    TypeNotText { found: String },
    WrongType { expected: &'static str, got: &'static str },
    UnknownProps { keys: Vec<String> },
    Required { field: String },
    NotOneOf { options: Vec<String> },
    TooShort { min: usize, what: ShortRule },
    TooLong { max: usize, what: LongRule },
    NeedsMore(MinimumRule),
    BadShape { expected: &'static str },
    NotPrimary,
    Reading(ReadingProblem),
    LinkPointsNowhere { step: String, ids: Vec<String> },
    RowKeyNotColumn { key: String },
    SelectNeedsOptions,
    DuplicateId { id: String, first: String },
    DoesNotFit { why: String },
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

/// Why a reading was refused.
#[derive(Clone, Debug, PartialEq)]
pub enum ReadingProblem {
    NotFinite { shown: String },
    NotAReading { got: String },
    NeedsKind,
    UnknownKind { shown: String },
    UnknownHasValue,
    NeedsValue { kind: String },
    ValueNotFinite { kind: String, got: String },
    Extras { kind: String, keys: Vec<String> },
}

const KIND_LIST: &str = "\"exact\", \"atLeast\", \"estimate\", \"unknown\"";

fn quoted(keys: &[String]) -> String {
    keys.iter().map(|key| format!("\"{key}\"")).collect::<Vec<_>>().join(", ")
}

fn component_list() -> String {
    Kind::ALL.iter().map(|kind| kind.name()).collect::<Vec<_>>().join(", ")
}

impl fmt::Display for ProblemKind {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ProblemKind::NeedsType => write!(f, "a component needs a \"type\"; use one of {}", component_list()),
            ProblemKind::TypeNotText { found } => write!(f, "\"{found}\" isn't a component; use one of {}", component_list()),
            ProblemKind::WrongType { expected, got } => write!(f, "Invalid input: expected {expected}, received {got}"),
            ProblemKind::UnknownProps { keys } => {
                let (verb, pronoun) = if keys.len() == 1 { ("isn't a known prop", "it") } else { ("aren't known props", "them") };
                write!(f, "{} {verb} here; check the spelling or remove {pronoun}", quoted(keys))
            }
            ProblemKind::Required { field } => write!(f, "this is required; add \"{field}\""),
            ProblemKind::NotOneOf { options } => {
                let list = options.iter().map(|option| format!("\"{option}\"")).collect::<Vec<_>>().join("|");
                write!(f, "Invalid option: expected one of {list}")
            }
            ProblemKind::TooShort { what: ShortRule::TextMarkdown, .. } => {
                write!(f, "Text needs some markdown; leave the Text out if there's nothing to say")
            }
            ProblemKind::TooShort { min, .. } => write!(f, "Too small: expected string to have >={min} characters"),
            ProblemKind::TooLong { what: LongRule::LabelText, .. } => write!(f, "a Label is a short tag; put longer text in a Text"),
            ProblemKind::TooLong { max, .. } => write!(f, "Too big: expected string to have <={max} characters"),
            ProblemKind::NeedsMore(rule) => f.write_str(match rule {
                MinimumRule::GroupChildren => "a Group needs at least one child",
                MinimumRule::ChartSeries => "a Chart needs at least one series",
                MinimumRule::SeriesPoints => "a series needs at least one point",
                MinimumRule::FlowSteps => "a Flow needs at least two steps; use a Text for one",
                MinimumRule::ChoiceOptions => "a Choice needs at least one option",
                MinimumRule::FormFields => "a Form needs at least one field",
                MinimumRule::TableColumns => "a Table needs at least one column",
            }),
            ProblemKind::BadShape { expected } => write!(f, "Invalid input; give {expected}"),
            ProblemKind::NotPrimary => write!(f, "Invalid input: expected \"primary\""),
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
            ProblemKind::DoesNotFit { why } => write!(f, "{why}; change the value to fit the IntUI schema"),
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
            ReadingProblem::UnknownKind { shown } => write!(f, "kind {shown} isn't a reading; use one of {KIND_LIST}"),
            ReadingProblem::UnknownHasValue => write!(
                f,
                "kind \"unknown\" has no value; remove value, or use kind \"atLeast\" or \"estimate\" if you have a number"
            ),
            ReadingProblem::NeedsValue { kind } => write!(
                f,
                "kind \"{kind}\" needs a value; add \"value\" (a number), or use kind \"unknown\" if the source couldn't be read"
            ),
            ReadingProblem::ValueNotFinite { kind, got } => write!(
                f,
                "kind \"{kind}\" needs \"value\" to be a finite number, got {got}; fix it, or use kind \"unknown\" if the source couldn't be read"
            ),
            ReadingProblem::Extras { kind, keys } => {
                let (verb, pronoun) = if keys.len() == 1 { ("isn't a known prop", "it") } else { ("aren't known props", "them") };
                write!(f, "{} {verb} of kind \"{kind}\"; remove {pronoun}", quoted(keys))
            }
        }
    }
}

impl fmt::Display for Problem {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "- {}: {}", self.path, self.kind)
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
            Refusal::NotJson { why } => write!(f, "This isn't JSON ({why}); send a tree as JSON like {{ \"v\": 1, \"root\": {{ \"type\": \"Text\", ... }} }}"),
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

//! The words of every refusal: how each problem, reading problem and fault reads, in core's wording.

use super::*;

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
                MinimumRule::MarksRows => "Marks needs at least one row; use a Text to say there is nothing to show",
                MinimumRule::LadderRungs => "a Ladder needs at least one rung; use a Text to say there is nothing to show",
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
            ProblemKind::Marks(problem) => problem.fmt(f),
            ProblemKind::SelectNeedsOptions => {
                write!(f, "a select field needs options; add an options list or use input: \"text\"")
            }
            ProblemKind::DuplicateId { id, first } => {
                write!(f, "id \"{id}\" is already used at {first}; give each Choice and Form its own id")
            }
            ProblemKind::ShowsNumbers => f.write_str(
                "this component shows numbers, which must come from code: call a tool that returns it, or show the figures in a Text or Table you can vouch for",
            ),
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
            Refusal::ModelCannotWrite(problems) => list(f, "The model can't write this tree directly:", problems),
        }
    }
}

impl std::error::Error for Refusal {}

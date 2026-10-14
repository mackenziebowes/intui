//! Everything `intui-layout` can fail at, each with the words it says and the exit code it ends with.
//! A malformed case says which question and which case, and what was wrong with it.

use intui_types::Refusal;
use std::fmt;
use std::process::ExitCode;

/// How the process ends when it can't answer.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Exit {
    /// The input was readable but wasn't a set of layout questions, or a case under one was malformed.
    BadQuestions = 2,
}

/// What was wrong with one case.
#[derive(Debug)]
pub enum CaseFault {
    WantsNumber,
    WantsText,
    WantsTextAndUnit,
    WantsMinMaxAndKind,
    UnknownChartKind { found: String },
    BadLabelPlacement { key: &'static str },
    FlowRefused { why: Refusal },
    ChartRefused { why: Refusal },
    ChangeRefused { why: Refusal },
    WantsFlowShape,
    WantsChartNode,
    WantsChangeNode,
}

#[derive(Debug)]
pub enum CliError {
    StdinUnreadable { why: String },
    NotAnObject,
    QuestionNeedsList { question: String },
    UnknownQuestion { question: String, known: Vec<&'static str> },
    MalformedCase { question: &'static str, index: usize, fault: CaseFault },
}

impl CliError {
    pub fn exit_code(&self) -> ExitCode {
        ExitCode::from(Exit::BadQuestions as u8)
    }
}

impl fmt::Display for CaseFault {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CaseFault::WantsNumber => write!(f, "it should be one number"),
            CaseFault::WantsText => write!(f, "it should be one string"),
            CaseFault::WantsTextAndUnit => write!(f, "it should be a list of a string and a unit (a string or null)"),
            CaseFault::WantsMinMaxAndKind => write!(f, "it should be a list of a minimum, a maximum and a chart kind (\"line\" or \"bar\")"),
            CaseFault::UnknownChartKind { found } => write!(f, "\"{found}\" isn't a chart kind; use \"line\" or \"bar\""),
            CaseFault::BadLabelPlacement { key } => write!(f, "\"{key}\" should be a list of numbers (or, for total and gap, one number)"),
            CaseFault::FlowRefused { why } => write!(f, "its steps and links don't make a Flow:\n{why}"),
            CaseFault::ChartRefused { why } => write!(f, "it isn't a Chart:\n{why}"),
            CaseFault::ChangeRefused { why } => write!(f, "it isn't a Stat change:\n{why}"),
            CaseFault::WantsFlowShape => write!(f, "it should be an object with \"steps\" and \"links\""),
            CaseFault::WantsChartNode => write!(f, "it should be a Chart node as an object"),
            CaseFault::WantsChangeNode => write!(f, "it should be a Stat change as an object"),
        }
    }
}

impl fmt::Display for CliError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CliError::StdinUnreadable { why } => write!(f, "Couldn't read stdin ({why}); pipe a JSON object of layout cases into intui-layout"),
            CliError::NotAnObject => write!(f, "Expected a JSON object like {{\"niceStep\": [0.3]}}; the input wasn't one"),
            CliError::QuestionNeedsList { question } => write!(f, "\"{question}\" needs a list of cases; give a JSON array"),
            CliError::UnknownQuestion { question, known } => {
                write!(f, "Don't know the question \"{question}\"; ask one of {}", known.join(", "))
            }
            CliError::MalformedCase { question, index, fault } => {
                write!(f, "Case {index} under \"{question}\" is malformed: {fault}; fix that case and run again")
            }
        }
    }
}

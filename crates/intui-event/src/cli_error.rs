//! Everything `intui-event` can fail at, each with the words it says and the exit code it ends with.

use intui_types::{EventProblem, EventRefusal, Refusal, Unreadable};
use std::fmt;
use std::process::ExitCode;

/// How the process ends when an event isn't accepted.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Exit {
    /// The tree or the event was read and refused, or the event doesn't fit the tree.
    Refused = 1,
    /// The input could not be read as `{ "tree": ..., "event": ... }`.
    InputUnreadable = 2,
}

#[derive(Debug)]
pub enum CliError {
    StdinUnreadable { why: String },
    NotJson(Unreadable),
    NeedsBoth { missing: &'static str },
    TreeRefused(Refusal),
    EventRefused(EventRefusal),
    DoesNotFit(EventProblem),
}

impl CliError {
    pub fn exit(&self) -> Exit {
        match self {
            CliError::StdinUnreadable { .. } | CliError::NotJson(_) | CliError::NeedsBoth { .. } => Exit::InputUnreadable,
            CliError::TreeRefused(_) | CliError::EventRefused(_) | CliError::DoesNotFit(_) => Exit::Refused,
        }
    }

    pub fn exit_code(&self) -> ExitCode {
        ExitCode::from(self.exit() as u8)
    }
}

impl fmt::Display for CliError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CliError::StdinUnreadable { why } => write!(f, "Couldn't read stdin ({why}); pipe {{ \"tree\": ..., \"event\": ... }} as JSON into intui-event"),
            CliError::NotJson(Unreadable::NotJson(fault)) => write!(f, "The input isn't JSON ({fault}); pipe {{ \"tree\": ..., \"event\": ... }} as JSON into intui-event"),
            CliError::NotJson(Unreadable::TooDeep { limit }) => write!(f, "The input is nested more than {limit} levels deep; pipe {{ \"tree\": ..., \"event\": ... }} with a tree and an event that each fit"),
            CliError::NeedsBoth { missing } => write!(f, "The input needs a \"{missing}\"; pipe {{ \"tree\": ..., \"event\": ... }} as JSON into intui-event"),
            CliError::TreeRefused(refusal) => refusal.fmt(f),
            CliError::EventRefused(refusal) => refusal.fmt(f),
            CliError::DoesNotFit(problem) => f.write_str(&problem.refusal()),
        }
    }
}

//! Everything `intui-text` can fail at, each with the words it says and the exit code it ends with.

use intui_types::Refusal;
use std::fmt;
use std::process::ExitCode;

/// How the process ends when a tree can't be printed.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Exit {
    /// The tree was read and refused.
    TreeRefused = 1,
    /// Standard input or the arguments could not be read at all.
    InputUnreadable = 2,
}

#[derive(Debug)]
pub enum CliError {
    StdinUnreadable { why: String },
    BadArguments { given: String },
    Refused(Refusal),
}

impl CliError {
    pub fn exit(&self) -> Exit {
        match self {
            CliError::StdinUnreadable { .. } | CliError::BadArguments { .. } => Exit::InputUnreadable,
            CliError::Refused(_) => Exit::TreeRefused,
        }
    }

    pub fn exit_code(&self) -> ExitCode {
        ExitCode::from(self.exit() as u8)
    }
}

impl fmt::Display for CliError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CliError::StdinUnreadable { why } => write!(f, "Couldn't read stdin ({why}); pipe a tree as JSON into intui-text"),
            CliError::BadArguments { given } => write!(f, "intui-text takes no arguments or `--author model` or `--author code`; got \"{given}\""),
            CliError::Refused(refusal) => refusal.fmt(f),
        }
    }
}

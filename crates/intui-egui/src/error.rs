//! Everything `intui-egui` can refuse, each with the words it says: what failed, the rule it broke and what to do next.

use crate::words;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Error {
    SourceEmpty,
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::SourceEmpty => f.write_str(words::SOURCE_EMPTY),
        }
    }
}

impl std::error::Error for Error {}

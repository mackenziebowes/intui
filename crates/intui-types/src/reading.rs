//! A number and how sure it is: the Rust side of core's `Reading`.
//!
//! The generated `Reading` is a bare number or a loosely-typed object; this one is
//! what code past the edge reads, one variant per certainty, and an `Unknown` can
//! never pass for 0.

use crate::generated::tree as gen;

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Reading {
    Exact(f64),
    AtLeast(f64),
    Estimate(f64),
    Unknown,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ReadingKind {
    Exact,
    AtLeast,
    Estimate,
    Unknown,
}

impl Reading {
    pub fn kind(self) -> ReadingKind {
        match self {
            Reading::Exact(_) => ReadingKind::Exact,
            Reading::AtLeast(_) => ReadingKind::AtLeast,
            Reading::Estimate(_) => ReadingKind::Estimate,
            Reading::Unknown => ReadingKind::Unknown,
        }
    }

    /// The number inside, or `None` for an unknown.
    pub fn value(self) -> Option<f64> {
        match self {
            Reading::Exact(value) | Reading::AtLeast(value) | Reading::Estimate(value) => Some(value),
            Reading::Unknown => None,
        }
    }
}

impl ReadingKind {
    pub const ALL: [ReadingKind; 4] = [ReadingKind::Exact, ReadingKind::AtLeast, ReadingKind::Estimate, ReadingKind::Unknown];

    pub fn name(self) -> &'static str {
        match self {
            ReadingKind::Exact => "exact",
            ReadingKind::AtLeast => "atLeast",
            ReadingKind::Estimate => "estimate",
            ReadingKind::Unknown => "unknown",
        }
    }
}

impl From<&gen::Reading> for Reading {
    fn from(reading: &gen::Reading) -> Reading {
        match reading {
            gen::Reading::Number(value) => Reading::Exact(*value),
            gen::Reading::ReadingObject(gen::ReadingObject::Exact(value)) => Reading::Exact(*value),
            gen::Reading::ReadingObject(gen::ReadingObject::AtLeast(value)) => Reading::AtLeast(*value),
            gen::Reading::ReadingObject(gen::ReadingObject::Estimate(value)) => Reading::Estimate(*value),
            gen::Reading::ReadingObject(gen::ReadingObject::Unknown) => Reading::Unknown,
        }
    }
}

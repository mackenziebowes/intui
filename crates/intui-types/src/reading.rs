//! A number and how sure it is: the Rust side of core's `Reading`.
//!
//! One variant per certainty, each holding a `Finite` so no reading can carry NaN or
//! infinity, and an `Unknown` can never pass for 0. `Reading::read` is the only way in
//! from JSON and refuses in core's words.

use crate::json::Json;
use crate::refusal::{ReadingProblem, Seen};

/// A number that is neither NaN nor infinite. The only way to make one is `new`.
#[derive(Clone, Copy, Debug, PartialEq, PartialOrd)]
pub struct Finite(f64);

impl Finite {
    pub fn new(number: f64) -> Option<Finite> {
        number.is_finite().then_some(Finite(number))
    }

    pub fn get(self) -> f64 {
        self.0
    }
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Reading {
    Exact(Finite),
    AtLeast(Finite),
    Estimate(Finite),
    Unknown,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ReadingKind {
    Exact,
    AtLeast,
    Estimate,
    Unknown,
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

    pub fn from_name(name: &str) -> Option<ReadingKind> {
        ReadingKind::ALL.into_iter().find(|kind| kind.name() == name)
    }
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
            Reading::Exact(value) | Reading::AtLeast(value) | Reading::Estimate(value) => Some(value.get()),
            Reading::Unknown => None,
        }
    }

    /// Reads a wire reading in core's `parseReading` order, or says what is wrong with it.
    /// `None` stands for a reading the wire left out.
    pub fn read(input: Option<&Json>) -> Result<Reading, ReadingProblem> {
        let object = match input {
            None => return Err(ReadingProblem::NotAReading { got: Seen::Missing }),
            Some(Json::Number(number)) => {
                return Finite::new(*number).map(Reading::Exact).ok_or(ReadingProblem::NotFinite { shown: Seen::of_number(*number) })
            }
            Some(Json::Object(object)) => object,
            Some(other) => return Err(ReadingProblem::NotAReading { got: Seen::of(other) }),
        };
        let kind = match object.get("kind") {
            None => return Err(ReadingProblem::NeedsKind),
            Some(Json::String(name)) => ReadingKind::from_name(name).ok_or_else(|| ReadingProblem::KindNotARecognisedWord { name: name.clone() })?,
            Some(other) => return Err(ReadingProblem::KindNotText { seen: Seen::of(other) }),
        };
        let extras = |allowed: &[&str]| -> Result<(), ReadingProblem> {
            let keys: Vec<String> = object.keys().filter(|name| !allowed.contains(name)).map(str::to_string).collect();
            if keys.is_empty() {
                Ok(())
            } else {
                Err(ReadingProblem::Extras { kind, keys })
            }
        };
        if kind == ReadingKind::Unknown {
            if object.contains_key("value") {
                return Err(ReadingProblem::UnknownHasValue);
            }
            extras(&["kind"])?;
            return Ok(Reading::Unknown);
        }
        let value = match object.get("value") {
            None => return Err(ReadingProblem::NeedsValue { kind }),
            Some(Json::Number(number)) => Finite::new(*number).ok_or(ReadingProblem::ValueNotFinite { kind, got: Seen::of_number(*number) })?,
            Some(other) => return Err(ReadingProblem::ValueNotFinite { kind, got: Seen::of(other) }),
        };
        extras(&["kind", "value"])?;
        Ok(match kind {
            ReadingKind::Exact => Reading::Exact(value),
            ReadingKind::AtLeast => Reading::AtLeast(value),
            ReadingKind::Estimate => Reading::Estimate(value),
            ReadingKind::Unknown => Reading::Unknown,
        })
    }
}

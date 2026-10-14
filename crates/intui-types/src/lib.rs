//! The IntUI tree as Rust sees it: parsed forms of every component, built from core's
//! committed JSON Schemas, and the one edge that turns JSON from a wire into a `Tree` or
//! a `Refusal`.
//!
//! Past `parse` nothing re-checks a shape, and a `Tree` cannot be built any other way. A
//! node whose `type` this build doesn't know becomes `Drawn::Unknown` and the rest of the
//! tree still parses (the schema only ever grows, so a newer program will send kinds this
//! build lacks); a known kind that is malformed is refused, naming the path, the rule and
//! what to do, in the words core uses.

pub mod generated {
    //! Written by typify at build time from `packages/core/schema/*.schema.json`.
    #![allow(clippy::all, missing_docs, dead_code)]
    pub mod tree {
        include!(concat!(env!("OUT_DIR"), "/tree.rs"));
    }
    pub mod event {
        include!(concat!(env!("OUT_DIR"), "/event.rs"));
    }
}

mod author;
mod edge;
mod event;
mod event_edge;
mod event_refusal;
mod fit;
mod json;
mod node;
mod read;
mod reading;
mod refusal;
mod schema;

pub mod forms;

pub use author::Author;
pub use edge::{parse, parse_json};
pub use event::{ComponentId, Event, FieldValue, Source, ValueType, Values};
pub use event_edge::{parse_event, parse_event_json};
pub use event_refusal::{EventIssue, EventIssueKind, EventProblem, EventRefusal};
pub use json::{parse as read_json, Json, JsonFault, JsonObject, JsonType, Unreadable, MAX_DEPTH};
pub use node::{Drawn, Kind, Node, Tree, UnknownKind};
pub use reading::{Finite, Reading, ReadingKind};
pub use refusal::{Expected, LongRule, MinimumRule, Problem, ProblemKind, ReadingProblem, Refusal, Seen, ShortRule};

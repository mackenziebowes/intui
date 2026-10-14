//! The IntUI tree as Rust sees it: types generated from core's committed JSON
//! Schemas, and the one edge that turns JSON from a wire into a `Tree` or a
//! `Refusal`.
//!
//! Past `parse` nothing re-checks a shape. A node whose `type` this build doesn't
//! know becomes `Drawn::Unknown` and the rest of the tree still parses (the schema
//! only ever grows, so a newer program will send kinds this build lacks); a known
//! kind that is malformed is refused, naming the path, the rule and what to do, in
//! the words core uses.

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

mod edge;
pub use edge::{parse, parse_value};
mod node;
mod reading;
mod refusal;

pub use node::{Drawn, Group, Kind, Node, Tree};
pub use reading::{Reading, ReadingKind};
pub use refusal::{Problem, ProblemKind, Refusal};

//! The text form of a tree: the same Markdown core's `Tree.toText()` writes.
//!
//! It is what a model reads back after showing a tree, and every surface's fallback,
//! so it carries everything the drawing does. Numbers are written the way core
//! writes them (`numbers` copies JavaScript's rounding and `Intl` grouping exactly),
//! so the two sides agree byte for byte.

pub mod numbers;
mod marks_text;
mod text;
mod words;

pub use text::{cell_text, drawn_text, reading_text, to_text};

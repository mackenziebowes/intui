//! The words layout says on a reader's behalf, written once: what a chart reads aloud as,
//! and the note a mistyped number leaves.
//!
//! Core's `packages/layout/src/logic.ts` writes the same sentences, so both implementations
//! describe a chart in the same terms.

use intui_types::ReadingKind;

/// The note that stands in for a typed number that isn't one.
pub fn not_a_number(typed: &str) -> String {
    format!("\"{typed}\" is not a number")
}

/// What a series reads aloud as when it has no number to give.
pub const NO_READABLE_VALUES: &str = "has no readable values";

pub fn value_range(low: &str, high: &str) -> String {
    format!("from {low} to {high}")
}

/// "2 at least": how many of a series' points are floors, estimates or unknown. An exact point needs no note.
pub fn count_of(kind: ReadingKind, count: usize) -> Option<String> {
    let word = match kind {
        ReadingKind::Exact => return None,
        ReadingKind::AtLeast => "at least",
        ReadingKind::Estimate => "about",
        ReadingKind::Unknown => "unknown",
    };
    Some(format!("{count} {word}"))
}

pub fn series_summary(label: &str, range: &str, notes: &[String]) -> String {
    if notes.is_empty() {
        format!("{label} {range}")
    } else {
        format!("{label} {range} ({})", notes.join(", "))
    }
}

pub fn marker_summary(markers: &[String]) -> String {
    if markers.is_empty() {
        String::new()
    } else {
        format!("; markers: {}", markers.join(", "))
    }
}

pub fn chart_summary(kind: impl std::fmt::Display, title: Option<&str>, unit: Option<&str>, series: &[String], markers: &str) -> String {
    let title = title.filter(|title| !title.is_empty()).map(|title| format!(" \"{title}\"")).unwrap_or_default();
    let unit = unit.map(|unit| format!(" in {unit}")).unwrap_or_default();
    format!("{kind} chart{title}{unit}: {}{markers}", series.join("; "))
}

/// The mark a renderer puts before a number: a floor and an estimate say so; an exact number and an unknown wear none.
pub fn reading_mark(kind: ReadingKind) -> &'static str {
    match kind {
        ReadingKind::Exact => "",
        ReadingKind::AtLeast => "≥ ",
        ReadingKind::Estimate => "~",
        ReadingKind::Unknown => "",
    }
}

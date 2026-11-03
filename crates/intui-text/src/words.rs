//! The words the text form says on its own account, written once.
//!
//! The text form is core's output contract, so each word here is the one
//! `packages/core/src/components/*.ts` and `packages/core/src/reading.ts` write.

use intui_types::ReadingKind;

/// A component this build doesn't know, standing in the text where it sat.
pub fn unknown_component(kind: &str, path: &str) -> String {
    format!("(can't show a \"{kind}\" at {path}: this build of intui doesn't know that component; update intui to see it)")
}

/// The line that introduces a chart's markers.
pub fn markers(list: &str) -> String {
    format!("Markers: {list}")
}

/// The first line of a form's text.
pub const FORM_HEADING: &str = "Form:";

/// What a field says when the person must fill it in.
pub const REQUIRED: &str = "required";

/// What a chart says about its own kind: "line chart".
pub fn chart_kind(kind: impl std::fmt::Display) -> String {
    format!("{kind} chart")
}

/// A number with the certainty its reading carries; an unknown reading has no number to wear.
pub fn certainty(kind: ReadingKind, number: &str) -> String {
    match kind {
        ReadingKind::Exact => number.to_string(),
        ReadingKind::AtLeast => format!("at least {number}"),
        ReadingKind::Estimate => format!("about {number}"),
        ReadingKind::Unknown => "unknown".to_string(),
    }
}

/// The first line of a Group boxed as `waiting`: core's `[waiting on you]`.
pub const WAITING_ON_YOU: &str = "[waiting on you]";

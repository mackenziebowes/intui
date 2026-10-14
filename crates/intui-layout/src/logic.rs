//! Small decisions renderers share: column alignment, typed numbers, a chart read aloud,
//! the mark before a reading, how a change points.

use crate::chart_scale::{format_value, ChartModel};
use intui_text::numbers::shown_number;
use intui_types::generated::tree as gen;
use intui_types::{Reading, ReadingKind};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Align {
    Start,
    End,
}

/// Columns whose present values are all numbers align right unless the column says otherwise.
pub fn align_of(column: &gen::TableColumn, rows: &[std::collections::HashMap<String, gen::TableRowsItemValue>]) -> Align {
    match column.align {
        Some(gen::TableColumnAlign::Start) => return Align::Start,
        Some(gen::TableColumnAlign::End) => return Align::End,
        None => {}
    }
    let values: Vec<&gen::TableRowsItemValue> = rows
        .iter()
        .filter_map(|row| row.get(column.key.as_str()))
        .filter(|value| !matches!(value, gen::TableRowsItemValue::Null))
        .collect();
    if !values.is_empty() && values.iter().all(|value| matches!(value, gen::TableRowsItemValue::Number(_))) {
        Align::End
    } else {
        Align::Start
    }
}

#[derive(Clone, Debug, PartialEq)]
pub enum NumberInput {
    Value(f64),
    Cleared,
    Invalid { note: String },
}

/// JavaScript's `String#trim`: white space and line terminators, but not U+0085.
fn js_trim(text: &str) -> &str {
    text.trim_matches(|c: char| {
        matches!(c, '\t' | '\n' | '\u{b}' | '\u{c}' | '\r' | ' ' | '\u{a0}' | '\u{1680}' | '\u{2028}' | '\u{2029}' | '\u{202f}' | '\u{205f}' | '\u{3000}' | '\u{feff}')
            || ('\u{2000}'..='\u{200a}').contains(&c)
    })
}

/// `/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i`
fn looks_like_number(text: &str) -> bool {
    let bytes = text.as_bytes();
    let mut i = 0;
    if i < bytes.len() && (bytes[i] == b'+' || bytes[i] == b'-') {
        i += 1;
    }
    let digits = |from: usize| bytes[from..].iter().take_while(|b| b.is_ascii_digit()).count();
    let whole = digits(i);
    if whole > 0 {
        i += whole;
        if i < bytes.len() && bytes[i] == b'.' {
            i += 1;
            i += digits(i);
        }
    } else if i < bytes.len() && bytes[i] == b'.' && digits(i + 1) > 0 {
        i += 1 + digits(i + 1);
    } else {
        return false;
    }
    if i < bytes.len() && (bytes[i] == b'e' || bytes[i] == b'E') {
        i += 1;
        if i < bytes.len() && (bytes[i] == b'+' || bytes[i] == b'-') {
            i += 1;
        }
        let exponent = digits(i);
        if exponent == 0 {
            return false;
        }
        i += exponent;
    }
    i == bytes.len()
}

/// Reads what was typed into a number field. Never fails.
pub fn parse_number(raw: &str) -> NumberInput {
    let trimmed = js_trim(raw);
    if trimmed.is_empty() {
        return NumberInput::Cleared;
    }
    let value = if looks_like_number(trimmed) { trimmed.parse::<f64>().ok() } else { None };
    match value.filter(|value| value.is_finite()) {
        Some(value) => NumberInput::Value(value),
        None => {
            let shown: Vec<u16> = trimmed.encode_utf16().take(20).collect();
            NumberInput::Invalid { note: format!("\"{}\" is not a number", String::from_utf16_lossy(&shown)) }
        }
    }
}

/// What a chart says for a reader who can't see it, including points that are floors, estimates or unknown.
pub fn chart_label(model: &ChartModel, title: Option<&str>) -> String {
    let parts: Vec<String> = model
        .series
        .iter()
        .map(|s| {
            let values: Vec<f64> = s.values.iter().flatten().copied().collect();
            let range = if values.is_empty() {
                "has no readable values".to_string()
            } else {
                let min = values.iter().copied().fold(f64::INFINITY, f64::min);
                let max = values.iter().copied().fold(f64::NEG_INFINITY, f64::max);
                format!("from {} to {}", format_value(min), format_value(max))
            };
            let count = |kind: ReadingKind| s.kinds.iter().filter(|k| **k == Some(kind)).count();
            let notes: Vec<String> = [
                (count(ReadingKind::AtLeast), "at least"),
                (count(ReadingKind::Estimate), "about"),
                (count(ReadingKind::Unknown), "unknown"),
            ]
            .into_iter()
            .filter(|(n, _)| *n > 0)
            .map(|(n, word)| format!("{n} {word}"))
            .collect();
            let notes = if notes.is_empty() { String::new() } else { format!(" ({})", notes.join(", ")) };
            format!("{} {range}{notes}", s.label)
        })
        .collect();
    let markers = if model.markers.is_empty() {
        String::new()
    } else {
        let list: Vec<String> = model
            .markers
            .iter()
            .map(|m| {
                let at = match &m.at {
                    crate::chart_scale::Category::Number(number) => intui_text::numbers::js_to_string(*number),
                    crate::chart_scale::Category::Text(text) => text.clone(),
                };
                format!("{at} {}", m.label)
            })
            .collect();
        format!("; markers: {}", list.join(", "))
    };
    let title = title.filter(|title| !title.is_empty()).map(|title| format!(" \"{title}\"")).unwrap_or_default();
    let unit = model.unit.as_ref().map(|unit| format!(" in {unit}")).unwrap_or_default();
    format!("{} chart{title}{unit}: {}{markers}", model.kind, parts.join("; "))
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

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Way {
    Up,
    Down,
    Flat,
}

/// How a Stat's change draws: which way it points (none when the reading can't say) and the figure beside it.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct ChangeShape {
    pub way: Option<Way>,
    pub figure: Option<f64>,
    pub kind: ReadingKind,
}

/// A floor below zero has no direction (it may still be positive), so it keeps its sign instead of an arrow.
/// Whether a change is good news is the tone's job.
pub fn change_shape(change: &gen::StatChange) -> ChangeShape {
    match Reading::from(&change.value) {
        Reading::Unknown => ChangeShape { way: None, figure: None, kind: ReadingKind::Unknown },
        Reading::AtLeast(value) => {
            let shown = shown_number(value);
            ChangeShape { way: (shown > 0.0).then_some(Way::Up), figure: Some(shown), kind: ReadingKind::AtLeast }
        }
        Reading::Exact(value) => shaped(value, ReadingKind::Exact),
        Reading::Estimate(value) => shaped(value, ReadingKind::Estimate),
    }
}

fn shaped(value: f64, kind: ReadingKind) -> ChangeShape {
    let shown = shown_number(value);
    let way = if shown > 0.0 {
        Way::Up
    } else if shown < 0.0 {
        Way::Down
    } else {
        Way::Flat
    };
    ChangeShape { way: Some(way), figure: Some(shown.abs()), kind }
}

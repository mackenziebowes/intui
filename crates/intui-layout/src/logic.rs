//! Small decisions renderers share: column alignment, typed numbers, a chart read aloud,
//! the mark before a reading, how a change points.

use crate::chart_scale::{format_value, Category, ChartModel};
use crate::words;
use intui_text::numbers::{js_to_string, shown_number};
use intui_types::forms::{Cell, Change, Column, Row, TableColumnAlign};
use intui_types::{Reading, ReadingKind};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Align {
    Start,
    End,
}

/// Columns whose present values are all numbers align right unless the column says otherwise.
pub fn align_of(column: &Column, rows: &[Row]) -> Align {
    match column.align {
        Some(TableColumnAlign::Start) => return Align::Start,
        Some(TableColumnAlign::End) => return Align::End,
        None => {}
    }
    let values: Vec<&Cell> = rows.iter().map(|row| row.cell(&column.key)).filter(|cell| !matches!(cell, Cell::Empty)).collect();
    if !values.is_empty() && values.iter().all(|cell| matches!(cell, Cell::Number(_))) {
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
            NumberInput::Invalid { note: words::not_a_number(&String::from_utf16_lossy(&shown)) }
        }
    }
}

/// What a chart says for a reader who can't see it, including points that are floors, estimates or unknown.
pub fn chart_label(model: &ChartModel, title: Option<&str>) -> String {
    let series: Vec<String> = model
        .series
        .iter()
        .map(|s| {
            let values = s.values();
            let range = if values.is_empty() {
                words::NO_READABLE_VALUES.to_string()
            } else {
                let min = values.iter().copied().fold(f64::INFINITY, f64::min);
                let max = values.iter().copied().fold(f64::NEG_INFINITY, f64::max);
                words::value_range(&format_value(min), &format_value(max))
            };
            let notes: Vec<String> = [ReadingKind::AtLeast, ReadingKind::Estimate, ReadingKind::Unknown]
                .into_iter()
                .filter_map(|kind| {
                    let count = (0..model.xs.len()).filter(|index| s.kind_at(*index) == Some(kind)).count();
                    if count > 0 { words::count_of(kind, count) } else { None }
                })
                .collect();
            words::series_summary(&s.label, &range, &notes)
        })
        .collect();
    let markers: Vec<String> = model
        .markers
        .iter()
        .map(|m| {
            let at = match &m.at {
                Category::Number(number) => js_to_string(*number),
                Category::Text(text) => text.clone(),
            };
            format!("{at} {}", m.label)
        })
        .collect();
    words::chart_summary(model.kind, title, model.unit.as_deref(), &series, &words::marker_summary(&markers))
}

/// The mark a renderer puts before a number: a floor and an estimate say so; an exact number and an unknown wear none.
pub fn reading_mark(kind: ReadingKind) -> &'static str {
    words::reading_mark(kind)
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Way {
    Up,
    Down,
    Flat,
}

/// A change that points somewhere, and the size of the move.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Pointing {
    pub way: Way,
    pub figure: f64,
}

/// How a Stat's change draws, one variant per certainty. A floor below zero has no direction (it may still
/// be positive), so it keeps its sign instead of an arrow. Whether a change is good news is the tone's job.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum ChangeShape {
    /// Couldn't be read: no arrow, no figure.
    Unknown,
    /// A floor above zero: it points up.
    AtLeastRising { figure: f64 },
    /// A floor at or below zero: the figure keeps its sign and nothing points.
    AtLeastSigned { figure: f64 },
    Exact(Pointing),
    Estimate(Pointing),
}

impl ChangeShape {
    pub fn way(self) -> Option<Way> {
        match self {
            ChangeShape::Unknown | ChangeShape::AtLeastSigned { .. } => None,
            ChangeShape::AtLeastRising { .. } => Some(Way::Up),
            ChangeShape::Exact(pointing) | ChangeShape::Estimate(pointing) => Some(pointing.way),
        }
    }

    pub fn figure(self) -> Option<f64> {
        match self {
            ChangeShape::Unknown => None,
            ChangeShape::AtLeastRising { figure } | ChangeShape::AtLeastSigned { figure } => Some(figure),
            ChangeShape::Exact(pointing) | ChangeShape::Estimate(pointing) => Some(pointing.figure),
        }
    }

    pub fn kind(self) -> ReadingKind {
        match self {
            ChangeShape::Unknown => ReadingKind::Unknown,
            ChangeShape::AtLeastRising { .. } | ChangeShape::AtLeastSigned { .. } => ReadingKind::AtLeast,
            ChangeShape::Exact(_) => ReadingKind::Exact,
            ChangeShape::Estimate(_) => ReadingKind::Estimate,
        }
    }
}

pub fn change_shape(change: &Change) -> ChangeShape {
    match change.value {
        Reading::Unknown => ChangeShape::Unknown,
        Reading::AtLeast(value) => {
            let shown = shown_number(value.get());
            if shown > 0.0 {
                ChangeShape::AtLeastRising { figure: shown }
            } else {
                ChangeShape::AtLeastSigned { figure: shown }
            }
        }
        Reading::Exact(value) => ChangeShape::Exact(pointing(value.get())),
        Reading::Estimate(value) => ChangeShape::Estimate(pointing(value.get())),
    }
}

fn pointing(value: f64) -> Pointing {
    let shown = shown_number(value);
    let way = if shown > 0.0 {
        Way::Up
    } else if shown < 0.0 {
        Way::Down
    } else {
        Way::Flat
    };
    Pointing { way, figure: shown.abs() }
}

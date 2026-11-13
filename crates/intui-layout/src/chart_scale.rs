//! Chart scales: a readable y range, short axis numbers, which x labels fit.

use intui_text::numbers::{js_round_significant, js_to_fixed, js_to_string};
use intui_types::forms::{self, ChartKind, ChartSeriesRole, Position};
use intui_types::{Reading, ReadingKind};
use unicode_general_category::{get_general_category, GeneralCategory};

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Domain {
    pub lo: f64,
    pub hi: f64,
}

/// Where a point or marker sits along the x axis: a category name or a number.
#[derive(Clone, Debug, PartialEq)]
pub enum Category {
    Number(f64),
    Text(String),
}

impl From<&Position> for Category {
    fn from(position: &Position) -> Category {
        match position {
            Position::Number(number) => Category::Number(number.get()),
            Position::Text(text) => Category::Text(text.clone()),
        }
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct ModelSeries {
    pub label: String,
    pub role: ChartSeriesRole,
    /// What the series says at each x; `None` where it has no point there.
    pub readings: Vec<Option<Reading>>,
    /// Whether the point at each x is a period that isn't over (so far; proposal 006).
    pub partial: Vec<bool>,
}

impl ModelSeries {
    /// Whether the point at the x in place `index` is a period that isn't over.
    pub fn is_partial(&self, index: usize) -> bool {
        self.partial.get(index).copied().unwrap_or(false)
    }

    /// The number at the x in place `index`; `None` where there is no point or an unknown one.
    pub fn value_at(&self, index: usize) -> Option<f64> {
        self.readings.get(index).copied().flatten().and_then(Reading::value)
    }

    /// How sure the point at `index` is; `None` where there is no point.
    pub fn kind_at(&self, index: usize) -> Option<ReadingKind> {
        self.readings.get(index).copied().flatten().map(Reading::kind)
    }

    /// Every number the series holds, skipping gaps and unknowns.
    pub fn values(&self) -> Vec<f64> {
        self.readings.iter().flatten().filter_map(|reading| reading.value()).collect()
    }
}

/// Where a marker sits on the plot.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum MarkerSite {
    /// On the category in this place of the x axis.
    OnCategory(usize),
    /// No category matches it, so it can't be drawn on the plot.
    Unplaced,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Marker {
    pub n: usize,
    pub at: Category,
    pub label: String,
    pub site: MarkerSite,
}

/// The y range a chart can be drawn on: there is one only when some point has a number.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Scale {
    Readable(Domain),
    /// No point has a number, so there is no range to draw an axis for.
    Unreadable,
}

/// The chart as a plain model: aligned readings, a scale and numbered markers.
#[derive(Clone, Debug, PartialEq)]
pub struct ChartModel {
    pub kind: ChartKind,
    pub unit: Option<String>,
    /// Categories in the order they first appear: the same reading as the text form.
    pub xs: Vec<Category>,
    pub series: Vec<ModelSeries>,
    pub scale: Scale,
    pub markers: Vec<Marker>,
}

/// Rounds away floating-point noise such as 0.30000000000000004.
fn clean(n: f64) -> f64 {
    js_round_significant(n, 12)
}

/// `Math.round`: halves go up, also below zero.
pub(crate) fn js_round(x: f64) -> f64 {
    let floor = x.floor();
    if x - floor >= 0.5 {
        floor + 1.0
    } else {
        floor
    }
}

/// A step of 1, 2, 5 or 10 times a power of ten that is at least `raw`.
pub fn nice_step(raw: f64) -> f64 {
    if !(raw > 0.0) {
        return 1.0;
    }
    let power = 10f64.powf(raw.log10().floor());
    let f = raw / power;
    let multiple = if f <= 1.0 {
        1.0
    } else if f <= 2.0 {
        2.0
    } else if f <= 5.0 {
        5.0
    } else {
        10.0
    };
    clean(multiple * power)
}

/// The y range to draw: bars start at zero, lines hug their data, both on round numbers.
pub fn nice_domain(min: f64, max: f64, kind: ChartKind) -> Domain {
    let bar = matches!(kind, ChartKind::Bar);
    let mut lo = if bar { min.min(0.0) } else { min };
    let mut hi = if bar { max.max(0.0) } else { max };
    if lo == hi {
        if bar || lo == 0.0 {
            hi = lo + 1.0;
        } else {
            let pad = lo.abs() * 0.1;
            lo -= pad;
            hi += pad;
        }
    }
    let step = nice_step((hi - lo) / 5.0);
    Domain { lo: clean((lo / step).floor() * step), hi: clean((hi / step).ceil() * step) }
}

/// A short number for an axis: 1200 -> 1.2k, 0.5 -> 0.5.
pub fn format_value(value: f64) -> String {
    let abs = value.abs();
    let trim = |n: f64, digits: usize| -> String {
        let fixed: f64 = js_to_fixed(n, digits).parse().expect("toFixed writes a number");
        js_to_string(fixed)
    };
    if abs >= 1e9 {
        format!("{}B", trim(value / 1e9, 1))
    } else if abs >= 1e6 {
        format!("{}M", trim(value / 1e6, 1))
    } else if abs >= 1e4 {
        format!("{}k", trim(value / 1e3, 1))
    } else if abs >= 100.0 {
        trim(value, 0)
    } else if abs >= 10.0 {
        trim(value, 1)
    } else if abs >= 0.01 || abs == 0.0 {
        trim(value, 2)
    } else {
        js_to_string(js_round_significant(value, 2))
    }
}

/// A value with its unit: `$5`, `95%`, `120 ms`, `180 visitors`.
pub fn with_unit(value: &str, unit: Option<&str>) -> String {
    let Some(unit) = unit.filter(|unit| !unit.is_empty()) else {
        return value.to_string();
    };
    let mut chars = unit.chars();
    let first = chars.next().expect("unit is not empty");
    if chars.next().is_none() && "$€£¥".contains(first) {
        format!("{unit}{value}")
    } else if !is_letter_or_number(first) {
        format!("{value}{unit}")
    } else {
        format!("{value} {unit}")
    }
}

/// JavaScript's `\p{L}` or `\p{N}`: the Unicode general categories Letter and Number.
fn is_letter_or_number(c: char) -> bool {
    matches!(
        get_general_category(c),
        GeneralCategory::UppercaseLetter
            | GeneralCategory::LowercaseLetter
            | GeneralCategory::TitlecaseLetter
            | GeneralCategory::ModifierLetter
            | GeneralCategory::OtherLetter
            | GeneralCategory::DecimalNumber
            | GeneralCategory::LetterNumber
            | GeneralCategory::OtherNumber
    )
}

/// Where `value` falls on a 0..size axis, 0 at `lo`.
pub fn project(value: f64, domain: Domain, size: f64) -> f64 {
    (value - domain.lo) / (domain.hi - domain.lo) * size
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct PlacedLabel {
    pub index: usize,
    pub start: f64,
}

/// Chooses which x labels to show and where they start. The first and last are
/// kept when they fit; then midpoints are added by bisection while there is room.
/// `centers` and `widths` are in the axis's own unit (cells or pixels).
pub fn place_labels(centers: &[f64], widths: &[f64], total: f64, gap: f64) -> Vec<PlacedLabel> {
    let count = centers.len();
    if count == 0 {
        return Vec::new();
    }
    let clamped = |i: usize| (total - widths[i]).min(js_round(centers[i] - widths[i] / 2.0)).max(0.0);
    let first = PlacedLabel { index: 0, start: clamped(0) };
    let left_end = first.start + widths[0];
    let mut last = None;
    if count > 1 {
        let start = clamped(count - 1);
        if start >= left_end + gap {
            last = Some(PlacedLabel { index: count - 1, start });
        }
    }
    let mut middle = Vec::new();
    if count > 2 {
        let to = last.map_or(total + gap, |last| last.start);
        fill(&clamped, widths, gap, 0, count - 1, left_end, to, &mut middle);
    }
    let mut all = vec![first];
    all.extend(middle);
    all.extend(last);
    all.sort_by_key(|label| label.index);
    all
}

#[allow(clippy::too_many_arguments)]
fn fill(clamped: &impl Fn(usize) -> f64, widths: &[f64], gap: f64, a: usize, b: usize, from: f64, to: f64, middle: &mut Vec<PlacedLabel>) {
    if b - a < 2 {
        return;
    }
    let mid = (a + b) / 2;
    let start = clamped(mid);
    if start >= from + gap && start + widths[mid] + gap <= to {
        middle.push(PlacedLabel { index: mid, start });
        fill(clamped, widths, gap, a, mid, from, start, middle);
        fill(clamped, widths, gap, mid, b, start + widths[mid], to, middle);
    } else {
        fill(clamped, widths, gap, a, mid, from, to, middle);
        fill(clamped, widths, gap, mid, b, from, to, middle);
    }
}

/// The chart as a plain model.
pub fn build_model(chart: &forms::Chart) -> ChartModel {
    let mut xs: Vec<Category> = Vec::new();
    for point in chart.series.iter().flat_map(|series| series.points.iter()) {
        let x = match Category::from(&point.x) {
            Category::Number(number) if number == 0.0 => Category::Number(0.0),
            other => other,
        };
        if !xs.contains(&x) {
            xs.push(x);
        }
    }
    let series: Vec<ModelSeries> = chart
        .series
        .iter()
        .map(|s| ModelSeries {
            label: s.label.clone(),
            role: s.role,
            readings: xs.iter().map(|x| s.points.iter().find(|point| Category::from(&point.x) == *x).map(|point| point.y)).collect(),
            partial: xs.iter().map(|x| s.points.iter().find(|point| Category::from(&point.x) == *x).is_some_and(|point| matches!(point.period, forms::ChartPointPeriod::Partial))).collect(),
        })
        .collect();
    let all: Vec<f64> = series.iter().flat_map(ModelSeries::values).collect();
    let markers = chart
        .annotations
        .iter()
        .enumerate()
        .map(|(i, annotation)| {
            let at = Category::from(&annotation.at);
            let site = xs.iter().position(|x| *x == at).map_or(MarkerSite::Unplaced, MarkerSite::OnCategory);
            Marker { n: i + 1, at, label: annotation.label.clone(), site }
        })
        .collect();
    let scale = if all.is_empty() {
        Scale::Unreadable
    } else {
        Scale::Readable(nice_domain(all.iter().copied().fold(f64::INFINITY, f64::min), all.iter().copied().fold(f64::NEG_INFINITY, f64::max), chart.kind))
    };
    ChartModel {
        kind: chart.kind,
        unit: chart.unit.clone().filter(|unit| !unit.is_empty()),
        xs,
        series,
        scale,
        markers,
    }
}

/// The glyph a marker wears on the plot: its number, or `*` past nine.
pub fn marker_glyph(n: usize) -> String {
    if n <= 9 {
        n.to_string()
    } else {
        "*".to_string()
    }
}

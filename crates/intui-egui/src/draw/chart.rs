//! Chart: a line or bar plot drawn on egui's painter at the width it is given. Every position comes from
//! `intui-layout` (the scale, the axis numbers, which x labels fit, the marker glyphs); this file only turns them into
//! shapes. A point that is a floor wears a small chevron above it, an estimate is hollow or faded, an unknown one is a
//! cross at the foot of its x, and a gap in the data breaks a line. A chart with no number to plot says so.

use crate::scene::{galley, Scene};
use crate::style::{Dash, FrameRole, SeriesRole, StrokeLook, TextLook, TextRole};
use crate::words;
use egui::{Align2, Color32, Pos2, Rect, Sense, Shape, Stroke, Ui, Vec2, WidgetType};
use intui_layout::{build_model, format_value, marker_glyph, nice_step, place_labels, project, with_unit, Category, ChartModel, Domain, MarkerSite, ModelSeries, Scale};
use intui_text::numbers::js_to_string;
use intui_types::forms::{Chart, ChartKind, ChartSeriesRole};
use intui_types::{Drawn, ReadingKind};

const AXIS_GAP: f32 = 10.0;

fn series_role(role: ChartSeriesRole) -> SeriesRole {
    match role {
        ChartSeriesRole::Primary => SeriesRole::Primary,
        ChartSeriesRole::Baseline => SeriesRole::Baseline,
        ChartSeriesRole::Comparison => SeriesRole::Comparison,
    }
}

fn category_text(category: &Category) -> String {
    match category {
        Category::Number(number) => js_to_string(*number),
        Category::Text(text) => text.clone(),
    }
}

/// Round tick values inside the domain, at least `min_gap` points apart on a plot `height` tall.
fn ticks(domain: Domain, height: f32, min_gap: f32) -> Vec<f64> {
    let room = ((height / min_gap).floor() as f64).max(1.0);
    let step = nice_step((domain.hi - domain.lo) / room);
    let clean = |n: f64| format!("{n:.12e}").parse::<f64>().unwrap_or(n);
    let first = clean(domain.lo / step).ceil() * step;
    let mut found = Vec::new();
    for k in 0.. {
        let value = clean(first + k as f64 * step);
        if value > domain.hi + step * 1e-9 {
            break;
        }
        found.push(value);
    }
    found
}

struct Geometry {
    rect: Rect,
    left: f32,
    right: f32,
    top: f32,
    bottom: f32,
    domain: Domain,
    count: usize,
    bar: bool,
}

impl Geometry {
    fn x_at(&self, index: usize) -> f32 {
        let (left, right) = (self.rect.left() + self.left, self.rect.left() + self.right);
        if self.bar {
            left + (right - left) / self.count as f32 * (index as f32 + 0.5)
        } else if self.count == 1 {
            (left + right) / 2.0
        } else {
            let pad = 10.0;
            left + pad + index as f32 * (right - left - 2.0 * pad) / (self.count as f32 - 1.0)
        }
    }

    fn y_at(&self, value: f64) -> f32 {
        let (top, bottom) = (self.rect.top() + self.top, self.rect.top() + self.bottom);
        bottom - project(value, self.domain, f64::from(bottom - top)) as f32
    }
}

fn faded(color: Color32, by: f32) -> Color32 {
    color.gamma_multiply(by)
}

fn stroke_line(ui: &Ui, points: Vec<Pos2>, look: &StrokeLook) {
    let stroke = Stroke::new(look.width, look.color);
    match look.dash {
        Dash::Solid => {
            ui.painter().add(Shape::line(points, stroke));
        }
        Dash::Dashed => ui.painter().extend(Shape::dashed_line(&points, stroke, 6.0, 4.0)),
    }
}

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, chart: &Chart) {
    let model = build_model(chart);
    let response = ui
        .scope(|ui| {
            ui.spacing_mut().item_spacing.y = 6.0;
            if let Some(title) = chart.title.as_deref().filter(|title| !title.is_empty()) {
                let look = scene.text(TextRole::Strong);
                let text = galley(ui, title, &look, look.color, ui.available_width());
                let (rect, _) = ui.allocate_exact_size(text.size(), Sense::hover());
                ui.painter().galley(rect.min, text, look.color);
            }
            plot(scene, ui, &model);
            legend(scene, ui, &model);
            marker_list(scene, ui, &model);
        })
        .response;
    scene.name(ui, &response, drawn, WidgetType::Label);
}

fn plot(scene: &Scene, ui: &mut Ui, model: &ChartModel) {
    let width = ui.available_width().max(160.0);
    let height = if width < 420.0 { 200.0 } else { 240.0 };
    let (rect, response) = ui.allocate_exact_size(Vec2::new(width, height), Sense::hover());
    let axis = scene.text(TextRole::Caption);
    let line = scene.frame(FrameRole::Box).stroke;
    let Scale::Readable(domain) = model.scale else {
        let text = galley(ui, words::NOTHING_TO_PLOT, &axis, axis.color, width);
        ui.painter().galley(rect.min, text, axis.color);
        return;
    };
    let any_marker = model.markers.iter().any(|marker| matches!(marker.site, MarkerSite::OnCategory(_)));
    let top = if any_marker { 22.0 } else { 10.0 };
    let bottom = height - 26.0;
    let values = ticks(domain, bottom - top, 32.0);
    let label_with = |unit: bool| -> Vec<String> {
        values.iter().map(|value| if unit { with_unit(&format_value(*value), model.unit.as_deref()) } else { format_value(*value) }).collect()
    };
    let measure = |text: &str| galley(ui, text, &axis, axis.color, f32::INFINITY).size().x;
    let mut labels = label_with(true);
    let mut gutter = labels.iter().map(|label| measure(label)).fold(0.0_f32, f32::max) + 10.0;
    let mut unit_caption = None;
    if model.unit.is_some() && gutter > width * 0.3 {
        labels = label_with(false);
        gutter = labels.iter().map(|label| measure(label)).fold(0.0_f32, f32::max) + 10.0;
        unit_caption = model.unit.clone();
    }
    let geometry = Geometry { rect, left: gutter.ceil(), right: width - 4.0, top, bottom, domain, count: model.xs.len(), bar: matches!(model.kind, ChartKind::Bar) };
    let painter = ui.painter();
    let (plot_left, plot_right) = (rect.left() + geometry.left, rect.left() + geometry.right);

    for (value, label) in values.iter().zip(&labels) {
        let y = geometry.y_at(*value);
        painter.hline(plot_left..=plot_right, y, line);
        painter.text(Pos2::new(plot_left - 8.0, y), Align2::RIGHT_CENTER, label, crate::scene::font(&axis), axis.color);
    }
    if domain.lo < 0.0 && domain.hi > 0.0 {
        painter.hline(plot_left..=plot_right, geometry.y_at(0.0), Stroke::new(1.0, faded(axis.color, 0.8)));
    }
    if let Some(unit) = &unit_caption {
        painter.text(rect.min, Align2::LEFT_TOP, unit, crate::scene::font(&axis), axis.color);
    }

    let marker_look = scene.series(SeriesRole::Marker);
    for marker in &model.markers {
        let MarkerSite::OnCategory(index) = marker.site else { continue };
        let x = geometry.x_at(index);
        painter.vline(x, (rect.top() + top)..=(rect.top() + bottom), Stroke::new(1.0, faded(marker_look.color, 0.5)));
        let center = Pos2::new(x, rect.top() + top - 10.0);
        painter.circle(center, 8.0, faded(marker_look.color, 0.18), Stroke::new(1.0, marker_look.color));
        painter.text(center, Align2::CENTER_CENTER, marker_glyph(marker.n), crate::scene::font(&TextLook { size: 11.0, ..axis }), marker_look.color);
    }

    let surface = ui.visuals().panel_fill;
    match model.kind {
        ChartKind::Bar => draw_bars(scene, ui, model, &geometry),
        ChartKind::Line => draw_lines(scene, ui, model, &geometry, surface),
    }
    let painter = ui.painter();
    for (series_index, series) in model.series.iter().enumerate() {
        for index in 0..model.xs.len() {
            if series.kind_at(index) == Some(ReadingKind::Unknown) {
                let x = if geometry.bar { bar_x(&geometry, model, series_index, index) } else { geometry.x_at(index) };
                let (y0, y1) = (rect.top() + bottom - 8.0, rect.top() + bottom - 2.0);
                let cross = Stroke::new(1.5, axis.color);
                painter.line_segment([Pos2::new(x - 4.0, y0), Pos2::new(x + 4.0, y1)], cross);
                painter.line_segment([Pos2::new(x + 4.0, y0), Pos2::new(x - 4.0, y1)], cross);
            }
        }
    }

    painter.hline(plot_left..=plot_right, rect.top() + bottom, line);
    let centers: Vec<f64> = (0..model.xs.len()).map(|index| f64::from(geometry.x_at(index) - rect.left())).collect();
    let texts: Vec<String> = model.xs.iter().map(category_text).collect();
    let widths: Vec<f64> = texts.iter().map(|text| f64::from(measure(text).ceil())).collect();
    for placed in place_labels(&centers, &widths, f64::from(width), f64::from(AXIS_GAP)) {
        painter.text(Pos2::new(rect.left() + placed.start as f32, rect.top() + bottom + 6.0), Align2::LEFT_TOP, &texts[placed.index], crate::scene::font(&axis), axis.color);
    }

    hover(scene, &response, model, &geometry, chart_unit(model));
}

fn chart_unit(model: &ChartModel) -> Option<&str> {
    model.unit.as_deref()
}

fn bar_layout(geometry: &Geometry, model: &ChartModel) -> (f32, f32, f32) {
    let slot = (geometry.right - geometry.left) / geometry.count as f32;
    let count = model.series.len() as f32;
    let group = slot * 0.72;
    let gap = if group / count > 8.0 { 2.0 } else { 0.0 };
    let bar_width = (group / count - gap).max(1.0);
    (group, gap, bar_width)
}

fn bar_x(geometry: &Geometry, model: &ChartModel, series: usize, index: usize) -> f32 {
    let (group, gap, bar_width) = bar_layout(geometry, model);
    geometry.x_at(index) - group / 2.0 + series as f32 * (bar_width + gap) + bar_width / 2.0
}

fn draw_bars(scene: &Scene, ui: &Ui, model: &ChartModel, geometry: &Geometry) {
    let (group, gap, bar_width) = bar_layout(geometry, model);
    let base = geometry.y_at(geometry.domain.lo.max(0.0_f64.min(geometry.domain.hi)));
    for (series_index, series) in model.series.iter().enumerate() {
        let look = scene.series(series_role(series.role));
        let baseline = matches!(series.role, ChartSeriesRole::Baseline);
        for index in 0..model.xs.len() {
            let (Some(value), Some(kind)) = (series.value_at(index), series.kind_at(index)) else { continue };
            let x = geometry.x_at(index) - group / 2.0 + series_index as f32 * (bar_width + gap) + gap / 2.0;
            let y = geometry.y_at(value);
            let rect = Rect::from_min_max(Pos2::new(x, y.min(base)), Pos2::new(x + bar_width, y.max(base).max(y.min(base) + 1.0)));
            let faint = matches!(kind, ReadingKind::Estimate) || baseline;
            let fill = if faint { faded(look.color, 0.4) } else { look.color };
            let stroke = if faint { Stroke::new(1.0, look.color) } else { Stroke::NONE };
            ui.painter().rect(rect, crate::scene::rounding((bar_width / 4.0).min(2.0)), fill, stroke, egui::StrokeKind::Inside);
            if matches!(kind, ReadingKind::AtLeast) {
                chevron(ui, Pos2::new(rect.center().x, rect.top()), look.color);
            }
        }
    }
}

fn chevron(ui: &Ui, at: Pos2, color: Color32) {
    let stroke = Stroke::new(1.5, color);
    ui.painter().add(Shape::line(vec![Pos2::new(at.x - 4.0, at.y - 6.0), Pos2::new(at.x, at.y - 10.0), Pos2::new(at.x + 4.0, at.y - 6.0)], stroke));
}

fn draw_lines(scene: &Scene, ui: &Ui, model: &ChartModel, geometry: &Geometry, surface: Color32) {
    for series in &model.series {
        let look = scene.series(series_role(series.role));
        let primary = matches!(series.role, ChartSeriesRole::Primary);
        let hollow_all = matches!(series.role, ChartSeriesRole::Baseline);
        let radius = if primary { 3.5 } else { 2.5 };
        for run in runs(series, geometry) {
            if run.len() > 1 {
                stroke_line(ui, run.iter().map(|point| point.at).collect(), &look);
            }
            if model.xs.len() <= 24 || run.len() == 1 {
                for point in &run {
                    let hollow = hollow_all || matches!(point.kind, ReadingKind::Estimate);
                    if hollow {
                        ui.painter().circle(point.at, radius, surface, Stroke::new(1.5, look.color));
                    } else {
                        ui.painter().circle_filled(point.at, radius, look.color);
                    }
                    if matches!(point.kind, ReadingKind::AtLeast) {
                        chevron(ui, Pos2::new(point.at.x, point.at.y - radius + 4.0), look.color);
                    }
                }
            }
        }
    }
}

struct Plotted {
    at: Pos2,
    kind: ReadingKind,
}

/// Consecutive points with a number; a missing or unknown point ends a run.
fn runs(series: &ModelSeries, geometry: &Geometry) -> Vec<Vec<Plotted>> {
    let mut runs: Vec<Vec<Plotted>> = vec![Vec::new()];
    for index in 0..geometry.count {
        match (series.value_at(index), series.kind_at(index)) {
            (Some(value), Some(kind)) => runs.last_mut().expect("runs is never empty").push(Plotted { at: Pos2::new(geometry.x_at(index), geometry.y_at(value)), kind }),
            _ => {
                if runs.last().is_some_and(|run| !run.is_empty()) {
                    runs.push(Vec::new());
                }
            }
        }
    }
    runs.retain(|run| !run.is_empty());
    runs
}

/// Under the pointer, the readings at the nearest x, said with their certainty.
fn hover(scene: &Scene, response: &egui::Response, model: &ChartModel, geometry: &Geometry, unit: Option<&str>) {
    let Some(pointer) = response.hover_pos() else { return };
    if model.xs.is_empty() {
        return;
    }
    let nearest = (0..model.xs.len())
        .min_by(|a, b| (geometry.x_at(*a) - pointer.x).abs().total_cmp(&(geometry.x_at(*b) - pointer.x).abs()))
        .expect("a chart has at least one x");
    let mut lines = vec![category_text(&model.xs[nearest])];
    for series in &model.series {
        let said = match series.readings.get(nearest).copied().flatten() {
            Some(reading) => intui_text::reading_text(reading, unit, false),
            None => continue,
        };
        lines.push(format!("{}: {said}", series.label));
    }
    let _ = scene;
    response.clone().on_hover_text_at_pointer(lines.join("\n"));
}

fn legend(scene: &Scene, ui: &mut Ui, model: &ChartModel) {
    let body = scene.text(TextRole::Caption);
    ui.horizontal_wrapped(|ui| {
        ui.spacing_mut().item_spacing.x = 14.0;
        for series in &model.series {
            let look = scene.series(series_role(series.role));
            let name = if matches!(series.role, ChartSeriesRole::Primary) { series.label.clone() } else { format!("{} ({})", series.label, series.role) };
            let text = galley(ui, &name, &body, body.color, f32::INFINITY);
            let (rect, _) = ui.allocate_exact_size(Vec2::new(18.0 + 6.0 + text.size().x, text.size().y.max(12.0)), Sense::hover());
            let mid = rect.center().y;
            if matches!(model.kind, ChartKind::Bar) {
                ui.painter().rect_filled(Rect::from_min_size(Pos2::new(rect.left(), mid - 4.0), Vec2::new(14.0, 8.0)), 1.0, look.color);
            } else {
                stroke_line(ui, vec![Pos2::new(rect.left(), mid), Pos2::new(rect.left() + 16.0, mid)], &look);
            }
            ui.painter().galley(Pos2::new(rect.left() + 24.0, rect.center().y - text.size().y / 2.0), text, body.color);
        }
    });
}

fn marker_list(scene: &Scene, ui: &mut Ui, model: &ChartModel) {
    if model.markers.is_empty() {
        return;
    }
    let body = scene.text(TextRole::Caption);
    let strong = scene.text(TextRole::Strong);
    let marker = scene.series(SeriesRole::Marker);
    for item in &model.markers {
        ui.horizontal(|ui| {
            ui.spacing_mut().item_spacing.x = 6.0;
            let glyph = match item.site {
                MarkerSite::OnCategory(_) => marker_glyph(item.n),
                MarkerSite::Unplaced => "·".to_string(),
            };
            let (rect, _) = ui.allocate_exact_size(Vec2::splat(16.0), Sense::hover());
            ui.painter().circle(rect.center(), 8.0, faded(marker.color, 0.18), Stroke::new(1.0, marker.color));
            ui.painter().text(rect.center(), Align2::CENTER_CENTER, glyph, crate::scene::font(&TextLook { size: 11.0, ..body }), marker.color);
            let at = category_text(&item.at);
            let head = galley(ui, &at, &TextLook { ..strong }, strong.color, f32::INFINITY);
            let (head_rect, _) = ui.allocate_exact_size(head.size(), Sense::hover());
            ui.painter().galley(head_rect.min, head, strong.color);
            let note = match item.site {
                MarkerSite::OnCategory(_) => item.label.clone(),
                MarkerSite::Unplaced => words::unplaced_marker_note(&item.label),
            };
            let tail = galley(ui, &note, &body, body.color, f32::INFINITY);
            let (tail_rect, _) = ui.allocate_exact_size(tail.size(), Sense::hover());
            ui.painter().galley(tail_rect.min, tail, body.color);
        });
    }
}

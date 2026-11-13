//! Chart series: the bars and the lines of a plot, drawn on the painter at the places `Geometry` gives. A bar or point
//! for a floor wears a chevron, an estimate is faded or hollow, and a period that isn't over is hollow, with the last
//! segment of a line dashed. A missing or unknown point ends a run, so a line never crosses a gap.

use super::{faded, series_role, stroke_line, Geometry};
use crate::scene::Scene;
use egui::{Color32, Pos2, Rect, Shape, Stroke, Ui};
use intui_layout::{ChartModel, ModelSeries};
use intui_types::forms::ChartSeriesRole;
use intui_types::ReadingKind;

fn bar_layout(geometry: &Geometry, model: &ChartModel) -> (f32, f32, f32) {
    let slot = (geometry.right - geometry.left) / geometry.count as f32;
    let count = model.series.len() as f32;
    let group = slot * 0.72;
    let gap = if group / count > 8.0 { 2.0 } else { 0.0 };
    let bar_width = (group / count - gap).max(1.0);
    (group, gap, bar_width)
}

pub(super) fn bar_x(geometry: &Geometry, model: &ChartModel, series: usize, index: usize) -> f32 {
    let (group, gap, bar_width) = bar_layout(geometry, model);
    geometry.x_at(index) - group / 2.0 + series as f32 * (bar_width + gap) + bar_width / 2.0
}

pub(super) fn draw_bars(scene: &Scene, ui: &Ui, model: &ChartModel, geometry: &Geometry) {
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
            let partial = series.is_partial(index);
            let faint = matches!(kind, ReadingKind::Estimate) || baseline || partial;
            let fill = if partial { faded(look.color, 0.12) } else if faint { faded(look.color, 0.4) } else { look.color };
            let stroke = if partial { Stroke::new(1.5, look.color) } else if faint { Stroke::new(1.0, look.color) } else { Stroke::NONE };
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

pub(super) fn draw_lines(scene: &Scene, ui: &Ui, model: &ChartModel, geometry: &Geometry, surface: Color32) {
    for series in &model.series {
        let look = scene.series(series_role(series.role));
        let primary = matches!(series.role, ChartSeriesRole::Primary);
        let hollow_all = matches!(series.role, ChartSeriesRole::Baseline);
        let radius = if primary { 3.5 } else { 2.5 };
        for run in runs(series, geometry) {
            if run.len() > 1 {
                // The segment into a period that isn't over is dashed, the rest is solid.
                let into_partial = run.last().is_some_and(|point| point.partial);
                let solid = if into_partial { run.len() - 1 } else { run.len() };
                if solid > 1 {
                    stroke_line(ui, run[..solid].iter().map(|point| point.at).collect(), &look);
                }
                if into_partial {
                    ui.painter().extend(Shape::dashed_line(&[run[solid - 1].at, run[solid].at], Stroke::new(1.5, look.color), 4.0, 3.0));
                }
            }
            if model.xs.len() <= 24 || run.len() == 1 {
                for point in &run {
                    let hollow = hollow_all || point.partial || matches!(point.kind, ReadingKind::Estimate);
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
    partial: bool,
}

/// Consecutive points with a number; a missing or unknown point ends a run.
fn runs(series: &ModelSeries, geometry: &Geometry) -> Vec<Vec<Plotted>> {
    let mut runs: Vec<Vec<Plotted>> = vec![Vec::new()];
    for index in 0..geometry.count {
        match (series.value_at(index), series.kind_at(index)) {
            (Some(value), Some(kind)) => runs.last_mut().expect("runs is never empty").push(Plotted { at: Pos2::new(geometry.x_at(index), geometry.y_at(value)), kind, partial: series.is_partial(index) }),
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

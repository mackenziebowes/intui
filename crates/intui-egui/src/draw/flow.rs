//! Flow: steps as boxes in layers, with arrows between them. The layering comes from `intui-layout` (`analyse`), which also
//! says which links close a loop. Layers run left to right when every one gets room; otherwise the steps stack in
//! one column in layer order. A link an arrow would have to cross boxes for, and every link back, is written in
//! its source box instead, so no arrow ever runs through a step.

use crate::scene::{galley, rounding, Scene};
use crate::style::{FrameRole, TextRole};
use crate::words;
use egui::epaint::{CubicBezierShape, PathStroke};
use egui::{Color32, Galley, Pos2, Rect, Sense, Shape, Stroke, StrokeKind, Ui, Vec2, WidgetType};
use intui_layout::{analyse, Edge};
use intui_types::forms::Flow;
use intui_types::Drawn;
use std::sync::Arc;

const BOX_MIN: f32 = 136.0;
const GUTTER_MIN: f32 = 44.0;
const GUTTER_MAX: f32 = 150.0;
const STACK_GAP: f32 = 12.0;
const ARROW: f32 = 6.0;

struct Placed {
    rect: Rect,
    label: Arc<Galley>,
    detail: Option<Arc<Galley>>,
    notes: Vec<Arc<Galley>>,
}

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, flow: &Flow) {
    let analysis = analyse(flow);
    let frame = scene.frame(FrameRole::Box);
    let strong = scene.text(TextRole::Strong);
    let caption = scene.text(TextRole::Caption);
    let line = scene.series(crate::style::SeriesRole::Baseline).color;
    let width = ui.available_width().max(160.0);
    let steps = flow.steps();
    let label_of = |index: usize| steps.get(index).map_or(String::new(), |step| step.label.clone());
    let suffix = |edge: &Edge| edge.label.as_deref().filter(|label| !label.is_empty()).map(|label| format!(" ({label})")).unwrap_or_default();

    let layers = analysis.layers.len();
    let widest = analysis.edges.iter().filter_map(|edge| edge.label.as_deref()).map(|label| galley(ui, label, &caption, caption.color, f32::INFINITY).size().x).fold(0.0_f32, f32::max);
    let gutter = if widest > 0.0 { (widest + 28.0).clamp(GUTTER_MIN, GUTTER_MAX) } else { GUTTER_MIN };
    let as_row = layers as f32 * BOX_MIN + (layers as f32 - 1.0) * gutter <= width;

    let position_in_list: Vec<usize> = {
        let mut order = vec![0; steps.len()];
        for (place, step) in analysis.layers.iter().flatten().enumerate() {
            order[step.get()] = place;
        }
        order
    };
    let next_layer = |edge: &Edge| analysis.layer_of[edge.to.get()].get() == analysis.layer_of[edge.from.get()].get() + 1;
    let adjacent_in_list = |edge: &Edge| position_in_list[edge.to.get()] == position_in_list[edge.from.get()] + 1;
    let drawn_edges: Vec<&Edge> = analysis.edges.iter().filter(|edge| if as_row { next_layer(edge) } else { adjacent_in_list(edge) }).collect();

    let mut notes: Vec<Vec<String>> = vec![Vec::new(); steps.len()];
    for edge in &analysis.back {
        notes[edge.from.get()].push(format!("{}{}", words::back_to(&label_of(edge.to.get())), suffix(edge)));
    }
    for edge in analysis.edges.iter().filter(|edge| !drawn_edges.iter().any(|kept| std::ptr::eq(*kept, *edge))) {
        notes[edge.from.get()].push(format!("{}{}", words::to_step(&label_of(edge.to.get())), suffix(edge)));
    }

    let box_width = if as_row { ((width - (layers as f32 - 1.0) * gutter) / layers as f32).max(BOX_MIN) } else { width.min(420.0).max(BOX_MIN) };
    let inner = box_width - frame.padding * 2.0;
    let mut placed: Vec<Option<Placed>> = (0..steps.len()).map(|_| None).collect();
    let mut column_heights: Vec<f32> = Vec::new();
    let mut plans: Vec<(usize, Arc<Galley>, Option<Arc<Galley>>, Vec<Arc<Galley>>, f32)> = Vec::new();
    for index in 0..steps.len() {
        let step = steps.get(index).expect("a step index is in range");
        let label = galley(ui, &step.label, &strong, strong.color, inner);
        let detail = step.detail.as_deref().filter(|detail| !detail.is_empty()).map(|detail| galley(ui, detail, &caption, caption.color, inner));
        let step_notes: Vec<Arc<Galley>> = notes[index].iter().map(|note| galley(ui, note, &caption, caption.color, inner)).collect();
        let height = frame.padding * 2.0 + label.size().y + detail.as_ref().map_or(0.0, |d| d.size().y + 2.0) + step_notes.iter().map(|n| n.size().y + 2.0).sum::<f32>();
        plans.push((index, label, detail, step_notes, height));
    }
    let slots: Vec<Vec<usize>> = if as_row { analysis.layers.iter().map(|layer| layer.iter().map(|step| step.get()).collect()).collect() } else { analysis.layers.iter().flatten().map(|step| vec![step.get()]).collect() };
    for slot in &slots {
        column_heights.push(slot.iter().map(|index| plans[*index].4).sum::<f32>() + STACK_GAP * (slot.len() as f32 - 1.0));
    }
    let row_gap = if as_row { 0.0 } else { 28.0 };
    let total_height = if as_row { column_heights.iter().copied().fold(0.0_f32, f32::max) } else { column_heights.iter().sum::<f32>() + row_gap * (slots.len() as f32 - 1.0) };
    let (area, response) = ui.allocate_exact_size(Vec2::new(width, total_height.max(1.0)), Sense::hover());
    let mut cursor_y = area.top();
    for (slot_index, slot) in slots.iter().enumerate() {
        let (x, mut y) = if as_row {
            (area.left() + slot_index as f32 * (box_width + gutter), area.top() + (total_height - column_heights[slot_index]) / 2.0)
        } else {
            (area.left(), cursor_y)
        };
        for index in slot {
            let (_, label, detail, step_notes, height) = &plans[*index];
            placed[*index] = Some(Placed { rect: Rect::from_min_size(Pos2::new(x, y), Vec2::new(box_width, *height)), label: label.clone(), detail: detail.clone(), notes: step_notes.clone() });
            y += height + STACK_GAP;
        }
        cursor_y += column_heights[slot_index] + row_gap;
    }

    let painter = ui.painter();
    for step in placed.iter().flatten() {
        painter.rect(step.rect, rounding(frame.rounding), frame.fill, frame.stroke, StrokeKind::Inside);
        let mut at = step.rect.min + Vec2::splat(frame.padding);
        painter.galley(at, step.label.clone(), strong.color);
        at.y += step.label.size().y + 2.0;
        if let Some(detail) = &step.detail {
            painter.galley(at, detail.clone(), caption.color);
            at.y += detail.size().y + 2.0;
        }
        for note in &step.notes {
            painter.galley(at, note.clone(), caption.color);
            at.y += note.size().y + 2.0;
        }
    }
    for edge in drawn_edges {
        let (Some(from), Some(to)) = (placed[edge.from.get()].as_ref(), placed[edge.to.get()].as_ref()) else { continue };
        let (points, tip, direction) = if as_row {
            let start = Pos2::new(from.rect.right(), from.rect.center().y);
            let end = Pos2::new(to.rect.left() - ARROW, to.rect.center().y);
            let bend = ((end.x - start.x) / 2.0).max(12.0);
            ([start, Pos2::new(start.x + bend, start.y), Pos2::new(end.x - bend, end.y), end], Pos2::new(to.rect.left(), end.y), Vec2::new(1.0, 0.0))
        } else {
            let start = Pos2::new(from.rect.center().x, from.rect.bottom());
            let end = Pos2::new(to.rect.center().x, to.rect.top() - ARROW);
            let bend = ((end.y - start.y) / 2.0).max(10.0);
            ([start, Pos2::new(start.x, start.y + bend), Pos2::new(end.x, end.y - bend), end], Pos2::new(end.x, to.rect.top()), Vec2::new(0.0, 1.0))
        };
        painter.add(Shape::CubicBezier(CubicBezierShape::from_points_stroke(points, false, Color32::TRANSPARENT, PathStroke::new(1.5, line))));
        let side = Vec2::new(-direction.y, direction.x);
        painter.add(Shape::convex_polygon(vec![tip, tip - direction * ARROW + side * 3.5, tip - direction * ARROW - side * 3.5], line, Stroke::NONE));
        if let Some(label) = edge.label.as_deref().filter(|label| !label.is_empty()) {
            let text = galley(ui, label, &caption, caption.color, f32::INFINITY);
            let mid = Pos2::new((points[0].x + points[3].x) / 2.0, (points[0].y + points[3].y) / 2.0);
            let at = if as_row { Pos2::new(mid.x - text.size().x / 2.0, mid.y - text.size().y - 3.0) } else { Pos2::new(mid.x + 8.0, mid.y - text.size().y / 2.0) };
            painter.galley(at, text, caption.color);
        }
    }
    scene.name(ui, &response, drawn, WidgetType::Label);
}

//! Flow: steps as boxes in layers, with arrows between them. The layering comes from `intui-layout` (`analyse`), which also
//! says which links close a loop. Layers run left to right when every one gets room; otherwise the steps stack in one
//! column in layer order. A link back is an arrow in a lane beside the boxes (below a row, right of a stack) when
//! `plan_back` gives it one, and every label is placed on a free spot at least 8 px from every line. A link an arrow
//! would have to cross boxes for, and a link back with no lane, is written in its source box instead, so no arrow ever
//! runs through a step.

mod lines;

use crate::scene::{galley, rounding, Scene};
use crate::style::{FrameRole, TextRole};
use crate::words;
use lines::rounded;
use egui::epaint::{CubicBezierShape, PathStroke};
use egui::{Color32, Galley, Pos2, Rect, Sense, Shape, Stroke, StrokeKind, Ui, Vec2, WidgetType};
use intui_layout::{
    analyse, back_geometry, connector, place_flow_labels, plan_back, side_extent, Anchor, BackGeometry, BackPlan, BackRoom, Connector, Edge, LabelRequest, Order, PlacedFlowLabel, Point,
    BACK_LABEL_W, LABEL_LINE_H, LANE_PITCH,
};
use intui_types::forms::Flow;
use intui_types::Drawn;
use std::sync::Arc;

const BOX_MIN: f32 = 136.0;
const GUTTER_MIN: f32 = 44.0;
const GUTTER_MAX: f32 = 150.0;
const STACK_GAP: f32 = 12.0;
const ARROW: f32 = 6.0;
/// Most lanes below a row, and beside a stack; a stack is the narrow case, so it gets two.
const ROW_LANES: usize = 4;
const STACK_LANES: usize = 2;
/// A stack narrower than this writes every link back as text.
const STACK_LANE_MIN: f32 = 320.0;
/// Room left and right of an arrow label inside its gutter.
const LABEL_PAD: f32 = 28.0;
/// A stack's labels need a gap that grows by this much, up to the cap, while one has no free spot.
const EXTRA_GAP_STEP: f32 = 14.0;
const EXTRA_GAP_MAX: f32 = 56.0;

struct Placed {
    rect: Rect,
    label: Arc<Galley>,
    detail: Option<Arc<Galley>>,
    notes: Vec<Arc<Galley>>,
}

/// Everything about where things sit at one gap between stacked boxes, relative to the flow's top left.
struct Laid {
    rects: Vec<Rect>,
    height: f32,
    back: BackGeometry,
    curves: Vec<(usize, Connector)>,
    labels: Vec<PlacedFlowLabel>,
    crowded: usize,
}

fn rect_of(rect: Rect) -> intui_layout::Rect {
    intui_layout::Rect { left: rect.left() as f64, top: rect.top() as f64, width: rect.width() as f64, height: rect.height() as f64 }
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
    let measure = |text: &str| galley(ui, text, &caption, caption.color, f32::INFINITY).size().x as f64;

    let layers = analysis.layers.len();
    let widest = analysis.edges.iter().filter_map(|edge| edge.label.as_deref()).map(|label| measure(label) as f32).fold(0.0_f32, f32::max);
    let longest_word = analysis.edges.iter().filter_map(|edge| edge.label.as_deref()).flat_map(str::split_whitespace).map(|word| measure(word) as f32).fold(0.0_f32, f32::max);
    // The gutter fits the widest label on one line, within bounds; a wider one wraps, so it only has to fit its longest word.
    let gutter = (if widest > 0.0 { (widest + LABEL_PAD).clamp(GUTTER_MIN, GUTTER_MAX) } else { GUTTER_MIN }).max(if longest_word > 0.0 { longest_word + LABEL_PAD } else { 0.0 });
    let as_row = layers as f32 * BOX_MIN + (layers as f32 - 1.0) * gutter <= width;

    let widest_back = analysis.back.iter().filter_map(|edge| edge.label.as_deref()).map(|label| BACK_LABEL_W.min(measure(label))).fold(0.0, f64::max);
    let back: BackPlan = plan_back(
        &analysis,
        &if as_row {
            BackRoom { lane_pitch: LANE_PITCH, label_room: 0.0, available: f64::INFINITY, max_lanes: Some(ROW_LANES), order: Order::Layers }
        } else {
            BackRoom {
                lane_pitch: LANE_PITCH,
                label_room: widest_back + 8.0,
                available: if width < STACK_LANE_MIN { 0.0 } else { (width - BOX_MIN) as f64 },
                max_lanes: Some(STACK_LANES),
                order: Order::Flat,
            }
        },
    );
    // Lanes and their labels take room to the right of a stack, known before any box is placed.
    let side = if as_row { 0.0 } else { side_extent(&back, &measure) as f32 };

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
    for edge in &back.noted {
        notes[edge.from.get()].push(format!("{}{}", words::back_to(&label_of(edge.to.get())), suffix(edge)));
    }
    for edge in analysis.edges.iter().filter(|edge| !drawn_edges.iter().any(|kept| std::ptr::eq(*kept, *edge))) {
        notes[edge.from.get()].push(format!("{}{}", words::to_step(&label_of(edge.to.get())), suffix(edge)));
    }

    let box_width = if as_row { ((width - (layers as f32 - 1.0) * gutter) / layers as f32).max(BOX_MIN) } else { (width - side).min(420.0).max(BOX_MIN) };
    let inner = box_width - frame.padding * 2.0;
    let mut plans: Vec<(Arc<Galley>, Option<Arc<Galley>>, Vec<Arc<Galley>>, f32)> = Vec::new();
    for index in 0..steps.len() {
        let step = steps.get(index).expect("a step index is in range");
        let label = galley(ui, &step.label, &strong, strong.color, inner);
        let detail = step.detail.as_deref().filter(|detail| !detail.is_empty()).map(|detail| galley(ui, detail, &caption, caption.color, inner));
        let step_notes: Vec<Arc<Galley>> = notes[index].iter().map(|note| galley(ui, note, &caption, caption.color, inner)).collect();
        let height = frame.padding * 2.0 + label.size().y + detail.as_ref().map_or(0.0, |d| d.size().y + 2.0) + step_notes.iter().map(|n| n.size().y + 2.0).sum::<f32>();
        plans.push((label, detail, step_notes, height));
    }
    let slots: Vec<Vec<usize>> = if as_row { analysis.layers.iter().map(|layer| layer.iter().map(|step| step.get()).collect()).collect() } else { analysis.layers.iter().flatten().map(|step| vec![step.get()]).collect() };
    let column_heights: Vec<f32> = slots.iter().map(|slot| slot.iter().map(|index| plans[*index].3).sum::<f32>() + STACK_GAP * (slot.len() as f32 - 1.0)).collect();
    // In a row a label must fit its gutter, so it wraps; stacked, it has the width of the flow.
    let label_room = if as_row { (gutter - LABEL_PAD + 8.0).max(1.0) as f64 } else { ((width / 2.0).max(120.0)) as f64 };

    let lay = |extra: f32| -> Laid {
        let row_gap = if as_row { 0.0 } else { 28.0 + extra };
        let boxes_height = if as_row { column_heights.iter().copied().fold(0.0_f32, f32::max) } else { column_heights.iter().sum::<f32>() + row_gap * (slots.len() as f32 - 1.0) };
        let mut rects = vec![Rect::NOTHING; steps.len()];
        let mut cursor_y = 0.0;
        for (slot_index, slot) in slots.iter().enumerate() {
            let (x, mut y) = if as_row { (slot_index as f32 * (box_width + gutter), (boxes_height - column_heights[slot_index]) / 2.0) } else { (0.0, cursor_y) };
            for index in slot {
                rects[*index] = Rect::from_min_size(Pos2::new(x, y), Vec2::new(box_width, plans[*index].3));
                y += plans[*index].3 + STACK_GAP;
            }
            cursor_y += column_heights[slot_index] + row_gap;
        }
        let box_rects: Vec<intui_layout::Rect> = rects.iter().copied().map(rect_of).collect();
        let geometry = back_geometry(&back, &box_rects, as_row, &measure, ARROW as f64);
        let curves: Vec<(usize, Connector)> = drawn_edges.iter().enumerate().map(|(k, edge)| (k, connector(box_rects[edge.from.get()], box_rects[edge.to.get()], as_row, ARROW as f64))).collect();
        let lines: Vec<Point> = curves.iter().flat_map(|(_, curve)| (0..=160).map(|k| curve.at(k as f64 / 160.0))).chain(geometry.routes.iter().flat_map(|route| route.points.iter().copied())).collect();
        let taken: Vec<intui_layout::Rect> = geometry.routes.iter().filter_map(|route| route.label.as_ref().map(|label| label.rect)).collect();
        let labelled: Vec<(String, Connector)> = curves.iter().filter_map(|(k, curve)| drawn_edges[*k].label.as_deref().filter(|label| !label.is_empty()).map(|label| (label.to_string(), *curve))).collect();
        let (labels, crowded) = place_flow_labels(&LabelRequest { labels: &labelled, row: as_row, boxes: &box_rects, lines: &lines, taken: &taken, width: width as f64, room: label_room, measure: &measure });
        let height = boxes_height + if as_row { geometry.extent as f32 } else { 0.0 };
        Laid { rects, height, back: geometry, curves, labels, crowded }
    };
    // Stacked boxes sit further apart when a label cannot find a free spot in the gap.
    let mut extra = 0.0;
    let mut laid = lay(extra);
    while laid.crowded > 0 && !as_row && extra < EXTRA_GAP_MAX {
        extra += EXTRA_GAP_STEP;
        laid = lay(extra);
    }

    let (area, response) = ui.allocate_exact_size(Vec2::new(width, laid.height.max(1.0)), Sense::hover());
    let at = |point: Point| Pos2::new(area.left() + point.x as f32, area.top() + point.y as f32);
    let placed: Vec<Placed> = (0..steps.len())
        .map(|index| {
            let (label, detail, step_notes, _) = &plans[index];
            Placed { rect: laid.rects[index].translate(area.min.to_vec2()), label: label.clone(), detail: detail.clone(), notes: step_notes.clone() }
        })
        .collect();

    let painter = ui.painter();
    for step in &placed {
        painter.rect(step.rect, rounding(frame.rounding), frame.fill, frame.stroke, StrokeKind::Inside);
        let mut cursor = step.rect.min + Vec2::splat(frame.padding);
        painter.galley(cursor, step.label.clone(), strong.color);
        cursor.y += step.label.size().y + 2.0;
        if let Some(detail) = &step.detail {
            painter.galley(cursor, detail.clone(), caption.color);
            cursor.y += detail.size().y + 2.0;
        }
        for note in &step.notes {
            painter.galley(cursor, note.clone(), caption.color);
            cursor.y += note.size().y + 2.0;
        }
    }
    let head = |tip: Pos2, direction: Vec2| {
        let side = Vec2::new(-direction.y, direction.x);
        Shape::convex_polygon(vec![tip, tip - direction * ARROW + side * 3.5, tip - direction * ARROW - side * 3.5], line, Stroke::NONE)
    };
    let text = |lines: &[String], x: f64, y: f64, anchor: Anchor| {
        for (k, text) in lines.iter().enumerate() {
            let galley = galley(ui, text, &caption, caption.color, f32::INFINITY);
            let left = match anchor {
                Anchor::Start => x as f32,
                Anchor::Middle => x as f32 - galley.size().x / 2.0,
                Anchor::End => x as f32 - galley.size().x,
            };
            let top = y as f32 + k as f32 * LABEL_LINE_H as f32 - galley.size().y / 2.0;
            painter.galley(Pos2::new(area.left() + left, area.top() + top), galley, caption.color);
        }
    };
    for (_, curve) in &laid.curves {
        let points = curve.points.map(at);
        painter.add(Shape::CubicBezier(CubicBezierShape::from_points_stroke(points, false, Color32::TRANSPARENT, PathStroke::new(1.5, line))));
        painter.add(head(Pos2::new(points[3].x + if as_row { ARROW } else { 0.0 }, points[3].y + if as_row { 0.0 } else { ARROW }), if as_row { Vec2::new(1.0, 0.0) } else { Vec2::new(0.0, 1.0) }));
    }
    for route in &laid.back.routes {
        let corners: Vec<Pos2> = route.corners.iter().copied().map(at).collect();
        let base = *corners.last().expect("a route has corners");
        let direction = if as_row { Vec2::new(0.0, -1.0) } else { Vec2::new(-1.0, 0.0) };
        // The line stops at the arrowhead's base; the head's tip meets the box.
        painter.add(Shape::line(rounded(&corners), Stroke::new(1.5, line)));
        painter.add(head(base + direction * ARROW, direction));
        if let Some(label) = &route.label {
            if let Some((from, to)) = label.leader {
                painter.extend(Shape::dashed_line(&[at(from), at(to)], Stroke::new(1.0, line.gamma_multiply(0.6)), 2.0, 3.0));
            }
            text(&label.lines, label.x, label.y, label.anchor);
        }
    }
    for label in &laid.labels {
        text(&label.lines, label.x, label.y, label.anchor);
    }
    scene.name(ui, &response, drawn, WidgetType::Label);
}

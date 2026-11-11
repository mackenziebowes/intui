//! Where the lines and labels of a Flow go, ported from `packages/web/src/{flow-layout,flow-back}.ts`:
//! the curve between two boxes, and the lanes of the back edges with their labels beyond every lane. The forward
//! labels are in `flow_labels`. Pure numbers in the drawer's own units; the text measure is the drawer's.

use crate::flow_back::{wrap_label, BackPlan, BackSlot, Route};
use intui_types::forms::StepIndex;

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Rect {
    pub left: f64,
    pub top: f64,
    pub width: f64,
    pub height: f64,
}

/// Distance between lanes, and the width a back label wraps to beside them.
pub const LANE_PITCH: f64 = 14.0;
pub const BACK_LABEL_W: f64 = 110.0;
/// Gap from a line to the label beside it, and between stacked labels.
pub const LABEL_GAP: f64 = 8.0;
pub const LABEL_STACK_GAP: f64 = 4.0;
/// Lines of a wrapped label are this far apart.
pub const LABEL_LINE_H: f64 = 14.0;
/// How far the first lane sits from the boxes.
const LANE_BASE: f64 = 12.0;
/// Clear space between a label and every line, its own connector and the back lanes alike.
pub(crate) const LINE_CLEAR: f64 = 8.0;
/// The text's ink inside its line boxes: a 12px label is about 9px tall in a 14px line, so lines are kept clear of that.
pub(crate) const INK_TRIM: f64 = 2.5;

/// The curve from one box to another: out of the source's right side into the target's left in a row, out of its
/// bottom into the target's top in a stack. `end` stops short of the box by the arrowhead's length.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Connector {
    pub points: [Point; 4],
}

impl Connector {
    /// The point a fraction `t` along the curve.
    pub fn at(&self, t: f64) -> Point {
        let [a, b, c, e] = self.points;
        let u = 1.0 - t;
        Point {
            x: u * u * u * a.x + 3.0 * u * u * t * b.x + 3.0 * u * t * t * c.x + t * t * t * e.x,
            y: u * u * u * a.y + 3.0 * u * u * t * b.y + 3.0 * u * t * t * c.y + t * t * t * e.y,
        }
    }
}

pub fn connector(from: Rect, to: Rect, row: bool, arrow: f64) -> Connector {
    if row {
        let s = Point { x: from.left + from.width, y: from.top + from.height / 2.0 };
        let e = Point { x: to.left - arrow, y: to.top + to.height / 2.0 };
        let bend = ((e.x - s.x) / 2.0).max(12.0);
        Connector { points: [s, Point { x: s.x + bend, y: s.y }, Point { x: e.x - bend, y: e.y }, e] }
    } else {
        let s = Point { x: from.left + from.width / 2.0, y: from.top + from.height };
        let e = Point { x: to.left + to.width / 2.0, y: to.top - arrow };
        let bend = ((e.y - s.y) / 2.0).max(10.0);
        Connector { points: [s, Point { x: s.x, y: s.y + bend }, Point { x: e.x, y: e.y - bend }, e] }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Anchor {
    Start,
    Middle,
    End,
}

/// A back label placed beside the lanes.
#[derive(Clone, Debug, PartialEq)]
pub struct PlacedBackLabel {
    pub lines: Vec<String>,
    /// Left edge of the text block, or its centre when `anchor` is middle.
    pub x: f64,
    /// Centre of the first line.
    pub y: f64,
    pub anchor: Anchor,
    pub rect: Rect,
    /// A dotted line from the route's lane to the label, when other lanes lie between.
    pub leader: Option<(Point, Point)>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct PlacedRoute {
    /// The corners of the line, from the source box to just short of the target.
    pub corners: Vec<Point>,
    /// Points along the line and its leader, close enough to test a rect against.
    pub points: Vec<Point>,
    pub label: Option<PlacedBackLabel>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct BackGeometry {
    pub routes: Vec<PlacedRoute>,
    /// Room the lanes and labels need beyond the boxes: to the right in a stack, below in a row.
    pub extent: f64,
}

/// The room lanes and a label column take to the right of the boxes in a stack, known before any box is placed.
pub fn side_extent(back: &BackPlan, measure: &dyn Fn(&str) -> f64) -> f64 {
    if back.routes.is_empty() {
        return 0.0;
    }
    let widest = back.routes.iter().map(|r| r.label.as_deref().map_or(0.0, |label| BACK_LABEL_W.min(measure(label)))).fold(0.0, f64::max);
    LANE_BASE + (back.lanes as f64 - 1.0) * LANE_PITCH + if widest > 0.0 { LABEL_GAP + widest } else { 0.0 } + 2.0
}

/// Points along the straight pieces between `corners`, a few units apart.
pub(crate) fn densify(corners: &[Point], step: f64) -> Vec<Point> {
    let mut out = Vec::new();
    for pair in corners.windows(2) {
        let (a, b) = (pair[0], pair[1]);
        let n = (((b.x - a.x).hypot(b.y - a.y) / step).ceil()).max(1.0) as usize;
        for k in 0..=n {
            let f = k as f64 / n as f64;
            out.push(Point { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f });
        }
    }
    out
}

/// The lines and labels of the back edges, placed on the boxes. Lanes run to the right of the boxes in a stack,
/// below them in a row. A label is placed by construction beyond every lane, so no label meets a line; labels that
/// would meet each other are pushed apart.
pub fn back_geometry(back: &BackPlan, boxes: &[Rect], row: bool, measure: &dyn Fn(&str) -> f64, arrow: f64) -> BackGeometry {
    if back.routes.is_empty() {
        return BackGeometry { routes: Vec::new(), extent: 0.0 };
    }
    // Along the flow is x in a row and y otherwise; across it is the other way round.
    let along = |b: &Rect| if row { (b.left, b.width) } else { (b.top, b.height) };
    let across = |b: &Rect| if row { (b.top, b.height) } else { (b.left, b.width) };
    let step = |i: StepIndex| &boxes[i.get()];
    let base = back.routes.iter().flat_map(|r| [r.from, r.to]).map(|i| across(step(i)).0 + across(step(i)).1).fold(f64::NEG_INFINITY, f64::max) + LANE_BASE;
    let lane_at = |route: &Route| base + route.lane as f64 * LANE_PITCH;
    let point = |a: f64, c: f64| if row { Point { x: a, y: c } } else { Point { x: c, y: a } };
    let slot_at = |i: StepIndex, slot: BackSlot| along(step(i)).0 + along(step(i)).1 * (slot.index as f64 + 1.0) / (slot.of as f64 + 1.0);
    let edge_at = |i: StepIndex| across(step(i)).0 + across(step(i)).1;
    let lanes_end = base + (back.lanes as f64 - 1.0) * LANE_PITCH;

    struct Placed<'a> {
        route: &'a Route,
        corners: Vec<Point>,
        points: Vec<Point>,
        a0: f64,
        a1: f64,
        lane: f64,
    }
    let placed: Vec<Placed> = back
        .routes
        .iter()
        .map(|route| {
            let (a0, a1) = (slot_at(route.from, route.from_slot), slot_at(route.to, route.to_slot));
            let lane = lane_at(route);
            let corners = vec![point(a0, edge_at(route.from)), point(a0, lane), point(a1, lane), point(a1, edge_at(route.to) + arrow)];
            let points = densify(&corners, 3.0);
            Placed { route, corners, points, a0, a1, lane }
        })
        .collect();

    // Labels, in order along the flow so stacking is stable.
    let mut labelled: Vec<usize> = (0..placed.len()).filter(|&k| placed[k].route.label.is_some()).collect();
    labelled.sort_by(|&p, &q| ((placed[p].a0 + placed[p].a1) / 2.0).partial_cmp(&((placed[q].a0 + placed[q].a1) / 2.0)).expect("positions are numbers"));
    let mut labels: Vec<Option<PlacedBackLabel>> = vec![None; placed.len()];
    let extent;
    if !row {
        let x = lanes_end + LABEL_GAP;
        let mut floor = f64::NEG_INFINITY;
        let mut widest: f64 = 0.0;
        for &k in &labelled {
            let p = &placed[k];
            let lines = wrap_label(p.route.label.as_deref().expect("labelled"), BACK_LABEL_W, measure);
            let height = lines.len() as f64 * LABEL_LINE_H;
            let mid = (p.a0 + p.a1) / 2.0;
            let top = (mid - height / 2.0).max(floor);
            floor = top + height + LABEL_STACK_GAP;
            let line_widest = lines.iter().map(|line| measure(line)).fold(0.0, f64::max);
            widest = widest.max(line_widest);
            let y = top + LABEL_LINE_H / 2.0;
            let leader = (p.route.lane + 1 < back.lanes).then(|| {
                (Point { x: p.lane, y: y.max(p.a0.min(p.a1)).min(p.a0.max(p.a1)) }, Point { x: x - 3.0, y })
            });
            labels[k] = Some(PlacedBackLabel { rect: Rect { left: x, top, width: line_widest, height }, lines, x, y, anchor: Anchor::Start, leader });
        }
        extent = lanes_end - base + LANE_BASE + if widest > 0.0 { LABEL_GAP + widest } else { 0.0 };
    } else {
        let row_top = lanes_end + LABEL_GAP;
        let mut rows: Vec<(f64, f64)> = Vec::new(); // (right, height)
        let mut used: f64 = 0.0;
        for &k in &labelled {
            let p = &placed[k];
            let run = (p.a0 - p.a1).abs();
            let lines = wrap_label(p.route.label.as_deref().expect("labelled"), 160f64.min(80f64.max(run - 8.0)), measure);
            let width = lines.iter().map(|line| measure(line)).fold(0.0, f64::max);
            let mid = (p.a0 + p.a1) / 2.0;
            let left = mid - width / 2.0;
            let r = match rows.iter().position(|row| row.0 + LABEL_STACK_GAP <= left) {
                Some(r) => r,
                None => {
                    rows.push((f64::NEG_INFINITY, 0.0));
                    rows.len() - 1
                }
            };
            rows[r].0 = left + width;
            rows[r].1 = rows[r].1.max(lines.len() as f64 * LABEL_LINE_H);
            let top = row_top + rows[..r].iter().map(|row| row.1 + LABEL_STACK_GAP).sum::<f64>();
            used = used.max(top + rows[r].1 - row_top);
            let y = top + LABEL_LINE_H / 2.0;
            let height = lines.len() as f64 * LABEL_LINE_H;
            let leader = (p.route.lane + 1 < back.lanes).then(|| (Point { x: mid, y: p.lane }, Point { x: mid, y: top - 3.0 }));
            labels[k] = Some(PlacedBackLabel { lines, rect: Rect { left, top, width, height }, x: mid, y, anchor: Anchor::Middle, leader });
        }
        extent = lanes_end - base + LANE_BASE + if used > 0.0 { LABEL_GAP + used } else { 0.0 };
    }
    let routes = placed
        .into_iter()
        .zip(labels)
        .map(|(p, label)| {
            let mut points = p.points;
            if let Some((from, to)) = label.as_ref().and_then(|l| l.leader) {
                points.extend(densify(&[from, to], 3.0));
            }
            PlacedRoute { corners: p.corners, points, label }
        })
        .collect();
    BackGeometry { routes, extent }
}

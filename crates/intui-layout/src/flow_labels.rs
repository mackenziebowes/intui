//! Where the forward labels of a Flow go, ported from `packages/web/src/flow-labels.ts`: beside their curve, on a free
//! spot found by search, so no label meets a line, a box, another label or the edge of the canvas. Pure numbers in the
//! drawer's own units; the text measure is the drawer's.

use crate::flow_geometry::*;

/// A forward label's place: its lines, the rect they fill, and where the first line is drawn from.
#[derive(Clone, Debug, PartialEq)]
pub struct PlacedFlowLabel {
    pub lines: Vec<String>,
    pub rect: Rect,
    pub x: f64,
    pub y: f64,
    pub anchor: Anchor,
}

fn ink(r: Rect) -> Rect {
    Rect { left: r.left, width: r.width, top: r.top + INK_TRIM, height: r.height - 2.0 * INK_TRIM }
}

fn hits(a: Rect, b: Rect, pad: f64) -> bool {
    a.left < b.left + b.width + pad && b.left < a.left + a.width + pad && a.top < b.top + b.height + pad && b.top < a.top + a.height + pad
}

/// How far the nearest line point is from a rect, 0 when one is inside it.
fn clearance(points: &[Point], r: Rect) -> f64 {
    points.iter().fold(f64::INFINITY, |least, p| least.min((r.left - p.x).max(0.0).max(p.x - r.left - r.width).hypot((r.top - p.y).max(0.0).max(p.y - r.top - r.height))))
}

/// What `place_flow_labels` is asked: the labels with their curves, the boxes, every line already drawn, and the room.
pub struct LabelRequest<'a> {
    pub labels: &'a [(String, Connector)],
    pub row: bool,
    pub boxes: &'a [Rect],
    /// Points of every line already drawn: all the curves and the back lanes.
    pub lines: &'a [Point],
    /// Rects already taken, such as back labels.
    pub taken: &'a [Rect],
    /// The canvas's drawable width.
    pub width: f64,
    /// Widest a label may be.
    pub room: f64,
    pub measure: &'a dyn Fn(&str) -> f64,
}

/// Places each forward label beside its curve, on a free spot found by search, so no label meets a line, a box,
/// another label or the edge of the canvas. Candidates run along the curve (middle first, then nearer each end), to
/// the side of it (right, then left in a stack; above, then below in a row), and from the full width down to a
/// narrow one. If nothing keeps clear of the lines the roomiest spot is used, and `crowded` counts those labels.
pub fn place_flow_labels(request: &LabelRequest) -> (Vec<PlacedFlowLabel>, usize) {
    let mut taken: Vec<Rect> = request.taken.to_vec();
    let mut crowded = 0;
    let mut placed = Vec::new();
    for (text, curve) in request.labels {
        let clear = |rect: Rect, taken: &[Rect]| {
            rect.left >= 0.0 && rect.left + rect.width <= request.width && !request.boxes.iter().any(|b| hits(rect, *b, 3.0)) && !taken.iter().any(|t| hits(rect, *t, 3.0))
        };
        let mut widths: Vec<f64> = Vec::new();
        for w in [request.room, request.room.min(100.0), request.room.min(70.0)] {
            if !widths.contains(&w) {
                widths.push(w);
            }
        }
        let mut first: Option<PlacedFlowLabel> = None;
        // The spot that kept furthest from the lines, for when none keeps `LINE_CLEAR`.
        let mut roomiest: Option<(PlacedFlowLabel, f64)> = None;
        let mut chosen: Option<PlacedFlowLabel> = None;
        'search: for t in [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8, 0.1, 0.9] {
            let (p, before, after) = (curve.at(t), curve.at((t - 0.02f64).max(0.0)), curve.at((t + 0.02f64).min(1.0)));
            let len = (after.x - before.x).hypot(after.y - before.y);
            let len = if len == 0.0 { 1.0 } else { len };
            // The curve's normal, pointing right in a stack and up in a row, then the other way.
            let n0 = Point { x: -(after.y - before.y) / len, y: (after.x - before.x) / len };
            let n = if (if request.row { n0.y > 0.0 } else { n0.x < 0.0 }) { Point { x: -n0.x, y: -n0.y } } else { n0 };
            // Nearest first; if that spot is crowded, stand further off the curve.
            for side in [1.0, -1.0] {
                for extra in [0.0, 6.0, 14.0] {
                    for &w in &widths {
                        let text = wrap_label(text, w, request.measure);
                        let bw = text.iter().map(|line| (request.measure)(line)).fold(f64::NEG_INFINITY, f64::max);
                        let bh = text.len() as f64 * LABEL_LINE_H;
                        // Far enough along the normal that the block's near edge is `LABEL_GAP` from the curve.
                        let away = LABEL_GAP + extra + n.x.abs() * (bw / 2.0) + n.y.abs() * (bh / 2.0);
                        let centre = Point { x: p.x + side * n.x * away, y: p.y + side * n.y * away };
                        let rect = Rect { left: centre.x - bw / 2.0, top: centre.y - bh / 2.0, width: bw, height: bh };
                        let sideways = n.x.abs() > 0.9;
                        let result = PlacedFlowLabel {
                            lines: text,
                            rect,
                            x: if sideways { if side * n.x > 0.0 { rect.left } else { rect.left + bw } } else { centre.x },
                            y: rect.top + LABEL_LINE_H / 2.0,
                            anchor: if sideways { if side * n.x > 0.0 { Anchor::Start } else { Anchor::End } } else { Anchor::Middle },
                        };
                        if first.is_none() {
                            first = Some(result.clone());
                        }
                        if !clear(rect, &taken) {
                            continue;
                        }
                        let gap = clearance(request.lines, ink(rect));
                        if gap >= LINE_CLEAR {
                            chosen = Some(result);
                            break 'search;
                        }
                        if roomiest.as_ref().map_or(true, |(_, best)| gap > *best) {
                            roomiest = Some((result, gap));
                        }
                    }
                }
            }
        }
        let result = match chosen {
            Some(result) => result,
            None => {
                crowded += 1;
                roomiest.map(|(result, _)| result).or(first).expect("the search always makes a first candidate")
            }
        };
        taken.push(result.rect);
        placed.push(result);
    }
    (placed, crowded)
}

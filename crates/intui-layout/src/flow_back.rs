//! The back edges of a Flow, ported from `planBack` and `wrapLabel` in `packages/layout` and
//! `packages/web`: which back edges get a lane and which lane, where each meets its box, and how an
//! arrow label breaks into lines. Pure numbers in the drawer's own units.

use crate::flow_analysis::{Analysis, Edge};
use intui_types::forms::StepIndex;

/// Where a route meets a box's side: the `index`th of `of` places along that side, so routes never share a point.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct BackSlot {
    pub index: usize,
    pub of: usize,
}

/// A back edge drawn as an arrow in a lane.
#[derive(Clone, Debug, PartialEq)]
pub struct Route {
    pub from: StepIndex,
    pub to: StepIndex,
    pub label: Option<String>,
    /// 0 is the lane nearest the boxes.
    pub lane: usize,
    pub from_slot: BackSlot,
    pub to_slot: BackSlot,
}

#[derive(Clone, Debug, PartialEq)]
pub struct BackPlan {
    /// Back edges drawn as arrows.
    pub routes: Vec<Route>,
    /// Back edges that did not get a lane (not at the edge of their layer, or no room); the drawer writes them as text.
    pub noted: Vec<Edge>,
    /// Lanes used.
    pub lanes: usize,
    /// Pairs of routes whose spans partly overlap, so their lines must cross once. Reported, never hidden.
    pub crossings: usize,
}

/// How spans are measured: in layers, or in lines when every step is its own line.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Order {
    /// A route needs both ends last in their layer, and its span is in layers.
    Layers,
    /// Every step is its own line, and its span is in lines.
    Flat,
}

/// What the drawer can spare for lanes, in its own units (pixels or cells).
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct BackRoom {
    /// Distance between lanes.
    pub lane_pitch: f64,
    /// Width a label beside the lanes needs.
    pub label_room: f64,
    /// Space beyond the boxes that lanes and labels may use (infinite for no limit).
    pub available: f64,
    /// Most lanes drawn; routes past it fall back to notes.
    pub max_lanes: Option<usize>,
    pub order: Order,
}

type Span = (usize, usize);

fn overlaps(a: Span, b: Span) -> bool {
    a.0 <= b.1 && b.0 <= a.1
}

fn within(inner: Span, outer: Span) -> bool {
    inner.0 >= outer.0 && inner.1 <= outer.1
}

/// Decides which back edges are drawn as arrows and in which lane. Spans are laid out by interval
/// colouring, shortest first, so a nested loop sits inside the loop around it. A route that
/// interleaves another crosses it once; that is counted. Where routes meet a box they take
/// separate places along its side, ordered so that nested routes do not cross there.
pub fn plan_back(analysis: &Analysis, room: &BackRoom) -> BackPlan {
    let flat = room.order == Order::Flat;
    let mut position = vec![0usize; analysis.layer_of.len()];
    for (place, step) in analysis.layers.iter().flatten().enumerate() {
        position[step.get()] = place;
    }
    let last_in_layer: Vec<usize> = analysis.layers.iter().filter_map(|layer| layer.last()).map(|step| step.get()).collect();
    let at = |step: StepIndex| if flat { position[step.get()] } else { analysis.layer_of[step.get()].get() };
    let eligible = |edge: &Edge| edge.from != edge.to && (flat || (last_in_layer.contains(&edge.from.get()) && last_in_layer.contains(&edge.to.get())));
    let span = |edge: &Edge| -> Span { (at(edge.from).min(at(edge.to)), at(edge.from).max(at(edge.to))) };

    // Indexes into `analysis.back`, so a duplicate edge stays its own edge.
    let mut noted: Vec<usize> = (0..analysis.back.len()).filter(|&i| !eligible(&analysis.back[i])).collect();
    let mut candidates: Vec<usize> = (0..analysis.back.len()).filter(|&i| eligible(&analysis.back[i])).collect();
    candidates.sort_by(|&a, &b| {
        let (sa, sb) = (span(&analysis.back[a]), span(&analysis.back[b]));
        (sa.1 - sa.0).cmp(&(sb.1 - sb.0)).then(sa.0.cmp(&sb.0)).then(analysis.back[a].from.get().cmp(&analysis.back[b].from.get()))
    });
    let mut lane_of: Vec<Option<usize>> = vec![None; analysis.back.len()];
    for &edge in &candidates {
        let taken: Vec<usize> =
            candidates.iter().filter(|&&other| lane_of[other].is_some() && overlaps(span(&analysis.back[other]), span(&analysis.back[edge]))).filter_map(|&other| lane_of[other]).collect();
        let mut lane = 0;
        while taken.contains(&lane) {
            lane += 1;
        }
        lane_of[edge] = Some(lane);
    }
    // Lanes cost room; the outermost go first when there is not enough.
    let by_room = ((room.available - room.label_room) / room.lane_pitch).floor();
    let allowed = match (room.max_lanes, by_room) {
        (Some(most), room) if room.is_finite() => (most as f64).min(room),
        (Some(most), _) => most as f64,
        (None, room) => room,
    };
    let mut kept: Vec<usize> = Vec::new();
    for &edge in &candidates {
        if (lane_of[edge].expect("every candidate has a lane") as f64) < allowed {
            kept.push(edge);
        } else {
            noted.push(edge);
        }
    }
    noted.sort();

    // Places along each box's side: routes arriving first (outer lane on top), then routes leaving (inner lane first).
    let mut routes: Vec<Route> = kept
        .iter()
        .map(|&i| Route {
            from: analysis.back[i].from,
            to: analysis.back[i].to,
            label: analysis.back[i].label.clone(),
            lane: lane_of[i].expect("every kept edge has a lane"),
            from_slot: BackSlot { index: 0, of: 1 },
            to_slot: BackSlot { index: 0, of: 1 },
        })
        .collect();
    let mut touched: Vec<usize> = Vec::new();
    for route in &routes {
        for step in [route.from.get(), route.to.get()] {
            if !touched.contains(&step) {
                touched.push(step);
            }
        }
    }
    for step in touched {
        let mut arriving: Vec<usize> = (0..routes.len()).filter(|&r| routes[r].to.get() == step).collect();
        let mut leaving: Vec<usize> = (0..routes.len()).filter(|&r| routes[r].from.get() == step).collect();
        arriving.sort_by(|&a, &b| routes[b].lane.cmp(&routes[a].lane));
        leaving.sort_by(|&a, &b| routes[a].lane.cmp(&routes[b].lane));
        let of = arriving.len() + leaving.len();
        for (k, &r) in arriving.iter().enumerate() {
            routes[r].to_slot = BackSlot { index: k, of };
        }
        for (k, &r) in leaving.iter().enumerate() {
            routes[r].from_slot = BackSlot { index: arriving.len() + k, of };
        }
    }
    let span_of = |route: &Route| -> Span { (at(route.from).min(at(route.to)), at(route.from).max(at(route.to))) };
    let mut crossings = 0;
    for i in 0..routes.len() {
        for j in (i + 1)..routes.len() {
            let (a, b) = (span_of(&routes[i]), span_of(&routes[j]));
            if overlaps(a, b) && !(within(a, b) || within(b, a)) {
                crossings += 1;
            }
        }
    }
    let lanes = routes.iter().map(|route| route.lane + 1).max().unwrap_or(0);
    BackPlan { routes, noted: noted.iter().map(|&i| analysis.back[i].clone()).collect(), lanes, crossings }
}

/// The greedy break of a label at `width`, a single word wider than that staying whole.
fn break_label(label: &str, width: f64, measure: &dyn Fn(&str) -> f64) -> Vec<String> {
    let mut lines: Vec<String> = Vec::new();
    for word in label.split_whitespace() {
        match lines.last_mut() {
            Some(last) if measure(&format!("{last} {word}")) <= width => *last = format!("{last} {word}"),
            _ => lines.push(word.to_string()),
        }
    }
    if lines.is_empty() {
        vec![label.to_string()]
    } else {
        lines
    }
}

/// An arrow label as lines no wider than `width`, broken at spaces so the lines come out even and the
/// last line is never a lone word, unless the label is one word or a word is wider than `width`
/// (then it is the greedy break, a single wide word staying whole).
pub fn wrap_label(label: &str, width: f64, measure: &dyn Fn(&str) -> f64) -> Vec<String> {
    let words: Vec<&str> = label.split_whitespace().collect();
    if words.len() < 2 || words.iter().any(|word| measure(word) > width) {
        return break_label(label, width, measure);
    }
    let n = words.len();
    let mut best = vec![f64::INFINITY; n + 1];
    let mut from = vec![0usize; n + 1];
    best[0] = 0.0;
    for j in 1..=n {
        for i in (0..j).rev() {
            let size = measure(&words[i..j].join(" "));
            if size > width {
                break;
            }
            let last = j == n;
            // Slack squared evens the lines; a lone word on the last line costs more than any slack; each line costs a little.
            let cost = (if last { 0.0 } else { (width - size).powi(2) }) + (if last && j - i == 1 && n > 1 { width.powi(2) * 100.0 } else { 0.0 }) + (width * width) / 4.0;
            if best[i] + cost < best[j] {
                best[j] = best[i] + cost;
                from[j] = i;
            }
        }
    }
    let mut lines: Vec<String> = Vec::new();
    let mut j = n;
    while j > 0 {
        lines.insert(0, words[from[j]..j].join(" "));
        j = from[j];
    }
    lines
}

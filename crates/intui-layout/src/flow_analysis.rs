//! Flow layering: which column each step sits in, and which links close a loop.

use intui_types::forms::{Flow, StepIndex};
use std::collections::HashMap;

/// Which column a step sits in, counted from the sources.
#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct LayerIndex(usize);

impl LayerIndex {
    pub fn get(self) -> usize {
        self.0
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct Edge {
    pub from: StepIndex,
    pub to: StepIndex,
    pub label: Option<String>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Analysis {
    /// Edges that go forward in the layering, duplicates merged.
    pub edges: Vec<Edge>,
    /// Edges that close a cycle; they are listed, not drawn as arrows.
    pub back: Vec<Edge>,
    /// Steps per layer, in drawing order.
    pub layers: Vec<Vec<StepIndex>>,
    /// The layer of each step, in step order.
    pub layer_of: Vec<LayerIndex>,
}

/// The edges a flow draws. No links means each step leads to the next; links to the same pair merge their labels.
pub fn resolve_edges(flow: &Flow) -> Vec<Edge> {
    if flow.links().is_empty() {
        return flow.step_indexes().windows(2).map(|pair| Edge { from: pair[0], to: pair[1], label: None }).collect();
    }
    let mut merged: Vec<Edge> = Vec::new();
    let mut position: HashMap<(StepIndex, StepIndex), usize> = HashMap::new();
    for link in flow.links() {
        let (from, to) = (link.from, link.to);
        let label = link.label.as_deref().filter(|label| !label.is_empty());
        match position.get(&(from, to)) {
            None => {
                position.insert((from, to), merged.len());
                merged.push(Edge { from, to, label: label.map(str::to_string) });
            }
            Some(&seen) => {
                let seen = &mut merged[seen];
                if let Some(label) = label {
                    if seen.label.as_deref() != Some(label) {
                        seen.label = Some(match &seen.label {
                            Some(existing) => format!("{existing} / {label}"),
                            None => label.to_string(),
                        });
                    }
                }
            }
        }
    }
    merged
}

/// Splits edges into forward and back edges by a depth-first walk from the first step, so cycles never hang.
pub(crate) fn break_cycles(count: usize, edges: &[Edge]) -> (Vec<Edge>, Vec<Edge>) {
    let mut out: Vec<Vec<usize>> = vec![Vec::new(); count];
    for (i, edge) in edges.iter().enumerate() {
        out[edge.from.get()].push(i);
    }
    #[derive(Clone, Copy, PartialEq)]
    enum Visit {
        Unseen,
        Open,
        Done,
    }
    let mut state = vec![Visit::Unseen; count];
    let mut back = vec![false; edges.len()];
    for start in 0..count {
        if state[start] != Visit::Unseen {
            continue;
        }
        state[start] = Visit::Open;
        let mut stack: Vec<(usize, usize)> = vec![(start, 0)];
        while let Some(&mut (node, ref mut next)) = stack.last_mut() {
            if *next == out[node].len() {
                state[node] = Visit::Done;
                stack.pop();
                continue;
            }
            let edge = out[node][*next];
            *next += 1;
            let target = edges[edge].to.get();
            match state[target] {
                Visit::Open => back[edge] = true,
                Visit::Unseen => {
                    state[target] = Visit::Open;
                    stack.push((target, 0));
                }
                Visit::Done => {}
            }
        }
    }
    let pick = |wanted: bool| edges.iter().zip(&back).filter(|(_, is_back)| **is_back == wanted).map(|(edge, _)| edge.clone()).collect();
    (pick(false), pick(true))
}

/// Layers a flow: longest path from the sources, cycles broken, order within a layer by neighbours' order.
pub fn analyse(flow: &Flow) -> Analysis {
    let count = flow.steps().len();
    let (forward, back) = break_cycles(count, &resolve_edges(flow));
    let mut layer_of = vec![0usize; count];
    let mut indegree = vec![0usize; count];
    for edge in &forward {
        indegree[edge.to.get()] += 1;
    }
    let mut queue: Vec<usize> = (0..count).filter(|node| indegree[*node] == 0).collect();
    let mut head = 0;
    while head < queue.len() {
        let node = queue[head];
        head += 1;
        for edge in forward.iter().filter(|edge| edge.from.get() == node) {
            let to = edge.to.get();
            layer_of[to] = layer_of[to].max(layer_of[node] + 1);
            indegree[to] -= 1;
            if indegree[to] == 0 {
                queue.push(to);
            }
        }
    }
    let depth = layer_of.iter().copied().max().unwrap_or(0);
    let mut layers: Vec<Vec<usize>> = vec![Vec::new(); depth + 1];
    let mut position = vec![0usize; count];
    for (l, layer) in layers.iter_mut().enumerate() {
        let mut members: Vec<usize> = (0..count).filter(|node| layer_of[*node] == l).collect();
        let desire = |node: usize| {
            let before: Vec<f64> = forward.iter().filter(|edge| edge.to.get() == node).map(|edge| position[edge.from.get()] as f64).collect();
            if before.is_empty() {
                0.0
            } else {
                before.iter().sum::<f64>() / before.len() as f64
            }
        };
        members.sort_by(|a, b| {
            let difference = desire(*a) - desire(*b);
            if difference > 0.0 {
                std::cmp::Ordering::Greater
            } else if difference < 0.0 {
                std::cmp::Ordering::Less
            } else {
                a.cmp(b)
            }
        });
        for (i, node) in members.iter().enumerate() {
            position[*node] = i;
        }
        *layer = members;
    }
    let steps = flow.step_indexes();
    Analysis {
        edges: forward,
        back,
        layers: layers.into_iter().map(|layer| layer.into_iter().map(|node| steps[node]).collect()).collect(),
        layer_of: layer_of.into_iter().map(LayerIndex).collect(),
    }
}

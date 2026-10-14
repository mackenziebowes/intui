//! Flow layering: which column each step sits in, and which links close a loop.

use intui_types::generated::tree as gen;
use std::collections::HashMap;

#[derive(Clone, Debug, PartialEq)]
pub struct Edge {
    pub from: usize,
    pub to: usize,
    pub label: Option<String>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Analysis {
    /// Edges that go forward in the layering, duplicates merged.
    pub edges: Vec<Edge>,
    /// Edges that close a cycle; they are listed, not drawn as arrows.
    pub back: Vec<Edge>,
    /// Step indexes per layer, in drawing order.
    pub layers: Vec<Vec<usize>>,
    pub layer_of: Vec<usize>,
}

/// Resolves links to step indexes. No links means each step leads to the next. Unknown ids are skipped.
pub fn resolve_edges(steps: &[gen::FlowStep], links: &[gen::FlowLink]) -> Vec<Edge> {
    if links.is_empty() {
        return (1..steps.len()).map(|to| Edge { from: to - 1, to, label: None }).collect();
    }
    let index: HashMap<&str, usize> = steps.iter().enumerate().map(|(i, step)| (step.id.as_str(), i)).collect();
    let mut merged: Vec<Edge> = Vec::new();
    let mut position: HashMap<(usize, usize), usize> = HashMap::new();
    for link in links {
        let (Some(&from), Some(&to)) = (index.get(link.from.as_str()), index.get(link.to.as_str())) else {
            continue;
        };
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
pub fn break_cycles(count: usize, edges: &[Edge]) -> (Vec<Edge>, Vec<Edge>) {
    let mut out: Vec<Vec<usize>> = vec![Vec::new(); count];
    for (i, edge) in edges.iter().enumerate() {
        out[edge.from].push(i);
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
            match state[edges[edge].to] {
                Visit::Open => back[edge] = true,
                Visit::Unseen => {
                    state[edges[edge].to] = Visit::Open;
                    stack.push((edges[edge].to, 0));
                }
                Visit::Done => {}
            }
        }
    }
    let pick = |wanted: bool| edges.iter().zip(&back).filter(|(_, is_back)| **is_back == wanted).map(|(edge, _)| edge.clone()).collect();
    (pick(false), pick(true))
}

/// Layers a flow: longest path from the sources, cycles broken, order within a layer by neighbours' order.
pub fn analyse(steps: &[gen::FlowStep], links: &[gen::FlowLink]) -> Analysis {
    let count = steps.len();
    let (forward, back) = break_cycles(count, &resolve_edges(steps, links));
    let mut layer_of = vec![0usize; count];
    let mut indegree = vec![0usize; count];
    for edge in &forward {
        indegree[edge.to] += 1;
    }
    let mut queue: Vec<usize> = (0..count).filter(|node| indegree[*node] == 0).collect();
    let mut head = 0;
    while head < queue.len() {
        let node = queue[head];
        head += 1;
        for edge in forward.iter().filter(|edge| edge.from == node) {
            layer_of[edge.to] = layer_of[edge.to].max(layer_of[node] + 1);
            indegree[edge.to] -= 1;
            if indegree[edge.to] == 0 {
                queue.push(edge.to);
            }
        }
    }
    let depth = layer_of.iter().copied().max().unwrap_or(0);
    let mut layers: Vec<Vec<usize>> = vec![Vec::new(); depth + 1];
    let mut position = vec![0usize; count];
    for (l, layer) in layers.iter_mut().enumerate() {
        let mut members: Vec<usize> = (0..count).filter(|node| layer_of[*node] == l).collect();
        let desire = |node: usize| {
            let before: Vec<f64> = forward.iter().filter(|edge| edge.to == node).map(|edge| position[edge.from] as f64).collect();
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
    Analysis { edges: forward, back, layers, layer_of }
}

//! The rules of Marks and Ladder that no schema keyword holds (core's `checkKindsAndStates`, `checkMarks`, and the Ladder's own
//! checks), with core's words. Each is found on a node whose shape the schema already accepted.

use crate::json::{Json, JsonObject};
use crate::node::Kind;
use crate::schema::Seg;
use std::fmt;

/// The most marks one row or node may hold.
pub const MAX_MARKS: usize = 200;

#[derive(Clone, Debug, PartialEq)]
pub enum MarksProblem {
    KindCount { n: usize },
    DuplicateKind { id: String },
    DuplicateState { id: String },
    UnknownWithMarks { n: usize, why: String },
    TooManyMarks { n: usize },
    UndeclaredKind { kind: String, ids: Vec<String> },
    UndeclaredState { state: String, ids: Vec<String> },
    DuplicateNode { id: String, rung: String },
    UnknownAndCounted { why: String, count: String },
    StepPointsNowhere { node: String, ids: Vec<String> },
}

impl fmt::Display for MarksProblem {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            MarksProblem::KindCount { n } => write!(f, "there are {n} kinds; declare one to three (the first is drawn filled, the second hollow, the third as a ring)"),
            MarksProblem::DuplicateKind { id } => write!(f, "kind \"{id}\" is declared twice; give each kind its own id"),
            MarksProblem::DuplicateState { id } => write!(f, "state \"{id}\" is declared twice; give each state its own id"),
            MarksProblem::UnknownWithMarks { n, why } => {
                write!(f, "an unknown row has no marks (this one has {n} and says \"{why}\"); say why it is unknown or give its marks, never both")
            }
            MarksProblem::TooManyMarks { n } => write!(
                f,
                "{n} marks is more than {MAX_MARKS}; a count that large is a number, so use a Chart, or give the count in text (`count`, or a `halo`)"
            ),
            MarksProblem::UndeclaredKind { kind, ids } => write!(f, "mark kind \"{kind}\" isn't declared; use one of {}", ids.join(", ")),
            MarksProblem::UndeclaredState { state, ids } => {
                let known = if ids.is_empty() { "none (this component declares no states)".to_string() } else { ids.join(", ") };
                write!(f, "mark state \"{state}\" isn't declared; use one of {known}")
            }
            MarksProblem::DuplicateNode { id, rung } => write!(f, "node id \"{id}\" is already used in rung {rung}; give each node its own id"),
            MarksProblem::UnknownAndCounted { why, count } => write!(f, "a node can't be both unknown (\"{why}\") and counted (\"{count}\"); keep one"),
            MarksProblem::StepPointsNowhere { node, ids } => {
                let known = if ids.is_empty() { "none (this ladder has no nodes)".to_string() } else { ids.join(", ") };
                write!(f, "step points at node \"{node}\", which doesn't exist; use one of {known}")
            }
        }
    }
}

type Found = Vec<(Vec<Seg>, MarksProblem)>;

fn key(name: &str) -> Seg {
    Seg::Key(name.to_string())
}

fn items<'a>(object: &'a JsonObject, name: &str) -> &'a [Json] {
    object.get(name).and_then(Json::as_array).unwrap_or(&[])
}

fn text_of<'a>(object: &'a JsonObject, name: &str) -> Option<&'a str> {
    object.get(name).and_then(Json::as_str)
}

fn ids_of(object: &JsonObject, list: &str) -> Vec<String> {
    items(object, list).iter().filter_map(|item| Some(item.as_object()?.get("id")?.as_str()?.to_string())).collect()
}

/// Kinds are one to three and unique; states are unique.
fn kinds_and_states(object: &JsonObject, found: &mut Found) {
    let kinds = ids_of(object, "kinds");
    if kinds.is_empty() || kinds.len() > 3 {
        found.push((vec![key("kinds")], MarksProblem::KindCount { n: items(object, "kinds").len() }));
    }
    for (list, duplicate) in [("kinds", false), ("states", true)] {
        let mut seen: Vec<String> = Vec::new();
        for (i, id) in ids_of(object, list).into_iter().enumerate() {
            if seen.contains(&id) {
                let problem = if duplicate { MarksProblem::DuplicateState { id: id.clone() } } else { MarksProblem::DuplicateKind { id: id.clone() } };
                found.push((vec![key(list), Seg::Index(i), key("id")], problem));
            }
            seen.push(id);
        }
    }
}

/// Marks name declared kinds and states, there are at most MAX_MARKS, and a thing that is unknown has none.
fn marks(at: &[Seg], thing: &JsonObject, object: &JsonObject, found: &mut Found) {
    let list = items(thing, "marks");
    let path = |tail: Vec<Seg>| [at.to_vec(), tail].concat();
    if let Some(why) = text_of(thing, "unknown").filter(|_| !list.is_empty()) {
        found.push((path(vec![key("unknown")]), MarksProblem::UnknownWithMarks { n: list.len(), why: why.to_string() }));
    }
    if list.len() > MAX_MARKS {
        found.push((path(vec![key("marks")]), MarksProblem::TooManyMarks { n: list.len() }));
    }
    let (kinds, states) = (ids_of(object, "kinds"), ids_of(object, "states"));
    for (i, mark) in list.iter().enumerate() {
        let Some(mark) = mark.as_object() else { continue };
        if let Some(kind) = text_of(mark, "kind").filter(|kind| !kinds.iter().any(|id| id == kind)) {
            found.push((path(vec![key("marks"), Seg::Index(i), key("kind")]), MarksProblem::UndeclaredKind { kind: kind.to_string(), ids: kinds.clone() }));
        }
        if let Some(state) = text_of(mark, "state").filter(|state| !states.iter().any(|id| id == state)) {
            found.push((path(vec![key("marks"), Seg::Index(i), key("state")]), MarksProblem::UndeclaredState { state: state.to_string(), ids: states.clone() }));
        }
    }
}

/// The problems of a Marks or Ladder node, each with where it is inside the node, in core's order.
pub(crate) fn check(kind: Kind, object: &JsonObject) -> Found {
    let mut found = Vec::new();
    match kind {
        Kind::Marks => {
            kinds_and_states(object, &mut found);
            for (i, row) in items(object, "rows").iter().enumerate() {
                if let Some(row) = row.as_object() {
                    marks(&[key("rows"), Seg::Index(i)], row, object, &mut found);
                }
            }
        }
        Kind::Ladder => {
            kinds_and_states(object, &mut found);
            let mut seen: Vec<(String, String)> = Vec::new();
            for (r, rung) in items(object, "rungs").iter().enumerate() {
                let Some(rung) = rung.as_object() else { continue };
                let rung_id = text_of(rung, "id").unwrap_or("").to_string();
                for (n, node) in items(rung, "nodes").iter().enumerate() {
                    let Some(node) = node.as_object() else { continue };
                    let at = [key("rungs"), Seg::Index(r), key("nodes"), Seg::Index(n)];
                    let id = text_of(node, "id").unwrap_or("").to_string();
                    if let Some((_, first)) = seen.iter().find(|(seen_id, _)| *seen_id == id) {
                        found.push(([at.to_vec(), vec![key("id")]].concat(), MarksProblem::DuplicateNode { id: id.clone(), rung: first.clone() }));
                    }
                    seen.push((id, rung_id.clone()));
                    marks(&at, node, object, &mut found);
                    if let (Some(why), Some(count)) = (text_of(node, "unknown"), text_of(node, "count")) {
                        found.push(([at.to_vec(), vec![key("unknown")]].concat(), MarksProblem::UnknownAndCounted { why: why.to_string(), count: count.to_string() }));
                    }
                }
            }
            let mut ids: Vec<String> = Vec::new();
            for (id, _) in &seen {
                if !ids.contains(id) {
                    ids.push(id.clone());
                }
            }
            for (i, step) in items(object, "steps").iter().enumerate() {
                let Some(step) = step.as_object() else { continue };
                for end in ["from", "to"] {
                    if let Some(node) = text_of(step, end).filter(|node| !ids.iter().any(|id| id == node)) {
                        found.push((vec![key("steps"), Seg::Index(i), key(end)], MarksProblem::StepPointsNowhere { node: node.to_string(), ids: ids.clone() }));
                    }
                }
            }
        }
        _ => {}
    }
    found
}

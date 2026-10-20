//! Reading Marks and Ladder into their parsed forms. The edge already checked every kind and state a mark names exists and
//! every step's ends are nodes, so a miss here is drift between this build and core's schema.

use super::{Drift, Fields};
use crate::forms::*;
use crate::json::Json;

fn kinds(fields: &Fields) -> Result<Vec<MarkKind>, Drift> {
    fields.each("kinds", |kind| Ok(MarkKind { id: kind.text("id")?, label: kind.text("label")?, one: kind.maybe_text("one")? }), "MarkDeclaredKind")
}

fn states(fields: &Fields) -> Result<Vec<MarkState>, Drift> {
    fields.each("states", |state| Ok(MarkState { id: state.text("id")?, label: state.text("label")?, tone: state.word("tone")? }), "MarkDeclaredState")
}

fn marks_of(fields: &Fields, kinds: &[MarkKind], states: &[MarkState]) -> Result<Vec<Mark>, Drift> {
    fields.each(
        "marks",
        |mark| {
            let kind = mark.text("kind")?;
            let kind = kinds.iter().position(|k| k.id == kind).map(KindIndex).ok_or_else(|| mark.drift("kind"))?;
            let state = match mark.maybe_text("state")? {
                None => None,
                Some(id) => Some(states.iter().position(|s| s.id == id).map(StateIndex).ok_or_else(|| mark.drift("state"))?),
            };
            Ok(Mark { kind, state, detail: mark.maybe_text("detail")? })
        },
        "Mark",
    )
}

pub(super) fn marks(fields: &Fields) -> Result<Marks, Drift> {
    let (kinds, states) = (kinds(fields)?, states(fields)?);
    let rows = fields.each(
        "rows",
        |row| {
            let body = match row.maybe_text("unknown")? {
                Some(why) => RowBody::Unknown(why),
                None => RowBody::Marks(marks_of(row, &kinds, &states)?),
            };
            let halo = match row.object.get("halo") {
                None => None,
                Some(halo) => {
                    let halo = Fields::of("MarksHalo", halo)?;
                    let n = halo.value("n")?;
                    let n = match n {
                        Json::Number(_) => n.as_finite().map(|n| n as u64).ok_or_else(|| halo.drift("n"))?,
                        _ => return Err(halo.drift("n")),
                    };
                    Some(Halo { label: halo.text("label")?, n, detail: halo.maybe_text("detail")? })
                }
            };
            Ok(MarksRow { label: row.text("label")?, note: row.maybe_text("note")?, body, halo })
        },
        "MarksRow",
    )?;
    Ok(Marks { kinds, states, rows })
}

pub(super) fn ladder(fields: &Fields) -> Result<Ladder, Drift> {
    let (kinds, states) = (kinds(fields)?, states(fields)?);
    let rungs = fields.each(
        "rungs",
        |rung| {
            let nodes = rung.each(
                "nodes",
                |node| {
                    let body = match (node.maybe_text("unknown")?, node.maybe_text("count")?) {
                        (Some(why), _) => NodeBody::Unknown(why),
                        (None, Some(count)) => NodeBody::Said { count, marks: marks_of(node, &kinds, &states)? },
                        (None, None) => NodeBody::Marks(marks_of(node, &kinds, &states)?),
                    };
                    Ok(LadderNode { id: node.text("id")?, label: node.text("label")?, group: node.maybe_text("group")?, body })
                },
                "LadderNode",
            )?;
            Ok(LadderRung { id: rung.text("id")?, label: rung.text("label")?, nodes, empty: rung.maybe_text("empty")? })
        },
        "LadderRung",
    )?;
    let find = |id: &str| rungs.iter().enumerate().find_map(|(r, rung)| rung.nodes.iter().position(|n| n.id == id).map(|n| NodeAt { rung: r, node: n }));
    let steps = fields.each(
        "steps",
        |step| {
            let end = |key: &str| find(&step.text(key)?).ok_or_else(|| step.drift(key));
            let n = match step.object.get("n") {
                None => None,
                Some(n) => Some(n.as_finite().map(|n| n as u64).ok_or_else(|| step.drift("n"))?),
            };
            Ok(LadderStep { from: end("from")?, to: end("to")?, label: step.text("label")?, n })
        },
        "LadderStep",
    )?;
    Ok(Ladder { kinds, states, rungs, steps })
}

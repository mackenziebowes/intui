//! The text forms of Marks and Ladder, ported from `packages/core/src/components/{marks,ladder}.ts`.

use intui_types::forms::{self, Mark, MarkKind, MarkState, NodeBody, RowBody};

const SHAPES: [&str; 3] = ["filled", "hollow", "ring"];

/// "Marks are people (filled) and visits (hollow)."
fn key_text(kinds: &[MarkKind]) -> String {
    let parts: Vec<String> = kinds.iter().enumerate().map(|(i, kind)| format!("{} ({})", kind.label, SHAPES.get(i).copied().unwrap_or("ring"))).collect();
    let list = match parts.split_last() {
        Some((last, rest)) if !rest.is_empty() => format!("{} and {last}", rest.join(", ")),
        Some((only, _)) => only.clone(),
        None => String::new(),
    };
    format!("Marks are {list}.")
}

/// "4 visits, 1 person", in the order the kinds were declared; "none" when there are no marks.
fn kind_counts(marks: &[Mark], kinds: &[MarkKind]) -> String {
    let parts: Vec<String> = kinds
        .iter()
        .enumerate()
        .filter_map(|(i, kind)| {
            let n = marks.iter().filter(|mark| mark.kind.get() == i).count();
            (n > 0).then(|| format!("{n} {}", if n == 1 { kind.one.as_deref().unwrap_or(&kind.label) } else { &kind.label }))
        })
        .collect();
    if parts.is_empty() { "none".to_string() } else { parts.join(", ") }
}

/// "4 touched, 1 committed", in the order the states were declared; marks with no state are left out.
fn state_counts(marks: &[Mark], states: &[MarkState]) -> String {
    states
        .iter()
        .enumerate()
        .filter_map(|(i, state)| {
            let n = marks.iter().filter(|mark| mark.state.is_some_and(|s| s.get() == i)).count();
            (n > 0).then(|| format!("{n} {}", state.label))
        })
        .collect::<Vec<_>>()
        .join(", ")
}

pub fn marks_text(marks: &forms::Marks) -> String {
    let lines = marks.rows.iter().map(|row| {
        let note = row.note.as_ref().map(|note| format!(" ({note})")).unwrap_or_default();
        let head = format!("- **{}**{note}:", row.label);
        match &row.body {
            RowBody::Unknown(why) => format!("{head} unknown, {why}"),
            RowBody::Marks(list) => {
                let states = state_counts(list, &marks.states);
                let states = if states.is_empty() { String::new() } else { format!(": {states}") };
                let halo = row.halo.as_ref().map(|halo| format!("; {} {}{}", halo.label, halo.n, halo.detail.as_ref().map(|d| format!(" ({d})")).unwrap_or_default())).unwrap_or_default();
                format!("{head} {}{states}{halo}", kind_counts(list, &marks.kinds))
            }
        }
    });
    std::iter::once(key_text(&marks.kinds)).chain(lines).collect::<Vec<_>>().join("\n")
}

pub fn ladder_text(ladder: &forms::Ladder) -> String {
    let node_text = |node: &forms::LadderNode| match &node.body {
        NodeBody::Unknown(why) => format!("{}: unknown, {why}", node.label),
        NodeBody::Said { count, .. } => format!("{} {count}", node.label),
        NodeBody::Marks(list) => {
            let states = state_counts(list, &ladder.states);
            let states = if states.is_empty() { String::new() } else { format!(" ({states})") };
            format!("{} {}{states}", node.label, kind_counts(list, &ladder.kinds))
        }
    };
    let rung_text = |rung: &forms::LadderRung| {
        if rung.nodes.is_empty() {
            return format!("- **{}:** {}", rung.label, rung.empty.as_deref().unwrap_or("none"));
        }
        let mut groups: Vec<&str> = Vec::new();
        for node in &rung.nodes {
            let group = node.group.as_deref().unwrap_or("");
            if !groups.contains(&group) {
                groups.push(group);
            }
        }
        let segments: Vec<String> = groups
            .iter()
            .map(|group| {
                let nodes = rung.nodes.iter().filter(|node| node.group.as_deref().unwrap_or("") == *group).map(&node_text).collect::<Vec<_>>().join("; ");
                if group.is_empty() { nodes } else { format!("{group}: {nodes}") }
            })
            .collect();
        format!("- **{}:** {}", rung.label, segments.join(". "))
    };
    let steps: Vec<String> = ladder
        .steps
        .iter()
        .filter_map(|step| Some(format!("- {} → {}: {}", ladder.node(step.from)?.label, ladder.node(step.to)?.label, step.label)))
        .collect();
    let mut lines = vec![key_text(&ladder.kinds)];
    lines.extend(ladder.rungs.iter().rev().map(rung_text));
    if !steps.is_empty() {
        lines.push("Steps:".to_string());
        lines.extend(steps);
    }
    lines.join("\n")
}

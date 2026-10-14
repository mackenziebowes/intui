//! Each kind's text form, ported from `packages/core/src/components/*.ts`.

use crate::numbers::{format_number, js_to_string, shown_number};
use crate::words;
use intui_types::generated::tree as gen;
use intui_types::{Drawn, Node, Reading, Tree};
use std::collections::HashMap;

/// Markdown for the whole tree.
pub fn to_text(tree: &Tree) -> String {
    drawn_text(&tree.root)
}

fn drawn_text(drawn: &Drawn) -> String {
    match drawn {
        Drawn::Unknown { kind, path } => words::unknown_component(kind, path),
        Drawn::Known(node) => node_text(node),
    }
}

fn node_text(node: &Node) -> String {
    match node {
        Node::Text(text) => text.markdown.to_string(),
        Node::Label(label) => format!("[{}]", label.text.as_str()),
        Node::Group(group) => {
            let parts: Vec<String> = group.children.iter().map(drawn_text).collect();
            let all_short = parts.iter().all(|part| !part.contains('\n'));
            if matches!(group.direction, gen::GroupDirection::Row) && all_short {
                parts.join(" · ")
            } else {
                parts.join("\n\n")
            }
        }
        Node::Table(table) => table_text(table),
        Node::Chart(chart) => chart_text(chart),
        Node::Stat(stat) => stat_text(stat),
        Node::Flow(flow) => flow_text(flow),
        Node::Choice(choice) => {
            let buttons = choice.options.iter().map(|option| format!("[{}]", option.label.as_str())).collect::<Vec<_>>().join(" ");
            match non_empty(&choice.prompt) {
                Some(prompt) => format!("{prompt}\n\n{buttons}"),
                None => buttons,
            }
        }
        Node::Form(form) => form_text(form),
    }
}

/// JavaScript treats an empty string as absent in `props.title ? ... : ...`.
fn non_empty(text: &Option<String>) -> Option<&str> {
    text.as_deref().filter(|text| !text.is_empty())
}

/// core's `cellText` for a number.
fn number_cell(value: f64) -> String {
    format_number(value, None)
}

fn escape_cell(text: &str) -> String {
    text.replace('\n', " ").replace('|', "\\|")
}

fn markdown_table(headers: &[String], rows: &[Vec<String>]) -> String {
    let line = |cells: &[String]| format!("| {} |", cells.join(" | "));
    let separator: Vec<String> = headers.iter().map(|_| "---".to_string()).collect();
    let mut lines = vec![line(headers), line(&separator)];
    lines.extend(rows.iter().map(|row| line(row)));
    lines.join("\n")
}

fn table_text(table: &gen::Table) -> String {
    let headers: Vec<String> = table.columns.iter().map(|column| escape_cell(column.label.as_str())).collect();
    let rows: Vec<Vec<String>> = table
        .rows
        .iter()
        .map(|row| {
            table
                .columns
                .iter()
                .map(|column| match row.get(column.key.as_str()) {
                    None | Some(gen::TableRowsItemValue::Null) => String::new(),
                    Some(gen::TableRowsItemValue::Boolean(flag)) => flag.to_string(),
                    Some(gen::TableRowsItemValue::Number(number)) => escape_cell(&number_cell(*number)),
                    Some(gen::TableRowsItemValue::String(text)) => escape_cell(text),
                })
                .collect()
        })
        .collect();
    let body = markdown_table(&headers, &rows);
    match non_empty(&table.caption) {
        Some(caption) => format!("{caption}\n\n{body}"),
        None => body,
    }
}

fn x_cell(x: &gen::ChartPointX) -> String {
    match x {
        // A JavaScript Set keeps +0 for a -0 key, so the category reads "0".
        gen::ChartPointX::Number(number) => escape_cell(&number_cell(if *number == 0.0 { 0.0 } else { *number })),
        gen::ChartPointX::String(text) => escape_cell(text),
    }
}

fn same_x(a: &gen::ChartPointX, b: &gen::ChartPointX) -> bool {
    match (a, b) {
        (gen::ChartPointX::Number(a), gen::ChartPointX::Number(b)) => a == b,
        (gen::ChartPointX::String(a), gen::ChartPointX::String(b)) => a == b,
        _ => false,
    }
}

fn chart_text(chart: &gen::Chart) -> String {
    let mut xs: Vec<&gen::ChartPointX> = Vec::new();
    for point in chart.series.iter().flat_map(|series| &series.points) {
        if !xs.iter().any(|seen| same_x(seen, &point.x)) {
            xs.push(&point.x);
        }
    }
    let mut headers = vec![String::new()];
    headers.extend(chart.series.iter().map(|series| match series.role {
        gen::ChartSeriesRole::Primary => escape_cell(series.label.as_str()),
        role => escape_cell(&format!("{} ({role})", series.label.as_str())),
    }));
    let rows: Vec<Vec<String>> = xs
        .iter()
        .map(|x| {
            let mut row = vec![x_cell(x)];
            row.extend(chart.series.iter().map(|series| match series.points.iter().find(|point| same_x(&point.x, x)) {
                Some(point) => escape_cell(&reading_text(Reading::from(&point.y), None, false)),
                None => String::new(),
            }));
            row
        })
        .collect();
    let about = [Some(format!("{} chart", chart.kind)), non_empty(&chart.unit).map(str::to_string)].into_iter().flatten().collect::<Vec<_>>().join(", ");
    let heading = match non_empty(&chart.title) {
        Some(title) => format!("**{title}** ({about})"),
        None => format!("({about})"),
    };
    let mut parts = vec![heading, markdown_table(&headers, &rows)];
    if !chart.annotations.is_empty() {
        let markers = chart
            .annotations
            .iter()
            .map(|annotation| {
                let at = match &annotation.at {
                    gen::ChartAnnotationAt::Number(number) => js_to_string(*number),
                    gen::ChartAnnotationAt::String(text) => text.clone(),
                };
                format!("{at}: {}", annotation.label.as_str())
            })
            .collect::<Vec<_>>()
            .join("; ");
        parts.push(format!("Markers: {markers}"));
    }
    parts.join("\n\n")
}

fn stat_text(stat: &gen::Stat) -> String {
    let value = reading_text(Reading::from(&stat.value), non_empty(&stat.unit), false);
    match &stat.change {
        Some(change) => {
            let unit = matches!(change.as_, gen::StatChangeAs::Percent).then_some("%");
            let figure = reading_text(Reading::from(&change.value), unit, true);
            format!("**{}:** {value} ({figure})", stat.label.as_str())
        }
        None => format!("**{}:** {value}", stat.label.as_str()),
    }
}

fn flow_text(flow: &gen::Flow) -> String {
    let labels: HashMap<&str, &str> = flow.steps.iter().map(|step| (step.id.as_str(), step.label.as_str())).collect();
    let shape = if flow.links.is_empty() {
        flow.steps.iter().map(|step| step.label.as_str()).collect::<Vec<_>>().join(" → ")
    } else {
        flow.links
            .iter()
            .map(|link| {
                let label = non_empty(&link.label).map(|label| format!(" ({label})")).unwrap_or_default();
                format!("{} → {}{label}", labels[link.from.as_str()], labels[link.to.as_str()])
            })
            .collect::<Vec<_>>()
            .join("\n")
    };
    let details: Vec<String> = flow
        .steps
        .iter()
        .filter_map(|step| non_empty(&step.detail).map(|detail| format!("- **{}:** {detail}", step.label.as_str())))
        .collect();
    if details.is_empty() {
        shape
    } else {
        format!("{shape}\n\n{}", details.join("\n"))
    }
}

fn form_text(form: &gen::Form) -> String {
    let fields: Vec<String> = form
        .fields
        .iter()
        .map(|field| {
            let choices = if field.options.is_empty() {
                String::new()
            } else {
                format!(": {}", field.options.iter().map(|option| option.as_str()).collect::<Vec<_>>().join(", "))
            };
            let required = if field.required { ", required" } else { "" };
            format!("- {} ({}{required}{choices})", field.label.as_str(), field.input)
        })
        .collect();
    format!("Form:\n{}\n\n[{}]", fields.join("\n"), form.submit_label.as_str())
}

/// core's `readingText`: "216 tokens", "at least 216 tokens", "about 216 tokens", "unknown".
/// `signed` writes a plus before a positive number, for changes.
pub fn reading_text(reading: Reading, unit: Option<&str>, signed: bool) -> String {
    let number = |value: f64| {
        let shown = shown_number(value);
        let plus = if signed && shown > 0.0 { "+" } else { "" };
        format!("{plus}{}", format_number(shown, unit))
    };
    match reading {
        Reading::Exact(value) => number(value),
        Reading::AtLeast(value) => format!("at least {}", number(value)),
        Reading::Estimate(value) => format!("about {}", number(value)),
        Reading::Unknown => "unknown".to_string(),
    }
}

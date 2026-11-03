//! Each kind's text form, ported from `packages/core/src/components/*.ts`.

use crate::numbers::{format_number, js_to_string, shown_number};
use crate::words;
use intui_types::forms::{self, Cell, Position};
use intui_types::{Drawn, Node, Reading, Tree};

/// Markdown for the whole tree.
pub fn to_text(tree: &Tree) -> String {
    drawn_text(tree.root())
}

/// The text form of one node and everything inside it.
pub fn drawn_text(drawn: &Drawn) -> String {
    match drawn {
        Drawn::Unknown { kind, path } => words::unknown_component(kind.name(), path),
        Drawn::Known(node) => node_text(node),
    }
}

fn node_text(node: &Node) -> String {
    match node {
        Node::Text(text) if text.verbatim => {
            // A fence longer than any run of backticks inside, so the text can't close it.
            let longest = text.markdown.split(|c| c != '`').map(str::len).max().unwrap_or(0);
            let fence = "`".repeat(longest.max(2) + 1);
            format!("{fence}\n{}\n{fence}", text.markdown)
        }
        Node::Text(text) => text.markdown.clone(),
        Node::Label(label) => match &label.who {
            Some(who) => format!("[{}] ({who})", label.text),
            None => format!("[{}]", label.text),
        },
        Node::Group(group) => {
            let parts: Vec<String> = group.children.iter().map(drawn_text).collect();
            let all_short = parts.iter().all(|part| !part.contains('\n'));
            let body = if matches!(group.direction, forms::GroupDirection::Row) && all_short {
                parts.join(" · ")
            } else {
                parts.join("\n\n")
            };
            if matches!(group.boxed, Some(forms::GroupBox::Waiting)) {
                format!("{}\n{body}", words::WAITING_ON_YOU)
            } else {
                body
            }
        }
        Node::Table(table) => table_text(table),
        Node::Chart(chart) => chart_text(chart),
        Node::Stat(stat) => stat_text(stat),
        Node::Flow(flow) => flow_text(flow),
        Node::Marks(marks) => crate::marks_text::marks_text(marks),
        Node::Ladder(ladder) => crate::marks_text::ladder_text(ladder),
        Node::Choice(choice) => {
            let buttons = choice.options.iter().map(|option| format!("[{}]", option.label)).collect::<Vec<_>>().join(" ");
            match non_empty(&choice.prompt) {
                Some(prompt) => format!("{prompt}\n\n{buttons}"),
                None => buttons,
            }
        }
        Node::Form(form) => form_text(form),
        Node::Areas(areas) => areas_text(areas),
        Node::Tabs(tabs) => tabs.tabs.iter().map(|tab| if tab.id == tabs.active { format!("[{}]", tab.label) } else { tab.label.clone() }).collect::<Vec<_>>().join(" · "),
    }
}

/// Each area in layout order: its kind's label and filter, then its content, or that it is waiting for it.
fn areas_text(areas: &forms::Areas) -> String {
    let label = |kind: &str| areas.kinds.iter().find(|k| k.id == kind).map_or_else(|| kind.to_string(), |k| k.label.clone());
    areas
        .layout
        .area_ids()
        .into_iter()
        .filter_map(|id| areas.areas.iter().find(|area| area.id == id))
        .map(|area| {
            let name = label(&area.kind);
            let head = match non_empty(&area.filter) {
                Some(filter) => format!("**{name}** · {filter}"),
                None => format!("**{name}**"),
            };
            let body = if area.children.is_empty() { format!("waiting for {name}") } else { area.children.iter().map(drawn_text).collect::<Vec<_>>().join("\n\n") };
            format!("{head}\n{body}")
        })
        .collect::<Vec<_>>()
        .join("\n\n")
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

/// What a table cell says as plain text, the way the text form writes it before escaping for a Markdown row.
pub fn cell_text(cell: &Cell) -> String {
    match cell {
        Cell::Empty => String::new(),
        Cell::Flag(flag) => flag.to_string(),
        Cell::Number(number) => number_cell(number.get()),
        Cell::Text(text) => text.clone(),
    }
}

fn table_text(table: &forms::Table) -> String {
    let headers: Vec<String> = table.columns.iter().map(|column| escape_cell(&column.label)).collect();
    let rows: Vec<Vec<String>> = table
        .rows
        .iter()
        .map(|row| {
            table
                .columns
                .iter()
                .map(|column| match row.cell(&column.key) {
                    Cell::Empty => String::new(),
                    Cell::Flag(flag) => flag.to_string(),
                    Cell::Number(number) => escape_cell(&number_cell(number.get())),
                    Cell::Text(text) => escape_cell(text),
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

fn x_cell(x: &Position) -> String {
    match x {
        // A JavaScript Set keeps +0 for a -0 key, so the category reads "0".
        Position::Number(number) => escape_cell(&number_cell(if number.get() == 0.0 { 0.0 } else { number.get() })),
        Position::Text(text) => escape_cell(text),
    }
}

fn chart_text(chart: &forms::Chart) -> String {
    let mut xs: Vec<&Position> = Vec::new();
    for point in chart.series.iter().flat_map(|series| series.points.iter()) {
        if !xs.contains(&&point.x) {
            xs.push(&point.x);
        }
    }
    let mut headers = vec![String::new()];
    headers.extend(chart.series.iter().map(|series| match series.role {
        forms::ChartSeriesRole::Primary => escape_cell(&series.label),
        role => escape_cell(&format!("{} ({role})", series.label)),
    }));
    let rows: Vec<Vec<String>> = xs
        .iter()
        .map(|x| {
            let mut row = vec![x_cell(x)];
            row.extend(chart.series.iter().map(|series| match series.points.iter().find(|point| point.x == **x) {
                Some(point) => escape_cell(&point_text(point)),
                None => String::new(),
            }));
            row
        })
        .collect();
    let about = [Some(words::chart_kind(chart.kind)), non_empty(&chart.unit).map(str::to_string)].into_iter().flatten().collect::<Vec<_>>().join(", ");
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
                    Position::Number(number) => js_to_string(number.get()),
                    Position::Text(text) => text.clone(),
                };
                format!("{at}: {}", annotation.label)
            })
            .collect::<Vec<_>>()
            .join("; ");
        parts.push(words::markers(&markers));
    }
    parts.join("\n\n")
}

fn stat_text(stat: &forms::Stat) -> String {
    let value = reading_text(stat.value, non_empty(&stat.unit), false);
    let figure = match &stat.change {
        Some(change) => {
            let unit = matches!(change.as_, forms::StatChangeAs::Percent).then_some("%");
            let figure = reading_text(change.value, unit, true);
            format!("**{}:** {value} ({figure})", stat.label)
        }
        None => format!("**{}:** {value}", stat.label),
    };
    match &stat.note {
        Some(note) => format!("{figure}; {note}"),
        None => figure,
    }
}

/// A point in words; a partial period that has a number says "so far".
fn point_text(point: &forms::Point) -> String {
    let text = reading_text(point.y, None, false);
    match (point.period, point.y) {
        (forms::ChartPointPeriod::Partial, Reading::Unknown) => text,
        (forms::ChartPointPeriod::Partial, _) => format!("{text} so far"),
        (forms::ChartPointPeriod::Complete, _) => text,
    }
}

fn flow_text(flow: &forms::Flow) -> String {
    let shape = if flow.links().is_empty() {
        flow.steps().iter().map(|step| step.label.as_str()).collect::<Vec<_>>().join(" → ")
    } else {
        flow.joined()
            .map(|(from, to, link)| {
                let label = non_empty(&link.label).map(|label| format!(" ({label})")).unwrap_or_default();
                format!("{} → {}{label}", from.label, to.label)
            })
            .collect::<Vec<_>>()
            .join("\n")
    };
    let details: Vec<String> = flow
        .steps()
        .iter()
        .filter_map(|step| non_empty(&step.detail).map(|detail| format!("- **{}:** {detail}", step.label)))
        .collect();
    if details.is_empty() {
        shape
    } else {
        format!("{shape}\n\n{}", details.join("\n"))
    }
}

fn form_text(form: &forms::Form) -> String {
    let fields: Vec<String> = form
        .fields
        .iter()
        .map(|field| {
            let choices = match field.input.options() {
                None => String::new(),
                Some(options) => format!(": {}", options.join(", ")),
            };
            let required = if field.required { format!(", {}", words::REQUIRED) } else { String::new() };
            format!("- {} ({}{required}{choices})", field.label, field.input.name())
        })
        .collect();
    format!("{}\n{}\n\n[{}]", words::FORM_HEADING, fields.join("\n"), form.submit_label)
}

/// core's `readingText`: "216 tokens", "at least 216 tokens", "about 216 tokens", "unknown".
/// `signed` writes a plus before a positive number, for changes.
pub fn reading_text(reading: Reading, unit: Option<&str>, signed: bool) -> String {
    let number = |value: f64| {
        let shown = shown_number(value);
        let plus = if signed && shown > 0.0 { "+" } else { "" };
        format!("{plus}{}", format_number(shown, unit))
    };
    match reading.value() {
        Some(value) => words::certainty(reading.kind(), &number(value)),
        None => words::certainty(reading.kind(), ""),
    }
}

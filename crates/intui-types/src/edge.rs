//! The edge: the one place JSON from a wire becomes a `Tree`.
//!
//! Types generated from the schema do most of the checking (required props, enum
//! values, string lengths, unknown props). typify drops some rules, so this module
//! restores them with core's wording: the `type` tag, list minimums, `emphasis`,
//! the strict reading objects, links that point at steps, row keys that are
//! columns, and ids that are unique. A node of a kind this build doesn't know is
//! kept as `Drawn::Unknown` instead of failing the tree.

use crate::generated::tree as gen;
use crate::node::{Drawn, Group, Kind, Node, Tree};
use crate::refusal::{LongRule, MinimumRule, Problem, ProblemKind, ReadingProblem, Refusal, ShortRule};
use serde::de::DeserializeOwned;
use serde_json::{Map, Value};
use std::collections::HashMap;

/// Parses a tree from JSON text.
pub fn parse(json: &str) -> Result<Tree, Refusal> {
    let value: Value = serde_json::from_str(json).map_err(|error| Refusal::NotJson { why: error.to_string() })?;
    parse_value(&value)
}

/// Parses a tree from JSON that was already read.
pub fn parse_value(input: &Value) -> Result<Tree, Refusal> {
    let Some(root) = input.as_object().and_then(|object| object.get("root")) else {
        return Err(Refusal::NoRoot);
    };
    match input.get("v") {
        None => return Err(Refusal::NoVersion),
        Some(version) if version.as_f64() == Some(1.0) => {}
        Some(other) => return Err(Refusal::WrongVersion { found: other.to_string() }),
    }
    let mut edge = Edge { root, problems: Vec::new() };
    let drawn = edge.node(root, &[], "root");
    if !edge.problems.is_empty() {
        return Err(Refusal::Schema(edge.problems));
    }
    let tree = Tree { root: drawn.expect("a tree with no problems has a root") };
    let duplicates = duplicate_ids(&tree);
    if !duplicates.is_empty() {
        return Err(Refusal::DuplicateIds(duplicates));
    }
    Ok(tree)
}

fn duplicate_ids(tree: &Tree) -> Vec<Problem> {
    let mut seen: HashMap<&str, String> = HashMap::new();
    let mut problems = Vec::new();
    for (drawn, path) in tree.walk() {
        let Drawn::Known(node) = drawn else { continue };
        for id in node.ids() {
            match seen.get(id) {
                Some(first) => problems.push(Problem {
                    path: path.clone(),
                    kind: ProblemKind::DuplicateId { id: id.to_string(), first: first.clone() },
                }),
                None => {
                    seen.insert(id, path.clone());
                }
            }
        }
    }
    problems
}

#[derive(Clone, Debug)]
enum Seg {
    Key(String),
    Index(usize),
}

fn key(name: &str) -> Seg {
    Seg::Key(name.to_string())
}

fn extend(path: &[Seg], more: impl IntoIterator<Item = Seg>) -> Vec<Seg> {
    path.iter().cloned().chain(more).collect()
}

struct Edge<'a> {
    root: &'a Value,
    problems: Vec<Problem>,
}

impl Edge<'_> {
    /// Core's path format: `root.children[1] (Chart).series[0]`. A component's type
    /// follows the key that holds it.
    fn render(&self, path: &[Seg]) -> String {
        let mut text = String::from("root");
        let mut value = Some(self.root);
        for seg in path {
            match seg {
                Seg::Key(name) => {
                    value = value.and_then(|v| v.get(name.as_str()));
                    text.push('.');
                    text.push_str(name);
                }
                Seg::Index(index) => {
                    value = value.and_then(|v| v.get(*index));
                    text.push_str(&format!("[{index}]"));
                }
            }
            if let Some(kind) = value.and_then(|v| v.get("type")).and_then(Value::as_str) {
                text.push_str(&format!(" ({kind})"));
            }
        }
        text
    }

    fn report(&mut self, path: &[Seg], kind: ProblemKind) {
        let path = self.render(path);
        self.problems.push(Problem { path, kind });
    }

    /// `walk` is the node's path as core's `walk()` writes it, without the type.
    fn node(&mut self, value: &Value, path: &[Seg], walk: &str) -> Option<Drawn> {
        let Some(object) = value.as_object() else {
            self.report(path, ProblemKind::WrongType { expected: "object", got: got_name(value) });
            return None;
        };
        let name = match object.get("type") {
            None => {
                self.report(&extend(path, [key("type")]), ProblemKind::NeedsType);
                return None;
            }
            Some(Value::String(name)) => name,
            Some(other) => {
                self.report(&extend(path, [key("type")]), ProblemKind::TypeNotText { found: js_text(other) });
                return None;
            }
        };
        let Some(kind) = Kind::from_name(name) else {
            return Some(Drawn::Unknown { kind: name.clone(), path: format!("{walk} ({name})") });
        };
        let node = match kind {
            Kind::Group => self.group(object, path, walk).map(Node::Group),
            Kind::Text => self.leaf::<gen::Text>(kind, object, path).map(Node::Text),
            Kind::Label => self.leaf::<gen::Label>(kind, object, path).map(Node::Label),
            Kind::Table => self.leaf::<gen::Table>(kind, object, path).map(|table| {
                self.check_table(object, &table, path);
                Node::Table(table)
            }),
            Kind::Chart => self.leaf::<gen::Chart>(kind, object, path).map(|chart| {
                self.check_chart(&chart, path);
                Node::Chart(chart)
            }),
            Kind::Stat => self.leaf::<gen::Stat>(kind, object, path).map(Node::Stat),
            Kind::Flow => self.leaf::<gen::Flow>(kind, object, path).map(|flow| {
                self.check_flow(&flow, path);
                Node::Flow(flow)
            }),
            Kind::Choice => self.leaf::<gen::Choice>(kind, object, path).map(|choice| {
                self.check_choice(&choice, path);
                Node::Choice(choice)
            }),
            Kind::Form => self.leaf::<gen::Form>(kind, object, path).map(|form| {
                self.check_form(&form, path);
                Node::Form(form)
            }),
        };
        node.map(Drawn::Known)
    }

    fn group(&mut self, object: &Map<String, Value>, path: &[Seg], walk: &str) -> Option<Group> {
        let mut shell = object.clone();
        shell.insert("children".to_string(), Value::Array(Vec::new()));
        let shell = self.decode::<gen::Group>(Kind::Group, &Value::Object(shell), path);
        let children_path = extend(path, [key("children")]);
        let children = match object.get("children") {
            None => {
                self.report(&children_path, ProblemKind::Required { field: "children".to_string() });
                None
            }
            Some(Value::Array(items)) if items.is_empty() => {
                self.report(&children_path, ProblemKind::NeedsMore(MinimumRule::GroupChildren));
                None
            }
            Some(Value::Array(items)) => {
                let drawn: Vec<Option<Drawn>> = items
                    .iter()
                    .enumerate()
                    .map(|(index, item)| self.node(item, &extend(&children_path, [Seg::Index(index)]), &format!("{walk}.children[{index}]")))
                    .collect();
                drawn.into_iter().collect::<Option<Vec<_>>>()
            }
            Some(other) => {
                self.report(&children_path, ProblemKind::WrongType { expected: "array", got: got_name(other) });
                None
            }
        };
        Some(Group { direction: shell?.direction, children: children? })
    }

    /// A kind with no nested nodes: its readings checked, then decoded by the generated type.
    fn leaf<T: DeserializeOwned>(&mut self, kind: Kind, object: &Map<String, Value>, path: &[Seg]) -> Option<T> {
        let mut value = Value::Object(object.clone());
        match kind {
            Kind::Stat => self.check_stat_readings(&mut value, path),
            Kind::Chart => self.check_chart_readings(&mut value, path),
            _ => {}
        }
        self.decode(kind, &value, path)
    }

    fn decode<T: DeserializeOwned>(&mut self, kind: Kind, value: &Value, path: &[Seg]) -> Option<T> {
        match serde_path_to_error::deserialize::<_, T>(value) {
            Ok(typed) => Some(typed),
            Err(error) => {
                let inner: Vec<Seg> = error
                    .path()
                    .iter()
                    .filter_map(|segment| match segment {
                        serde_path_to_error::Segment::Seq { index } => Some(Seg::Index(*index)),
                        serde_path_to_error::Segment::Map { key } => Some(Seg::Key(key.clone())),
                        serde_path_to_error::Segment::Enum { .. } | serde_path_to_error::Segment::Unknown => None,
                    })
                    .collect();
                let (problem_path, problem) = classify(kind, extend(path, inner), &error.inner().to_string());
                self.report(&problem_path, problem);
                None
            }
        }
    }

    fn check_stat_readings(&mut self, value: &mut Value, path: &[Seg]) {
        self.check_reading_at(value, &[key("value")], path);
        self.check_reading_at(value, &[key("change"), key("value")], path);
    }

    fn check_chart_readings(&mut self, value: &mut Value, path: &[Seg]) {
        let series_count = value.get("series").and_then(Value::as_array).map_or(0, Vec::len);
        for series in 0..series_count {
            let points = value["series"][series].get("points").and_then(Value::as_array).map_or(0, Vec::len);
            for point in 0..points {
                let at = [key("series"), Seg::Index(series), key("points"), Seg::Index(point), key("y")];
                self.check_reading_at(value, &at, path);
            }
        }
    }

    /// Checks the reading at `at` inside `value`, then swaps in a valid placeholder so decoding
    /// goes on and finds the node's other problems. Only the parent of a reading has to exist.
    fn check_reading_at(&mut self, value: &mut Value, at: &[Seg], path: &[Seg]) {
        let (last, parents) = at.split_last().expect("a reading has a path");
        let mut parent = &mut *value;
        for seg in parents {
            let next = match seg {
                Seg::Key(name) => parent.get_mut(name.as_str()),
                Seg::Index(index) => parent.get_mut(*index),
            };
            match next {
                Some(next) => parent = next,
                None => return,
            }
        }
        let Seg::Key(name) = last else { return };
        let Some(object) = parent.as_object_mut() else { return };
        let problem = match object.get(name.as_str()) {
            None => Some(ReadingProblem::NotAReading { got: "undefined".to_string() }),
            Some(reading) => reading_problem(reading),
        };
        if let Some(problem) = problem {
            object.insert(name.clone(), Value::from(0));
            self.report(&extend(path, at.iter().cloned()), ProblemKind::Reading(problem));
        }
    }

    fn check_table(&mut self, object: &Map<String, Value>, table: &gen::Table, path: &[Seg]) {
        if table.columns.is_empty() {
            self.report(&extend(path, [key("columns")]), ProblemKind::NeedsMore(MinimumRule::TableColumns));
        }
        let columns: Vec<&str> = table.columns.iter().map(|column| column.key.as_str()).collect();
        let rows = object.get("rows").and_then(Value::as_array).into_iter().flatten();
        for (index, row) in rows.enumerate() {
            for name in row.as_object().into_iter().flat_map(Map::keys) {
                if !columns.contains(&name.as_str()) {
                    let at = extend(path, [key("rows"), Seg::Index(index), key(name)]);
                    self.report(&at, ProblemKind::RowKeyNotColumn { key: name.clone() });
                }
            }
        }
    }

    fn check_chart(&mut self, chart: &gen::Chart, path: &[Seg]) {
        if chart.series.is_empty() {
            self.report(&extend(path, [key("series")]), ProblemKind::NeedsMore(MinimumRule::ChartSeries));
        }
        for (index, series) in chart.series.iter().enumerate() {
            if series.points.is_empty() {
                self.report(&extend(path, [key("series"), Seg::Index(index), key("points")]), ProblemKind::NeedsMore(MinimumRule::SeriesPoints));
            }
        }
    }

    fn check_flow(&mut self, flow: &gen::Flow, path: &[Seg]) {
        if flow.steps.len() < 2 {
            self.report(&extend(path, [key("steps")]), ProblemKind::NeedsMore(MinimumRule::FlowSteps));
        }
        let mut ids: Vec<String> = Vec::new();
        for step in &flow.steps {
            if !ids.iter().any(|id| id == step.id.as_str()) {
                ids.push(step.id.to_string());
            }
        }
        for (index, link) in flow.links.iter().enumerate() {
            for (name, step) in [("from", &link.from), ("to", &link.to)] {
                if !ids.contains(step) {
                    let at = extend(path, [key("links"), Seg::Index(index), key(name)]);
                    self.report(&at, ProblemKind::LinkPointsNowhere { step: step.clone(), ids: ids.clone() });
                }
            }
        }
    }

    fn check_choice(&mut self, choice: &gen::Choice, path: &[Seg]) {
        if choice.options.is_empty() {
            self.report(&extend(path, [key("options")]), ProblemKind::NeedsMore(MinimumRule::ChoiceOptions));
        }
        for (index, option) in choice.options.iter().enumerate() {
            if option.emphasis.as_deref().is_some_and(|emphasis| emphasis != "primary") {
                self.report(&extend(path, [key("options"), Seg::Index(index), key("emphasis")]), ProblemKind::NotPrimary);
            }
        }
    }

    fn check_form(&mut self, form: &gen::Form, path: &[Seg]) {
        if form.fields.is_empty() {
            self.report(&extend(path, [key("fields")]), ProblemKind::NeedsMore(MinimumRule::FormFields));
        }
        for (index, field) in form.fields.iter().enumerate() {
            if matches!(field.input, gen::FormFieldInput::Select) && field.options.is_empty() {
                self.report(&extend(path, [key("fields"), Seg::Index(index), key("options")]), ProblemKind::SelectNeedsOptions);
            }
        }
    }
}

/// Turns serde's words into a problem at the right path. Anything it doesn't
/// recognise is kept as `DoesNotFit` with serde's own sentence, still a refusal.
fn classify(kind: Kind, mut path: Vec<Seg>, message: &str) -> (Vec<Seg>, ProblemKind) {
    if let Some(name) = quoted_after(message, "unknown field `") {
        path.pop();
        return (path, ProblemKind::UnknownProps { keys: vec![name] });
    }
    if let Some(name) = quoted_after(message, "missing field `") {
        path.push(Seg::Key(name.clone()));
        return (path, ProblemKind::Required { field: name });
    }
    if message.starts_with("unknown variant `") {
        let options = message.split("expected one of ").nth(1).or_else(|| message.split("expected ").nth(1)).unwrap_or("");
        let options = options.split(", ").map(|option| option.trim_matches('`').to_string()).collect();
        return (path, ProblemKind::NotOneOf { options });
    }
    let last = match path.last() {
        Some(Seg::Key(name)) => Some(name.clone()),
        _ => None,
    };
    if let Some(min) = message.strip_prefix("shorter than ").and_then(|rest| rest.split(' ').next()).and_then(|n| n.parse().ok()) {
        let what = if kind == Kind::Text && last.as_deref() == Some("markdown") { ShortRule::TextMarkdown } else { ShortRule::Plain };
        return (path, ProblemKind::TooShort { min, what });
    }
    if let Some(max) = message.strip_prefix("longer than ").and_then(|rest| rest.split(' ').next()).and_then(|n| n.parse().ok()) {
        let what = if kind == Kind::Label && last.as_deref() == Some("text") { LongRule::LabelText } else { LongRule::Plain };
        return (path, ProblemKind::TooLong { max, what });
    }
    if message.contains("untagged enum") {
        let expected = match last.as_deref() {
            Some("x") | Some("at") => "a string or a number",
            _ => "a string, number, boolean or null",
        };
        return (path, ProblemKind::BadShape { expected });
    }
    if let Some((got, expected)) = invalid_type(message) {
        return (path, ProblemKind::WrongType { expected, got });
    }
    (path, ProblemKind::DoesNotFit { why: message.to_string() })
}

fn quoted_after(message: &str, prefix: &str) -> Option<String> {
    let rest = message.strip_prefix(prefix)?;
    Some(rest.split('`').next()?.to_string())
}

/// serde's `invalid type: string "x", expected a map` as zod's pair of names.
fn invalid_type(message: &str) -> Option<(&'static str, &'static str)> {
    let rest = message.strip_prefix("invalid type: ")?;
    let (got, expected) = rest.split_once(", expected ")?;
    let got = match got.split(' ').next()? {
        "string" => "string",
        "integer" | "floating" => "number",
        "boolean" => "boolean",
        "null" | "unit" => "null",
        "sequence" => "array",
        "map" => "object",
        _ => return None,
    };
    let expected = match expected {
        "a string" => "string",
        "a boolean" => "boolean",
        "f64" => "number",
        "a map" => "record",
        "a sequence" => "array",
        e if e.starts_with("struct ") => "object",
        _ => return None,
    };
    Some((got, expected))
}

fn got_name(value: &Value) -> &'static str {
    match value {
        Value::Null => "null",
        Value::Bool(_) => "boolean",
        Value::Number(_) => "number",
        Value::String(_) => "string",
        Value::Array(_) => "array",
        Value::Object(_) => "object",
    }
}

/// How core's `describe` names a value in a refusal.
fn describe(value: &Value) -> String {
    match value {
        Value::Null => "null".to_string(),
        Value::Array(_) => "a list".to_string(),
        Value::String(text) => format!("the string \"{}\"", text.chars().take(20).collect::<String>()),
        Value::Number(number) => number.to_string(),
        Value::Object(_) => "an object".to_string(),
        Value::Bool(_) => "boolean".to_string(),
    }
}

/// A value as JavaScript's `String(value)` writes it.
fn js_text(value: &Value) -> String {
    match value {
        Value::String(text) => text.clone(),
        Value::Array(_) => "[object Array]".to_string(),
        Value::Object(_) => "[object Object]".to_string(),
        other => other.to_string(),
    }
}

const READING_KINDS: [&str; 4] = ["exact", "atLeast", "estimate", "unknown"];

/// What is wrong with a wire reading, in core's `parseReading` order, or `None` if it is fine.
fn reading_problem(input: &Value) -> Option<ReadingProblem> {
    let object = match input {
        Value::Number(_) => return None,
        Value::Object(object) => object,
        other => return Some(ReadingProblem::NotAReading { got: describe(other) }),
    };
    let kind = match object.get("kind") {
        None => return Some(ReadingProblem::NeedsKind),
        Some(Value::String(kind)) if READING_KINDS.contains(&kind.as_str()) => kind.as_str(),
        Some(Value::String(kind)) => return Some(ReadingProblem::UnknownKind { shown: format!("\"{kind}\"") }),
        Some(other) => return Some(ReadingProblem::UnknownKind { shown: describe(other) }),
    };
    let extras = |allowed: &[&str]| -> Option<ReadingProblem> {
        let keys: Vec<String> = object.keys().filter(|name| !allowed.contains(&name.as_str())).cloned().collect();
        (!keys.is_empty()).then(|| ReadingProblem::Extras { kind: kind.to_string(), keys })
    };
    if kind == "unknown" {
        if object.contains_key("value") {
            return Some(ReadingProblem::UnknownHasValue);
        }
        return extras(&["kind"]);
    }
    match object.get("value") {
        None => return Some(ReadingProblem::NeedsValue { kind: kind.to_string() }),
        Some(Value::Number(_)) => {}
        Some(other) => return Some(ReadingProblem::ValueNotFinite { kind: kind.to_string(), got: describe(other) }),
    }
    extras(&["kind", "value"])
}

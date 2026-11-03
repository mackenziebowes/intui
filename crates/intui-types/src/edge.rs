//! The edge: the one place JSON from a wire becomes a `Tree`.
//!
//! The text is read by `json`, each node is checked against core's schema by `schema`
//! (every problem in it, listed), the rules the schema can't hold are checked here (links
//! that point at steps, row keys that are columns, select options), and a node that passed
//! is read into its parsed form by `read`. Past this module nothing re-checks a shape. A
//! node of a kind this build doesn't know is kept as `Drawn::Unknown` instead of failing
//! the tree.

use crate::author::Author;
use crate::json::{self, Json, JsonObject, JsonType, Unreadable};
use crate::node::{Drawn, Kind, Tree};
use crate::read::read_node;
use crate::refusal::{Expected, Problem, ProblemKind, Refusal};
use crate::schema::{schema, Finding, Seg};

/// Parses a tree from JSON text written by `author`; a tree the model wrote can't hold kinds that show numbers.
pub fn parse(text: &str, author: Author) -> Result<Tree, Refusal> {
    let input = json::parse(text).map_err(|why| match why {
        Unreadable::NotJson(fault) => Refusal::NotJson(fault),
        Unreadable::TooDeep { limit } => Refusal::TooDeep { limit },
    })?;
    parse_json(&input, author)
}

/// Parses a tree from JSON that was already read.
pub fn parse_json(input: &Json, author: Author) -> Result<Tree, Refusal> {
    let Some(envelope) = input.as_object() else { return Err(Refusal::NoRoot) };
    let Some(root) = envelope.get("root") else { return Err(Refusal::NoRoot) };
    match envelope.get("v") {
        None => return Err(Refusal::NoVersion),
        Some(Json::Number(version)) if *version == 1.0 => {}
        Some(other) => return Err(Refusal::WrongVersion { found: other.stringify() }),
    }
    let mut edge = Edge { root, at: Vec::new(), problems: Vec::new() };
    let drawn = edge.node(root);
    if !edge.problems.is_empty() {
        return Err(Refusal::Schema(edge.problems));
    }
    match drawn.map(Tree::new) {
        Some(Ok(tree)) => match author.problems_in(&tree) {
            problems if problems.is_empty() => Ok(tree),
            problems => Err(Refusal::ModelCannotWrite(problems)),
        },
        Some(Err(duplicates)) => Err(Refusal::DuplicateIds(duplicates)),
        None => Err(Refusal::Schema(vec![Problem { path: "root".to_string(), kind: ProblemKind::Unreadable { what: "tree".to_string(), field: "root".to_string() } }])),
    }
}

fn key(name: &str) -> Seg {
    Seg::Key(name.to_string())
}

struct Edge<'j> {
    root: &'j Json,
    /// Where the node being checked sits.
    at: Vec<Seg>,
    problems: Vec<Problem>,
}

impl<'j> Edge<'j> {
    /// Core's path format: `root.children[1] (Chart).series[0]`. A component's type
    /// follows the key that holds it.
    fn render(&self, path: &[Seg]) -> String {
        let mut text = String::from("root");
        let mut value = Some(self.root);
        for seg in path {
            match seg {
                Seg::Key(name) => {
                    value = value.and_then(Json::as_object).and_then(|object| object.get(name));
                    text.push('.');
                    text.push_str(name);
                }
                Seg::Index(index) => {
                    value = value.and_then(Json::as_array).and_then(|items| items.get(*index));
                    text.push_str(&format!("[{index}]"));
                }
            }
            if let Some(kind) = value.and_then(Json::as_object).and_then(|object| object.get("type")).and_then(Json::as_str) {
                text.push_str(&format!(" ({kind})"));
            }
        }
        text
    }

    /// Core's `walk` format for the node being checked: `root.children[1] (Gauge)`.
    fn walk_path(&self, kind: &str) -> String {
        let mut text = String::from("root");
        for seg in &self.at {
            match seg {
                Seg::Key(name) => text.push_str(&format!(".{name}")),
                Seg::Index(index) => text.push_str(&format!("[{index}]")),
            }
        }
        format!("{text} ({kind})")
    }

    fn report_at(&mut self, inside: &[Seg], kind: ProblemKind) {
        let mut path = self.at.clone();
        path.extend(inside.iter().cloned());
        let path = self.render(&path);
        self.problems.push(Problem { path, kind });
    }

    fn node(&mut self, value: &'j Json) -> Option<Drawn> {
        let Json::Object(object) = value else {
            self.report_at(&[], ProblemKind::WrongType { expected: Expected::Type(JsonType::Object), got: value.type_of() });
            return None;
        };
        let name = match object.get("type") {
            None => {
                self.report_at(&[key("type")], ProblemKind::NeedsType);
                return None;
            }
            Some(Json::String(name)) => name,
            Some(other) => {
                self.report_at(&[key("type")], ProblemKind::TypeNotText { found: js_text(other) });
                return None;
            }
        };
        let kind = match Kind::of_name(name) {
            Ok(kind) => kind,
            Err(unknown) => return Some(Drawn::Unknown { path: self.walk_path(unknown.name()), kind: unknown }),
        };
        let before = self.problems.len();
        let mut blocked = false;
        let mut children = Vec::new();
        for finding in schema().check_node(kind.name(), object) {
            match finding {
                Finding::Problem { at, kind } => {
                    blocked |= kind.blocks_cross_checks();
                    self.report_at(&at, kind);
                }
                Finding::Child { at, value } => {
                    let depth = self.at.len();
                    self.at.extend(at);
                    children.push(self.node(value));
                    self.at.truncate(depth);
                }
            }
        }
        if !blocked {
            self.cross_checks(kind, object);
        }
        if self.problems.len() != before {
            return None;
        }
        let children = children.into_iter().collect::<Option<Vec<_>>>()?;
        match read_node(kind, object, children) {
            Ok(node) => Some(Drawn::Known(node)),
            Err(drift) => {
                self.report_at(&[], ProblemKind::Unreadable { what: drift.what, field: drift.field });
                None
            }
        }
    }

    /// The rules no schema keyword holds, checked on values the schema already accepted.
    fn cross_checks(&mut self, kind: Kind, object: &JsonObject) {
        match kind {
            Kind::Table => self.row_keys_are_columns(object),
            Kind::Flow => self.links_point_at_steps(object),
            Kind::Form => self.selects_have_options(object),
            Kind::Marks | Kind::Ladder => {
                for (inside, problem) in crate::marks_rules::check(kind, object) {
                    self.report_at(&inside, ProblemKind::Marks(problem));
                }
            }
            Kind::Areas => self.areas_agree(object),
            Kind::Tabs => self.active_is_a_tab(object),
            Kind::Text | Kind::Group | Kind::Label | Kind::Chart | Kind::Stat | Kind::Choice => {}
        }
    }

    /// Core's `Areas` rules: each area's kind is one of the kinds, area ids are different, and the layout places every area once.
    fn areas_agree(&mut self, object: &JsonObject) {
        let kinds: Vec<&str> = items(object, "kinds").filter_map(|kind| kind.as_object()?.get("id")?.as_str()).collect();
        let mut ids: Vec<&str> = Vec::new();
        for (index, entry) in items(object, "legend").enumerate() {
            let colour = entry.as_object().and_then(|e| e.get("colour")).and_then(Json::as_str).unwrap_or("");
            let hex = colour.len() == 7 && colour.starts_with('#') && colour[1..].chars().all(|c| c.is_ascii_hexdigit());
            if !hex {
                self.report_at(&[key("legend"), Seg::Index(index), key("colour")], ProblemKind::Areas(format!("legend colour \"{colour}\" is not a hex colour; write it like #3a7bd5")));
            }
        }
        for (index, area) in items(object, "areas").enumerate() {
            let Some(area) = area.as_object() else { continue };
            let id = area.get("id").and_then(Json::as_str).unwrap_or("");
            let kind = area.get("kind").and_then(Json::as_str).unwrap_or("");
            if !kinds.contains(&kind) {
                self.report_at(&[key("areas"), Seg::Index(index), key("kind")], ProblemKind::Areas(format!("area \"{id}\" has kind \"{kind}\", which is not in kinds; use one of: {}", kinds.join(", "))));
            }
            if ids.contains(&id) {
                self.report_at(&[key("areas"), Seg::Index(index), key("id")], ProblemKind::Areas(format!("two areas are called \"{id}\"; give each its own id")));
            } else {
                ids.push(id);
            }
        }
        let mut placed: Vec<&str> = Vec::new();
        if let Some(layout) = object.get("layout") {
            collect_placed(layout, &mut placed);
        }
        for id in &placed {
            if !ids.contains(id) {
                self.report_at(&[key("layout")], ProblemKind::Areas(format!("layout places \"{id}\", which is not in areas")));
            }
        }
        for id in &ids {
            let times = placed.iter().filter(|p| *p == id).count();
            if times != 1 {
                self.report_at(&[key("layout")], ProblemKind::Areas(format!("area \"{id}\" appears {times} times in layout; every area appears exactly once")));
            }
        }
    }

    fn active_is_a_tab(&mut self, object: &JsonObject) {
        let tabs: Vec<&str> = items(object, "tabs").filter_map(|tab| tab.as_object()?.get("id")?.as_str()).collect();
        let active = object.get("active").and_then(Json::as_str).unwrap_or("");
        if !tabs.contains(&active) {
            self.report_at(&[key("active")], ProblemKind::Areas(format!("active is \"{active}\", which is not a tab; use one of: {}", tabs.join(", "))));
        }
    }

    fn row_keys_are_columns(&mut self, object: &JsonObject) {
        let columns: Vec<&str> = items(object, "columns").filter_map(|column| column.as_object()?.get("key")?.as_str()).collect();
        for (index, row) in items(object, "rows").enumerate() {
            for name in row.as_object().into_iter().flat_map(JsonObject::keys) {
                if !columns.contains(&name) {
                    self.report_at(&[key("rows"), Seg::Index(index), key(name)], ProblemKind::RowKeyNotColumn { key: name.to_string() });
                }
            }
        }
    }

    fn links_point_at_steps(&mut self, object: &JsonObject) {
        let mut ids: Vec<String> = Vec::new();
        for id in items(object, "steps").filter_map(|step| step.as_object()?.get("id")?.as_str()) {
            if !ids.iter().any(|seen| seen == id) {
                ids.push(id.to_string());
            }
        }
        for (index, link) in items(object, "links").enumerate() {
            for end in ["from", "to"] {
                let Some(step) = link.as_object().and_then(|link| link.get(end)).and_then(Json::as_str) else { continue };
                if !ids.iter().any(|id| id == step) {
                    self.report_at(
                        &[key("links"), Seg::Index(index), key(end)],
                        ProblemKind::LinkPointsNowhere { step: step.to_string(), ids: ids.clone() },
                    );
                }
            }
        }
    }

    fn selects_have_options(&mut self, object: &JsonObject) {
        for (index, field) in items(object, "fields").enumerate() {
            let Some(field) = field.as_object() else { continue };
            let is_select = field.get("input").and_then(Json::as_str) == Some("select");
            let has_options = field.get("options").and_then(Json::as_array).is_some_and(|options| !options.is_empty());
            if is_select && !has_options {
                self.report_at(&[key("fields"), Seg::Index(index), key("options")], ProblemKind::SelectNeedsOptions);
            }
        }
    }
}

/// The area ids a layout places, the first part before the second.
fn collect_placed<'a>(layout: &'a Json, into: &mut Vec<&'a str>) {
    match layout {
        Json::String(id) => into.push(id.as_str()),
        Json::Object(object) => {
            for part in ["a", "b"] {
                if let Some(part) = object.get(part) {
                    collect_placed(part, into);
                }
            }
        }
        _ => {}
    }
}

fn items<'a>(object: &'a JsonObject, name: &str) -> impl Iterator<Item = &'a Json> {
    object.get(name).and_then(Json::as_array).into_iter().flatten()
}

/// A value as JavaScript's `String(value)` writes it.
fn js_text(value: &Json) -> String {
    match value {
        Json::String(text) => text.clone(),
        Json::Array(_) => "[object Array]".to_string(),
        Json::Object(_) => "[object Object]".to_string(),
        Json::Null => "null".to_string(),
        Json::Bool(flag) => flag.to_string(),
        Json::Number(number) => Json::number_text(*number),
    }
}

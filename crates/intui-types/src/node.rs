//! The parsed tree: what `parse` hands the rest of the program.
//!
//! A `Tree` exists only because the edge checked it: every list core needs non-empty is
//! non-empty, every id is unique, every link joins steps that exist, every number is
//! finite. Every node is either a kind this build knows, carrying its parsed form, or
//! `Unknown`, which remembers only its kind's name and where it sat.

use crate::forms;
use crate::generated::tree as gen;
use crate::refusal::{Problem, ProblemKind};
use std::collections::HashMap;

/// A tree that passed the edge. The protocol version is checked on the way in and
/// is always 1 here.
#[derive(Clone, Debug)]
pub struct Tree {
    root: Drawn,
}

/// The name of a component this build has never heard of. It can't hold a known kind's name.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct UnknownKind(String);

impl UnknownKind {
    pub fn name(&self) -> &str {
        &self.0
    }
}

/// A node as this build can draw it.
#[derive(Clone, Debug)]
pub enum Drawn {
    Known(Node),
    /// A component this build has never heard of. `path` reads like core's walk:
    /// `root.children[1] (Gauge)`.
    Unknown { kind: UnknownKind, path: String },
}

/// A component kind this build knows. Each carries the parsed form of its kind.
#[derive(Clone, Debug)]
pub enum Node {
    Text(forms::Text),
    Group(forms::Group),
    Label(forms::Label),
    Table(forms::Table),
    Chart(forms::Chart),
    Stat(forms::Stat),
    Flow(forms::Flow),
    Choice(forms::Choice),
    Form(forms::Form),
}

/// The kinds core's catalog has, in the order its refusals list them.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Kind {
    Text,
    Group,
    Label,
    Table,
    Chart,
    Stat,
    Flow,
    Choice,
    Form,
}

impl Kind {
    pub const ALL: [Kind; 9] = [
        Kind::Text,
        Kind::Group,
        Kind::Label,
        Kind::Table,
        Kind::Chart,
        Kind::Stat,
        Kind::Flow,
        Kind::Choice,
        Kind::Form,
    ];

    pub fn name(self) -> &'static str {
        match self {
            Kind::Text => "Text",
            Kind::Group => "Group",
            Kind::Label => "Label",
            Kind::Table => "Table",
            Kind::Chart => "Chart",
            Kind::Stat => "Stat",
            Kind::Flow => "Flow",
            Kind::Choice => "Choice",
            Kind::Form => "Form",
        }
    }

    pub fn from_name(name: &str) -> Option<Kind> {
        Kind::ALL.into_iter().find(|kind| kind.name() == name)
    }

    /// The kind a name stands for, or the unknown kind it is. The only way to make an `UnknownKind`.
    pub(crate) fn of_name(name: &str) -> Result<Kind, UnknownKind> {
        Kind::from_name(name).ok_or_else(|| UnknownKind(name.to_string()))
    }

    /// Fails to compile when core's schema gains a kind this build doesn't handle yet,
    /// so a new kind is a decision here, not a silent `Unknown`.
    #[allow(dead_code)]
    pub(crate) fn of_generated(node: &gen::Node) -> Kind {
        match node {
            gen::Node::Text(_) => Kind::Text,
            gen::Node::Group(_) => Kind::Group,
            gen::Node::Label(_) => Kind::Label,
            gen::Node::Table(_) => Kind::Table,
            gen::Node::Chart(_) => Kind::Chart,
            gen::Node::Stat(_) => Kind::Stat,
            gen::Node::Flow(_) => Kind::Flow,
            gen::Node::Choice(_) => Kind::Choice,
            gen::Node::Form(_) => Kind::Form,
        }
    }
}

impl Node {
    pub fn kind(&self) -> Kind {
        match self {
            Node::Text(_) => Kind::Text,
            Node::Group(_) => Kind::Group,
            Node::Label(_) => Kind::Label,
            Node::Table(_) => Kind::Table,
            Node::Chart(_) => Kind::Chart,
            Node::Stat(_) => Kind::Stat,
            Node::Flow(_) => Kind::Flow,
            Node::Choice(_) => Kind::Choice,
            Node::Form(_) => Kind::Form,
        }
    }

    /// The nodes directly inside this one.
    pub fn children(&self) -> Vec<&Drawn> {
        match self {
            Node::Group(group) => group.children.iter().collect(),
            Node::Text(_) | Node::Label(_) | Node::Table(_) | Node::Chart(_) | Node::Stat(_) | Node::Flow(_) | Node::Choice(_) | Node::Form(_) => Vec::new(),
        }
    }

    /// Ids this component answers events for.
    pub fn ids(&self) -> Vec<&str> {
        match self {
            Node::Choice(choice) => vec![choice.id.as_str()],
            Node::Form(form) => vec![form.id.as_str()],
            Node::Text(_) | Node::Group(_) | Node::Label(_) | Node::Table(_) | Node::Chart(_) | Node::Stat(_) | Node::Flow(_) => Vec::new(),
        }
    }
}

impl Tree {
    pub fn root(&self) -> &Drawn {
        &self.root
    }

    /// A tree whose ids are all different, or the places that repeat one. Every `Tree` comes from here.
    pub(crate) fn new(root: Drawn) -> Result<Tree, Vec<Problem>> {
        let duplicates = duplicate_ids(&root);
        if duplicates.is_empty() {
            Ok(Tree { root })
        } else {
            Err(duplicates)
        }
    }
}

/// Where a node sat: its parent's place in the walk and its own index among that parent's children.
struct Place {
    parent: Option<usize>,
    index: usize,
}

/// A node's path in core's `walk` format, `root.children[1] (Choice)`, built only when a message needs it.
fn walk_path(places: &[Place], at: usize, kind: &str) -> String {
    let mut indexes = Vec::new();
    let mut here = Some(at);
    while let Some(place) = here.map(|at| &places[at]) {
        if place.parent.is_some() {
            indexes.push(place.index);
        }
        here = place.parent;
    }
    let mut path = String::from("root");
    for index in indexes.iter().rev() {
        path.push_str(&format!(".children[{index}]"));
    }
    format!("{path} ({kind})")
}

fn duplicate_ids(root: &Drawn) -> Vec<Problem> {
    let mut places = vec![Place { parent: None, index: 0 }];
    let mut pending: Vec<(&Drawn, usize)> = vec![(root, 0)];
    let mut seen: HashMap<&str, (usize, &str)> = HashMap::new();
    let mut problems = Vec::new();
    while let Some((drawn, at)) = pending.pop() {
        let Drawn::Known(node) = drawn else { continue };
        let kind = node.kind().name();
        for id in node.ids() {
            match seen.get(id) {
                Some((first_at, first_kind)) => problems.push(Problem {
                    path: walk_path(&places, at, kind),
                    kind: ProblemKind::DuplicateId { id: id.to_string(), first: walk_path(&places, *first_at, first_kind) },
                }),
                None => {
                    seen.insert(id, (at, kind));
                }
            }
        }
        for (index, child) in node.children().into_iter().enumerate().rev() {
            places.push(Place { parent: Some(at), index });
            pending.push((child, places.len() - 1));
        }
    }
    problems
}

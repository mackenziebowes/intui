//! The parsed tree: what `parse` hands the rest of the program.
//!
//! Every node is either a kind this build knows, carrying types generated from
//! core's schema, or `Unknown`, which remembers only its kind and where it sat.
//! The one hand-written container is `Group`, whose children can themselves be
//! unknown and so can't be the generated `Vec<Node>`.

use crate::generated::tree as gen;

/// A tree that passed the edge. The protocol version is checked on the way in and
/// is always 1 here.
#[derive(Clone, Debug)]
pub struct Tree {
    pub root: Drawn,
}

/// A node as this build can draw it.
#[derive(Clone, Debug)]
pub enum Drawn {
    Known(Node),
    /// A component this build has never heard of. `path` reads like core's walk:
    /// `root.children[1] (Gauge)`.
    Unknown { kind: String, path: String },
}

/// A component kind this build knows. Each carries the generated type for its kind.
#[derive(Clone, Debug)]
pub enum Node {
    Text(gen::Text),
    Group(Group),
    Label(gen::Label),
    Table(gen::Table),
    Chart(gen::Chart),
    Stat(gen::Stat),
    Flow(gen::Flow),
    Choice(gen::Choice),
    Form(gen::Form),
}

#[derive(Clone, Debug)]
pub struct Group {
    pub direction: gen::GroupDirection,
    pub children: Vec<Drawn>,
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

    /// Fails to compile when core's schema gains a kind this build doesn't handle yet,
    /// so a new kind is a decision here, not a silent `Unknown`.
    pub fn of_generated(node: &gen::Node) -> Kind {
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
    pub fn children(&self) -> &[Drawn] {
        match self {
            Node::Group(group) => &group.children,
            _ => &[],
        }
    }

    /// Ids this component answers events for.
    pub fn ids(&self) -> Vec<&str> {
        match self {
            Node::Choice(choice) => vec![choice.id.as_str()],
            Node::Form(form) => vec![form.id.as_str()],
            _ => vec![],
        }
    }
}

impl Tree {
    /// Every node, depth first, with its path in core's `walk` format.
    pub fn walk(&self) -> Vec<(&Drawn, String)> {
        fn visit<'a>(drawn: &'a Drawn, path: &str, out: &mut Vec<(&'a Drawn, String)>) {
            match drawn {
                Drawn::Known(node) => {
                    out.push((drawn, format!("{path} ({})", node.kind().name())));
                    for (index, child) in node.children().iter().enumerate() {
                        visit(child, &format!("{path}.children[{index}]"), out);
                    }
                }
                Drawn::Unknown { path: own, .. } => out.push((drawn, own.clone())),
            }
        }
        let mut out = Vec::new();
        visit(&self.root, "root", &mut out);
        out
    }
}

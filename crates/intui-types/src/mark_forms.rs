//! Marks and Ladder as the program past the edge sees them. A mark names its kind and state by index into the lists
//! declared beside it, and the edge made sure both exist; a row or node is counted or unknown, never both.

use crate::forms::Tone;

#[derive(Clone, Debug, PartialEq)]
pub struct MarkKind {
    pub id: String,
    /// The plural ("people").
    pub label: String,
    /// The singular, for a count of one.
    pub one: Option<String>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct MarkState {
    pub id: String,
    pub label: String,
    pub tone: Tone,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct KindIndex(pub(crate) usize);

impl KindIndex {
    pub fn get(self) -> usize {
        self.0
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct StateIndex(pub(crate) usize);

impl StateIndex {
    pub fn get(self) -> usize {
        self.0
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct Mark {
    pub kind: KindIndex,
    pub state: Option<StateIndex>,
    pub detail: Option<String>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Halo {
    pub label: String,
    pub n: u64,
    pub detail: Option<String>,
}

/// What a row holds: its marks, or the reason it can't be counted.
#[derive(Clone, Debug, PartialEq)]
pub enum RowBody {
    Marks(Vec<Mark>),
    Unknown(String),
}

#[derive(Clone, Debug, PartialEq)]
pub struct MarksRow {
    pub label: String,
    pub note: Option<String>,
    pub body: RowBody,
    pub halo: Option<Halo>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Marks {
    pub kinds: Vec<MarkKind>,
    pub states: Vec<MarkState>,
    pub rows: Vec<MarksRow>,
}

/// What a ladder node holds: marks, marks said in words (`count`), or the reason it can't be counted.
#[derive(Clone, Debug, PartialEq)]
pub enum NodeBody {
    Marks(Vec<Mark>),
    Said { count: String, marks: Vec<Mark> },
    Unknown(String),
}

/// A kind of mark that can't be counted, and why; marks of the other kinds still draw.
#[derive(Clone, Debug, PartialEq)]
pub struct UnknownKind {
    pub kind: KindIndex,
    pub why: String,
}

#[derive(Clone, Debug, PartialEq)]
pub struct LadderNode {
    pub id: String,
    pub label: String,
    /// The full name, when `label` is short.
    pub full: Option<String>,
    pub group: Option<String>,
    pub body: NodeBody,
    pub unknown_kinds: Vec<UnknownKind>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct LadderRung {
    pub id: String,
    pub label: String,
    pub nodes: Vec<LadderNode>,
    pub empty: Option<String>,
    pub unknown_kinds: Vec<UnknownKind>,
}

/// A node's place: its rung and its position in it. The edge made one only for nodes that exist.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct NodeAt {
    pub rung: usize,
    pub node: usize,
}

#[derive(Clone, Debug, PartialEq)]
pub struct LadderStep {
    pub from: NodeAt,
    pub to: NodeAt,
    pub label: String,
    /// How many things went along it; a renderer draws one for each.
    pub n: Option<u64>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Ladder {
    pub kinds: Vec<MarkKind>,
    pub states: Vec<MarkState>,
    /// Listed bottom to top.
    pub rungs: Vec<LadderRung>,
    pub steps: Vec<LadderStep>,
}

impl Ladder {
    pub fn node(&self, at: NodeAt) -> Option<&LadderNode> {
        self.rungs.get(at.rung)?.nodes.get(at.node)
    }
}

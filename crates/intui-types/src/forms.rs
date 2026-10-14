//! Each component kind as the program past the edge sees it.
//!
//! The promise: a value of these types is valid. A list core requires to be non-empty is
//! a `NonEmpty`, a Flow's links are step indexes that exist, every number is `Finite`, a
//! select field holds its options, and none can be built outside this crate except
//! through the edge. Words and numbers hold what the wire said, already checked.

use crate::node::Drawn;
use crate::reading::{Finite, Reading};
use std::collections::HashMap;

pub use crate::generated::tree::{
    ChartKind, ChartSeriesRole, ChoiceRepeat, GroupDirection, StatChangeAs, TableColumnAlign, Tone,
};

/// A list with at least one item. The first is boxed so a Group can hold a list of the nodes it sits in.
#[derive(Clone, Debug, PartialEq)]
pub struct NonEmpty<T> {
    first: Box<T>,
    rest: Vec<T>,
}

impl<T> NonEmpty<T> {
    pub(crate) fn from_vec(items: Vec<T>) -> Option<NonEmpty<T>> {
        let mut items = items.into_iter();
        let first = items.next()?;
        Some(NonEmpty { first: Box::new(first), rest: items.collect() })
    }

    pub fn first(&self) -> &T {
        &self.first
    }

    pub fn len(&self) -> usize {
        1 + self.rest.len()
    }

    pub fn is_empty(&self) -> bool {
        false
    }

    pub fn get(&self, index: usize) -> Option<&T> {
        match index {
            0 => Some(&self.first),
            n => self.rest.get(n - 1),
        }
    }

    pub fn iter(&self) -> impl Iterator<Item = &T> {
        std::iter::once(&*self.first).chain(self.rest.iter())
    }
}

/// A list with at least two items.
#[derive(Clone, Debug, PartialEq)]
pub struct AtLeastTwo<T> {
    first: T,
    others: NonEmpty<T>,
}

impl<T> AtLeastTwo<T> {
    pub(crate) fn from_vec(items: Vec<T>) -> Option<AtLeastTwo<T>> {
        let mut items = items.into_iter();
        let first = items.next()?;
        let others = NonEmpty::from_vec(items.collect())?;
        Some(AtLeastTwo { first, others })
    }

    pub fn len(&self) -> usize {
        1 + self.others.len()
    }

    pub fn is_empty(&self) -> bool {
        false
    }

    pub fn get(&self, index: usize) -> Option<&T> {
        match index {
            0 => Some(&self.first),
            n => self.others.get(n - 1),
        }
    }

    pub fn iter(&self) -> impl Iterator<Item = &T> {
        std::iter::once(&self.first).chain(self.others.iter())
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct Text {
    pub markdown: String,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Label {
    pub text: String,
    pub tone: Tone,
}

#[derive(Clone, Debug)]
pub struct Group {
    pub direction: GroupDirection,
    pub children: NonEmpty<Drawn>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Column {
    pub key: String,
    pub label: String,
    pub align: Option<TableColumnAlign>,
}

/// What a table cell holds. A cell the row leaves out and a `null` are both `Empty`: neither draws anything.
#[derive(Clone, Debug, PartialEq)]
pub enum Cell {
    Empty,
    Flag(bool),
    Number(Finite),
    Text(String),
}

static EMPTY: Cell = Cell::Empty;

/// One row, read by column key.
#[derive(Clone, Debug, PartialEq)]
pub struct Row {
    cells: HashMap<String, Cell>,
}

impl Row {
    pub(crate) fn new(cells: HashMap<String, Cell>) -> Row {
        Row { cells }
    }

    /// The cell under a column's key; `Empty` when the row has none. A key is only ever looked up among the row's own.
    pub fn cell(&self, key: &str) -> &Cell {
        self.cells.get(key).unwrap_or(&EMPTY)
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct Table {
    pub caption: Option<String>,
    pub columns: NonEmpty<Column>,
    pub rows: Vec<Row>,
}

/// Where a point or marker sits along the x axis: a number or a category name.
#[derive(Clone, Debug, PartialEq)]
pub enum Position {
    Number(Finite),
    Text(String),
}

#[derive(Clone, Debug, PartialEq)]
pub struct Point {
    pub x: Position,
    pub y: Reading,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Series {
    pub label: String,
    pub role: ChartSeriesRole,
    pub points: NonEmpty<Point>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Annotation {
    pub at: Position,
    pub label: String,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Chart {
    pub kind: ChartKind,
    pub title: Option<String>,
    pub unit: Option<String>,
    pub series: NonEmpty<Series>,
    pub annotations: Vec<Annotation>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Change {
    pub value: Reading,
    pub as_: StatChangeAs,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Stat {
    pub label: String,
    pub value: Reading,
    pub unit: Option<String>,
    pub change: Option<Change>,
    pub tone: Tone,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Step {
    pub id: String,
    pub label: String,
    pub detail: Option<String>,
}

/// The place of a step in its Flow. Only the edge makes one, from a link whose ends exist.
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub struct StepIndex(usize);

impl StepIndex {
    pub(crate) fn new(index: usize) -> StepIndex {
        StepIndex(index)
    }

    pub fn get(self) -> usize {
        self.0
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct Link {
    pub from: StepIndex,
    pub to: StepIndex,
    pub label: Option<String>,
}

/// Steps and the links between them. A link names the steps it joins by index, and both exist.
#[derive(Clone, Debug, PartialEq)]
pub struct Flow {
    steps: AtLeastTwo<Step>,
    links: Vec<Link>,
}

impl Flow {
    pub(crate) fn new(steps: AtLeastTwo<Step>, links: Vec<Link>) -> Flow {
        Flow { steps, links }
    }

    pub fn steps(&self) -> &AtLeastTwo<Step> {
        &self.steps
    }

    pub fn links(&self) -> &[Link] {
        &self.links
    }

    /// The place of every step, in order.
    pub fn step_indexes(&self) -> Vec<StepIndex> {
        (0..self.steps.len()).map(StepIndex::new).collect()
    }

    /// Each link with the steps it joins.
    pub fn joined(&self) -> impl Iterator<Item = (&Step, &Step, &Link)> {
        self.links.iter().filter_map(|link| Some((self.steps.get(link.from.get())?, self.steps.get(link.to.get())?, link)))
    }
}

/// How a Choice option draws: the one the person is nudged toward, or any other.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Emphasis {
    Primary,
    Normal,
}

#[derive(Clone, Debug, PartialEq)]
pub struct ChoiceOption {
    pub id: String,
    pub label: String,
    pub emphasis: Emphasis,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Choice {
    pub id: String,
    pub prompt: Option<String>,
    pub options: NonEmpty<ChoiceOption>,
    pub repeat: ChoiceRepeat,
}

/// Options a field offers beside its input. A select must have some; the others may list them or not.
#[derive(Clone, Debug, PartialEq)]
pub enum FieldInput {
    Text(Offered),
    Number(Offered),
    Checkbox(Offered),
    Select(NonEmpty<String>),
}

#[derive(Clone, Debug, PartialEq)]
pub enum Offered {
    NotListed,
    Listed(Vec<String>),
}

impl FieldInput {
    pub fn name(&self) -> &'static str {
        match self {
            FieldInput::Text(_) => "text",
            FieldInput::Number(_) => "number",
            FieldInput::Checkbox(_) => "checkbox",
            FieldInput::Select(_) => "select",
        }
    }

    /// The options written for this field; `None` when it lists none.
    pub fn options(&self) -> Option<Vec<&str>> {
        match self {
            FieldInput::Text(offered) | FieldInput::Number(offered) | FieldInput::Checkbox(offered) => match offered {
                Offered::NotListed => None,
                Offered::Listed(options) => Some(options.iter().map(String::as_str).collect()),
            },
            FieldInput::Select(options) => Some(options.iter().map(String::as_str).collect()),
        }
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct Field {
    pub id: String,
    pub label: String,
    pub input: FieldInput,
    pub required: bool,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Form {
    pub id: String,
    pub fields: NonEmpty<Field>,
    pub submit_label: String,
}

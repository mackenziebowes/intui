//! Each component kind as the program past the edge sees it.
//!
//! The promise: a value of these types is valid. A list core requires to be non-empty is
//! a `NonEmpty`, a Flow's links are step indexes that exist, every number is `Finite`, a
//! select field holds its options, and none can be built outside this crate except
//! through the edge. Words and numbers hold what the wire said, already checked.

use crate::node::Drawn;
use crate::reading::{Finite, Reading};
use std::collections::HashMap;

pub use crate::mark_forms::{
    Halo, KindIndex, Ladder, LadderNode, LadderRung, LadderStep, Mark, MarkKind, MarkState, Marks, MarksRow, NodeAt, NodeBody, RowBody, StateIndex, UnknownKind,
};
pub use crate::generated::tree::{
    ChartKind, ChartPointPeriod, ChartSeriesRole, ChoiceRepeat, GroupBox, GroupDirection, Size, StatChangeAs, TableColumnAlign, Tone,
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
    pub size: Size,
    pub tone: Tone,
    /// Its spacing and line breaks are part of what it says; the markdown is shown as written.
    pub verbatim: bool,
    /// Whose the words are, a key the producer chose; an Areas legend may give it a colour.
    pub who: Option<String>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Label {
    pub text: String,
    pub tone: Tone,
    /// Whose it is, a key the producer chose; an Areas legend may give it a colour.
    pub who: Option<String>,
}

#[derive(Clone, Debug)]
pub struct Group {
    pub direction: GroupDirection,
    /// Some only on a row, one per child.
    pub widths: Option<Vec<Width>>,
    /// Some only on a row, one per child: the narrowest px that child shrinks to (0 is no floor).
    pub floors: Option<Vec<u16>>,
    pub divider: bool,
    /// What the group is as a unit: apart, someone's words, or waiting on the reader. None draws no box.
    pub boxed: Option<GroupBox>,
    /// The children are a thread: in time order, the newest last, and the reader follows the end.
    pub thread: bool,
    /// Whose it is, a key the producer chose; an Areas legend may give it a colour.
    pub who: Option<String>,
    /// In an area with room to spare, this child sits at the foot, below the rest.
    pub foot: bool,
    /// Its owner (`who`) is doing nothing now: the frame drawn in the owner's colour fades to a trace of the hue.
    pub idle: bool,
    pub children: NonEmpty<Drawn>,
}

/// How wide a row child is: a fixed px (1 to 4000), or an equal share of what is left.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Width {
    Px(u16),
    Rest,
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
    /// Whether the point's period is over; absent on the wire means complete (proposal 006).
    pub period: ChartPointPeriod,
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
    /// The reason or context in words, for any tone (proposal 006).
    pub note: Option<String>,
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

/// One thing an area can show: the producer's own words, with no meaning in core.
#[derive(Clone, Debug, PartialEq)]
pub struct AreaKind {
    pub id: String,
    pub label: String,
    pub hint: Option<String>,
}

/// One area: its kind (an id from the Areas' kinds), what it is narrowed to, and what it shows.
/// No children means the producer has sent nothing yet, and the area reads "waiting for <kind>".
#[derive(Clone, Debug)]
pub struct AreaSlot {
    pub id: String,
    pub kind: String,
    pub filter: Option<String>,
    pub children: Vec<Drawn>,
}

/// Which way a cut runs: `Row` puts the two parts side by side, `Column` one above the other.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum CutDirection {
    Row,
    Column,
}

/// An area by id, or a cut into two parts. `ratio` is the first part's share, 0.1 to 0.9.
#[derive(Clone, Debug, PartialEq)]
pub enum AreaLayout {
    Area(String),
    Cut { direction: CutDirection, ratio: f64, a: Box<AreaLayout>, b: Box<AreaLayout> },
}

impl AreaLayout {
    /// The area ids in order, the first part before the second.
    pub fn area_ids(&self) -> Vec<&str> {
        match self {
            AreaLayout::Area(id) => vec![id.as_str()],
            AreaLayout::Cut { a, b, .. } => a.area_ids().into_iter().chain(b.area_ids()).collect(),
        }
    }
}

#[derive(Clone, Debug)]
pub struct Areas {
    pub id: String,
    pub kinds: NonEmpty<AreaKind>,
    pub areas: NonEmpty<AreaSlot>,
    pub layout: AreaLayout,
    /// The colour each `who` key wears, as `#rrggbb` (an agent's window colour), given once.
    pub legend: Vec<AreaLegend>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct AreaLegend {
    pub who: String,
    pub colour: String,
}

#[derive(Clone, Debug, PartialEq)]
pub struct TabsTab {
    pub id: String,
    pub label: String,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Tabs {
    pub id: String,
    pub tabs: NonEmpty<TabsTab>,
    pub active: String,
}

//! Reading a node that passed every check into its parsed form.
//!
//! The checks already ran against the schema, so a failure here means this build's forms
//! and core's schema disagree about a prop (the schema gained something this code doesn't
//! read). That is reported as a `Drift` naming the prop, never guessed past.

use crate::forms::*;
use crate::generated::tree as gen;
use crate::json::{Json, JsonObject};
use crate::node::{Drawn, Kind, Node};
use crate::reading::{Finite, Reading};
use crate::schema::schema;
use std::collections::HashMap;
use std::str::FromStr;

/// A prop this build could not read from a node the schema accepted.
#[derive(Clone, Debug, PartialEq, Eq)]
pub(crate) struct Drift {
    pub what: String,
    pub field: String,
}

/// The props of one object, read by name, with the schema's default for a prop it leaves out.
struct Fields<'a> {
    def: &'a str,
    object: &'a JsonObject,
}

impl<'a> Fields<'a> {
    fn of(def: &'a str, json: &'a Json) -> Result<Fields<'a>, Drift> {
        match json.as_object() {
            Some(object) => Ok(Fields { def, object }),
            None => Err(Drift { what: def.to_string(), field: String::from("(the whole object)") }),
        }
    }

    fn drift(&self, field: &str) -> Drift {
        Drift { what: self.def.to_string(), field: field.to_string() }
    }

    fn value(&self, key: &str) -> Result<&'a Json, Drift> {
        self.object.get(key).or_else(|| schema().default_of(self.def, key)).ok_or_else(|| self.drift(key))
    }

    fn text(&self, key: &str) -> Result<String, Drift> {
        self.value(key)?.as_str().map(str::to_string).ok_or_else(|| self.drift(key))
    }

    fn maybe_text(&self, key: &str) -> Result<Option<String>, Drift> {
        match self.object.get(key) {
            None => Ok(None),
            Some(value) => value.as_str().map(|text| Some(text.to_string())).ok_or_else(|| self.drift(key)),
        }
    }

    fn list(&self, key: &str) -> Result<&'a [Json], Drift> {
        self.value(key)?.as_array().ok_or_else(|| self.drift(key))
    }

    fn word<T: FromStr>(&self, key: &str) -> Result<T, Drift> {
        let text = self.value(key)?.as_str().ok_or_else(|| self.drift(key))?;
        text.parse().map_err(|_| self.drift(key))
    }

    fn flag(&self, key: &str) -> Result<bool, Drift> {
        match self.value(key)? {
            Json::Bool(flag) => Ok(*flag),
            _ => Err(self.drift(key)),
        }
    }

    fn finite(&self, key: &str) -> Result<Finite, Drift> {
        self.value(key)?.as_finite().and_then(Finite::new).ok_or_else(|| self.drift(key))
    }

    fn position(&self, key: &str) -> Result<Position, Drift> {
        match self.value(key)? {
            Json::String(text) => Ok(Position::Text(text.clone())),
            Json::Number(_) => self.finite(key).map(Position::Number),
            _ => Err(self.drift(key)),
        }
    }

    fn reading(&self, key: &str) -> Result<Reading, Drift> {
        Reading::read(self.object.get(key)).map_err(|_| self.drift(key))
    }

    fn each<T>(&self, key: &str, mut read: impl FnMut(&Fields<'a>) -> Result<T, Drift>, def: &'a str) -> Result<Vec<T>, Drift> {
        self.list(key)?.iter().map(|item| read(&Fields::of(def, item)?)).collect()
    }

    fn non_empty<T>(&self, key: &str, items: Vec<T>) -> Result<NonEmpty<T>, Drift> {
        NonEmpty::from_vec(items).ok_or_else(|| self.drift(key))
    }
}

/// The parsed form of a node of `kind` whose props passed the schema. `children` are its already-read child nodes.
pub(crate) fn read_node(kind: Kind, object: &JsonObject, children: Vec<Drawn>) -> Result<Node, Drift> {
    let def = kind.name();
    let fields = Fields { def, object };
    Ok(match kind {
        Kind::Text => Node::Text(Text { markdown: fields.text("markdown")? }),
        Kind::Label => Node::Label(Label { text: fields.text("text")?, tone: fields.word("tone")? }),
        Kind::Group => Node::Group(Group { direction: fields.word("direction")?, children: fields.non_empty("children", children)? }),
        Kind::Table => Node::Table(table(&fields)?),
        Kind::Chart => Node::Chart(chart(&fields)?),
        Kind::Stat => Node::Stat(stat(&fields)?),
        Kind::Flow => Node::Flow(flow(&fields)?),
        Kind::Choice => Node::Choice(choice(&fields)?),
        Kind::Form => Node::Form(form(&fields)?),
    })
}

fn table(fields: &Fields) -> Result<Table, Drift> {
    let columns = fields.each(
        "columns",
        |column| {
            let align = match column.object.get("align") {
                None => None,
                Some(_) => Some(column.word::<gen::TableColumnAlign>("align")?),
            };
            Ok(Column { key: column.text("key")?, label: column.text("label")?, align })
        },
        "TableColumn",
    )?;
    let mut rows = Vec::new();
    for row in fields.list("rows")? {
        let row = Fields::of("Table", row)?;
        let mut cells = HashMap::new();
        for (key, cell) in row.object.entries() {
            let cell = match cell {
                Json::Null => Cell::Empty,
                Json::Bool(flag) => Cell::Flag(*flag),
                Json::Number(_) => Cell::Number(row.finite(key)?),
                Json::String(text) => Cell::Text(text.clone()),
                Json::Array(_) | Json::Object(_) => return Err(row.drift(key)),
            };
            cells.insert(key.to_string(), cell);
        }
        rows.push(Row::new(cells));
    }
    Ok(Table { caption: fields.maybe_text("caption")?, columns: fields.non_empty("columns", columns)?, rows })
}

fn chart(fields: &Fields) -> Result<Chart, Drift> {
    let series = fields.each(
        "series",
        |series| {
            let points = series.each(
                "points",
                |point| Ok(Point { x: point.position("x")?, y: point.reading("y")? }),
                "ChartPoint",
            )?;
            Ok(Series { label: series.text("label")?, role: series.word("role")?, points: series.non_empty("points", points)? })
        },
        "ChartSeries",
    )?;
    let annotations = fields.each("annotations", |note| Ok(Annotation { at: note.position("at")?, label: note.text("label")? }), "ChartAnnotation")?;
    Ok(Chart {
        kind: fields.word("kind")?,
        title: fields.maybe_text("title")?,
        unit: fields.maybe_text("unit")?,
        series: fields.non_empty("series", series)?,
        annotations,
    })
}

fn stat(fields: &Fields) -> Result<Stat, Drift> {
    let change = match fields.object.get("change") {
        None => None,
        Some(change) => {
            let change = Fields::of("StatChange", change)?;
            Some(Change { value: change.reading("value")?, as_: change.word("as")? })
        }
    };
    Ok(Stat { label: fields.text("label")?, value: fields.reading("value")?, unit: fields.maybe_text("unit")?, change, tone: fields.word("tone")? })
}

fn flow(fields: &Fields) -> Result<Flow, Drift> {
    let steps = fields.each(
        "steps",
        |step| Ok(Step { id: step.text("id")?, label: step.text("label")?, detail: step.maybe_text("detail")? }),
        "FlowStep",
    )?;
    let mut index_of: HashMap<&str, StepIndex> = HashMap::new();
    for (index, step) in steps.iter().enumerate() {
        index_of.insert(step.id.as_str(), StepIndex::new(index));
    }
    let links = fields.each(
        "links",
        |link| {
            let end = |key: &str| index_of.get(link.text(key)?.as_str()).copied().ok_or_else(|| link.drift(key));
            Ok(Link { from: end("from")?, to: end("to")?, label: link.maybe_text("label")? })
        },
        "FlowLink",
    )?;
    Ok(Flow::new(AtLeastTwo::from_vec(steps).ok_or_else(|| fields.drift("steps"))?, links))
}

fn choice(fields: &Fields) -> Result<Choice, Drift> {
    let options = fields.each(
        "options",
        |option| {
            let emphasis = if option.object.contains_key("emphasis") { Emphasis::Primary } else { Emphasis::Normal };
            Ok(ChoiceOption { id: option.text("id")?, label: option.text("label")?, emphasis })
        },
        "ChoiceOption",
    )?;
    Ok(Choice { id: fields.text("id")?, prompt: fields.maybe_text("prompt")?, options: fields.non_empty("options", options)?, repeat: fields.word("repeat")? })
}

fn form(fields: &Fields) -> Result<Form, Drift> {
    let read_fields = fields.each(
        "fields",
        |field| {
            let options: Option<Vec<String>> = match field.object.get("options") {
                None => None,
                Some(_) => Some(field.list("options")?.iter().map(|option| option.as_str().map(str::to_string).ok_or_else(|| field.drift("options"))).collect::<Result<_, _>>()?),
            };
            let offered = options.clone().map_or(Offered::NotListed, Offered::Listed);
            let input = match field.word::<gen::FormFieldInput>("input")? {
                gen::FormFieldInput::Text => FieldInput::Text(offered),
                gen::FormFieldInput::Number => FieldInput::Number(offered),
                gen::FormFieldInput::Checkbox => FieldInput::Checkbox(offered),
                gen::FormFieldInput::Select => FieldInput::Select(NonEmpty::from_vec(options.unwrap_or_default()).ok_or_else(|| field.drift("options"))?),
            };
            Ok(Field { id: field.text("id")?, label: field.text("label")?, input, required: field.flag("required")? })
        },
        "FormField",
    )?;
    Ok(Form { id: fields.text("id")?, fields: fields.non_empty("fields", read_fields)?, submit_label: fields.text("submitLabel")? })
}

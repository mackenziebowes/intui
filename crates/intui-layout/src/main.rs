//! `intui-layout`: answers layout questions from JSON, so a check can put the same
//! questions to core's TypeScript and to this port and compare.
//!
//! Reads one JSON object on stdin whose keys name a question (`niceStep`,
//! `niceDomain`, `formatValue`, `withUnit`, `placeLabels`, `parseNumber`,
//! `flows`, `charts`, `changes`, `flowDrawings`) and whose values are lists of cases, and prints
//! an object with the same keys holding one answer per case.

mod cli_error;
mod flow_json;

use cli_error::{CaseFault, CliError};
use flow_json::flow_drawing;
use intui_layout::*;
use intui_types::forms::ChartKind;
use intui_types::{Drawn, Node as TreeNode};
use serde_json::{json, Value};
use std::io::Read;
use std::process::ExitCode;

#[derive(Clone, Copy)]
enum Question {
    NiceStep,
    NiceDomain,
    FormatValue,
    WithUnit,
    PlaceLabels,
    ParseNumber,
    Flows,
    Charts,
    Changes,
    FlowDrawings,
}

impl Question {
    const ALL: [Question; 10] = [
        Question::NiceStep,
        Question::NiceDomain,
        Question::FormatValue,
        Question::WithUnit,
        Question::PlaceLabels,
        Question::ParseNumber,
        Question::Flows,
        Question::Charts,
        Question::Changes,
        Question::FlowDrawings,
    ];

    fn name(self) -> &'static str {
        match self {
            Question::NiceStep => "niceStep",
            Question::NiceDomain => "niceDomain",
            Question::FormatValue => "formatValue",
            Question::WithUnit => "withUnit",
            Question::PlaceLabels => "placeLabels",
            Question::ParseNumber => "parseNumber",
            Question::Flows => "flows",
            Question::Charts => "charts",
            Question::Changes => "changes",
            Question::FlowDrawings => "flowDrawings",
        }
    }

    fn from_name(name: &str) -> Option<Question> {
        Question::ALL.into_iter().find(|question| question.name() == name)
    }
}

fn run() -> Result<Value, CliError> {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).map_err(|error| CliError::StdinUnreadable { why: error.to_string() })?;
    let Ok(Value::Object(cases)) = serde_json::from_str::<Value>(&input) else {
        return Err(CliError::NotAnObject);
    };
    let mut answers = serde_json::Map::new();
    for (name, list) in &cases {
        let Some(question) = Question::from_name(name) else {
            return Err(CliError::UnknownQuestion { question: name.clone(), known: Question::ALL.iter().map(|question| question.name()).collect() });
        };
        let Some(list) = list.as_array() else {
            return Err(CliError::QuestionNeedsList { question: name.clone() });
        };
        let answered: Result<Vec<Value>, CliError> = list
            .iter()
            .enumerate()
            .map(|(index, case)| answer(question, case).map_err(|fault| CliError::MalformedCase { question: question.name(), index, fault }))
            .collect();
        answers.insert(name.clone(), Value::Array(answered?));
    }
    Ok(Value::Object(answers))
}

fn main() -> ExitCode {
    match run() {
        Ok(answers) => {
            print!("{answers}");
            ExitCode::SUCCESS
        }
        Err(error) => {
            eprintln!("{error}");
            error.exit_code()
        }
    }
}

fn number(value: &Value) -> Result<f64, CaseFault> {
    value.as_f64().ok_or(CaseFault::WantsNumber)
}

fn kind_of(name: &Value) -> Result<ChartKind, CaseFault> {
    let text = name.as_str().ok_or(CaseFault::WantsMinMaxAndKind)?;
    text.parse().map_err(|_| CaseFault::UnknownChartKind { found: text.to_string() })
}

fn category(value: &Category) -> Value {
    match value {
        Category::Number(number) => json!(number),
        Category::Text(text) => json!(text),
    }
}

fn way(way: Option<Way>) -> Value {
    match way {
        Some(Way::Up) => json!("up"),
        Some(Way::Down) => json!("down"),
        Some(Way::Flat) => json!("flat"),
        None => Value::Null,
    }
}

fn edge(edge: &Edge) -> Value {
    json!({ "from": edge.from.get(), "to": edge.to.get(), "label": edge.label })
}

/// The node `root` parses to as a whole tree, or `None` when it is a kind this build doesn't know.
fn node_of(root: &Value) -> Result<Option<TreeNode>, intui_types::Refusal> {
    let tree = intui_types::parse(&json!({ "v": 1, "root": root }).to_string(), intui_types::Author::Unchecked)?;
    Ok(match tree.root() {
        Drawn::Known(node) => Some(node.clone()),
        Drawn::Unknown { .. } => None,
    })
}

fn answer(question: Question, case: &Value) -> Result<Value, CaseFault> {
    Ok(match question {
        Question::NiceStep => json!(nice_step(number(case)?)),
        Question::NiceDomain => {
            let [min, max, kind] = case.as_array().map(Vec::as_slice).unwrap_or_default() else { return Err(CaseFault::WantsMinMaxAndKind) };
            let domain = nice_domain(number(min)?, number(max)?, kind_of(kind)?);
            json!({ "lo": domain.lo, "hi": domain.hi })
        }
        Question::FormatValue => json!(format_value(number(case)?)),
        Question::WithUnit => {
            let [value, unit] = case.as_array().map(Vec::as_slice).unwrap_or_default() else { return Err(CaseFault::WantsTextAndUnit) };
            json!(with_unit(value.as_str().ok_or(CaseFault::WantsTextAndUnit)?, unit.as_str()))
        }
        Question::PlaceLabels => {
            let numbers = |key: &'static str| -> Result<Vec<f64>, CaseFault> {
                case.get(key).and_then(Value::as_array).ok_or(CaseFault::BadLabelPlacement { key })?.iter().map(|item| item.as_f64().ok_or(CaseFault::BadLabelPlacement { key })).collect()
            };
            let one = |key: &'static str| case.get(key).and_then(Value::as_f64).ok_or(CaseFault::BadLabelPlacement { key });
            let placed = place_labels(&numbers("centers")?, &numbers("widths")?, one("total")?, one("gap")?);
            json!(placed.iter().map(|p| json!({ "index": p.index, "start": p.start })).collect::<Vec<_>>())
        }
        Question::ParseNumber => match parse_number(case.as_str().ok_or(CaseFault::WantsText)?) {
            NumberInput::Value(value) => json!({ "kind": "value", "value": value }),
            NumberInput::Cleared => json!({ "kind": "cleared" }),
            NumberInput::Invalid { note } => json!({ "kind": "invalid", "note": note }),
        },
        Question::Flows => {
            let (Some(steps), Some(links)) = (case.get("steps"), case.get("links")) else { return Err(CaseFault::WantsFlowShape) };
            let flow = match node_of(&json!({ "type": "Flow", "steps": steps, "links": links })) {
                Ok(Some(TreeNode::Flow(flow))) => flow,
                Ok(_) => return Err(CaseFault::WantsFlowShape),
                Err(why) => return Err(CaseFault::FlowRefused { why }),
            };
            let analysis = analyse(&flow);
            json!({
                "edges": analysis.edges.iter().map(edge).collect::<Vec<_>>(),
                "back": analysis.back.iter().map(edge).collect::<Vec<_>>(),
                "layers": analysis.layers.iter().map(|layer| layer.iter().map(|step| step.get()).collect::<Vec<_>>()).collect::<Vec<_>>(),
                "layerOf": analysis.layer_of.iter().map(|layer| layer.get()).collect::<Vec<_>>(),
            })
        }
        Question::Charts => {
            let chart = match node_of(case) {
                Ok(Some(TreeNode::Chart(chart))) => chart,
                Ok(_) => return Err(CaseFault::WantsChartNode),
                Err(why) => return Err(CaseFault::ChartRefused { why }),
            };
            let model = build_model(&chart);
            let domain = match model.scale {
                Scale::Readable(domain) => json!({ "lo": domain.lo, "hi": domain.hi }),
                Scale::Unreadable => Value::Null,
            };
            json!({
                "kind": model.kind.to_string(),
                "unit": model.unit,
                "xs": model.xs.iter().map(category).collect::<Vec<_>>(),
                "series": model.series.iter().map(|s| json!({
                    "label": s.label,
                    "role": s.role.to_string(),
                    "values": (0..model.xs.len()).map(|index| s.value_at(index)).collect::<Vec<_>>(),
                    "kinds": (0..model.xs.len()).map(|index| s.kind_at(index).map(|kind| kind.name())).collect::<Vec<_>>(),
                })).collect::<Vec<_>>(),
                "domain": domain,
                "readable": matches!(model.scale, Scale::Readable(_)),
                "markers": model.markers.iter().map(|m| json!({
                    "n": m.n, "at": category(&m.at), "label": m.label,
                    "index": match m.site { MarkerSite::OnCategory(index) => json!(index), MarkerSite::Unplaced => Value::Null },
                })).collect::<Vec<_>>(),
                "label": chart_label(&model, chart.title.as_deref()),
            })
        }
        Question::FlowDrawings => flow_drawing(case)?,
        Question::Changes => {
            let stat = match node_of(&json!({ "type": "Stat", "label": "x", "value": 1, "change": case })) {
                Ok(Some(TreeNode::Stat(stat))) => stat,
                Ok(_) => return Err(CaseFault::WantsChangeNode),
                Err(why) => return Err(CaseFault::ChangeRefused { why }),
            };
            let Some(change) = stat.change else { return Err(CaseFault::WantsChangeNode) };
            let shape = change_shape(&change);
            json!({ "way": way(shape.way()), "figure": shape.figure(), "kind": shape.kind().name(), "mark": reading_mark(shape.kind()) })
        }
    })
}

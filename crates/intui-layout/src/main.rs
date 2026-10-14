//! `intui-layout`: answers layout questions from JSON, so a check can put the same
//! questions to core's TypeScript and to this port and compare.
//!
//! Reads one JSON object on stdin whose keys name a question (`niceStep`,
//! `niceDomain`, `formatValue`, `withUnit`, `placeLabels`, `parseNumber`,
//! `flows`, `charts`, `changes`) and whose values are lists of cases, and prints
//! an object with the same keys holding one answer per case.

use intui_layout::*;
use intui_types::generated::tree as gen;
use serde_json::{json, Value};
use std::io::Read;
use std::process::ExitCode;

fn main() -> ExitCode {
    let mut input = String::new();
    if std::io::stdin().read_to_string(&mut input).is_err() {
        eprintln!("Couldn't read stdin; pipe a JSON object of layout cases into intui-layout");
        return ExitCode::from(2);
    }
    let Ok(Value::Object(cases)) = serde_json::from_str::<Value>(&input) else {
        eprintln!("Expected a JSON object like {{\"niceStep\": [0.3]}}; the input wasn't one");
        return ExitCode::from(2);
    };
    let mut answers = serde_json::Map::new();
    for (question, list) in &cases {
        let Some(list) = list.as_array() else {
            eprintln!("\"{question}\" needs a list of cases; give a JSON array");
            return ExitCode::from(2);
        };
        let answer: Option<Vec<Value>> = list.iter().map(|case| answer(question, case)).collect();
        let Some(answer) = answer else {
            eprintln!("Don't know how to answer \"{question}\", or a case under it is malformed; the known questions are listed in intui-layout's source");
            return ExitCode::from(2);
        };
        answers.insert(question.clone(), Value::Array(answer));
    }
    print!("{}", Value::Object(answers));
    ExitCode::SUCCESS
}

fn number(value: &Value) -> Option<f64> {
    value.as_f64()
}

fn kind_of(name: &Value) -> Option<gen::ChartKind> {
    name.as_str()?.parse().ok()
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
    json!({ "from": edge.from, "to": edge.to, "label": edge.label })
}

fn answer(question: &str, case: &Value) -> Option<Value> {
    Some(match question {
        "niceStep" => json!(nice_step(number(case)?)),
        "niceDomain" => {
            let [min, max, kind] = case.as_array()?.as_slice() else { return None };
            let domain = nice_domain(number(min)?, number(max)?, kind_of(kind)?);
            json!({ "lo": domain.lo, "hi": domain.hi })
        }
        "formatValue" => json!(format_value(number(case)?)),
        "withUnit" => {
            let [value, unit] = case.as_array()?.as_slice() else { return None };
            json!(with_unit(value.as_str()?, unit.as_str()))
        }
        "placeLabels" => {
            let numbers = |key: &str| -> Option<Vec<f64>> { case.get(key)?.as_array()?.iter().map(number).collect() };
            let placed = place_labels(&numbers("centers")?, &numbers("widths")?, number(case.get("total")?)?, number(case.get("gap")?)?);
            json!(placed.iter().map(|p| json!({ "index": p.index, "start": p.start })).collect::<Vec<_>>())
        }
        "parseNumber" => match parse_number(case.as_str()?) {
            NumberInput::Value(value) => json!({ "kind": "value", "value": value }),
            NumberInput::Cleared => json!({ "kind": "cleared" }),
            NumberInput::Invalid { note } => json!({ "kind": "invalid", "note": note }),
        },
        "flows" => {
            let steps: Vec<gen::FlowStep> = serde_json::from_value(case.get("steps")?.clone()).ok()?;
            let links: Vec<gen::FlowLink> = serde_json::from_value(case.get("links")?.clone()).ok()?;
            let analysis = analyse(&steps, &links);
            json!({
                "edges": analysis.edges.iter().map(edge).collect::<Vec<_>>(),
                "back": analysis.back.iter().map(edge).collect::<Vec<_>>(),
                "layers": analysis.layers,
                "layerOf": analysis.layer_of,
            })
        }
        "charts" => {
            let chart: gen::Chart = serde_json::from_value(case.clone()).ok()?;
            let model = build_model(&chart);
            json!({
                "kind": model.kind.to_string(),
                "unit": model.unit,
                "xs": model.xs.iter().map(category).collect::<Vec<_>>(),
                "series": model.series.iter().map(|s| json!({
                    "label": s.label,
                    "role": s.role.to_string(),
                    "values": s.values,
                    "kinds": s.kinds.iter().map(|k| k.map(|k| k.name())).collect::<Vec<_>>(),
                })).collect::<Vec<_>>(),
                "domain": { "lo": model.domain.lo, "hi": model.domain.hi },
                "readable": model.readable,
                "markers": model.markers.iter().map(|m| json!({
                    "n": m.n, "at": category(&m.at), "label": m.label, "index": m.index,
                })).collect::<Vec<_>>(),
                "label": chart_label(&model, chart.title.as_deref()),
            })
        }
        "changes" => {
            let change: gen::StatChange = serde_json::from_value(case.clone()).ok()?;
            let shape = change_shape(&change);
            json!({ "way": way(shape.way), "figure": shape.figure, "kind": shape.kind.name(), "mark": reading_mark(shape.kind) })
        }
        _ => return None,
    })
}

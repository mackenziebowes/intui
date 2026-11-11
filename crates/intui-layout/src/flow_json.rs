//! The `flowDrawings` question of `intui-layout`: a Flow drawn at given box positions, answered as JSON (which back
//! edges get lanes, where their lines and labels go, where the forward labels go), so TypeScript's answer can be compared.

use super::{edge, node_of};
use crate::cli_error::CaseFault;
use intui_layout::*;
use intui_types::Node as TreeNode;
use serde_json::{json, Value};

fn rect_json(rect: &Rect) -> Value {
    json!({ "left": rect.left, "top": rect.top, "width": rect.width, "height": rect.height })
}

fn point_json(point: &Point) -> Value {
    json!({ "x": point.x, "y": point.y })
}

fn anchor_json(anchor: Anchor) -> Value {
    json!(match anchor {
        Anchor::Start => "start",
        Anchor::Middle => "middle",
        Anchor::End => "end",
    })
}

/// A Flow drawn at given box positions: which back edges get lanes, where their lines and labels go, and
/// where the forward labels go, measured at `charWidth` per character, so TypeScript's answer can be compared.
pub fn flow_drawing(case: &Value) -> Result<Value, CaseFault> {
    let fault = || CaseFault::WantsDrawingShape;
    let (Some(steps), Some(links)) = (case.get("steps"), case.get("links")) else { return Err(fault()) };
    let flow = match node_of(&json!({ "type": "Flow", "steps": steps, "links": links })) {
        Ok(Some(TreeNode::Flow(flow))) => flow,
        Ok(_) => return Err(fault()),
        Err(why) => return Err(CaseFault::FlowRefused { why }),
    };
    let field = |key: &str| case.get(key).and_then(Value::as_f64).ok_or_else(fault);
    let row = case.get("row").and_then(Value::as_bool).ok_or_else(fault)?;
    let char_width = field("charWidth")?;
    let (width, label_room) = (field("width")?, field("labelRoom")?);
    let boxes: Vec<Rect> = case
        .get("boxes")
        .and_then(Value::as_array)
        .ok_or_else(fault)?
        .iter()
        .map(|b| {
            let part = |key: &str| b.get(key).and_then(Value::as_f64).ok_or_else(fault);
            Ok(Rect { left: part("left")?, top: part("top")?, width: part("width")?, height: part("height")? })
        })
        .collect::<Result<_, CaseFault>>()?;
    let room = case.get("room").ok_or_else(fault)?;
    let number = |key: &str| room.get(key).and_then(Value::as_f64).ok_or_else(fault);
    let room = BackRoom {
        lane_pitch: number("lanePitch")?,
        label_room: number("labelRoom")?,
        available: room.get("available").and_then(Value::as_f64).unwrap_or(f64::INFINITY),
        max_lanes: room.get("maxLanes").and_then(Value::as_u64).map(|most| most as usize),
        order: if room.get("order").and_then(Value::as_str) == Some("flat") { Order::Flat } else { Order::Layers },
    };
    let measure = |text: &str| text.chars().count() as f64 * char_width;
    let analysis = analyse(&flow);
    let plan = plan_back(&analysis, &room);
    let geometry = back_geometry(&plan, &boxes, row, &measure, 7.0);
    let curves: Vec<(&Edge, Connector)> = analysis.edges.iter().map(|edge| (edge, connector(boxes[edge.from.get()], boxes[edge.to.get()], row, 7.0))).collect();
    let curve_points: Vec<Point> = curves.iter().flat_map(|(_, curve)| (0..=160).map(|k| curve.at(k as f64 / 160.0))).collect();
    let lines: Vec<Point> = curve_points.into_iter().chain(geometry.routes.iter().flat_map(|route| route.points.iter().copied())).collect();
    let taken: Vec<Rect> = geometry.routes.iter().filter_map(|route| route.label.as_ref().map(|label| label.rect)).collect();
    let labelled: Vec<(String, Connector)> = curves.iter().filter_map(|(edge, curve)| edge.label.clone().map(|label| (label, *curve))).collect();
    let (placed, crowded) = place_flow_labels(&LabelRequest { labels: &labelled, row, boxes: &boxes, lines: &lines, taken: &taken, width, room: label_room, measure: &measure });
    Ok(json!({
        "routes": plan.routes.iter().map(|r| json!({
            "from": r.from.get(), "to": r.to.get(), "label": r.label, "lane": r.lane,
            "fromSlot": { "index": r.from_slot.index, "of": r.from_slot.of },
            "toSlot": { "index": r.to_slot.index, "of": r.to_slot.of },
        })).collect::<Vec<_>>(),
        "noted": plan.noted.iter().map(edge).collect::<Vec<_>>(),
        "lanes": plan.lanes,
        "crossings": plan.crossings,
        "extent": geometry.extent,
        "backLines": geometry.routes.iter().map(|r| r.points.iter().map(point_json).collect::<Vec<_>>()).collect::<Vec<_>>(),
        "backLabels": geometry.routes.iter().map(|r| match &r.label {
            Some(label) => json!({
                "lines": label.lines, "x": label.x, "y": label.y, "anchor": anchor_json(label.anchor), "rect": rect_json(&label.rect),
                "leader": label.leader.map(|(from, to)| json!({ "from": point_json(&from), "to": point_json(&to) })),
            }),
            None => Value::Null,
        }).collect::<Vec<_>>(),
        "labels": placed.iter().map(|label| json!({
            "lines": label.lines, "x": label.x, "y": label.y, "anchor": anchor_json(label.anchor), "rect": rect_json(&label.rect),
        })).collect::<Vec<_>>(),
        "crowded": crowded,
    }))
}

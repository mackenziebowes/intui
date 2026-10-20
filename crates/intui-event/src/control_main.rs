//! `intui-control`: replays events through the control machine (hub #1956) and prints one line per
//! event, so a check can put the same sequence to core's `stepControl` and to this port and compare.
//!
//! Input on stdin: `{ "tree", "source", "control", "canSend", "earlier": null | <event>, "events": [...] }`,
//! where each event is `{ "answered": <event> }`, `"accepted"` or `{ "refused": "why" }`. Each line
//! is the state's kind, then `| ignored: <why>`, `| send <action> <target>` or `| why: <why>`.
//! Unreadable input exits 2 with what to send instead.

use intui_types::{parse_event_json, parse_json, read_json, start_control, step, Answer, Author, ControlAt, ControlEvent, ControlState, Effect, Event, Json, Step};
use std::io::Read;
use std::process::ExitCode;

const SHAPE: &str = "pipe { \"tree\", \"source\", \"control\", \"canSend\", \"earlier\", \"events\" } as JSON into intui-control";

fn answered(json: &Json) -> Result<Answer, String> {
    parse_event_json(json).map(|event| Answer::of(&event)).map_err(|refusal| format!("an answered event was refused ({refusal}); {SHAPE}"))
}

fn run() -> Result<Vec<String>, String> {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).map_err(|error| format!("Couldn't read stdin ({error}); {SHAPE}"))?;
    let json = read_json(&input).map_err(|error| format!("The input isn't JSON ({error:?}); {SHAPE}"))?;
    let object = json.as_object().ok_or(format!("The input isn't an object; {SHAPE}"))?;
    let member = |name: &str| object.get(name).ok_or(format!("The input needs \"{name}\"; {SHAPE}"));
    let tree = parse_json(member("tree")?, Author::Unchecked).map_err(|refusal| format!("The tree was refused: {refusal}"))?;
    // The source and control id reach the machine the way they reach a renderer: from an event that names them.
    let probe = |source: &str, control: &str| -> Result<Event, String> {
        let text = format!("{{\"v\":1,\"source\":{},\"target\":{},\"action\":\"press\",\"value\":\"x\"}}", Json::String(source.into()).stringify(), Json::String(control.into()).stringify());
        parse_event_json(&read_json(&text).map_err(|e| format!("{e:?}"))?).map_err(|refusal| format!("\"source\" and \"control\" must be non-empty text ({refusal}); {SHAPE}"))
    };
    let text = |name: &str| member(name)?.as_str().map(str::to_string).ok_or(format!("\"{name}\" must be text; {SHAPE}"));
    let named = probe(&text("source")?, &text("control")?)?;
    let at = ControlAt { tree: &tree, source: named.source(), id: named.target() };
    let can_send = matches!(member("canSend")?, Json::Bool(true));
    let earlier = match member("earlier")? {
        Json::Null => None,
        event => Some(answered(event)?),
    };
    let mut state: ControlState = start_control(can_send, earlier);
    let mut lines = Vec::new();
    for event in member("events")?.as_array().ok_or(format!("\"events\" must be a list; {SHAPE}"))? {
        let event = match event {
            Json::String(word) if word == "accepted" => ControlEvent::Accepted,
            Json::Object(inner) => match (inner.get("answered"), inner.get("refused")) {
                (Some(answer), None) => ControlEvent::Answered(answered(answer)?),
                (None, Some(Json::String(why))) => ControlEvent::Refused(why.clone()),
                _ => return Err(format!("an event is {{ \"answered\": <event> }}, \"accepted\" or {{ \"refused\": \"why\" }}; {SHAPE}")),
            },
            _ => return Err(format!("an event is {{ \"answered\": <event> }}, \"accepted\" or {{ \"refused\": \"why\" }}; {SHAPE}")),
        };
        let line = match step(at, &state, event) {
            Step::Ignored { state: kept, why } => {
                let line = format!("{} | ignored: {why}", kept.kind_name());
                state = kept;
                line
            }
            Step::Moved { state: next, effects } => {
                let detail = match (&next, effects.first()) {
                    (_, Some(Effect::Send(Event::Press { target, .. }))) => format!(" | send press {}", target.as_str()),
                    (_, Some(Effect::Send(Event::Submit { target, .. }))) => format!(" | send submit {}", target.as_str()),
                    (ControlState::Refused { why, .. }, None) => format!(" | why: {why}"),
                    _ => String::new(),
                };
                let line = format!("{}{detail}", next.kind_name());
                state = next;
                line
            }
        };
        lines.push(line);
    }
    Ok(lines)
}

fn main() -> ExitCode {
    match run() {
        Ok(lines) => {
            for line in lines {
                println!("{line}");
            }
            ExitCode::SUCCESS
        }
        Err(message) => {
            eprintln!("{message}");
            ExitCode::from(2)
        }
    }
}

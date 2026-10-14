//! Event parity: `intui-event` answers a press or a submit, byte for byte, as core's `IntuiEvent.parse`
//! and `Tree.verify` do: "ok" when the event came from the tree, and otherwise core's words for a
//! malformed event or for one that doesn't fit the tree it names.

#[path = "common/mod.rs"]
mod common;

use serde_json::Value;

fn answers_match(chosen: impl Fn(&str) -> bool) {
    let core = common::core_answers("events.ts");
    let cases: Vec<&Value> = core.as_array().expect("a list of events").iter().filter(|case| chosen(case["name"].as_str().unwrap())).collect();
    assert!(!cases.is_empty(), "no event fixture in crates/tests/core/events.ts matches this check; rename it here or there");
    let mut wrong = Vec::new();
    for case in &cases {
        let (name, tree, event, expected) = (case["name"].as_str().unwrap(), case["tree"].as_str().unwrap(), case["event"].as_str().unwrap(), case["answer"].as_str().unwrap());
        let output = common::run(env!("CARGO_BIN_EXE_intui-event"), &format!("{{\"tree\":{tree},\"event\":{event}}}"));
        let (said, code) = if output.status.success() {
            (String::from_utf8_lossy(&output.stdout).trim_end().to_string(), 0)
        } else {
            (String::from_utf8_lossy(&output.stderr).trim_end().to_string(), output.status.code().unwrap_or(-1))
        };
        let expected_code = if expected == "ok" { 0 } else { 1 };
        if said != expected || code != expected_code {
            wrong.push(format!("event \"{name}\":\n  core said (exit {expected_code}):\n    {}\n  Rust said (exit {code}):\n    {}\n  event: {event}", expected.replace('\n', "\n    "), said.replace('\n', "\n    ")));
        }
    }
    assert!(wrong.is_empty(), "{} of {} answers differ from core's:\n\n{}", wrong.len(), cases.len(), wrong.join("\n\n"));
}

#[test]
fn a_press_or_submit_is_judged_against_its_tree_in_core_words() {
    answers_match(|name| !name.starts_with("malformed:"));
}

#[test]
fn a_malformed_event_is_refused_in_core_words() {
    answers_match(|name| name.starts_with("malformed:"));
}

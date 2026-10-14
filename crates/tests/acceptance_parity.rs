//! Acceptance parity: Rust refuses the trees core refuses, with the same places and (where core's
//! advice is formulaic) the same words, and accepts the trees core accepts. A kind this build has
//! never heard of is the one deliberate difference: Rust draws around it.

#[path = "common/mod.rs"]
mod common;

fn text_of(json: &str) -> std::process::Output {
    common::run(env!("CARGO_BIN_EXE_intui-text"), json)
}

fn problem_paths(message: &str) -> Vec<String> {
    let mut paths: Vec<String> = message
        .lines()
        .skip(1)
        .filter_map(|line| line.strip_prefix("- ").and_then(|rest| rest.split_once(": ")).map(|(path, _)| path.to_string()))
        .collect();
    paths.sort();
    paths
}

#[test]
fn rust_accepts_what_core_accepts() {
    let core = common::core_answers("acceptance.ts");
    let mut wrong = Vec::new();
    for case in core["accepted"].as_array().unwrap() {
        assert_eq!(case["verdict"]["ok"], true, "the fixture \"{}\" is meant to be accepted but core refuses it", case["name"]);
        let output = text_of(case["json"].as_str().unwrap());
        if !output.status.success() {
            wrong.push(format!(
                "tree \"{}\": core accepts it, Rust refuses it:\n  {}\n  tree: {}",
                case["name"].as_str().unwrap(),
                String::from_utf8_lossy(&output.stderr).trim_end().replace('\n', "\n  "),
                case["json"].as_str().unwrap()
            ));
        }
    }
    assert!(wrong.is_empty(), "{}", wrong.join("\n\n"));
}

#[test]
fn rust_refuses_what_core_refuses_in_core_words() {
    let core = common::core_answers("acceptance.ts");
    let mut wrong = Vec::new();
    for case in core["refused"].as_array().unwrap() {
        let (name, json, words) = (case["name"].as_str().unwrap(), case["json"].as_str().unwrap(), case["words"].as_str().unwrap());
        assert_eq!(case["verdict"]["ok"], false, "the fixture \"{name}\" is meant to be refused but core accepts it");
        // The one word that differs on purpose: which package to update.
        let expected = case["verdict"]["message"].as_str().unwrap().replace("update @intui/core", "update intui-types");
        let expected = expected.as_str();
        let output = text_of(json);
        let actual = String::from_utf8_lossy(&output.stderr).trim_end().to_string();
        if output.status.code() != Some(1) {
            wrong.push(format!("tree \"{name}\": core refuses it, Rust {} (exit {:?}).\n  core said: {expected}\n  tree: {json}", if output.status.success() { "draws it" } else { "failed oddly" }, output.status.code()));
        } else if words == "same" && actual != expected {
            wrong.push(format!("tree \"{name}\": both refuse it, in different words.\n  core said:\n    {}\n  Rust said:\n    {}\n  tree: {json}", expected.replace('\n', "\n    "), actual.replace('\n', "\n    ")));
        } else if words == "paths" && problem_paths(expected) != problem_paths(&actual) {
            wrong.push(format!("tree \"{name}\": both refuse it, but at different places.\n  core said:\n    {}\n  Rust said:\n    {}\n  tree: {json}", expected.replace('\n', "\n    "), actual.replace('\n', "\n    ")));
        }
    }
    assert!(wrong.is_empty(), "{} refusals differ from core's:\n\n{}", wrong.len(), wrong.join("\n\n"));
}

#[test]
fn a_kind_this_build_does_not_know_is_drawn_around_not_refused() {
    let trees = common::core_answers("newer-trees.ts");
    let mut wrong = Vec::new();
    for case in trees.as_array().unwrap() {
        let (name, json) = (case["name"].as_str().unwrap(), case["json"].as_str().unwrap());
        let (kind, path, neighbour) = (case["kind"].as_str().unwrap(), case["path"].as_str().unwrap(), case["neighbour"].as_str().unwrap());
        assert_eq!(case["coreAccepts"], false, "tree \"{name}\" is meant to hold a kind core doesn't have");
        let output = text_of(json);
        let text = String::from_utf8_lossy(&output.stdout);
        let ok = output.status.success() && text.contains(&format!("\"{kind}\"")) && text.contains(path) && text.contains(neighbour);
        if !ok {
            wrong.push(format!("tree \"{name}\": expected the \"{kind}\" at {path} to show as a notice and \"{neighbour}\" to still be drawn.\n  exit: {:?}\n  stdout: {text}\n  stderr: {}", output.status.code(), String::from_utf8_lossy(&output.stderr)));
        }
    }
    assert!(wrong.is_empty(), "{}", wrong.join("\n\n"));
}

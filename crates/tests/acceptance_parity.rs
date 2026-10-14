//! Acceptance parity: Rust refuses the trees core refuses, with the same places and (where core's
//! advice is formulaic) the same words, and accepts the trees core accepts. A kind this build has
//! never heard of is the one deliberate difference: Rust draws around it.
//!
//! A refusal marked `words: "same"` must read exactly as core's; one marked `"paths"` is only held to naming
//! the same places, so its advice may differ without failing. The fixtures that guard one fixed bug each
//! have a check named for the symptom, and the general checks leave them out.

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

fn accepted(symptom: Option<&str>) {
    let core = common::core_answers("acceptance.ts");
    let mut wrong = Vec::new();
    for case in common::fixtures(&core["accepted"], symptom) {
        assert_eq!(case["verdict"]["ok"], true, "the fixture \"{}\" is meant to be accepted but core refuses it", case["name"]);
        let output = text_of(case["json"].as_str().unwrap());
        if !output.status.success() {
            wrong.push(format!(
                "tree \"{}\": core accepts it, Rust refuses it:\n  {}\n  tree: {}",
                case["name"].as_str().unwrap(),
                String::from_utf8_lossy(&output.stderr).trim_end().replace('\n', "\n  "),
                case["json"].as_str().unwrap().chars().take(400).collect::<String>()
            ));
        }
    }
    assert!(wrong.is_empty(), "{}", wrong.join("\n\n"));
}

fn refused(symptom: Option<&str>) {
    let core = common::core_answers("acceptance.ts");
    let mut wrong = Vec::new();
    for case in common::fixtures(&core["refused"], symptom) {
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
fn rust_accepts_what_core_accepts() {
    accepted(None);
}

#[test]
fn rust_refuses_what_core_refuses_in_core_words() {
    refused(None);
}

#[test]
fn a_group_nested_about_sixty_levels_deep_is_called_not_json() {
    accepted(Some("a Group nested about sixty levels deep is called not JSON"));
}

#[test]
fn a_lone_surrogate_escape_is_called_not_json() {
    accepted(Some("a lone surrogate escape is called not JSON"));
}

#[test]
fn null_on_an_optional_prop_is_read_as_absent() {
    refused(Some("null on an optional prop is read as absent"));
}

#[test]
fn only_the_first_problem_in_a_node_is_listed() {
    refused(Some("only the first problem in a node is listed"));
}

#[test]
fn a_number_too_big_for_a_double_is_called_not_json() {
    refused(Some("a number too big for a double is called not JSON"));
}

#[test]
fn a_tree_nested_past_the_limit_is_refused_by_name_not_crashed() {
    let levels = 20_000;
    let json = format!("{{\"v\":1,\"root\":{}{}{}}}", "{\"type\":\"Group\",\"children\":[".repeat(levels), "{\"type\":\"Text\",\"markdown\":\"x\"}", "]}".repeat(levels));
    let output = text_of(&json);
    let said = String::from_utf8_lossy(&output.stderr);
    assert_eq!(output.status.code(), Some(1), "a tree nested {levels} Groups deep should be refused, not crash; it said: {said}");
    assert!(said.contains("levels deep"), "the refusal should name the nesting limit; it said: {said}");
}

#[test]
fn a_kind_this_build_does_not_know_is_drawn_around_not_refused() {
    let trees = common::core_answers("newer-trees.ts");
    let mut wrong = Vec::new();
    for case in trees.as_array().unwrap() {
        let (name, json) = (case["name"].as_str().unwrap(), case["json"].as_str().unwrap());
        let (kind, path) = (case["kind"].as_str().unwrap(), case["path"].as_str().unwrap());
        let neighbour = case["neighbour"].as_str();
        assert_eq!(case["coreAccepts"], false, "tree \"{name}\" is meant to hold a kind core doesn't have");
        let output = text_of(json);
        let text = String::from_utf8_lossy(&output.stdout);
        let ok = output.status.success() && text.contains(&format!("\"{kind}\"")) && text.contains(path) && neighbour.is_none_or(|neighbour| text.contains(neighbour));
        if !ok {
            wrong.push(format!("tree \"{name}\": expected the \"{kind}\" at {path} to show as a notice and {neighbour:?} to still be drawn.\n  exit: {:?}\n  stdout: {text}\n  stderr: {}", output.status.code(), String::from_utf8_lossy(&output.stderr)));
        }
    }
    assert!(wrong.is_empty(), "{}", wrong.join("\n\n"));
}

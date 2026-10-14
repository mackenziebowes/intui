//! Author parity: the same trees through core with author model, code and none, and through Rust with
//! `--author model`, `--author code` and no flag. Each answer, accepted or refused, must match core's byte
//! for byte, including what a model reads when a Stat or Chart is refused.

#[path = "common/mod.rs"]
mod common;

use std::io::Write;
use std::process::{Command, Stdio};

fn text_with(args: &[&str], json: &str) -> std::process::Output {
    let mut child = Command::new(env!("CARGO_BIN_EXE_intui-text"))
        .args(args)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("intui-text starts");
    child.stdin.take().expect("stdin is piped").write_all(json.as_bytes()).expect("intui-text reads its stdin");
    child.wait_with_output().expect("intui-text finishes")
}

#[test]
fn rust_refuses_what_core_refuses_for_each_author_in_core_words() {
    let core = common::core_answers("authors.ts");
    let mut wrong = Vec::new();
    for case in core.as_array().unwrap() {
        let (name, json) = (case["name"].as_str().unwrap(), case["json"].as_str().unwrap());
        for (author, args) in [("model", vec!["--author", "model"]), ("code", vec!["--author", "code"]), ("none", vec![])] {
            let verdict = &case["verdicts"][author];
            let output = text_with(&args, json);
            let said = String::from_utf8_lossy(&output.stderr).trim_end().to_string();
            if verdict["ok"] == true {
                if !output.status.success() {
                    wrong.push(format!("tree \"{name}\", author {author}: core accepts it, Rust refuses it:\n  {said}"));
                }
            } else {
                let expected = verdict["message"].as_str().unwrap();
                if output.status.code() != Some(1) || said != expected {
                    wrong.push(format!(
                        "tree \"{name}\", author {author}: core refuses it, Rust {}.\n  core said:\n    {}\n  Rust said:\n    {}",
                        if output.status.success() { "draws it" } else { "refuses it differently" },
                        expected.replace('\n', "\n    "),
                        said.replace('\n', "\n    ")
                    ));
                }
            }
        }
    }
    assert!(wrong.is_empty(), "{} answers differ from core's:\n\n{}", wrong.len(), wrong.join("\n\n"));
}

#[test]
fn core_refuses_the_trees_this_check_relies_on() {
    let core = common::core_answers("authors.ts");
    let refused_for_model = core.as_array().unwrap().iter().filter(|case| case["verdicts"]["model"]["ok"] == false).count();
    assert!(refused_for_model >= 3, "the fixtures should hold Stats and Charts core refuses for the model; only {refused_for_model} are refused");
    for case in core.as_array().unwrap() {
        if case["name"].as_str().unwrap().contains("Stat") || case["name"].as_str().unwrap().contains("Chart") {
            assert_eq!(case["verdicts"]["code"]["ok"], case["verdicts"]["none"]["ok"], "author code and no author should agree on \"{}\"", case["name"]);
        }
    }
}

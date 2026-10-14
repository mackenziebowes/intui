//! Layout parity: `intui-layout` answers every question the way `packages/layout` does: nice
//! chart ranges and steps, axis numbers, which labels fit, how a Flow is layered and its cycles
//! broken, how typed numbers are read, and what a change points at.

#[path = "common/mod.rs"]
mod common;

use serde_json::Value;

#[test]
fn layout_answers_match_core_on_the_same_inputs() {
    let core = common::core_answers("layout.ts");
    let output = common::run(env!("CARGO_BIN_EXE_intui-layout"), &core["cases"].to_string());
    assert!(output.status.success(), "intui-layout failed:\n{}", String::from_utf8_lossy(&output.stderr));
    let rust: Value = serde_json::from_slice(&output.stdout).expect("intui-layout prints JSON");

    let mut differences = Vec::new();
    for (question, expected) in core["answers"].as_object().unwrap() {
        let (expected, actual) = (expected.as_array().unwrap(), rust[question.as_str()].as_array().unwrap_or_else(|| panic!("intui-layout answered nothing for \"{question}\"")));
        assert_eq!(expected.len(), actual.len(), "\"{question}\": core answered {} cases, Rust {}", expected.len(), actual.len());
        for (index, (core_answer, rust_answer)) in expected.iter().zip(actual).enumerate() {
            if !same(core_answer, rust_answer) {
                differences.push(format!(
                    "{question}, case {index}\n  input: {}\n  core:  {core_answer}\n  Rust:  {rust_answer}",
                    core["cases"][question.as_str()][index]
                ));
            }
        }
    }
    let shown = differences.iter().take(12).cloned().collect::<Vec<_>>().join("\n\n");
    assert!(differences.is_empty(), "{} layout answers differ from core's (first {}):\n\n{shown}", differences.len(), differences.len().min(12));
}

/// JSON equality where 1 and 1.0 are the same number, as they are in JavaScript.
fn same(a: &Value, b: &Value) -> bool {
    match (a, b) {
        (Value::Number(a), Value::Number(b)) => a.as_f64() == b.as_f64(),
        (Value::Array(a), Value::Array(b)) => a.len() == b.len() && a.iter().zip(b).all(|(a, b)| same(a, b)),
        (Value::Object(a), Value::Object(b)) => a.len() == b.len() && a.iter().all(|(key, a)| b.get(key).is_some_and(|b| same(a, b))),
        _ => a == b,
    }
}

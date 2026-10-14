//! Text-form parity: `intui-text` prints, byte for byte, what core's `Tree.toText()` writes.

#[path = "common/mod.rs"]
mod common;

#[test]
fn text_form_matches_core_byte_for_byte() {
    let core = common::core_answers("text-forms.ts");
    let mut mismatches = Vec::new();
    let cases = core.as_array().expect("core prints a list");
    for case in cases {
        let (name, json, expected) = (case["name"].as_str().unwrap(), case["json"].as_str().unwrap(), case["text"].as_str().unwrap());
        let output = common::run(env!("CARGO_BIN_EXE_intui-text"), json);
        let actual = String::from_utf8_lossy(&output.stdout);
        if !output.status.success() {
            mismatches.push(format!(
                "tree \"{name}\": Rust refused a tree core draws.\n  refusal: {}\n  tree: {json}",
                String::from_utf8_lossy(&output.stderr).trim_end()
            ));
        } else if actual != expected {
            mismatches.push(format!(
                "tree \"{name}\": the text forms differ.\n  core's text:\n{}\n  Rust's text:\n{}\n  tree: {json}",
                indent(expected),
                indent(&actual)
            ));
        }
    }
    assert!(mismatches.is_empty(), "{} of {} text forms differ from core's:\n\n{}", mismatches.len(), cases.len(), mismatches.join("\n\n"));
}

fn indent(text: &str) -> String {
    text.lines().map(|line| format!("    | {line}")).collect::<Vec<_>>().join("\n")
}

//! Text-form parity: `intui-text` prints, byte for byte, what core's `Tree.toText()` writes.

#[path = "common/mod.rs"]
mod common;

fn check(symptom: Option<&str>) {
    let core = common::core_answers("text-forms.ts");
    let cases = common::fixtures(&core, symptom);
    let mut mismatches = Vec::new();
    for case in &cases {
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

#[test]
fn text_form_matches_core_byte_for_byte() {
    check(None);
}

#[test]
fn a_decimal_with_seventeen_digits_comes_out_one_digit_off() {
    check(Some("a decimal with seventeen digits comes out one digit off"));
}

#[test]
fn an_omitted_table_cell_under_a_built_in_property_name_prints_native_code() {
    check(Some("an omitted table cell under a built-in property name prints native code"));
}

fn indent(text: &str) -> String {
    text.lines().map(|line| format!("    | {line}")).collect::<Vec<_>>().join("\n")
}

//! What every parity check shares: running core's side (a bun script) and Rust's side (a built binary).

use serde_json::Value;
use std::io::Write;
use std::path::PathBuf;
use std::process::{Command, Output, Stdio};

pub fn repo_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../..").canonicalize().expect("the repo root exists")
}

/// Runs one of core's answer scripts in `crates/tests/core` and reads the JSON it prints.
pub fn core_answers(script: &str) -> Value {
    let path = repo_root().join("crates/tests/core").join(script);
    let output = Command::new("bun")
        .arg(&path)
        .current_dir(repo_root())
        .output()
        .unwrap_or_else(|error| panic!("couldn't run `bun {}` ({error}); install bun to run the parity checks", path.display()));
    assert!(
        output.status.success(),
        "`bun {}` failed, so core's answers are missing:\n{}",
        path.display(),
        String::from_utf8_lossy(&output.stderr)
    );
    serde_json::from_slice(&output.stdout).unwrap_or_else(|error| panic!("`bun {}` printed something that isn't JSON ({error})", path.display()))
}

/// Runs a built binary with `input` on stdin.
pub fn run(binary: &str, input: &str) -> Output {
    let mut child = Command::new(binary)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .unwrap_or_else(|error| panic!("couldn't start {binary} ({error})"));
    child.stdin.take().expect("stdin is piped").write_all(input.as_bytes()).expect("the binary reads its stdin");
    child.wait_with_output().expect("the binary finishes")
}

/// The fixtures a check is about: those that guard the fixed bug showing `symptom`, or (with `None`) the
/// general ones. A symptom no fixture carries fails loudly, so a renamed fixture can't make a check pass by running nothing.
#[allow(dead_code)] // the layout check has no fixtures to choose between
pub fn fixtures<'a>(cases: &'a Value, symptom: Option<&str>) -> Vec<&'a Value> {
    let chosen: Vec<&Value> = cases.as_array().expect("a list of fixtures").iter().filter(|case| case["symptom"].as_str() == symptom).collect();
    assert!(symptom.is_none() || !chosen.is_empty(), "no fixture in crates/tests/core/trees.ts carries the symptom {symptom:?}; rename it here or there");
    chosen
}

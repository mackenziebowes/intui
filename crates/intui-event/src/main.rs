//! `intui-event`: reads `{ "tree": ..., "event": ... }` as JSON on stdin and prints `ok`, or
//! why the event can't have come from that tree.
//!
//! A refusal prints on stderr and exits 1; unreadable input exits 2. The checks drive this
//! binary against core's `IntuiEvent.parse` and `Tree.verify`.

mod cli_error;

use cli_error::CliError;
use intui_types::{Author, parse_event_json, parse_json, read_json};
use std::io::Read;
use std::process::ExitCode;

fn run() -> Result<(), CliError> {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).map_err(|error| CliError::StdinUnreadable { why: error.to_string() })?;
    let pair = read_json(&input).map_err(CliError::NotJson)?;
    let member = |name: &'static str| pair.as_object().and_then(|object| object.get(name)).ok_or(CliError::NeedsBoth { missing: name });
    let tree = parse_json(member("tree")?, Author::Unchecked).map_err(CliError::TreeRefused)?;
    let event = parse_event_json(member("event")?).map_err(CliError::EventRefused)?;
    match tree.problem_with(&event) {
        Some(problem) => Err(CliError::DoesNotFit(problem)),
        None => Ok(()),
    }
}

fn main() -> ExitCode {
    match run() {
        Ok(()) => {
            println!("ok");
            ExitCode::SUCCESS
        }
        Err(error) => {
            eprintln!("{error}");
            error.exit_code()
        }
    }
}

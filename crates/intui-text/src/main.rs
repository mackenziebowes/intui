//! `intui-text`: reads a tree as JSON on stdin and prints its text form.
//!
//! A tree that can't be shown prints the refusal on stderr and exits 1; unreadable
//! input exits 2. The checks drive this binary against core's `Tree.toText()`.

mod cli_error;

use cli_error::CliError;
use std::io::Read;
use std::process::ExitCode;

fn run() -> Result<String, CliError> {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).map_err(|error| CliError::StdinUnreadable { why: error.to_string() })?;
    let tree = intui_types::parse(&input).map_err(CliError::Refused)?;
    Ok(intui_text::to_text(&tree))
}

fn main() -> ExitCode {
    match run() {
        Ok(text) => {
            print!("{text}");
            ExitCode::SUCCESS
        }
        Err(error) => {
            eprintln!("{error}");
            error.exit_code()
        }
    }
}

//! `intui-text`: reads a tree as JSON on stdin and prints its text form.
//!
//! `--author model` or `--author code` also refuses what that author may not write; with
//! neither, nothing is checked on that account. A tree that can't be shown prints the
//! refusal on stderr and exits 1; unreadable input or arguments exit 2. The checks drive this binary against core's `Tree.toText()`.

mod cli_error;

use cli_error::CliError;
use intui_types::Author;
use std::io::Read;
use std::process::ExitCode;

fn author_from(args: &[String]) -> Result<Author, CliError> {
    match args {
        [] => Ok(Author::Unchecked),
        [flag, who] if flag == "--author" && who == "model" => Ok(Author::Model),
        [flag, who] if flag == "--author" && who == "code" => Ok(Author::Code),
        other => Err(CliError::BadArguments { given: other.join(" ") }),
    }
}

fn run() -> Result<String, CliError> {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let author = author_from(&args)?;
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).map_err(|error| CliError::StdinUnreadable { why: error.to_string() })?;
    let tree = intui_types::parse(&input, author).map_err(CliError::Refused)?;
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

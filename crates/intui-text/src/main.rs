//! `intui-text`: reads a tree as JSON on stdin and prints its text form.
//!
//! A tree that can't be shown prints the refusal on stderr and exits 1; unreadable
//! input exits 2. The checks drive this binary against core's `Tree.toText()`.

use std::io::Read;
use std::process::ExitCode;

fn main() -> ExitCode {
    let mut input = String::new();
    if let Err(error) = std::io::stdin().read_to_string(&mut input) {
        eprintln!("Couldn't read stdin ({error}); pipe a tree as JSON into intui-text");
        return ExitCode::from(2);
    }
    match intui_types::parse(&input) {
        Ok(tree) => {
            print!("{}", intui_text::to_text(&tree));
            ExitCode::SUCCESS
        }
        Err(refusal) => {
            eprintln!("{refusal}");
            ExitCode::from(1)
        }
    }
}

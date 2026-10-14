//! Every word the renderer says on its own account, written once: what a control says while it waits, after it
//! is used up, when the app refused it, when a form can't be sent yet, and what a chart or Flow says it left out.

/// Why a `Source` can't be made from an empty string.
pub const SOURCE_EMPTY: &str =
    "A Source can't be empty: every event carries it so the agent knows which tree the person used. Give it the id of whatever drew the tree, like \"overview@4182\".";

/// What a control says while its press travels to the app.
pub const SENDING: &str = "Sending…";

/// What a used-up control says about the option that was chosen.
pub fn answered(label: &str) -> String {
    format!("Answered: {label}")
}

/// What a control that can be pressed again says after a press went through.
pub fn sent_option(label: &str) -> String {
    format!("Sent “{label}”.")
}

/// What a used-up form's button says.
pub const SENT: &str = "Sent";

/// What the app's refusal looks like by the control, when the app gave its words.
pub fn refused(label: &str, why: &str) -> String {
    format!("Couldn't send “{label}”: {why} Try again.")
}

/// What a refused form says: the app's words, and that nothing the person typed was lost.
pub fn refused_form(why: &str) -> String {
    format!("Couldn't send this: {why} Your answers are still here; try again.")
}

/// What a refusal says when the app gave no words.
pub const REFUSED_NO_WORDS: &str = "The app refused this without saying why.";

/// What a text field that must be filled says.
pub fn fill_in(label: &str) -> String {
    format!("Fill in {label} to send this.")
}

/// What a select field that must be chosen says.
pub fn pick_an_option(label: &str) -> String {
    format!("Pick an option for {label}.")
}

/// What a number field says when what was typed isn't a number; `note` names what was typed.
pub fn use_digits(note: &str) -> String {
    format!("{note}. Use digits, like 42 or 3.5.")
}

/// What a form says when `count` fields stop it from being sent.
pub fn fields_need_fixing(count: usize) -> String {
    if count == 1 {
        "One field needs fixing before this can be sent.".to_string()
    } else {
        format!("{count} fields need fixing before this can be sent.")
    }
}

/// The word shown on a field that must be filled.
pub const REQUIRED: &str = "required";

/// What a select shows with nothing chosen, when the field is required and when it isn't.
pub const CHOOSE: &str = "Choose…";
pub const NONE: &str = "None";

/// What a table with no rows says.
pub const NO_ROWS: &str = "No rows.";

/// What an unknown reading shows where its number would be, and says beside it.
pub const UNKNOWN_DASH: &str = "—";
pub const UNKNOWN_WORD: &str = "unknown";

/// What a chart says when no point has a number to draw.
pub const NOTHING_TO_PLOT: &str = "No point in this chart has a number, so there is nothing to plot.";

/// What a marker's note says when its x is not on the chart, so it has no mark on the plot.
pub fn unplaced_marker_note(label: &str) -> String {
    format!("{label} (not on the chart: no matching x)")
}

/// What an arrow in a Flow that was written as text says, when its arrow would cross boxes.
pub fn back_to(label: &str) -> String {
    format!("Back to {label}")
}

/// What a Flow step says about a link that skips ahead.
pub fn to_step(label: &str) -> String {
    format!("To {label}")
}

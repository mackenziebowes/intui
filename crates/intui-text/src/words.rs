//! The words the text form says on its own account, written once.

/// A component this build doesn't know, standing in the text where it sat.
pub fn unknown_component(kind: &str, path: &str) -> String {
    format!("(can't show a \"{kind}\" at {path}: this build of intui doesn't know that component; update intui to see it)")
}

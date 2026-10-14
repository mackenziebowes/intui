//! Everything the harness can refuse at its edge (its arguments, a tree file, a style file), each with the words it says:
//! what failed, the rule it broke and what to do next.

use std::fmt;
use std::path::PathBuf;

#[derive(Debug)]
pub enum HarnessError {
    NothingToShow,
    UnknownFlag { flag: String },
    FlagNeedsValue { flag: &'static str },
    BadRenderer { given: String },
    RendererNotBuilt { renderer: &'static str },
    BadVisuals { given: String },
    BadRefusal { given: String },
    PathUnreadable { path: PathBuf, why: String },
    NoTreesInDirectory { path: PathBuf },
    StyleNotJson { path: PathBuf, why: String },
    StyleNotAnObject { path: PathBuf },
    StyleUnknownToken { path: PathBuf, token: String },
    StyleBadColor { path: PathBuf, token: String, given: String },
    StyleBadRadius { path: PathBuf, given: String },
    WindowFailed { why: String },
}

const TOKENS: &str = "fg, muted, bg, surface, line, line-strong, accent, on-accent, positive, warning, critical, series-primary, series-baseline, series-comparison, marker, radius";

impl fmt::Display for HarnessError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            HarnessError::NothingToShow => write!(f, "intui-harness needs a tree file or a directory of them; run `intui-harness tree.json`"),
            HarnessError::UnknownFlag { flag } => write!(
                f,
                "intui-harness doesn't know \"{flag}\". Its flags are --style FILE, --visuals dark|light, --renderer wgpu|glow and --refuse TARGET=WORDS, then the path to show"
            ),
            HarnessError::FlagNeedsValue { flag } => write!(f, "{flag} needs a value after it; write {flag} followed by its value"),
            HarnessError::BadRenderer { given } => write!(f, "--renderer takes wgpu or glow; got \"{given}\""),
            HarnessError::RendererNotBuilt { renderer } => write!(f, "this build of intui-harness doesn't include the {renderer} renderer; build with `--features {renderer}`"),
            HarnessError::BadVisuals { given } => write!(f, "--visuals takes dark or light; got \"{given}\""),
            HarnessError::BadRefusal { given } => write!(f, "--refuse takes TARGET=WORDS (the id of a Choice or Form, then what to say); got \"{given}\""),
            HarnessError::PathUnreadable { path, why } => write!(f, "couldn't read {} ({why}); pass a tree file or a directory of .json trees", path.display()),
            HarnessError::NoTreesInDirectory { path } => write!(f, "{} holds no .json files; put trees in it or pass one file", path.display()),
            HarnessError::StyleNotJson { path, why } => write!(f, "the style file {} isn't JSON ({why}); write an object like {{\"accent\": \"#2255cc\"}}", path.display()),
            HarnessError::StyleNotAnObject { path } => write!(f, "the style file {} isn't an object; write one like {{\"accent\": \"#2255cc\"}}", path.display()),
            HarnessError::StyleUnknownToken { path, token } => write!(f, "the style file {} has a token \"{token}\" the harness doesn't know; its tokens are {TOKENS}", path.display()),
            HarnessError::StyleBadColor { path, token, given } => {
                write!(f, "the style file {} gives {token} as {given}, which isn't a colour; write it as \"#rrggbb\" or \"#rrggbbaa\"", path.display())
            }
            HarnessError::WindowFailed { why } => write!(f, "the window couldn't open or stopped with an error ({why}); try --renderer glow, or check that a display is available"),
            HarnessError::StyleBadRadius { path, given } => write!(f, "the style file {} gives radius as {given}; write a number of points, like 6", path.display()),
        }
    }
}

impl std::error::Error for HarnessError {}

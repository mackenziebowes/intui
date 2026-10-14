//! Reading the trees to show: one file, or every `.json` file in a directory in name order.
//!
//! A file that isn't a tree the renderer accepts is kept with the refusal's words, so the window shows why instead of skipping it.

use crate::error::HarnessError;
use intui_egui::Source;
use intui_types::{Author, Tree};
use std::path::{Path, PathBuf};
use std::time::UNIX_EPOCH;

pub enum Shown {
    Tree { name: String, stamp: u128, source: Source, tree: Tree },
    Refused { name: String, stamp: u128, words: String },
}

impl Shown {
    pub fn name(&self) -> &str {
        match self {
            Shown::Tree { name, .. } | Shown::Refused { name, .. } => name,
        }
    }

    /// When the file was last changed; a file that changed is a new tree with a new source.
    fn stamp(&self) -> u128 {
        match self {
            Shown::Tree { stamp, .. } | Shown::Refused { stamp, .. } => *stamp,
        }
    }
}

pub struct Loaded {
    path: PathBuf,
    pub shown: Vec<Shown>,
    /// Whether to put each file's name above it: only when there is more than one.
    pub named: bool,
}

fn unreadable(path: &Path, why: std::io::Error) -> HarnessError {
    HarnessError::PathUnreadable { path: path.to_path_buf(), why: why.to_string() }
}

pub fn load(path: &Path) -> Result<Loaded, HarnessError> {
    let metadata = std::fs::metadata(path).map_err(|why| unreadable(path, why))?;
    if metadata.is_file() {
        return Ok(Loaded { path: path.to_path_buf(), shown: vec![one(path)?], named: false });
    }
    let mut files: Vec<_> = std::fs::read_dir(path)
        .map_err(|why| unreadable(path, why))?
        .filter_map(Result::ok)
        .map(|entry| entry.path())
        .filter(|file| file.extension().is_some_and(|extension| extension == "json"))
        .collect();
    files.sort();
    if files.is_empty() {
        return Err(HarnessError::NoTreesInDirectory { path: path.to_path_buf() });
    }
    let shown = files.iter().map(|file| one(file)).collect::<Result<Vec<_>, _>>()?;
    Ok(Loaded { path: path.to_path_buf(), shown, named: true })
}

fn one(path: &Path) -> Result<Shown, HarnessError> {
    let text = std::fs::read_to_string(path).map_err(|why| unreadable(path, why))?;
    let name = path.file_stem().map_or_else(|| path.display().to_string(), |stem| stem.to_string_lossy().into_owned());
    let stamp = std::fs::metadata(path).and_then(|metadata| metadata.modified()).ok().and_then(|time| time.duration_since(UNIX_EPOCH).ok()).map_or(0, |since| since.as_nanos());
    match intui_types::parse(&text, Author::Unchecked) {
        Ok(tree) => {
            let source = Source::new(format!("{name}@{stamp}")).expect("a source made from a file name is never empty");
            Ok(Shown::Tree { name, stamp, source, tree })
        }
        Err(refusal) => Ok(Shown::Refused { name, stamp, words: refusal.to_string() }),
    }
}

impl Loaded {
    /// Reads the files again; when any changed, replaces what is shown and returns the sources now on screen.
    pub fn reload_if_changed(&mut self) -> Option<Vec<Source>> {
        let fresh = load(&self.path).ok()?;
        let same = fresh.shown.len() == self.shown.len() && fresh.shown.iter().zip(&self.shown).all(|(new, old)| new.name() == old.name() && new.stamp() == old.stamp());
        if same {
            return None;
        }
        *self = fresh;
        Some(self.shown.iter().filter_map(|shown| match shown {
            Shown::Tree { source, .. } => Some(source.clone()),
            Shown::Refused { .. } => None,
        }).collect())
    }
}

//! The harness's arguments, read once at the edge into types that can't be wrong.

use crate::error::HarnessError;
use std::path::PathBuf;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Renderer {
    Wgpu,
    Glow,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Visuals {
    Dark,
    Light,
}

/// Refuse the first press or submit of `target`, with `words`, so the Refused path can be driven.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Refusal {
    pub target: String,
    pub words: String,
}

#[derive(Debug)]
pub struct Arguments {
    pub renderer: Renderer,
    pub visuals: Visuals,
    pub style: Option<PathBuf>,
    pub refusals: Vec<Refusal>,
    pub path: PathBuf,
}

pub fn read(args: impl IntoIterator<Item = String>) -> Result<Arguments, HarnessError> {
    let mut args = args.into_iter();
    let mut renderer = if cfg!(feature = "wgpu") { Renderer::Wgpu } else { Renderer::Glow };
    let mut visuals = Visuals::Dark;
    let mut style = None;
    let mut refusals = Vec::new();
    let mut path = None;
    while let Some(arg) = args.next() {
        match arg.as_str() {
            "--renderer" => {
                let given = args.next().ok_or(HarnessError::FlagNeedsValue { flag: "--renderer" })?;
                renderer = match given.as_str() {
                    "wgpu" if cfg!(feature = "wgpu") => Renderer::Wgpu,
                    "glow" if cfg!(feature = "glow") => Renderer::Glow,
                    "wgpu" => return Err(HarnessError::RendererNotBuilt { renderer: "wgpu" }),
                    "glow" => return Err(HarnessError::RendererNotBuilt { renderer: "glow" }),
                    _ => return Err(HarnessError::BadRenderer { given }),
                };
            }
            "--visuals" => {
                let given = args.next().ok_or(HarnessError::FlagNeedsValue { flag: "--visuals" })?;
                visuals = match given.as_str() {
                    "dark" => Visuals::Dark,
                    "light" => Visuals::Light,
                    _ => return Err(HarnessError::BadVisuals { given }),
                };
            }
            "--style" => style = Some(PathBuf::from(args.next().ok_or(HarnessError::FlagNeedsValue { flag: "--style" })?)),
            "--refuse" => {
                let given = args.next().ok_or(HarnessError::FlagNeedsValue { flag: "--refuse" })?;
                match given.split_once('=') {
                    Some((target, words)) if !target.is_empty() => refusals.push(Refusal { target: target.to_string(), words: words.to_string() }),
                    _ => return Err(HarnessError::BadRefusal { given }),
                }
            }
            flag if flag.starts_with("--") => return Err(HarnessError::UnknownFlag { flag: flag.to_string() }),
            _ => path = Some(PathBuf::from(arg)),
        }
    }
    Ok(Arguments { renderer, visuals, style, refusals, path: path.ok_or(HarnessError::NothingToShow)? })
}

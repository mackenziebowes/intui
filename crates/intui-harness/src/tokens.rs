//! A style file: the same token names as the web renderer's `--intui-*` properties, read into an app `Style`.
//!
//! The promise: a token the file gives wins, and one it leaves out is the renderer's own (`Fallback`), never a made-up default.

use crate::error::HarnessError;
use egui::{Color32, Stroke, Visuals};
use intui_egui::{ButtonLook, ButtonRole, Fallback, FrameLook, FrameRole, SeriesRole, Style, StrokeLook, TextLook, TextRole, ToneLook};
use intui_types::forms::Tone;
use serde_json::Value;
use std::path::Path;

/// A token the file gave, or one it left to the renderer.
#[derive(Clone, Copy, Debug)]
pub enum Token<T> {
    Given(T),
    Left,
}

impl<T: Copy> Token<T> {
    fn or(self, fallback: T) -> T {
        match self {
            Token::Given(value) => value,
            Token::Left => fallback,
        }
    }
}

#[derive(Debug)]
pub struct FileStyle {
    pub fg: Token<Color32>,
    pub muted: Token<Color32>,
    pub bg: Token<Color32>,
    pub surface: Token<Color32>,
    pub line: Token<Color32>,
    pub line_strong: Token<Color32>,
    pub accent: Token<Color32>,
    pub on_accent: Token<Color32>,
    pub positive: Token<Color32>,
    pub warning: Token<Color32>,
    pub critical: Token<Color32>,
    pub series_primary: Token<Color32>,
    pub series_baseline: Token<Color32>,
    pub series_comparison: Token<Color32>,
    pub marker: Token<Color32>,
    pub radius: Token<f32>,
}

fn color(text: &str) -> Option<Color32> {
    let hex = text.strip_prefix('#')?;
    if !hex.is_ascii() || !(hex.len() == 6 || hex.len() == 8) {
        return None;
    }
    let byte = |at: usize| u8::from_str_radix(&hex[at..at + 2], 16).ok();
    let alpha = if hex.len() == 8 { byte(6)? } else { 255 };
    Some(Color32::from_rgba_unmultiplied(byte(0)?, byte(2)?, byte(4)?, alpha))
}

impl FileStyle {
    pub fn none() -> FileStyle {
        FileStyle {
            fg: Token::Left,
            muted: Token::Left,
            bg: Token::Left,
            surface: Token::Left,
            line: Token::Left,
            line_strong: Token::Left,
            accent: Token::Left,
            on_accent: Token::Left,
            positive: Token::Left,
            warning: Token::Left,
            critical: Token::Left,
            series_primary: Token::Left,
            series_baseline: Token::Left,
            series_comparison: Token::Left,
            marker: Token::Left,
            radius: Token::Left,
        }
    }

    pub fn read(path: &Path) -> Result<FileStyle, HarnessError> {
        let text = std::fs::read_to_string(path).map_err(|why| HarnessError::PathUnreadable { path: path.to_path_buf(), why: why.to_string() })?;
        let parsed: Value = serde_json::from_str(&text).map_err(|why| HarnessError::StyleNotJson { path: path.to_path_buf(), why: why.to_string() })?;
        let Value::Object(object) = parsed else { return Err(HarnessError::StyleNotAnObject { path: path.to_path_buf() }) };
        let mut style = FileStyle::none();
        for (name, value) in &object {
            let colour = |slot: &mut Token<Color32>| -> Result<(), HarnessError> {
                let given = value.as_str().and_then(color).ok_or_else(|| HarnessError::StyleBadColor { path: path.to_path_buf(), token: name.clone(), given: value.to_string() })?;
                *slot = Token::Given(given);
                Ok(())
            };
            match name.as_str() {
                "fg" => colour(&mut style.fg)?,
                "muted" => colour(&mut style.muted)?,
                "bg" => colour(&mut style.bg)?,
                "surface" => colour(&mut style.surface)?,
                "line" => colour(&mut style.line)?,
                "line-strong" => colour(&mut style.line_strong)?,
                "accent" => colour(&mut style.accent)?,
                "on-accent" => colour(&mut style.on_accent)?,
                "positive" => colour(&mut style.positive)?,
                "warning" => colour(&mut style.warning)?,
                "critical" => colour(&mut style.critical)?,
                "series-primary" => colour(&mut style.series_primary)?,
                "series-baseline" => colour(&mut style.series_baseline)?,
                "series-comparison" => colour(&mut style.series_comparison)?,
                "marker" => colour(&mut style.marker)?,
                "radius" => {
                    let points = value.as_f64().filter(|points| points.is_finite() && *points >= 0.0).ok_or_else(|| HarnessError::StyleBadRadius { path: path.to_path_buf(), given: value.to_string() })?;
                    style.radius = Token::Given(points as f32);
                }
                other => return Err(HarnessError::StyleUnknownToken { path: path.to_path_buf(), token: other.to_string() }),
            }
        }
        Ok(style)
    }

    /// What sits behind the tree: the app's own background.
    pub fn background(&self, visuals: &Visuals) -> Color32 {
        self.bg.or(visuals.panel_fill)
    }
}

impl Style for FileStyle {
    fn tone(&self, visuals: &Visuals, tone: Tone) -> ToneLook {
        let fallback = Fallback.tone(visuals, tone).color;
        let color = match tone {
            Tone::Neutral => self.fg.or(fallback),
            Tone::Muted => self.muted.or(fallback),
            Tone::Positive => self.positive.or(fallback),
            Tone::Warning => self.warning.or(fallback),
            Tone::Critical => self.critical.or(fallback),
        };
        ToneLook { color }
    }

    fn text(&self, visuals: &Visuals, role: TextRole) -> TextLook {
        let own = Fallback.text(visuals, role);
        let color = match role {
            TextRole::Body | TextRole::Heading(_) | TextRole::Mono | TextRole::Figure | TextRole::Strong => self.fg.or(own.color),
            TextRole::Caption => self.muted.or(own.color),
            TextRole::Link => self.accent.or(own.color),
        };
        TextLook { color, ..own }
    }

    fn frame(&self, visuals: &Visuals, role: FrameRole) -> FrameLook {
        let own = Fallback.frame(visuals, role);
        let rounding = self.radius.or(own.rounding);
        match role {
            FrameRole::Box | FrameRole::Code => FrameLook { fill: self.surface.or(own.fill), stroke: Stroke::new(own.stroke.width, self.line.or(own.stroke.color)), rounding, ..own },
            FrameRole::Control => FrameLook { fill: self.surface.or(own.fill), stroke: Stroke::new(own.stroke.width, self.line_strong.or(own.stroke.color)), rounding, ..own },
            FrameRole::Notice => FrameLook { fill: self.surface.or(own.fill), stroke: Stroke::new(own.stroke.width, self.warning.or(own.stroke.color)), rounding, ..own },
            FrameRole::Apart => FrameLook { fill: self.surface.or(own.fill), stroke: Stroke::new(own.stroke.width, self.line_strong.or(own.stroke.color)), rounding, ..own },
            FrameRole::Said => own,
            FrameRole::Waiting => FrameLook { fill: self.fg.or(own.fill), rounding, ..own },
        }
    }

    fn button(&self, visuals: &Visuals, role: ButtonRole) -> ButtonLook {
        let own = Fallback.button(visuals, role);
        let rounding = self.radius.or(own.rounding);
        match role {
            ButtonRole::Primary => ButtonLook { fill: self.accent.or(own.fill), text: self.on_accent.or(own.text), rounding, ..own },
            ButtonRole::Plain => ButtonLook { fill: self.surface.or(own.fill), text: self.fg.or(own.text), stroke: Stroke::new(1.0, self.line_strong.or(own.stroke.color)), rounding },
            ButtonRole::Chosen => {
                let accent = self.accent.or(own.stroke.color);
                ButtonLook { fill: accent.gamma_multiply(0.25), text: self.fg.or(own.text), stroke: Stroke::new(1.0, accent), rounding }
            }
            ButtonRole::Spent => ButtonLook { text: self.muted.or(own.text), stroke: Stroke::new(1.0, self.line.or(own.stroke.color)), rounding, ..own },
        }
    }

    fn series(&self, visuals: &Visuals, role: SeriesRole) -> StrokeLook {
        let own = Fallback.series(visuals, role);
        let color = match role {
            SeriesRole::Primary => self.series_primary.or(self.accent.or(own.color)),
            SeriesRole::Baseline => self.series_baseline.or(self.muted.or(own.color)),
            SeriesRole::Comparison => self.series_comparison.or(own.color),
            SeriesRole::Marker => self.marker.or(self.warning.or(own.color)),
        };
        StrokeLook { color, dash: own.dash, ..own }
    }

    fn gap(&self, visuals: &Visuals) -> f32 {
        Fallback.gap(visuals)
    }
}

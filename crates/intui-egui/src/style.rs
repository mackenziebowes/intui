//! The app's style rules, and the renderer's own look for an app that gives none.
//!
//! The renderer asks in meanings (a tone, a text role, a frame role, a button role, a series role, a gap) and the app
//! answers in looks. Every `Style` method has a default taken from `Fallback`, which reads the egui `Visuals` the app
//! already themed, so an app overrides only what it cares about and an app that themed egui matches by default.

use egui::{Color32, Stroke, Visuals};
use intui_types::forms::Tone;

/// How a tone shows in text and marks.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct ToneLook {
    pub color: Color32,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum TextRole {
    Body,
    /// 1 is the largest; 6 and beyond share the smallest.
    Heading(u8),
    Caption,
    Mono,
    /// A number that is the point of its component.
    Figure,
    Strong,
    Link,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Family {
    Proportional,
    Monospace,
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct TextLook {
    pub size: f32,
    pub color: Color32,
    pub family: Family,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum FrameRole {
    /// A box that holds a figure, a Flow step or a quote.
    Box,
    /// A block of code.
    Code,
    /// A text field, a select or a checkbox.
    Control,
    /// A note the renderer writes on its own account.
    Notice,
    /// A group boxed as set apart from what is around it.
    Apart,
    /// A group boxed as someone's own words.
    Said,
    /// A group boxed as waiting on the reader: the one dark box.
    Waiting,
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct FrameLook {
    pub fill: Color32,
    pub stroke: Stroke,
    pub rounding: f32,
    pub padding: f32,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ButtonRole {
    /// The action the person is nudged toward.
    Primary,
    Plain,
    /// The option that was chosen in a used-up Choice.
    Chosen,
    /// An option that wasn't chosen in a used-up Choice.
    Spent,
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct ButtonLook {
    pub fill: Color32,
    pub text: Color32,
    pub stroke: Stroke,
    pub rounding: f32,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum SeriesRole {
    Primary,
    Baseline,
    Comparison,
    /// The numbered marks that annotate a chart.
    Marker,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Dash {
    Solid,
    Dashed,
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct StrokeLook {
    pub color: Color32,
    pub width: f32,
    pub dash: Dash,
}

/// The app's answers. `visuals` is the app's own egui `Visuals`, for a rule that wants to follow it.
pub trait Style {
    fn tone(&self, visuals: &Visuals, tone: Tone) -> ToneLook {
        Fallback.tone(visuals, tone)
    }
    fn text(&self, visuals: &Visuals, role: TextRole) -> TextLook {
        Fallback.text(visuals, role)
    }
    fn frame(&self, visuals: &Visuals, role: FrameRole) -> FrameLook {
        Fallback.frame(visuals, role)
    }
    fn button(&self, visuals: &Visuals, role: ButtonRole) -> ButtonLook {
        Fallback.button(visuals, role)
    }
    fn series(&self, visuals: &Visuals, role: SeriesRole) -> StrokeLook {
        Fallback.series(visuals, role)
    }
    /// Space between components, in points.
    fn gap(&self, visuals: &Visuals) -> f32 {
        Fallback.gap(visuals)
    }
}

/// The renderer's own look: the app's `Visuals`, and nothing else.
pub struct Fallback;

impl Fallback {
    fn positive(visuals: &Visuals) -> Color32 {
        if visuals.dark_mode {
            Color32::from_rgb(90, 200, 130)
        } else {
            Color32::from_rgb(30, 130, 70)
        }
    }

    fn comparison(visuals: &Visuals) -> Color32 {
        if visuals.dark_mode {
            Color32::from_rgb(90, 200, 200)
        } else {
            Color32::from_rgb(20, 130, 140)
        }
    }

    pub fn tone(&self, visuals: &Visuals, tone: Tone) -> ToneLook {
        let color = match tone {
            Tone::Neutral => visuals.text_color(),
            Tone::Muted => visuals.weak_text_color(),
            Tone::Positive => Fallback::positive(visuals),
            Tone::Warning => visuals.warn_fg_color,
            Tone::Critical => visuals.error_fg_color,
        };
        ToneLook { color }
    }

    pub fn text(&self, visuals: &Visuals, role: TextRole) -> TextLook {
        let (size, color, family) = match role {
            TextRole::Body => (14.0, visuals.text_color(), Family::Proportional),
            TextRole::Heading(1) => (24.0, visuals.strong_text_color(), Family::Proportional),
            TextRole::Heading(2) => (19.0, visuals.strong_text_color(), Family::Proportional),
            TextRole::Heading(_) => (15.0, visuals.strong_text_color(), Family::Proportional),
            TextRole::Caption => (12.0, visuals.weak_text_color(), Family::Proportional),
            TextRole::Mono => (13.0, visuals.text_color(), Family::Monospace),
            TextRole::Figure => (26.0, visuals.strong_text_color(), Family::Proportional),
            TextRole::Strong => (14.0, visuals.strong_text_color(), Family::Proportional),
            TextRole::Link => (14.0, visuals.hyperlink_color, Family::Proportional),
        };
        TextLook { size, color, family }
    }

    pub fn frame(&self, visuals: &Visuals, role: FrameRole) -> FrameLook {
        let line = visuals.widgets.noninteractive.bg_stroke;
        match role {
            FrameRole::Box => FrameLook { fill: visuals.faint_bg_color, stroke: line, rounding: 4.0, padding: 8.0 },
            FrameRole::Code => FrameLook { fill: visuals.code_bg_color, stroke: Stroke::NONE, rounding: 4.0, padding: 8.0 },
            FrameRole::Control => FrameLook { fill: visuals.extreme_bg_color, stroke: visuals.widgets.inactive.bg_stroke, rounding: 3.0, padding: 4.0 },
            FrameRole::Notice => FrameLook { fill: visuals.faint_bg_color, stroke: Stroke::new(1.0, visuals.warn_fg_color), rounding: 4.0, padding: 8.0 },
            FrameRole::Apart => FrameLook { fill: visuals.panel_fill, stroke: Stroke::new(1.0, visuals.widgets.inactive.bg_stroke.color), rounding: 8.0, padding: 12.0 },
            FrameRole::Said => FrameLook { fill: visuals.panel_fill.lerp_to_gamma(visuals.text_color(), 0.07), stroke: Stroke::NONE, rounding: 8.0, padding: 12.0 },
            FrameRole::Waiting => FrameLook { fill: visuals.text_color(), stroke: Stroke::NONE, rounding: 8.0, padding: 12.0 },
        }
    }

    pub fn button(&self, visuals: &Visuals, role: ButtonRole) -> ButtonLook {
        let line = visuals.widgets.inactive.bg_stroke;
        match role {
            ButtonRole::Primary => ButtonLook { fill: visuals.selection.bg_fill, text: visuals.selection.stroke.color, stroke: Stroke::NONE, rounding: 4.0 },
            ButtonRole::Plain => ButtonLook { fill: visuals.widgets.inactive.weak_bg_fill, text: visuals.text_color(), stroke: line, rounding: 4.0 },
            ButtonRole::Chosen => ButtonLook { fill: visuals.selection.bg_fill, text: visuals.selection.stroke.color, stroke: Stroke::new(1.0, visuals.hyperlink_color), rounding: 4.0 },
            ButtonRole::Spent => ButtonLook { fill: Color32::TRANSPARENT, text: visuals.weak_text_color(), stroke: line, rounding: 4.0 },
        }
    }

    pub fn series(&self, visuals: &Visuals, role: SeriesRole) -> StrokeLook {
        match role {
            SeriesRole::Primary => StrokeLook { color: visuals.hyperlink_color, width: 2.0, dash: Dash::Solid },
            SeriesRole::Baseline => StrokeLook { color: visuals.weak_text_color(), width: 1.5, dash: Dash::Dashed },
            SeriesRole::Comparison => StrokeLook { color: Fallback::comparison(visuals), width: 2.0, dash: Dash::Solid },
            SeriesRole::Marker => StrokeLook { color: visuals.warn_fg_color, width: 1.0, dash: Dash::Solid },
        }
    }

    pub fn gap(&self, _visuals: &Visuals) -> f32 {
        10.0
    }
}

impl Style for Fallback {
    fn tone(&self, visuals: &Visuals, tone: Tone) -> ToneLook {
        Fallback::tone(self, visuals, tone)
    }
    fn text(&self, visuals: &Visuals, role: TextRole) -> TextLook {
        Fallback::text(self, visuals, role)
    }
    fn frame(&self, visuals: &Visuals, role: FrameRole) -> FrameLook {
        Fallback::frame(self, visuals, role)
    }
    fn button(&self, visuals: &Visuals, role: ButtonRole) -> ButtonLook {
        Fallback::button(self, visuals, role)
    }
    fn series(&self, visuals: &Visuals, role: SeriesRole) -> StrokeLook {
        Fallback::series(self, visuals, role)
    }
    fn gap(&self, visuals: &Visuals) -> f32 {
        Fallback::gap(self, visuals)
    }
}

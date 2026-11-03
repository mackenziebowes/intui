//! One call of `show`: the tree being drawn, the app's style, the controls, and the events collected so far.
//!
//! Every kind's drawing asks the `Scene` for looks in meanings and names itself to accessibility with its text form.

use crate::controls::{self, Controls, Source};
use crate::draw;
use crate::style::{ButtonLook, ButtonRole, Family, FrameLook, FrameRole, SeriesRole, Style, StrokeLook, TextLook, TextRole, ToneLook};
use egui::text::LayoutJob;
use egui::{Color32, CornerRadius, FontFamily, FontId, Galley, Response, Ui, Visuals, WidgetInfo, WidgetType};
use intui_types::forms::Tone;
use intui_types::{Answer, ControlEvent, Drawn, Event, Node, Tree};
use std::sync::Arc;

pub(crate) struct Scene<'a> {
    pub style: &'a dyn Style,
    pub visuals: Visuals,
    pub source: &'a Source,
    pub controls: &'a mut Controls,
    pub tree: &'a Tree,
    pub events: Vec<Event>,
    /// Inside a `waiting` box: (the box's ground, the ink drawn on it). The app's palette is for the page's ground, so
    /// the text and tones read from it are pulled to the ink here and none loses contrast on the dark.
    pub inverse: Option<(Color32, Color32)>,
}

impl Scene<'_> {
    pub fn tone(&self, tone: Tone) -> ToneLook {
        let look = self.style.tone(&self.visuals, tone);
        match self.inverse {
            None => look,
            Some((ground, ink)) => ToneLook {
                color: match tone {
                    Tone::Neutral => ink,
                    Tone::Muted => ink.lerp_to_gamma(ground, 0.28),
                    _ => look.color.lerp_to_gamma(ink, 0.6),
                },
            },
        }
    }

    pub fn text(&self, role: TextRole) -> TextLook {
        let look = self.style.text(&self.visuals, role);
        match self.inverse {
            None => look,
            Some((ground, ink)) => TextLook { color: if role == TextRole::Caption { ink.lerp_to_gamma(ground, 0.28) } else { ink }, ..look },
        }
    }

    pub fn frame(&self, role: FrameRole) -> FrameLook {
        self.style.frame(&self.visuals, role)
    }

    pub fn button(&self, role: ButtonRole) -> ButtonLook {
        self.style.button(&self.visuals, role)
    }

    pub fn series(&self, role: SeriesRole) -> StrokeLook {
        self.style.series(&self.visuals, role)
    }

    pub fn gap(&self) -> f32 {
        self.style.gap(&self.visuals)
    }

    /// Draws one node. `path` names where it sits, so two nodes never share an egui id.
    pub fn drawn(&mut self, ui: &mut Ui, drawn: &Drawn, path: &str) {
        ui.push_id(path, |ui| match drawn {
            Drawn::Unknown { .. } => draw::unknown::draw(self, ui, drawn),
            Drawn::Known(node) => match node {
                Node::Text(text) => draw::text::draw(self, ui, drawn, text),
                Node::Label(label) => draw::figure::label(self, ui, drawn, label),
                Node::Stat(stat) => draw::figure::stat(self, ui, drawn, stat),
                Node::Group(group) => draw::group::draw(self, ui, group, path),
                Node::Table(table) => draw::table::draw(self, ui, drawn, table),
                Node::Chart(chart) => draw::chart::draw(self, ui, drawn, chart),
                Node::Flow(flow) => draw::flow::draw(self, ui, drawn, flow),
                // Marks and Ladder (proposal 005) are drawn as their text form here until this renderer gets glyphs.
                // Areas and Tabs (proposal 009) are drawn as their text form here too: Casement draws them for real.
                Node::Marks(_) | Node::Ladder(_) | Node::Areas(_) | Node::Tabs(_) => draw::unknown::draw(self, ui, drawn),
                Node::Choice(choice) => draw::choice::draw(self, ui, drawn, choice),
                Node::Form(form) => draw::form::draw(self, ui, drawn, form),
            },
        });
    }

    /// Hands a press or submit to the app, and the control waits for its answer. An event the tree itself can't have
    /// produced is never sent: the control shows why instead.
    pub fn send(&mut self, event: Event) {
        let (_, sends) = controls::feed(self.controls, self.tree, &event, ControlEvent::Answered(Answer::of(&event)));
        self.events.extend(sends);
    }

    /// The text form of `drawn`, worked out once per place in the tree: it's what accessibility reads.
    pub fn text_form(&self, ui: &Ui, drawn: &Drawn) -> Arc<String> {
        let key = ui.id().with("text-form");
        if let Some(found) = ui.ctx().data(|data| data.get_temp::<Arc<String>>(key)) {
            return found;
        }
        let made = Arc::new(intui_text::drawn_text(drawn));
        ui.ctx().data_mut(|data| data.insert_temp(key, made.clone()));
        made
    }

    /// Names a drawn component to accessibility, with its text form.
    pub fn name(&self, ui: &Ui, response: &Response, drawn: &Drawn, kind: WidgetType) {
        let text = self.text_form(ui, drawn);
        response.widget_info(|| WidgetInfo::labeled(kind, true, text.as_str()));
    }
}

pub(crate) fn font(look: &TextLook) -> FontId {
    let family = match look.family {
        Family::Proportional => FontFamily::Proportional,
        Family::Monospace => FontFamily::Monospace,
    };
    FontId::new(look.size, family)
}

pub(crate) fn rounding(points: f32) -> CornerRadius {
    CornerRadius::same(points.round().clamp(0.0, 255.0) as u8)
}

/// Text laid out in `look` and `color`, wrapped at `wrap` points (`f32::INFINITY` for one line).
pub(crate) fn galley(ui: &Ui, text: &str, look: &TextLook, color: Color32, wrap: f32) -> Arc<Galley> {
    let mut job = LayoutJob::simple(text.to_string(), font(look), color, wrap);
    job.wrap.max_width = wrap;
    ui.painter().layout_job(job)
}

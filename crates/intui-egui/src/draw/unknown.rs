//! A node of a kind this build doesn't know: a notice that says what it was and where (the words of its text form),
//! so the rest of the tree still draws and nothing is silently missing.

use crate::scene::{galley, rounding, Scene};
use crate::style::{FrameRole, TextRole};
use egui::{Frame, Sense, Ui, WidgetType};
use intui_types::Drawn;

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn) {
    let notice = scene.text_form(ui, drawn);
    let frame = scene.frame(FrameRole::Notice);
    let look = scene.text(TextRole::Body);
    let response = Frame::new()
        .fill(frame.fill)
        .stroke(frame.stroke)
        .corner_radius(rounding(frame.rounding))
        .inner_margin(frame.padding)
        .show(ui, |ui| {
            let text = galley(ui, &notice, &look, look.color, ui.available_width());
            let (rect, _) = ui.allocate_exact_size(text.size(), Sense::hover());
            ui.painter().galley(rect.min, text, look.color);
        })
        .response;
    scene.name(ui, &response, drawn, WidgetType::Label);
}

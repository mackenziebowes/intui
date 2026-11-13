//! Label and Stat: a tone drawn as a small tag, and a figure (with its note, the reason in words, under it) whose reading says how sure it is: `≥` before a floor,
//! `~` before an estimate, and a dash with the word "unknown" where no number could be read.

use crate::scene::{font, galley, rounding, Scene};
use crate::style::{FrameRole, TextLook, TextRole};
use crate::words;
use egui::text::{LayoutJob, TextFormat};
use egui::{Color32, Frame, Pos2, Sense, Shape, Stroke, StrokeKind, Ui, Vec2, WidgetType};
use intui_layout::{change_shape, reading_mark, Way};
use intui_text::numbers::{format_number, shown_number};
use intui_types::forms::{Label, Stat, StatChangeAs};
use intui_types::{Drawn, Finite, Reading, ReadingKind};

const LABEL_PAD: Vec2 = Vec2::new(6.0, 2.0);

/// How wide a Label draws.
pub(crate) fn label_width(scene: &Scene, ui: &Ui, label: &Label) -> f32 {
    let look = scene.text(TextRole::Body);
    galley(ui, &label.text, &look, look.color, f32::INFINITY).size().x + LABEL_PAD.x * 2.0
}

pub(crate) fn label(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, label: &Label) {
    let tone = scene.tone(label.tone).color;
    let frame = scene.frame(FrameRole::Box);
    let look = scene.text(TextRole::Body);
    let text = galley(ui, &label.text, &look, tone, f32::INFINITY);
    let pad = LABEL_PAD;
    let (rect, response) = ui.allocate_exact_size(text.size() + pad * 2.0, Sense::hover());
    ui.painter().rect(rect, rounding(frame.rounding), frame.fill, Stroke::new(1.0, tone.gamma_multiply(0.6)), StrokeKind::Inside);
    ui.painter().galley(rect.min + pad, text, tone);
    scene.name(ui, &response, drawn, WidgetType::Label);
}

/// A reading as a layout job: its mark, its number and unit, and the word that stands in for a number that couldn't be read.
fn reading_job(scene: &Scene, reading: Reading, unit: Option<&str>, signed: bool, look: &TextLook, color: Color32) -> LayoutJob {
    let muted = scene.text(TextRole::Caption).color;
    let mut job = LayoutJob::default();
    let plain = TextFormat { font_id: font(look), color, ..TextFormat::default() };
    let marked = TextFormat { font_id: font(look), color: muted, ..TextFormat::default() };
    match reading.value() {
        Some(value) => {
            let shown = shown_number(value);
            let plus = if signed && shown > 0.0 { "+" } else { "" };
            job.append(reading_mark(reading.kind()), 0.0, marked);
            job.append(&format!("{plus}{}", format_number(shown, unit)), 0.0, plain);
        }
        None => {
            job.append(words::UNKNOWN_DASH, 0.0, marked);
            let small = TextFormat { font_id: font(&scene.text(TextRole::Caption)), color: muted, ..TextFormat::default() };
            job.append(&format!(" {}", words::UNKNOWN_WORD), 0.0, small);
        }
    }
    job
}

fn arrow(ui: &mut Ui, way: Way, color: Color32) {
    let (rect, _) = ui.allocate_exact_size(Vec2::splat(10.0), Sense::hover());
    let (l, r, t, b) = (rect.left(), rect.right(), rect.top(), rect.bottom());
    let shape = match way {
        Way::Up => Shape::convex_polygon(vec![Pos2::new(l, b - 1.0), Pos2::new(r, b - 1.0), Pos2::new((l + r) / 2.0, t + 1.0)], color, Stroke::NONE),
        Way::Down => Shape::convex_polygon(vec![Pos2::new(l, t + 1.0), Pos2::new(r, t + 1.0), Pos2::new((l + r) / 2.0, b - 1.0)], color, Stroke::NONE),
        Way::Flat => Shape::convex_polygon(
            vec![Pos2::new(l, rect.center().y - 1.0), Pos2::new(r, rect.center().y - 1.0), Pos2::new(r, rect.center().y + 1.0), Pos2::new(l, rect.center().y + 1.0)],
            color,
            Stroke::NONE,
        ),
    };
    ui.painter().add(shape);
}

pub(crate) fn stat(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, stat: &Stat) {
    let tone = scene.tone(stat.tone).color;
    let frame = scene.frame(FrameRole::Box);
    let caption = scene.text(TextRole::Caption);
    let figure = scene.text(TextRole::Figure);
    let body = scene.text(TextRole::Body);
    let unit = stat.unit.as_deref().filter(|unit| !unit.is_empty());
    let response = Frame::new()
        .fill(frame.fill)
        .stroke(frame.stroke)
        .corner_radius(rounding(frame.rounding))
        .inner_margin(frame.padding)
        .show(ui, |ui| {
            ui.spacing_mut().item_spacing.y = 2.0;
            let label = galley(ui, &stat.label, &caption, caption.color, ui.available_width());
            let (rect, _) = ui.allocate_exact_size(label.size(), Sense::hover());
            ui.painter().galley(rect.min, label, caption.color);
            let value = ui.painter().layout_job(reading_job(scene, stat.value, unit, false, &figure, tone));
            let (rect, _) = ui.allocate_exact_size(value.size(), Sense::hover());
            ui.painter().galley(rect.min, value, tone);
            if let Some(change) = &stat.change {
                let shape = change_shape(change);
                let percent = matches!(change.as_, StatChangeAs::Percent).then_some("%");
                ui.horizontal(|ui| {
                    ui.spacing_mut().item_spacing.x = 4.0;
                    if let Some(way) = shape.way() {
                        arrow(ui, way, tone);
                    }
                    let text = match shape.figure() {
                        Some(figure) => {
                            let reading = match shape.kind() {
                                ReadingKind::AtLeast => Reading::AtLeast(finite(figure)),
                                ReadingKind::Estimate => Reading::Estimate(finite(figure)),
                                ReadingKind::Exact => Reading::Exact(finite(figure)),
                                ReadingKind::Unknown => Reading::Unknown,
                            };
                            reading_job(scene, reading, percent, false, &body, tone)
                        }
                        None => reading_job(scene, Reading::Unknown, None, false, &body, tone),
                    };
                    let galley = ui.painter().layout_job(text);
                    let (rect, _) = ui.allocate_exact_size(galley.size(), Sense::hover());
                    ui.painter().galley(rect.min, galley, tone);
                });
            }
            // The reason in words, wrapped so none of it is lost (proposal 006).
            if let Some(note) = stat.note.as_deref().filter(|note| !note.is_empty()) {
                let galley = galley(ui, note, &caption, caption.color, ui.available_width());
                let (rect, _) = ui.allocate_exact_size(galley.size(), Sense::hover());
                ui.painter().galley(rect.min, galley, caption.color);
            }
        })
        .response;
    scene.name(ui, &response, drawn, WidgetType::Label);
}

fn finite(number: f64) -> Finite {
    Finite::new(number).expect("a figure shown from a finite reading is finite")
}

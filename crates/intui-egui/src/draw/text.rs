//! Text: Markdown drawn from `pulldown-cmark`'s events with egui's painter. Code scrolls sideways and never clips,
//! and links open only when their address is http, https or mailto.

use crate::markdown::{self, Block, Span};
use crate::scene::{font, galley, rounding, Scene};
use crate::style::{FrameRole, TextLook, TextRole};
use egui::text::{LayoutJob, TextFormat};
use egui::{Color32, CursorIcon, Frame, OpenUrl, Pos2, ScrollArea, Sense, Stroke, Ui, Vec2, WidgetType};
use intui_types::forms::Text;
use intui_types::Drawn;
use std::sync::Arc;

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, text: &Text) {
    let blocks = blocks_of(ui, &text.markdown);
    let response = ui
        .scope(|ui| {
            ui.spacing_mut().item_spacing.y = 6.0;
            show_blocks(scene, ui, &blocks);
        })
        .response;
    scene.name(ui, &response, drawn, WidgetType::Label);
}

/// A paragraph, drawn at `ui`'s width; also what Choice prompts, notices and the like use.
pub(crate) fn markdown_inline(scene: &Scene, ui: &mut Ui, markdown: &str, role: TextRole) {
    let blocks = blocks_of(ui, markdown);
    let base = scene.text(role);
    for block in blocks.iter() {
        match block {
            Block::Paragraph(spans) => paragraph(scene, ui, spans, &base),
            other => show_blocks(scene, ui, std::slice::from_ref(other)),
        }
    }
}

/// The blocks of `markdown`, read once per place in the tree.
fn blocks_of(ui: &Ui, markdown: &str) -> Arc<Vec<Block>> {
    let key = ui.id().with(("blocks", markdown.len()));
    if let Some(found) = ui.ctx().data(|data| data.get_temp::<Arc<Vec<Block>>>(key)) {
        return found;
    }
    let made = Arc::new(markdown::parse(markdown));
    ui.ctx().data_mut(|data| data.insert_temp(key, made.clone()));
    made
}

fn show_blocks(scene: &Scene, ui: &mut Ui, blocks: &[Block]) {
    for (index, block) in blocks.iter().enumerate() {
        ui.push_id(index, |ui| match block {
            Block::Paragraph(spans) => paragraph(scene, ui, spans, &scene.text(TextRole::Body)),
            Block::Heading { level, spans } => {
                ui.add_space(4.0);
                paragraph(scene, ui, spans, &scene.text(TextRole::Heading(*level)))
            }
            Block::Code(code) => code_block(scene, ui, code),
            Block::Quote(inner) => {
                ui.indent("quote", |ui| show_blocks(scene, ui, inner));
            }
            Block::List { first, items } => list(scene, ui, *first, items),
            Block::Rule => {
                let (rect, _) = ui.allocate_exact_size(Vec2::new(ui.available_width(), 8.0), Sense::hover());
                let stroke = scene.frame(FrameRole::Box).stroke;
                ui.painter().hline(rect.x_range(), rect.center().y, stroke);
            }
            Block::Table { head, rows } => markdown_table(scene, ui, head, rows),
        });
    }
}

fn list(scene: &Scene, ui: &mut Ui, first: Option<u64>, items: &[Vec<Block>]) {
    let body = scene.text(TextRole::Body);
    for (index, item) in items.iter().enumerate() {
        ui.push_id(index, |ui| {
            ui.horizontal_top(|ui| {
                let marker = match first {
                    Some(start) => format!("{}.", start + index as u64),
                    None => "•".to_string(),
                };
                let marker = galley(ui, &marker, &body, scene.text(TextRole::Caption).color, f32::INFINITY);
                let width = marker.size().x.max(14.0);
                let (rect, _) = ui.allocate_exact_size(Vec2::new(width + 4.0, marker.size().y), Sense::hover());
                ui.painter().galley(Pos2::new(rect.right() - marker.size().x - 4.0, rect.top()), marker, body.color);
                ui.vertical(|ui| show_blocks(scene, ui, item));
            });
        });
    }
}

fn code_block(scene: &Scene, ui: &mut Ui, code: &str) {
    let look = scene.frame(FrameRole::Code);
    let mono = scene.text(TextRole::Mono);
    Frame::new().fill(look.fill).stroke(look.stroke).corner_radius(rounding(look.rounding)).inner_margin(look.padding).show(ui, |ui| {
        ui.set_width(ui.available_width());
        ScrollArea::horizontal().id_salt("code").auto_shrink([false, true]).show(ui, |ui| {
            let galley = galley(ui, code, &mono, mono.color, f32::INFINITY);
            let (rect, _) = ui.allocate_exact_size(galley.size(), Sense::hover());
            ui.painter().galley(rect.min, galley, mono.color);
        });
    });
}

fn markdown_table(scene: &Scene, ui: &mut Ui, head: &[Vec<Span>], rows: &[Vec<Vec<Span>>]) {
    let body = scene.text(TextRole::Body);
    let strong = scene.text(TextRole::Strong);
    ScrollArea::horizontal().id_salt("md-table").auto_shrink([false, true]).show(ui, |ui| {
        egui::Grid::new("grid").spacing([16.0, 4.0]).show(ui, |ui| {
            for cell in head {
                inline(scene, ui, cell, &strong, f32::INFINITY);
            }
            ui.end_row();
            for row in rows {
                for cell in row {
                    inline(scene, ui, cell, &body, f32::INFINITY);
                }
                ui.end_row();
            }
        });
    });
}

fn paragraph(scene: &Scene, ui: &mut Ui, spans: &[Span], base: &TextLook) {
    inline(scene, ui, spans, base, ui.available_width());
}

/// Where in a job's text a link run sits, in characters.
struct LinkRun {
    from: usize,
    to: usize,
    url: String,
}

fn job(scene: &Scene, spans: &[Span], base: &TextLook, wrap: f32) -> (LayoutJob, Vec<LinkRun>) {
    let mut job = LayoutJob::default();
    job.wrap.max_width = wrap;
    let code_look = scene.text(TextRole::Mono);
    let code_fill = scene.frame(FrameRole::Code).fill;
    let strong = scene.text(TextRole::Strong);
    let link = scene.text(TextRole::Link);
    let mut links = Vec::new();
    let mut at = 0usize;
    for span in spans {
        let mut format = TextFormat { font_id: font(base), color: base.color, ..TextFormat::default() };
        if span.code {
            format.font_id = font(&TextLook { size: base.size.min(code_look.size.max(base.size - 1.0)), ..code_look });
            format.color = code_look.color;
            format.background = code_fill;
        }
        if span.strong {
            format.color = strong.color;
        }
        if span.emphasis {
            format.italics = true;
        }
        if span.strike {
            format.strikethrough = Stroke::new(1.0, format.color);
        }
        if let Some(url) = &span.link {
            format.color = link.color;
            format.underline = Stroke::new(1.0, link.color);
            let length = span.text.chars().count();
            links.push(LinkRun { from: at, to: at + length, url: url.clone() });
        }
        at += span.text.chars().count();
        job.append(&span.text, 0.0, format);
    }
    (job, links)
}

fn inline(scene: &Scene, ui: &mut Ui, spans: &[Span], base: &TextLook, wrap: f32) {
    let (job, links) = job(scene, spans, base, wrap);
    let galley = ui.painter().layout_job(job);
    let sense = if links.is_empty() { Sense::hover() } else { Sense::click() };
    let (rect, response) = ui.allocate_exact_size(galley.size(), sense);
    ui.painter().galley(rect.min, galley.clone(), Color32::PLACEHOLDER);
    if links.is_empty() {
        return;
    }
    let under_pointer = response.hover_pos().and_then(|pos| {
        let at = galley.cursor_from_pos(pos - rect.min).index.0;
        links.iter().find(|run| (run.from..run.to).contains(&at))
    });
    if under_pointer.is_some() {
        ui.ctx().set_cursor_icon(CursorIcon::PointingHand);
    }
    if response.clicked() {
        if let Some(run) = response.interact_pointer_pos().and_then(|pos| {
            let at = galley.cursor_from_pos(pos - rect.min).index.0;
            links.iter().find(|run| (run.from..run.to).contains(&at))
        }) {
            ui.ctx().open_url(OpenUrl::new_tab(run.url.clone()));
        }
    }
}

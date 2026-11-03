//! Group: children in a column, or in a row that wraps when it gets narrow. Each child of a row gets an equal share of
//! the width, but never less than its kind needs (a line of text less than a block of it), and the row breaks onto a
//! new line instead of squeezing a child below that.

use crate::draw::figure::label_width;
use crate::scene::Scene;
use egui::{Align, Frame, Layout, Spacing, Ui, Vec2, Visuals};
use crate::style::FrameRole;
use intui_types::forms::{Group, GroupBox, GroupDirection};
use intui_types::{Drawn, Node};

/// The narrowest a component that needs room gets inside a row, in points.
const MIN_BLOCK: f32 = 240.0;
/// The narrowest a Label, Stat or Choice gets inside a row.
const MIN_LINE: f32 = 150.0;

/// What a child that is a short tag wants, so it doesn't take a share of the row; `None` for one that shares.
fn natural_width(scene: &Scene, ui: &Ui, drawn: &Drawn) -> Option<f32> {
    match drawn {
        Drawn::Known(Node::Label(label)) => Some(label_width(scene, ui, label)),
        Drawn::Known(_) | Drawn::Unknown { .. } => None,
    }
}

fn least_width(drawn: &Drawn) -> f32 {
    match drawn {
        Drawn::Unknown { .. } => MIN_BLOCK,
        Drawn::Known(node) => match node {
            Node::Text(_) | Node::Table(_) | Node::Chart(_) | Node::Flow(_) | Node::Marks(_) | Node::Ladder(_) | Node::Form(_) => MIN_BLOCK,
            Node::Group(group) => match group.direction {
                GroupDirection::Column => MIN_BLOCK,
                GroupDirection::Row => MIN_LINE,
            },
            Node::Label(_) | Node::Stat(_) | Node::Choice(_) => MIN_LINE,
        },
    }
}

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, group: &Group, path: &str) {
    let role = match group.boxed {
        None => return draw_children(scene, ui, group, path),
        Some(GroupBox::Apart) => FrameRole::Apart,
        Some(GroupBox::Said) => FrameRole::Said,
        Some(GroupBox::Waiting) => FrameRole::Waiting,
    };
    let look = scene.frame(role);
    let waiting = role == FrameRole::Waiting;
    // The dark box re-inks everything inside it: the text and tones are read from `Visuals`, so swap those for the box.
    let outer = scene.visuals.clone();
    let outside = scene.inverse;
    if waiting {
        scene.inverse = Some((look.fill, outer.panel_fill));
        scene.visuals = inverted(&outer);
        ui.style_mut().visuals = scene.visuals.clone();
    }
    Frame::new().fill(look.fill).stroke(look.stroke).corner_radius(look.rounding).inner_margin(look.padding).show(ui, |ui| {
        ui.set_width(ui.available_width());
        draw_children(scene, ui, group, path);
    });
    if waiting {
        ui.style_mut().visuals = outer.clone();
        scene.visuals = outer;
        scene.inverse = outside;
    }
}

/// The app's visuals as seen from inside a dark box: the ground becomes the ink and the ink the ground, and the tones
/// that come from `Visuals` are pulled toward the ink so none loses contrast on the dark.
fn inverted(visuals: &Visuals) -> Visuals {
    let ground = visuals.text_color();
    let ink = visuals.panel_fill;
    let mut inside = visuals.clone();
    inside.dark_mode = !visuals.dark_mode;
    inside.override_text_color = Some(ink);
    inside.panel_fill = ground;
    inside.faint_bg_color = ground.lerp_to_gamma(ink, 0.12);
    inside.code_bg_color = ground.lerp_to_gamma(ink, 0.12);
    inside.warn_fg_color = visuals.warn_fg_color.lerp_to_gamma(ink, 0.6);
    inside.error_fg_color = visuals.error_fg_color.lerp_to_gamma(ink, 0.6);
    inside.hyperlink_color = visuals.hyperlink_color.lerp_to_gamma(ink, 0.6);
    inside.widgets.noninteractive.bg_stroke.color = ground.lerp_to_gamma(ink, 0.3);
    inside.widgets.inactive.bg_stroke.color = ground.lerp_to_gamma(ink, 0.5);
    inside
}

fn draw_children(scene: &mut Scene, ui: &mut Ui, group: &Group, path: &str) {
    let gap = scene.gap();
    match group.direction {
        GroupDirection::Column => {
            ui.vertical(|ui| {
                ui.spacing_mut().item_spacing.y = gap;
                for (index, child) in group.children.iter().enumerate() {
                    child_in(scene, ui, child, &format!("{path}.{index}"));
                }
            });
        }
        GroupDirection::Row => {
            let available = ui.available_width();
            let children: Vec<&Drawn> = group.children.iter().collect();
            let natural: Vec<Option<f32>> = children.iter().map(|child| natural_width(scene, ui, child)).collect();
            let taken: f32 = natural.iter().flatten().sum();
            let sharing = natural.iter().filter(|width| width.is_none()).count().max(1) as f32;
            let share = (available - gap * (children.len() as f32 - 1.0) - taken) / sharing;
            let widths: Vec<f32> = children.iter().zip(&natural).map(|(child, natural)| natural.unwrap_or_else(|| share.max(least_width(child))).min(available)).collect();
            let mut lines: Vec<Vec<usize>> = vec![Vec::new()];
            let mut used = 0.0;
            for (index, width) in widths.iter().enumerate() {
                let line = lines.last_mut().expect("lines is never empty");
                if !line.is_empty() && used + gap + width > available {
                    lines.push(vec![index]);
                    used = *width;
                } else {
                    used += if line.is_empty() { 0.0 } else { gap };
                    used += width;
                    line.push(index);
                }
            }
            ui.vertical(|ui| {
                ui.spacing_mut().item_spacing = Vec2::splat(gap);
                for line in &lines {
                    ui.horizontal_top(|ui| {
                        ui.spacing_mut().item_spacing = Vec2::splat(gap);
                        for index in line {
                            ui.allocate_ui_with_layout(Vec2::new(widths[*index], 0.0), Layout::top_down(Align::Min), |ui| {
                                ui.set_min_width(widths[*index]);
                                ui.set_max_width(widths[*index]);
                                child_in(scene, ui, children[*index], &format!("{path}.{index}"));
                            });
                        }
                    });
                }
            });
        }
    }
}

/// A child gets egui's ordinary spacing, not the group's gap, which is for between children.
fn child_in(scene: &mut Scene, ui: &mut Ui, child: &Drawn, path: &str) {
    ui.scope(|ui| {
        ui.spacing_mut().item_spacing = Spacing::default().item_spacing;
        scene.drawn(ui, child, path);
    });
}

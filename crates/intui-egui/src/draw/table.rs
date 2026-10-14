//! Table: a header that stays put over rows drawn only when they are on screen, so a table of thousands of rows costs
//! what the window shows. Columns that are all numbers align to the right unless the column says otherwise, and a
//! table wider than its place scrolls sideways instead of clipping.

use crate::scene::{galley, rounding, Scene};
use crate::style::{FrameRole, TextRole};
use crate::words;
use egui::{Frame, Pos2, Rect, ScrollArea, Sense, Ui, Vec2, WidgetType};
use intui_layout::{align_of, Align};
use intui_text::numbers::format_number;
use intui_types::forms::{Cell, Table};
use intui_types::Drawn;
use std::sync::Arc;

/// The tallest a table's body gets before it scrolls, in points.
const MAX_BODY: f32 = 360.0;
const CELL_PAD: f32 = 8.0;
const NARROWEST: f32 = 56.0;
const WIDEST: f32 = 320.0;
/// How many rows are measured to size the columns.
const SAMPLE: usize = 200;

fn cell_text(cell: &Cell) -> String {
    match cell {
        Cell::Empty => String::new(),
        Cell::Flag(flag) => flag.to_string(),
        Cell::Number(number) => format_number(number.get(), None),
        Cell::Text(text) => text.clone(),
    }
}

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, table: &Table) {
    let body = scene.text(TextRole::Body);
    let strong = scene.text(TextRole::Strong);
    let caption = scene.text(TextRole::Caption);
    let frame = scene.frame(FrameRole::Box);
    let columns: Vec<_> = table.columns.iter().collect();
    let aligns: Vec<Align> = columns.iter().map(|column| align_of(column, &table.rows)).collect();

    let widths: Arc<Vec<f32>> = {
        let key = ui.id().with(("column-widths", body.size.to_bits(), table.rows.len()));
        match ui.ctx().data(|data| data.get_temp::<Arc<Vec<f32>>>(key)) {
            Some(found) => found,
            None => {
                let measured: Vec<f32> = columns
                    .iter()
                    .map(|column| {
                        let header = galley(ui, &column.label, &strong, strong.color, f32::INFINITY).size().x;
                        let cells = table
                            .rows
                            .iter()
                            .take(SAMPLE)
                            .map(|row| galley(ui, &cell_text(row.cell(&column.key)), &body, body.color, f32::INFINITY).size().x)
                            .fold(0.0_f32, f32::max);
                        (header.max(cells) + CELL_PAD * 2.0).clamp(NARROWEST, WIDEST)
                    })
                    .collect();
                let made = Arc::new(measured);
                ui.ctx().data_mut(|data| data.insert_temp(key, made.clone()));
                made
            }
        }
    };
    let row_height = galley(ui, "Ag", &body, body.color, f32::INFINITY).size().y + 8.0;
    let response = ui
        .scope(|ui| {
            ui.spacing_mut().item_spacing.y = 4.0;
            if let Some(title) = table.caption.as_deref().filter(|title| !title.is_empty()) {
                let text = galley(ui, title, &caption, caption.color, ui.available_width());
                let (rect, _) = ui.allocate_exact_size(text.size(), Sense::hover());
                ui.painter().galley(rect.min, text, caption.color);
            }
            let natural: f32 = widths.iter().sum();
            let available = ui.available_width() - frame.padding * 2.0;
            let stretch = if natural < available { (available - natural) / widths.len() as f32 } else { 0.0 };
            let columns_at: Vec<f32> = widths.iter().map(|width| width + stretch).collect();
            let total: f32 = columns_at.iter().sum();
            Frame::new().fill(frame.fill).stroke(frame.stroke).corner_radius(rounding(frame.rounding)).inner_margin(frame.padding).show(ui, |ui| {
                ui.spacing_mut().item_spacing = Vec2::ZERO;
                ScrollArea::horizontal().id_salt("across").auto_shrink([false, true]).show(ui, |ui| {
                    let (header, _) = ui.allocate_exact_size(Vec2::new(total, row_height), Sense::hover());
                    let mut left = header.left();
                    for (index, column) in columns.iter().enumerate() {
                        let cell = Rect::from_min_size(Pos2::new(left, header.top()), Vec2::new(columns_at[index], row_height));
                        paint_cell(ui, cell, &column.label, &strong, aligns[index]);
                        left += columns_at[index];
                    }
                    ui.painter().hline(header.x_range(), header.bottom(), frame.stroke);
                    if table.rows.is_empty() {
                        let text = galley(ui, words::NO_ROWS, &caption, caption.color, f32::INFINITY);
                        let (rect, _) = ui.allocate_exact_size(Vec2::new(total, row_height), Sense::hover());
                        ui.painter().galley(Pos2::new(rect.left() + CELL_PAD, rect.top() + 4.0), text, caption.color);
                        return;
                    }
                    ScrollArea::vertical().id_salt("down").max_height(MAX_BODY).auto_shrink([false, true]).show_rows(ui, row_height, table.rows.len(), |ui, range| {
                        for index in range {
                            let (row, _) = ui.allocate_exact_size(Vec2::new(total, row_height), Sense::hover());
                            if index % 2 == 1 {
                                ui.painter().rect_filled(row, 0.0, ui.visuals().faint_bg_color);
                            }
                            let mut left = row.left();
                            for (column_index, column) in columns.iter().enumerate() {
                                let cell = Rect::from_min_size(Pos2::new(left, row.top()), Vec2::new(columns_at[column_index], row_height));
                                paint_cell(ui, cell, &cell_text(table.rows[index].cell(&column.key)), &body, aligns[column_index]);
                                left += columns_at[column_index];
                            }
                        }
                    });
                });
            });
        })
        .response;
    scene.name(ui, &response, drawn, WidgetType::Label);
}

fn paint_cell(ui: &Ui, cell: Rect, text: &str, look: &crate::style::TextLook, align: Align) {
    if text.is_empty() {
        return;
    }
    let text = galley(ui, text, look, look.color, f32::INFINITY);
    let x = match align {
        Align::Start => cell.left() + CELL_PAD,
        Align::End => cell.right() - CELL_PAD - text.size().x,
    };
    let painter = ui.painter().with_clip_rect(cell.intersect(ui.clip_rect()));
    painter.galley(Pos2::new(x.max(cell.left() + 1.0), cell.center().y - text.size().y / 2.0), text, look.color);
}

//! Form: fields the person fills in, checked before anything is sent. A required field left empty, or a number field
//! holding something that isn't a number, sends nothing and says which field and why; a refused submit keeps what the
//! person typed; a sent form shows what it was sent with and can't be sent again.

use crate::controls::{self, ControlId, Draft, Problems};
use crate::draw::choice::status_line;
use crate::event;
use crate::scene::{galley, rounding, Scene};
use crate::style::{ButtonRole, FrameRole, TextRole};
use crate::words;
use egui::{Button, ComboBox, Frame, RichText, Sense, TextEdit, Ui, WidgetInfo, WidgetType};
use intui_layout::{parse_number, NumberInput};
use intui_types::forms::{Field, FieldInput, Form};
use intui_types::{ControlState, Drawn, FieldValue};
use std::collections::HashMap;

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, form: &Form) {
    let id = ControlId::new(&form.id);
    let state = controls::control_state(scene.controls, scene.source, &id).clone();
    let locked = matches!(state, ControlState::Sending { .. } | ControlState::Sent { .. });
    let (mut drafts, problems) = {
        let slot = controls::slot(scene.controls, scene.source, &id);
        (std::mem::take(&mut slot.drafts), slot.problems.clone())
    };
    let mut submit = false;
    let response = ui
        .scope(|ui| {
            ui.spacing_mut().item_spacing.y = 8.0;
            ui.add_enabled_ui(!locked, |ui| {
                for field in form.fields.iter() {
                    ui.push_id(field.id.as_str(), |ui| field_row(scene, ui, field, &mut drafts, problems.by_field.get(&field.id)));
                }
            });
            ui.horizontal(|ui| {
                let (role, text) = match &state {
                    ControlState::Sent { .. } => (ButtonRole::Chosen, words::SENT.to_string()),
                    ControlState::Sending { .. } => (ButtonRole::Primary, words::SENDING.to_string()),
                    ControlState::ReadOnly | ControlState::Ready | ControlState::Refused { .. } => (ButtonRole::Primary, form.submit_label.clone()),
                };
                let look = scene.button(role);
                let button = Button::new(RichText::new(text).color(look.text)).fill(look.fill).stroke(look.stroke).corner_radius(rounding(look.rounding));
                submit = ui.add_enabled(!locked, button).clicked();
            });
            let status = match &state {
                ControlState::Refused { why, .. } => {
                    let why = if why.is_empty() { words::REFUSED_NO_WORDS } else { why.as_str() };
                    Some((words::refused_form(why), true))
                }
                ControlState::Sending { .. } => Some((words::SENDING.to_string(), false)),
                ControlState::ReadOnly => Some((words::READ_ONLY.to_string(), false)),
                ControlState::Ready | ControlState::Sent { .. } if !problems.summary.is_empty() => Some((problems.summary.clone(), true)),
                ControlState::Ready | ControlState::Sent { .. } => None,
            };
            if let Some((words, failed)) = status {
                status_line(scene, ui, &words, failed);
            }
        })
        .response;
    scene.name(ui, &response, drawn, WidgetType::Panel);
    controls::slot(scene.controls, scene.source, &id).drafts = drafts.clone();
    if submit {
        match read(form, &drafts) {
            Ok(values) => {
                let event = event::submit(scene.source, &id, &values);
                scene.send(event);
            }
            Err(found) => controls::slot(scene.controls, scene.source, &id).problems = found,
        }
    }
}

fn field_row(scene: &Scene, ui: &mut Ui, field: &Field, drafts: &mut HashMap<String, Draft>, problem: Option<&String>) {
    let body = scene.text(TextRole::Body);
    let caption = scene.text(TextRole::Caption);
    let control = scene.frame(FrameRole::Control);
    let critical = scene.tone(intui_types::forms::Tone::Critical).color;
    ui.vertical(|ui| {
        ui.spacing_mut().item_spacing.y = 3.0;
        let checkbox = matches!(field.input, FieldInput::Checkbox(_));
        let mut label_id = None;
        if !checkbox {
            ui.horizontal(|ui| {
                let text = galley(ui, &field.label, &body, body.color, f32::INFINITY);
                let (rect, response) = ui.allocate_exact_size(text.size(), Sense::hover());
                ui.painter().galley(rect.min, text, body.color);
                response.widget_info(|| WidgetInfo::labeled(WidgetType::Label, true, field.label.as_str()));
                label_id = Some(response.id);
                if field.required {
                    let tag = galley(ui, words::REQUIRED, &caption, caption.color, f32::INFINITY);
                    let (rect, _) = ui.allocate_exact_size(tag.size(), Sense::hover());
                    ui.painter().galley(rect.min, tag, caption.color);
                }
            });
        }
        match &field.input {
            FieldInput::Checkbox(_) => {
                let mut on = matches!(drafts.get(&field.id), Some(Draft::Flag(true)));
                let text = if field.required { format!("{} ({})", field.label, words::REQUIRED) } else { field.label.clone() };
                ui.checkbox(&mut on, RichText::new(text).color(body.color));
                drafts.insert(field.id.clone(), Draft::Flag(on));
            }
            FieldInput::Select(options) => {
                let mut current = match drafts.get(&field.id) {
                    Some(Draft::Text(text)) => text.clone(),
                    Some(Draft::Flag(_)) | None => String::new(),
                };
                let empty = if field.required { words::CHOOSE } else { words::NONE };
                let shown = if current.is_empty() { empty.to_string() } else { current.clone() };
                ComboBox::from_id_salt("select").selected_text(shown).width(ui.available_width().min(320.0)).show_ui(ui, |ui| {
                    if !field.required {
                        ui.selectable_value(&mut current, String::new(), words::NONE);
                    }
                    for option in options.iter() {
                        ui.selectable_value(&mut current, option.clone(), option.as_str());
                    }
                });
                drafts.insert(field.id.clone(), Draft::Text(current));
            }
            FieldInput::Text(_) | FieldInput::Number(_) => {
                let mut text = match drafts.get(&field.id) {
                    Some(Draft::Text(text)) => text.clone(),
                    Some(Draft::Flag(_)) | None => String::new(),
                };
                Frame::new().fill(control.fill).stroke(control.stroke).corner_radius(rounding(control.rounding)).inner_margin(control.padding).show(ui, |ui| {
                    let edit = TextEdit::singleline(&mut text).frame(Frame::NONE).desired_width(ui.available_width().min(320.0)).hint_text(field.label.as_str());
                    let response = ui.add(edit);
                    if let Some(label) = label_id {
                        response.labelled_by(label);
                    }
                });
                drafts.insert(field.id.clone(), Draft::Text(text));
            }
        }
        if let Some(problem) = problem {
            let text = galley(ui, problem, &caption, critical, ui.available_width());
            let (rect, response) = ui.allocate_exact_size(text.size(), Sense::hover());
            ui.painter().galley(rect.min, text, critical);
            response.widget_info(|| WidgetInfo::labeled(WidgetType::Label, true, problem.as_str()));
        }
    });
}

/// What the form holds as the values to send, or what stops it: empty optional fields are left out, checkboxes are
/// always sent, numbers that don't parse are named.
fn read(form: &Form, drafts: &HashMap<String, Draft>) -> Result<Vec<(String, FieldValue)>, Problems> {
    let mut values = Vec::new();
    let mut by_field = HashMap::new();
    for field in form.fields.iter() {
        let typed = match drafts.get(&field.id) {
            Some(Draft::Text(text)) => text.trim().to_string(),
            Some(Draft::Flag(_)) | None => String::new(),
        };
        match &field.input {
            FieldInput::Checkbox(_) => {
                values.push((field.id.clone(), FieldValue::Flag(matches!(drafts.get(&field.id), Some(Draft::Flag(true))))));
            }
            _ if typed.is_empty() => {
                if field.required {
                    let said = if matches!(field.input, FieldInput::Select(_)) { words::pick_an_option(&field.label) } else { words::fill_in(&field.label) };
                    by_field.insert(field.id.clone(), said);
                }
            }
            FieldInput::Number(_) => match parse_number(&typed) {
                NumberInput::Value(number) => values.push((field.id.clone(), FieldValue::Number(number))),
                NumberInput::Cleared => {}
                NumberInput::Invalid { note } => {
                    by_field.insert(field.id.clone(), words::use_digits(&note));
                }
            },
            FieldInput::Text(_) | FieldInput::Select(_) => values.push((field.id.clone(), FieldValue::Text(typed))),
        }
    }
    if by_field.is_empty() {
        Ok(values)
    } else {
        let summary = words::fields_need_fixing(by_field.len());
        Err(Problems { by_field, summary })
    }
}

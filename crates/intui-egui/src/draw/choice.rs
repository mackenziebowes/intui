//! Choice: buttons that send an event. A `once` choice is used up after one answer and shows what was chosen; a refused
//! press shows the app's words by the control and the buttons work again.

use crate::controls::{self, ControlId};
use crate::event;
use crate::scene::{galley, rounding, Scene};
use crate::style::{ButtonRole, TextRole};
use crate::words;
use egui::{Button, RichText, Sense, Ui, WidgetInfo, WidgetType};
use intui_types::forms::{Choice, ChoiceRepeat, Emphasis};
use intui_types::{Answer, ControlState, Drawn};

/// How the person last answered this control, if the control remembers an option.
fn chosen(state: &ControlState) -> Option<&str> {
    match state {
        ControlState::Sending { answer: Answer::Press(option) } | ControlState::Sent { answer: Answer::Press(option) } | ControlState::Refused { answer: Answer::Press(option), .. } => Some(option),
        ControlState::ReadOnly | ControlState::Ready | ControlState::Sending { .. } | ControlState::Sent { .. } | ControlState::Refused { .. } => None,
    }
}

pub(crate) fn draw(scene: &mut Scene, ui: &mut Ui, drawn: &Drawn, choice: &Choice) {
    let id = ControlId::new(&choice.id);
    let state = controls::control_state(scene.controls, scene.source, &id).clone();
    let once = matches!(choice.repeat, ChoiceRepeat::Once);
    let used = once && matches!(state, ControlState::Sent { .. });
    let sending = matches!(state, ControlState::Sending { .. });
    let label_of = |option_id: &str| choice.options.iter().find(|option| option.id == option_id).map_or(option_id.to_string(), |option| option.label.clone());
    let mut pressed: Option<String> = None;
    let response = ui
        .scope(|ui| {
            ui.spacing_mut().item_spacing.y = 6.0;
            if let Some(prompt) = choice.prompt.as_deref().filter(|prompt| !prompt.is_empty()) {
                crate::draw::text::markdown_inline(scene, ui, prompt, TextRole::Body);
            }
            ui.horizontal_wrapped(|ui| {
                ui.spacing_mut().item_spacing.x = 6.0;
                for option in choice.options.iter() {
                    let is_chosen = chosen(&state) == Some(option.id.as_str());
                    let role = if used {
                        if is_chosen { ButtonRole::Chosen } else { ButtonRole::Spent }
                    } else if matches!(option.emphasis, Emphasis::Primary) {
                        ButtonRole::Primary
                    } else {
                        ButtonRole::Plain
                    };
                    let look = scene.button(role);
                    let text = if sending && is_chosen { words::SENDING.to_string() } else { option.label.clone() };
                    let button = Button::new(RichText::new(text).color(look.text)).fill(look.fill).stroke(look.stroke).corner_radius(rounding(look.rounding));
                    let clicked = ui.push_id(option.id.as_str(), |ui| ui.add_enabled(!used && !sending, button).clicked()).inner;
                    if clicked {
                        pressed = Some(option.id.clone());
                    }
                }
            });
            let status = match &state {
                ControlState::Ready => None,
                ControlState::ReadOnly => Some((words::READ_ONLY.to_string(), false)),
                ControlState::Sending { .. } => Some((words::SENDING.to_string(), false)),
                ControlState::Sent { answer: value } => Some(match (used, value) {
                    (true, Answer::Press(option)) => (words::answered(&label_of(option)), false),
                    (_, Answer::Press(option)) => (words::sent_option(&label_of(option)), false),
                    (_, Answer::Submit(_)) => (words::SENT.to_string(), false),
                }),
                ControlState::Refused { answer: value, why } => {
                    let why = if why.is_empty() { words::REFUSED_NO_WORDS } else { why.as_str() };
                    let what = match value {
                        Answer::Press(option) => label_of(option),
                        Answer::Submit(_) => choice.id.clone(),
                    };
                    Some((words::refused(&what, why), true))
                }
            };
            if let Some((words, failed)) = status {
                status_line(scene, ui, &words, failed);
            }
        })
        .response;
    scene.name(ui, &response, drawn, WidgetType::Panel);
    if let Some(option) = pressed {
        let event = event::press(scene.source, &id, &option);
        scene.send(event);
    }
}

/// One line under a control, in the caption style, or the critical tone when the app refused. It is named to accessibility.
pub(crate) fn status_line(scene: &Scene, ui: &mut Ui, words: &str, failed: bool) {
    let look = scene.text(TextRole::Caption);
    let color = if failed { scene.tone(intui_types::forms::Tone::Critical).color } else { look.color };
    let text = galley(ui, words, &look, color, ui.available_width());
    let (rect, response) = ui.allocate_exact_size(text.size(), Sense::hover());
    ui.painter().galley(rect.min, text, color);
    response.widget_info(|| WidgetInfo::labeled(WidgetType::Label, true, words));
}

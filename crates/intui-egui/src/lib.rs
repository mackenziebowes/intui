//! The egui adapter: draws an IntUI tree inside an app's own `Ui`, in the app's own look, and hands back what the person did.
//!
//! The app owns its window, its style, where trees come from and where events go; the renderer checks nothing
//! of the wire (the tree was parsed by `intui-types`), draws every kind with egui's painter and basic widgets,
//! asks the app's `Style` how each meaning looks (falling back to the app's egui `Visuals`), and keeps the state
//! of each Choice and Form in `Controls` (Ready, Sending, Sent, Refused). Every component names itself to
//! accessibility with its text form.

mod controls;
mod draw;
mod error;
mod event;
mod markdown;
mod scene;
mod style;
mod words;

pub use controls::{control_state, keep_only, settle, ControlId, Controls, Outcome, Settlement, Source};
pub use intui_types::{Answer, ControlState};
pub use error::Error;
pub use event::event_json;
pub use style::{
    ButtonLook, ButtonRole, Dash, Fallback, Family, FrameLook, FrameRole, SeriesRole, Style, StrokeLook, TextLook, TextRole, ToneLook,
};

use egui::Ui;
use intui_types::{Event, Tree};

/// Draws `tree` in `ui` and returns the events the person made this frame. A press or submit puts its control in
/// `Sending`; the app must say how it ended with `settle`. `source` must change whenever the tree does.
pub fn show<S: Style>(ui: &mut Ui, tree: &Tree, source: &Source, style: &S, controls: &mut Controls) -> Vec<Event> {
    let mut scene = scene::Scene { style, visuals: ui.visuals().clone(), source, controls, tree, events: Vec::new() };
    ui.push_id(source.as_str(), |ui| scene.drawn(ui, tree.root(), "root"));
    scene.events
}

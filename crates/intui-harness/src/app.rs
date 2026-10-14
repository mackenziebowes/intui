//! The harness's window: the app that owns the look and the presses.
//!
//! Every event the renderer returns is printed as one JSON line on stdout, then settled: accepted, unless a
//! `--refuse` rule names its target, in which case the first press of that target is refused with the rule's words
//! (so the Refused path can be driven, and the retry goes through).

use crate::cli::{Arguments, Refusal};
use crate::tokens::FileStyle;
use crate::trees::{Loaded, Shown};
use eframe::egui::{self, Frame, RichText, ScrollArea};
use intui_egui::{event_json, settle, Controls, Outcome};
use std::time::{Duration, Instant};

/// How often the files are looked at again.
const LOOK_AGAIN: Duration = Duration::from_millis(300);

pub struct Harness {
    loaded: Loaded,
    style: FileStyle,
    controls: Controls,
    refusals: Vec<Refusal>,
    checked: Instant,
}

impl Harness {
    pub fn new(arguments: &Arguments, loaded: Loaded, style: FileStyle) -> Harness {
        Harness { loaded, style, controls: Controls::new(), refusals: arguments.refusals.clone(), checked: Instant::now() }
    }

    /// How this press ends: refused if a rule is waiting on its target (once), accepted otherwise.
    fn outcome_for(&mut self, target: &str) -> Outcome {
        match self.refusals.iter().position(|rule| rule.target == target) {
            Some(index) => Outcome::Refused(self.refusals.remove(index).words),
            None => Outcome::Accepted,
        }
    }
}

impl eframe::App for Harness {
    fn ui(&mut self, ui: &mut egui::Ui, _frame: &mut eframe::Frame) {
        if self.checked.elapsed() >= LOOK_AGAIN {
            self.checked = Instant::now();
            if let Some(on_screen) = self.loaded.reload_if_changed() {
                self.controls.keep_only(&on_screen);
            }
        }
        ui.ctx().request_repaint_after(LOOK_AGAIN);
        let background = self.style.background(ui.visuals());
        let mut events = Vec::new();
        egui::CentralPanel::default().frame(Frame::new().fill(background).inner_margin(16.0)).show(ui, |ui| {
            ScrollArea::vertical().auto_shrink([false, false]).show(ui, |ui| {
                for shown in &self.loaded.shown {
                    if self.loaded.named {
                        ui.label(RichText::new(shown.name()).weak());
                    }
                    match shown {
                        Shown::Tree { source, tree, .. } => events.extend(intui_egui::show(ui, tree, source, &self.style, &mut self.controls)),
                        Shown::Refused { words, .. } => {
                            ui.colored_label(ui.visuals().error_fg_color, words);
                        }
                    }
                    ui.add_space(16.0);
                }
            });
        });
        for event in events {
            println!("{}", event_json(&event));
            let outcome = self.outcome_for(event.target().as_str());
            settle(&mut self.controls, &event, outcome);
            ui.ctx().request_repaint();
        }
    }
}

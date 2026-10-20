//! The state of every control the person has used, in the control machine `intui-types` shares with core
//! (hub #1956), kept per (Source, control id), and what they have typed into a form that isn't sent yet.
//!
//! The promise: a control is used at most once when it says `once`, a refused control is usable again with what
//! the person typed still in it, and a tree from a new Source starts with every control Ready. The app keeps one
//! `Controls` between frames and tells it how each press ended with `settle`. Every change goes through `step`;
//! the functions here only find the slot and store what `step` returns.

use crate::error::Error;
use intui_types::{step, ControlAt, ControlEvent, ControlState, Effect, Event, Step, Tree};
use std::collections::HashMap;

/// Which tree a press came from: the id of whatever drew it (a tool call, a reply, "overview@4182"). It must change
/// whenever the tree does, so a control from the old tree is never mistaken for one in the new.
#[derive(Clone, Debug, PartialEq, Eq, Hash)]
pub struct Source(String);

impl Source {
    pub fn new(text: impl Into<String>) -> Result<Source, Error> {
        let text = text.into();
        if text.is_empty() {
            Err(Error::SourceEmpty)
        } else {
            Ok(Source(text))
        }
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

/// The id of a Choice or Form, as the tree wrote it.
#[derive(Clone, Debug, PartialEq, Eq, Hash)]
pub struct ControlId(String);

impl ControlId {
    pub(crate) fn new(id: &str) -> ControlId {
        ControlId(id.to_string())
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

/// How the app says a press ended.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Outcome {
    Accepted,
    Refused(String),
}

/// What `settle` did with an outcome.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Settlement {
    Applied,
    /// No control was waiting on that event: it was settled already, or it came from a tree this `Controls` never saw.
    NotWaiting,
}

/// What the person has typed into one field that isn't sent yet.
#[derive(Clone, Debug, PartialEq)]
pub(crate) enum Draft {
    Text(String),
    Flag(bool),
}

/// What stops a form from being sent, by field and as one sentence.
#[derive(Clone, Debug, Default, PartialEq)]
pub(crate) struct Problems {
    pub by_field: HashMap<String, String>,
    pub summary: String,
}

#[derive(Debug)]
pub(crate) struct Slot {
    pub control: ControlState,
    pub drafts: HashMap<String, Draft>,
    pub problems: Problems,
}

impl Slot {
    fn new() -> Slot {
        Slot { control: ControlState::Ready, drafts: HashMap::new(), problems: Problems::default() }
    }
}

/// A control's place: the tree it is in and its id. Events from `intui-types` carry both as text.
#[derive(Clone, Debug, PartialEq, Eq, Hash)]
pub(crate) struct Key {
    source: String,
    id: String,
}

impl Key {
    fn of(source: &Source, id: &ControlId) -> Key {
        Key { source: source.as_str().to_string(), id: id.as_str().to_string() }
    }

    fn of_event(event: &Event) -> Key {
        Key { source: event.source().as_str().to_string(), id: event.target().as_str().to_string() }
    }
}

/// Every control's slot, between frames. The app holds it and passes it to `show`, `settle` and `keep_only`.
#[derive(Debug, Default)]
pub struct Controls {
    pub(crate) slots: HashMap<Key, Slot>,
}

const READY: ControlState = ControlState::Ready;

/// How a control stands; Ready when the person hasn't touched it.
pub fn control_state<'c>(controls: &'c Controls, source: &Source, id: &ControlId) -> &'c ControlState {
    controls.slots.get(&Key::of(source, id)).map_or(&READY, |slot| &slot.control)
}

/// Forgets every control of a tree that is no longer on screen, so state doesn't pile up as trees come and go.
pub fn keep_only(controls: &mut Controls, on_screen: &[Source]) {
    controls.slots.retain(|key, _| on_screen.iter().any(|source| source.as_str() == key.source));
}

pub(crate) fn slot<'c>(controls: &'c mut Controls, source: &Source, id: &ControlId) -> &'c mut Slot {
    controls.slots.entry(Key::of(source, id)).or_insert_with(Slot::new)
}

/// Sends one event into the machine for the control `event` names, stores the state it returns, and hands back
/// the events to send to the app. An ignored event changes nothing.
pub(crate) fn feed(controls: &mut Controls, tree: &Tree, event: &Event, input: ControlEvent) -> (Step, Vec<Event>) {
    let at = ControlAt { tree, source: event.source(), id: event.target() };
    let slot = controls.slots.entry(Key::of_event(event)).or_insert_with(Slot::new);
    let result = step(at, &slot.control, input);
    let mut sends = Vec::new();
    if let Step::Moved { state, effects } = &result {
        slot.control = state.clone();
        if matches!(state, ControlState::Sending { .. }) {
            slot.problems = Problems::default();
        }
        sends.extend(effects.iter().map(|Effect::Send(sent)| sent.clone()));
    }
    (result, sends)
}

/// The app tells the renderer how a press ended. A press that is settled twice, or one this `Controls` never sent,
/// changes nothing.
pub fn settle(controls: &mut Controls, tree: &Tree, event: &Event, outcome: Outcome) -> Settlement {
    let input = match outcome {
        Outcome::Accepted => ControlEvent::Accepted,
        Outcome::Refused(why) => ControlEvent::Refused(why),
    };
    match feed(controls, tree, event, input).0 {
        Step::Moved { .. } => Settlement::Applied,
        Step::Ignored { .. } => Settlement::NotWaiting,
    }
}

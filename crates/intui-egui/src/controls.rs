//! The state of every control the person has used: Ready, Sending, Sent or Refused, kept per (Source, control id),
//! and what they have typed into a form that isn't sent yet.
//!
//! The promise: a control is used at most once when it says `once`, a refused control is usable again with what
//! the person typed still in it, and a tree from a new Source starts with every control Ready. The app keeps one
//! `Controls` between frames and tells it how each press ended with `settle`.

use crate::error::Error;
use crate::event::Answer;
use intui_types::Event;
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

/// One Choice or Form as the person has used it.
#[derive(Clone, Debug, PartialEq)]
pub enum Control {
    Ready,
    /// The press was returned by `show`; the app hasn't said what became of it.
    Sending { value: Answer },
    /// A `once` control is used up and shows what was chosen; one that says `many` can be pressed again.
    Sent { value: Answer },
    /// The app's words, shown by the control. The control is usable again.
    Refused { value: Answer, why: String },
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
    pub control: Control,
    pub drafts: HashMap<String, Draft>,
    pub problems: Problems,
}

impl Slot {
    fn new() -> Slot {
        Slot { control: Control::Ready, drafts: HashMap::new(), problems: Problems::default() }
    }
}

/// A control's place: the tree it is in and its id. Events from `intui-types` carry both as text.
#[derive(Clone, Debug, PartialEq, Eq, Hash)]
struct Key {
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

#[derive(Debug, Default)]
pub struct Controls {
    slots: HashMap<Key, Slot>,
}

impl Controls {
    pub fn new() -> Controls {
        Controls::default()
    }

    /// How a control stands; Ready when the person hasn't touched it.
    pub fn state(&self, source: &Source, id: &ControlId) -> &Control {
        const READY: Control = Control::Ready;
        self.slots.get(&Key::of(source, id)).map_or(&READY, |slot| &slot.control)
    }

    /// Forgets every control of a tree that is no longer on screen, so state doesn't pile up as trees come and go.
    pub fn keep_only(&mut self, on_screen: &[Source]) {
        self.slots.retain(|key, _| on_screen.iter().any(|source| source.as_str() == key.source));
    }

    pub(crate) fn slot(&mut self, source: &Source, id: &ControlId) -> &mut Slot {
        self.slots.entry(Key::of(source, id)).or_insert_with(Slot::new)
    }

    /// A press or submit was returned to the app: the control waits for its answer.
    pub(crate) fn begin(&mut self, event: &Event) {
        let slot = self.slots.entry(Key::of_event(event)).or_insert_with(Slot::new);
        slot.control = Control::Sending { value: Answer::of(event) };
        slot.problems = Problems::default();
    }

    /// Records how the app says `event` ended. A press that is settled twice, or one this `Controls` never sent, changes nothing.
    pub fn settle(&mut self, event: &Event, outcome: Outcome) -> Settlement {
        let Some(slot) = self.slots.get_mut(&Key::of_event(event)) else {
            return Settlement::NotWaiting;
        };
        let Control::Sending { value } = &slot.control else {
            return Settlement::NotWaiting;
        };
        let value = value.clone();
        slot.control = match outcome {
            Outcome::Accepted => Control::Sent { value },
            Outcome::Refused(why) => Control::Refused { value, why },
        };
        Settlement::Applied
    }
}

/// The app tells the renderer how a press ended.
pub fn settle(controls: &mut Controls, event: &Event, outcome: Outcome) -> Settlement {
    controls.settle(event, outcome)
}

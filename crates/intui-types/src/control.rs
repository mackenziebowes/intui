//! A Choice or Form being answered: the Rust side of core's `control.ts` (hub #1956). Read-only,
//! ready, sending, sent or refused; `step` is the only transition, with core's reasons word for word,
//! so a Rust renderer paints the same states a browser does for the same events.

use crate::event::{ComponentId, Event, Source, Values};
use crate::fit::Interactive;
use crate::node::Tree;

/// What the person gave a control.
#[derive(Clone, Debug, PartialEq)]
pub enum Answer {
    Press(String),
    Submit(Values),
}

impl Answer {
    pub fn of(event: &Event) -> Answer {
        match event {
            Event::Press { option, .. } => Answer::Press(option.clone()),
            Event::Submit { values, .. } => Answer::Submit(values.clone()),
        }
    }
}

/// One Choice or Form, as far as the person has got with it.
#[derive(Clone, Debug, PartialEq)]
pub enum ControlState {
    ReadOnly,
    Ready,
    Sending { answer: Answer },
    /// A `once` control is used up; a `many` one can be answered again.
    Sent { answer: Answer },
    /// Usable again, and says why the answer didn't go.
    Refused { answer: Answer, why: String },
}

impl ControlState {
    /// The state's name as core writes it, for reasons and the parity check.
    pub fn kind_name(&self) -> &'static str {
        match self {
            ControlState::ReadOnly => "readOnly",
            ControlState::Ready => "ready",
            ControlState::Sending { .. } => "sending",
            ControlState::Sent { .. } => "sent",
            ControlState::Refused { .. } => "refused",
        }
    }
}

#[derive(Clone, Debug, PartialEq)]
pub enum ControlEvent {
    Answered(Answer),
    Accepted,
    Refused(String),
}

/// The event is already checked against the tree; the renderer only hands it to its app.
#[derive(Clone, Debug, PartialEq)]
pub enum Effect {
    Send(Event),
}

#[derive(Clone, Debug, PartialEq)]
pub enum Step {
    Moved { state: ControlState, effects: Vec<Effect> },
    Ignored { state: ControlState, why: String },
}

/// Which control, in which drawn tree.
#[derive(Clone, Copy, Debug)]
pub struct ControlAt<'t> {
    pub tree: &'t Tree,
    pub source: &'t Source,
    pub id: &'t ComponentId,
}

/// The most a reason may say, on one line.
pub const WHY_LENGTH: usize = 160;

/// One line of at most `WHY_LENGTH` characters.
pub fn why_of(text: &str) -> String {
    text.lines().next().unwrap_or("").chars().take(WHY_LENGTH).collect()
}

/// Where a control starts: sent from the app's record of an earlier answer, else ready, or read-only with nowhere to send.
pub fn start_control(can_send: bool, earlier: Option<Answer>) -> ControlState {
    match (earlier, can_send) {
        (Some(answer), _) => ControlState::Sent { answer },
        (None, true) => ControlState::Ready,
        (None, false) => ControlState::ReadOnly,
    }
}

/// Whether the control can take an answer now.
pub fn can_answer(at: ControlAt<'_>, state: &ControlState) -> bool {
    match state {
        ControlState::Ready | ControlState::Refused { .. } => true,
        ControlState::Sent { .. } => repeats(at),
        ControlState::ReadOnly | ControlState::Sending { .. } => false,
    }
}

/// The transition function. Pure: the same state and event always give the same step.
pub fn step(at: ControlAt<'_>, state: &ControlState, event: ControlEvent) -> Step {
    let ignore = |why: String| Step::Ignored { state: state.clone(), why };
    let moved = |state: ControlState, effects: Vec<Effect>| Step::Moved { state, effects };
    match event {
        ControlEvent::Answered(answer) => match state {
            ControlState::ReadOnly => ignore("this view is read-only: there is nowhere to send an answer".to_string()),
            ControlState::Sending { .. } => ignore("an answer is already being sent; wait for it to be accepted or refused".to_string()),
            ControlState::Sent { .. } if !repeats(at) => ignore("this control was used once already and takes one answer".to_string()),
            ControlState::Ready | ControlState::Sent { .. } | ControlState::Refused { .. } => {
                let sent = event_of(at, &answer);
                match at.tree.problem_with(&sent) {
                    Some(problem) => moved(ControlState::Refused { answer, why: problem.to_string().chars().take(WHY_LENGTH).collect() }, vec![]),
                    None => moved(ControlState::Sending { answer }, vec![Effect::Send(sent)]),
                }
            }
        },
        ControlEvent::Accepted => match state {
            ControlState::Sending { answer } => moved(ControlState::Sent { answer: answer.clone() }, vec![]),
            _ => ignore(format!("nothing is being sent (the control is {})", state.kind_name())),
        },
        ControlEvent::Refused(why) => match state {
            ControlState::Sending { answer } => moved(ControlState::Refused { answer: answer.clone(), why: why_of(&why) }, vec![]),
            _ => ignore(format!("nothing is being sent (the control is {})", state.kind_name())),
        },
    }
}

fn repeats(at: ControlAt<'_>) -> bool {
    matches!(at.tree.interactive(at.id.as_str()), Some(Interactive::Choice(choice)) if choice.repeat == crate::forms::ChoiceRepeat::Many)
}

fn event_of(at: ControlAt<'_>, answer: &Answer) -> Event {
    match answer {
        Answer::Press(option) => Event::Press { source: at.source.clone(), target: at.id.clone(), option: option.clone() },
        Answer::Submit(values) => Event::Submit { source: at.source.clone(), target: at.id.clone(), values: values.clone() },
    }
}

//! Whether an event could have come from a tree: the Rust side of core's `IntuiEvent.problemWith`.
//!
//! The first thing wrong is reported, in the order core checks: the id, the kind of component,
//! then the option, or each submitted field in turn and last the required fields left out. A
//! field id that appears twice in a form means its last field.

use crate::event::{Event, FieldValue, ValueType};
use crate::event_refusal::EventProblem;
use crate::forms::{Choice, Field, FieldInput, Form};
use crate::node::{Drawn, Kind, Node, Tree};

/// A component an event can name.
enum Interactive<'t> {
    Choice(&'t Choice),
    Form(&'t Form),
}

impl Interactive<'_> {
    fn kind(&self) -> Kind {
        match self {
            Interactive::Choice(_) => Kind::Choice,
            Interactive::Form(_) => Kind::Form,
        }
    }
}

impl Tree {
    fn interactive(&self, id: &str) -> Option<Interactive<'_>> {
        let mut pending = vec![self.root()];
        while let Some(drawn) = pending.pop() {
            let Drawn::Known(node) = drawn else { continue };
            match node {
                Node::Choice(choice) if choice.id == id => return Some(Interactive::Choice(choice)),
                Node::Form(form) if form.id == id => return Some(Interactive::Form(form)),
                _ => {}
            }
            pending.extend(node.children().into_iter().rev());
        }
        None
    }

    /// Why this event can't come from the component it names in this tree, or `None` if it can.
    pub fn problem_with(&self, event: &Event) -> Option<EventProblem> {
        let target = event.target().as_str();
        let Some(component) = self.interactive(target) else {
            return Some(EventProblem::NothingHasId { target: target.to_string() });
        };
        match (event, component) {
            (Event::Press { option, .. }, Interactive::Choice(choice)) => {
                let options: Vec<String> = choice.options.iter().map(|option| option.id.clone()).collect();
                (!options.contains(option)).then(|| EventProblem::NoSuchOption { choice: target.to_string(), option: option.clone(), options })
            }
            (Event::Submit { values, .. }, Interactive::Form(form)) => {
                for (id, value) in values.iter() {
                    let Some(field) = form.fields.iter().filter(|field| field.id == id).last() else {
                        return Some(EventProblem::NoSuchField { form: target.to_string(), field: id.to_string() });
                    };
                    if let Some(wrong) = value_problem(field, value) {
                        return Some(wrong);
                    }
                }
                let missing: Vec<String> = form.fields.iter().filter(|field| field.required && !values.has(&field.id)).map(|field| field.label.clone()).collect();
                (!missing.is_empty()).then_some(EventProblem::RequiredLeftEmpty { labels: missing })
            }
            (Event::Press { .. }, other) => Some(EventProblem::CannotBePressed { target: target.to_string(), kind: other.kind() }),
            (Event::Submit { .. }, other) => Some(EventProblem::CannotBeSubmitted { target: target.to_string(), kind: other.kind() }),
        }
    }
}

fn value_problem(field: &Field, value: &FieldValue) -> Option<EventProblem> {
    let expected = match field.input {
        FieldInput::Number(_) => ValueType::Number,
        FieldInput::Checkbox(_) => ValueType::Boolean,
        FieldInput::Text(_) | FieldInput::Select(_) => ValueType::String,
    };
    if value.value_type() != expected {
        return Some(EventProblem::WrongValueType { label: field.label.clone(), expected, got: value.clone() });
    }
    let (FieldInput::Select(options), FieldValue::Text(text)) = (&field.input, value) else { return None };
    let options: Vec<String> = options.iter().cloned().collect();
    (!options.contains(text)).then(|| EventProblem::NotAmongOptions { label: field.label.clone(), got: value.clone(), options })
}

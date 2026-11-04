//! Reading a Form into its parsed form: its fields, the lines a text field shows, and the key that sends.

use super::{Drift, Fields};
use crate::forms::*;
use crate::generated::tree as gen;

pub(super) fn form(fields: &Fields) -> Result<Form, Drift> {
    let read_fields = fields.each(
        "fields",
        |field| {
            let options: Option<Vec<String>> = match field.object.get("options") {
                None => None,
                Some(_) => Some(field.list("options")?.iter().map(|option| option.as_str().map(str::to_string).ok_or_else(|| field.drift("options"))).collect::<Result<_, _>>()?),
            };
            let offered = options.clone().map_or(Offered::NotListed, Offered::Listed);
            let input = match field.word::<gen::FormFieldInput>("input")? {
                gen::FormFieldInput::Text => FieldInput::Text(offered),
                gen::FormFieldInput::Number => FieldInput::Number(offered),
                gen::FormFieldInput::Checkbox => FieldInput::Checkbox(offered),
                gen::FormFieldInput::Select => FieldInput::Select(NonEmpty::from_vec(options.unwrap_or_default()).ok_or_else(|| field.drift("options"))?),
            };
            let lines = match field.object.get("lines") {
                None => None,
                Some(item) => Some(item.as_finite().filter(|n| n.fract() == 0.0 && (2.0..=8.0).contains(n)).map(|n| n as u8).ok_or_else(|| field.drift("lines"))?),
            };
            Ok(Field { id: field.text("id")?, label: field.text("label")?, input, lines, required: field.flag("required")? })
        },
        "FormField",
    )?;
    Ok(Form { id: fields.text("id")?, fields: fields.non_empty("fields", read_fields)?, submit_label: fields.text("submitLabel")?, send: fields.maybe_word("send")? })
}

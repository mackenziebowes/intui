import type { FieldValue, FormField } from '@intui/core'
import { parseNumber } from '@intui/layout'

/** What a control holds right now: its text, or a checkbox's state. */
export type RawValue = string | boolean

export type FormReading = {
  /** The values to send: empty optional fields are left out, checkboxes are always sent. */
  values: Record<string, FieldValue>
  /** One sentence per field that can't be sent yet, keyed by field id. */
  errors: Record<string, string>
}

/** Turns what's in the controls into an event's values, or says what to fix. */
export function readForm(fields: readonly FormField[], raw: (fieldId: string) => RawValue | undefined): FormReading {
  // No prototype, so a field named `constructor` or `__proto__` isn't an inherited member.
  const values: Record<string, FieldValue> = Object.create(null)
  const errors: Record<string, string> = Object.create(null)
  for (const field of fields) {
    const current = raw(field.id)
    if (field.input === 'checkbox') {
      values[field.id] = current === true
      continue
    }
    const text = typeof current === 'string' ? current.trim() : ''
    if (text === '') {
      if (field.required) errors[field.id] = field.input === 'select' ? `Pick an option for ${field.label}.` : `Fill in ${field.label} to send this.`
      continue
    }
    if (field.input === 'number') {
      const parsed = parseNumber(text)
      if (parsed.kind === 'value') values[field.id] = parsed.value
      else if (parsed.kind === 'invalid') errors[field.id] = `${parsed.note}. Use digits, like 42 or 3.5.`
      continue
    }
    values[field.id] = text
  }
  return { values, errors }
}

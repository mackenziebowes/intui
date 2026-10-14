/**
 * The words and rules around a Form's state in Claude Code: which required fields still
 * have no value, the lines that say what a submitted form sent, and the sentence under the
 * submit button when it can't go yet. No elements, only strings.
 */
import type { FieldValue, FormField } from '@intui/core'

const isEmpty = (value: FieldValue | undefined) => value === undefined || (typeof value === 'string' && value.trim() === '')

/** Labels of required fields with no value yet. A required checkbox counts once it has been set either way. */
export function missingRequired(fields: FormField[], valueOf: (fieldId: string) => FieldValue | undefined): string[] {
  return fields.filter(field => field.required && isEmpty(valueOf(field.id))).map(field => field.label)
}

const show = (field: FormField, value: FieldValue | undefined) =>
  field.input === 'checkbox' ? (value === true ? 'yes' : 'no') : isEmpty(value) ? '-' : String(value)

/** One dim line per field saying what was sent. */
export function summarize(fields: FormField[], valueOf: (fieldId: string) => FieldValue | undefined): string[] {
  return fields.map(field => `${field.label}: ${show(field, valueOf(field.id))}`)
}

/** The sentence under the submit button when it cannot go yet, or undefined when it can. */
export function blockedNote(missing: string[], invalid: string[]): string | undefined {
  const parts = [
    missing.length ? `Still needed: ${missing.join(', ')}` : '',
    invalid.length ? `Fix: ${invalid.join('; ')}` : '',
  ].filter(Boolean)
  return parts.length ? parts.join('. ') : undefined
}

export const checkboxLabel = (field: FormField, checked: boolean) => `${checked ? '[x]' : '[ ]'} ${field.label}${field.required ? ' *' : ''}`

export const fieldLabel = (field: FormField) => `${field.label}${field.required ? ' *' : ''}`

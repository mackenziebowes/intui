import type { FieldValue, FormField } from '@intui/core'

export type NumberInput =
  | { kind: 'value'; value: number }
  | { kind: 'cleared' }
  | { kind: 'invalid'; note: string }

const NUMBER = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i

/** Reads what was typed into a number field. Never throws. */
export function parseNumber(raw: string): NumberInput {
  const trimmed = raw.trim()
  if (trimmed === '') return { kind: 'cleared' }
  const value = NUMBER.test(trimmed) ? Number(trimmed) : NaN
  return Number.isFinite(value) ? { kind: 'value', value } : { kind: 'invalid', note: `"${trimmed.slice(0, 20)}" is not a number` }
}

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

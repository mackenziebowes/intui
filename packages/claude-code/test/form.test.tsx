import { describe, expect, test } from 'bun:test'
import { blockedNote, missingRequired, parseNumber, summarize } from '../src/draw/form-logic'
import { form as formDrawer } from '../src/draw/form'
import { draw, findAll, press, textOf, type Drawn } from './harness'


const fields = [
  { id: 'title', label: 'Title', input: 'text' as const, required: true },
  { id: 'qty', label: 'Qty', input: 'number' as const, required: false },
  { id: 'kind', label: 'Kind', input: 'select' as const, options: ['a', 'b'], required: false },
  { id: 'urgent', label: 'Urgent', input: 'checkbox' as const, required: false },
]
const form = (id = 'f') => ({ type: 'Form', id, fields, submitLabel: 'Add' })
const submitKey = 'toolu_test:root:submit'
const qtyNoteKey = 'toolu_test:root:field:qty:number'
const typeInto = (drawn: Drawn, label: string, value: string) =>
  (findAll(drawn, 'Input').find(i => String(i.props.label).startsWith(label))!.props.onInput as (v: string) => unknown)(value)

describe('form logic', () => {
  test('parseNumber: valid, invalid and cleared', () => {
    expect(parseNumber(' 12.5 ')).toEqual({ kind: 'value', value: 12.5 })
    expect(parseNumber('-3e2')).toEqual({ kind: 'value', value: -300 })
    expect(parseNumber('')).toEqual({ kind: 'cleared' })
    for (const bad of ['abc', '0x10', 'Infinity', '1,5', '1.2.3']) expect(parseNumber(bad).kind).toBe('invalid')
  })
  test('missingRequired treats blank text as missing', () => {
    expect(missingRequired(fields, () => undefined)).toEqual(['Title'])
    expect(missingRequired(fields, () => '  ')).toEqual(['Title'])
    expect(missingRequired(fields, id => (id === 'title' ? 'x' : undefined))).toEqual([])
  })
  test('summarize and the blocked sentence', () => {
    const values: Record<string, string | number | boolean> = { title: 'T', urgent: true }
    expect(summarize(fields, id => values[id])).toEqual(['Title: T', 'Qty: -', 'Kind: -', 'Urgent: yes'])
    expect(blockedNote([], [])).toBeUndefined()
    expect(blockedNote(['A', 'B'], ['Qty is bad'])).toBe('Still needed: A, B. Fix: Qty is bad')
  })
})

describe('Form drawer', () => {
  test('typing, selecting and toggling save the fields', async () => {
    const { drawn, recorded } = draw(form('g'))
    await typeInto(drawn, 'Title', 'Hello')
    await typeInto(drawn, 'Qty', '4')
    await (findAll(drawn, 'Select')[0]!.props.onSelect as (v: string) => unknown)('b')
    await press(drawn, 'toolu_test:root:field:urgent')
    expect(recorded.fields.g).toEqual({ title: 'Hello', qty: 4, kind: 'b', urgent: true })
  })

  test('a required field left empty is named and the submit is refused', async () => {
    const { drawn, recorded } = draw(form('h'))
    expect(textOf(drawn)).toContain('Still needed: Title')
    await press(drawn, submitKey)
    expect(recorded.submits).toEqual([])
  })

  test('with the required field filled, submit goes through', async () => {
    const { drawn, recorded } = draw(form('i'), { fields: { i: { title: 'T' } } })
    expect(textOf(drawn)).not.toContain('Still needed')
    await press(drawn, submitKey)
    expect(recorded.submits).toEqual(['i'])
  })

  test('an invalid number is never saved, leaves a note, and blocks submit', async () => {
    const { drawn, recorded } = draw(form('n'), { fields: { n: { title: 'T' } } })
    await typeInto(drawn, 'Qty', 'abc')
    expect(recorded.fields.n).toEqual({ title: 'T' })
    expect(recorded.notes[qtyNoteKey]).toBe('"abc" is not a number')

    const again = draw(form('n'), { fields: recorded.fields, notes: recorded.notes })
    expect(textOf(again.drawn)).toContain('"abc" is not a number')
    await press(again.drawn, submitKey)
    expect(again.recorded.submits).toEqual([])
  })

  test('typing a valid number clears the note', async () => {
    const { drawn, recorded } = draw(form('n'), { notes: { [qtyNoteKey]: '"abc" is not a number' } })
    await typeInto(drawn, 'Qty', '7')
    expect(recorded.fields.n).toEqual({ qty: 7 })
    expect(recorded.notes).toEqual({})
  })

  test('clearing a number that was saved blocks submit until a number is typed again', async () => {
    const { drawn, recorded } = draw(form('n'), { fields: { n: { title: 'T', qty: 3 } } })
    await typeInto(drawn, 'Qty', '')
    expect(recorded.fields.n).toEqual({ title: 'T', qty: 3 })
    expect(recorded.notes[qtyNoteKey]).toBe('needs a number')
  })

  test('clearing a number that was never saved leaves no note', async () => {
    const { drawn, recorded } = draw(form('n'))
    await typeInto(drawn, 'Qty', '')
    expect(recorded.notes).toEqual({})
  })

  test('a submit that throws is caught and shown as a note', async () => {
    const f = { type: 'Form', id: 'e', fields: [{ id: 'x', label: 'X', input: 'text', required: false }], submitLabel: 'Go' }
    const failed = draw(f, { failOn: 'submit' })
    await press(failed.drawn, submitKey)
    const notes = failed.recorded.notes
    expect(notes).toEqual({ [submitKey]: 'agent gone' })
    expect(textOf(draw(f, { notes }).drawn)).toContain('Could not send: agent gone')
  })

  test('once submitted: no controls, a dim summary of what was sent', () => {
    const { drawn } = draw(form('j'), { submitted: ['j'], fields: { j: { title: 'T', qty: 2 } } })
    for (const el of ['Input', 'Select', 'Button']) expect(findAll(drawn, el)).toHaveLength(0)
    expect(textOf(drawn)).toContain('Title: T')
    expect(textOf(drawn)).toContain('Qty: 2')
  })

  test('mobile has no inputs: it draws the text form and says where to fill it in', () => {
    const { drawn } = draw(form(), { surface: 'mobile' })
    expect(findAll(drawn, 'Input')).toHaveLength(0)
    expect(findAll(drawn, 'Select')).toHaveLength(0)
    expect(findAll(drawn, 'Markdown')[0]!.props.text).toContain('Title (text, required)')
    expect(textOf(drawn)).toContain('terminal or desktop')
  })
})

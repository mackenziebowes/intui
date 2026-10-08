import { describe, expect, test } from 'bun:test'
import { blockedNote, checkboxLabel, missingRequired, parseNumber, summarize } from '../src/draw/form-logic'
import { form as formDrawer } from '../src/draw/form'
import { draw, findAll, press, SURFACES, textOf, type Drawn } from './harness'

// Draws one drawer directly with a context whose press/submit throws, which the harness cannot do.
function drawThrowing(drawer: { draw: (p: never, c: never) => unknown }, node: object, fails: 'press' | 'submit'): Drawn {
  const el = new Proxy({}, { get: (_, name) => ({ children, ...props }: { children?: unknown[] }) => ({ el: String(name), props, children: [children ?? []].flat(Infinity) }) })
  const boom = async () => { throw new Error('agent gone') }
  const ctx = {
    surface: 'terminal', el, columns: 80, text: () => '', key: (...parts: string[]) => ['toolu_test', 'root', ...parts].join(':'),
    pressed: () => undefined, press: fails === 'press' ? boom : async () => {}, field: () => undefined, setField: async () => {},
    submitted: () => false, submit: fails === 'submit' ? boom : async () => {},
  }
  return drawer.draw(node as never, ctx as never) as Drawn
}


const fields = [
  { id: 'title', label: 'Title', input: 'text' as const, required: true },
  { id: 'qty', label: 'Qty', input: 'number' as const, required: false },
  { id: 'kind', label: 'Kind', input: 'select' as const, options: ['a', 'b'], required: false },
  { id: 'urgent', label: 'Urgent', input: 'checkbox' as const, required: false },
]
const form = (id = 'f') => ({ type: 'Form', id, fields, submitLabel: 'Add' })
const submitKey = 'toolu_test:root:submit'

describe('form decisions', () => {
  test('parseNumber', () => {
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
  test('summarize and notes', () => {
    const values: Record<string, string | number | boolean> = { title: 'T', urgent: true }
    expect(summarize(fields, id => values[id])).toEqual(['Title: T', 'Qty: -', 'Kind: -', 'Urgent: yes'])
    expect(blockedNote([], [])).toBeUndefined()
    expect(blockedNote(['A', 'B'], ['Qty is bad'])).toBe('Still needed: A, B. Fix: Qty is bad')
    expect(checkboxLabel(fields[3]!, true)).toBe('[x] Urgent')
    expect(checkboxLabel(fields[0]!, false)).toBe('[ ] Title *')
  })
})

describe('Form drawer', () => {
  for (const surface of SURFACES) {
    if (surface === 'mobile') continue
    test(`fresh: one control per field on ${surface}`, () => {
      const { drawn } = draw(form(), { surface })
      expect(findAll(drawn, 'Input').map(i => i.props.label)).toEqual(['Title *', 'Qty'])
      expect(findAll(drawn, 'Select')[0]!.props.options).toEqual([{ value: 'a' }, { value: 'b' }])
      expect(findAll(drawn, 'Button').map(b => b.props.label)).toEqual(['[ ] Urgent', 'Add'])
      expect(textOf(drawn)).toContain('Still needed: Title')
    })

    test(`typing, selecting and toggling save fields on ${surface}`, async () => {
      const { drawn, recorded } = draw(form('g'), { surface })
      const [title, qty] = findAll(drawn, 'Input')
      await (title!.props.onInput as (v: string) => unknown)('Hello')
      await (qty!.props.onInput as (v: string) => unknown)('4')
      await (findAll(drawn, 'Select')[0]!.props.onSelect as (v: string) => unknown)('b')
      await press(drawn, 'toolu_test:root:field:urgent')
      expect(recorded.fields.g).toEqual({ title: 'Hello', qty: 4, kind: 'b', urgent: true })
    })

    test(`submit with a required field empty shows what is missing and does not send on ${surface}`, async () => {
      const { drawn, recorded } = draw(form('h'), { surface })
      await press(drawn, submitKey)
      expect(recorded.submits).toEqual([])
    })

    test(`submit with values calls submit on ${surface}`, async () => {
      const { drawn, recorded } = draw(form('i'), { surface, fields: { i: { title: 'T' } } })
      expect(textOf(drawn)).not.toContain('Still needed')
      await press(drawn, submitKey)
      expect(recorded.submits).toEqual(['i'])
    })

    test(`submitted: no controls, dim summary on ${surface}`, () => {
      const { drawn } = draw(form('j'), { surface, submitted: ['j'], fields: { j: { title: 'T', qty: 2 } } })
      for (const el of ['Input', 'Select', 'Button']) expect(findAll(drawn, el)).toHaveLength(0)
      expect(findAll(drawn, 'Text').every(t => t.props.dimColor === true)).toBe(true)
      expect(textOf(drawn)).toContain('Title: T')
      expect(textOf(drawn)).toContain('Qty: 2')
    })
  }

  test('an invalid number never reaches state, never throws, and blocks submit', async () => {
    const f = { type: 'Form', id: 'n', fields: [{ id: 'amount', label: 'Amount', input: 'number', required: false }], submitLabel: 'Go' }
    const first = draw(f)
    await (findAll(first.drawn, 'Input')[0]!.props.onInput as (v: string) => unknown)('abc')
    expect(first.recorded.fields.n).toBeUndefined()
    const again = draw(f)
    expect(textOf(again.drawn)).toContain('"abc" is not a number')
    await press(again.drawn, submitKey)
    expect(again.recorded.submits).toEqual([])
    await (findAll(again.drawn, 'Input')[0]!.props.onInput as (v: string) => unknown)('7')
    expect(again.recorded.fields.n).toEqual({ amount: 7 })
    expect(textOf(draw(f).drawn)).not.toContain('is not a number')
  })

  test('a submit that throws is caught and shown on the next draw', async () => {
    const f = { type: 'Form', id: 'e', fields: [{ id: 'x', label: 'X', input: 'text', required: false }], submitLabel: 'Go' }
    const drawn = drawThrowing(formDrawer, f, 'submit')
    await press(drawn, submitKey)
    expect(textOf(draw(f).drawn)).toContain('Could not send: agent gone')
  })

  test('mobile draws the text form and says where to fill it in', () => {
    const { drawn } = draw(form(), { surface: 'mobile' })
    expect(findAll(drawn, 'Input')).toHaveLength(0)
    expect(findAll(drawn, 'Select')).toHaveLength(0)
    expect(findAll(drawn, 'Markdown')[0]!.props.text).toContain('Title (text, required)')
    expect(textOf(drawn)).toContain('terminal or desktop')
  })
})

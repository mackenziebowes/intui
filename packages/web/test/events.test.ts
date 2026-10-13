import { describe, expect, test } from 'bun:test'
import { Catalog, core, Flow, IntuiEvent, Tree, type Node } from '@intui/core'
import { Window } from 'happy-dom'
import { render, type RenderOptions } from '../src/render'

const tick = () => new Promise(resolve => setTimeout(resolve, 0))

function mount(root: Node, options: Partial<RenderOptions> = {}) {
  const window = new Window()
  const document = window.document as unknown as Document
  const tree = Tree.of(root)
  const events: IntuiEvent[] = []
  const element = render(tree, { source: 'toolu_42', document, onEvent: event => void events.push(event), ...options })
  document.body.append(element)
  return { element, events, tree, window }
}

const choice: Node = {
  type: 'Choice',
  id: 'next-step',
  options: [{ id: 'explore', label: 'Start exploring', emphasis: 'primary' }, { id: 'park', label: 'Park' }],
  repeat: 'once',
} as Node

const form: Node = {
  type: 'Form',
  id: 'new-idea',
  fields: [
    { id: 'title', label: 'Title', input: 'text', required: true },
    { id: 'points', label: 'Points', input: 'number', required: false },
    { id: 'source', label: 'Source', input: 'select', options: ['self', 'client'], required: false },
    { id: 'urgent', label: 'Urgent', input: 'checkbox', required: false },
  ],
  submitLabel: 'Add idea',
} as Node

const buttons = (element: HTMLElement) => [...element.querySelectorAll<HTMLButtonElement>('.intui-choice button')]

describe('Choice events', () => {
  test('a press carries the source and the ids, and fits the tree', async () => {
    const { element, events, tree } = mount(choice)
    buttons(element)[1]!.click()
    await tick()
    expect(events).toHaveLength(1)
    expect(events[0]!.toJSON()).toEqual({ v: 1, source: 'toolu_42', target: 'next-step', action: 'press', value: 'park' })
    expect(() => tree.verify(events[0]!)).not.toThrow()
  })

  test('a once Choice is used up after a press, so it cannot fire again', async () => {
    const { element, events } = mount(choice)
    buttons(element)[0]!.click()
    await tick()
    buttons(element)[1]!.click()
    await tick()
    expect(events).toHaveLength(1)
    expect(buttons(element).every(button => button.disabled)).toBe(true)
  })

  test("the host's record of a past press draws it used up", () => {
    const { element } = mount(choice, { pressed: id => (id === 'next-step' ? 'explore' : undefined) })
    expect(buttons(element).every(button => button.disabled)).toBe(true)
    expect(buttons(element)[0]!.getAttribute('aria-pressed')).toBe('true')
  })

  test('when the handler throws, the choice stays open and says so', async () => {
    const { element } = mount(choice, { onEvent: () => Promise.reject(new Error('offline')) })
    buttons(element)[0]!.click()
    await tick()
    expect(buttons(element)[0]!.disabled).toBe(false)
    expect(element.querySelector('.intui-status')!.textContent).toContain('offline')
  })

  test('with no handler the controls are drawn disabled', () => {
    const { element } = mount(choice, { onEvent: undefined })
    expect(buttons(element).every(button => button.disabled)).toBe(true)
  })
})

describe('Form events', () => {
  const field = (element: HTMLElement, name: string) => element.querySelector<HTMLInputElement>(`[name="${name}"]`)!
  const submit = (element: HTMLElement) => element.querySelector<HTMLFormElement>('form')!.requestSubmit()

  test('a submit carries typed values (numbers parsed, empty optionals left out) and fits the tree', async () => {
    const { element, events, tree } = mount(form)
    field(element, 'title').value = '  Web renderer  '
    field(element, 'points').value = '3.5'
    field(element, 'urgent').checked = true
    submit(element)
    await tick()
    expect(events).toHaveLength(1)
    expect(events[0]!.toJSON()).toEqual({
      v: 1,
      source: 'toolu_42',
      target: 'new-idea',
      action: 'submit',
      value: { title: 'Web renderer', points: 3.5, urgent: true },
    })
    expect(() => tree.verify(events[0]!)).not.toThrow()
  })

  test('a missing required field blocks the submit and names the field', async () => {
    const { element, events } = mount(form)
    submit(element)
    await tick()
    expect(events).toHaveLength(0)
    expect(field(element, 'title').getAttribute('aria-invalid')).toBe('true')
    expect(element.querySelector('.intui-field-error')!.textContent).toContain('Title')
  })

  test('a number field with a typo is refused with a reason, not sent as empty', async () => {
    const { element, events } = mount(form)
    field(element, 'title').value = 'x'
    field(element, 'points').value = '3,5'
    submit(element)
    await tick()
    expect(events).toHaveLength(0)
    expect(field(element, 'points').getAttribute('aria-invalid')).toBe('true')
  })

  test("the host's record of a submit draws the form used up, showing what was sent", () => {
    const { element } = mount(form, { submitted: id => (id === 'new-idea' ? { title: 'Sent before', urgent: true } : undefined) })
    expect(field(element, 'title').value).toBe('Sent before')
    expect(field(element, 'title').disabled).toBe(true)
    expect(element.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(true)
  })
})

describe('Form field ids', () => {
  test('a field named constructor can still submit', async () => {
    const odd: Node = {
      type: 'Form',
      id: 'odd',
      fields: [{ id: 'constructor', label: 'Ctor', input: 'text', required: true }],
      submitLabel: 'Go',
    } as Node
    const { element, events, tree } = mount(odd)
    element.querySelector<HTMLInputElement>('[name="constructor"]')!.value = 'x'
    element.querySelector<HTMLFormElement>('form')!.requestSubmit()
    await tick()
    expect(events).toHaveLength(1)
    expect(() => tree.verify(events[0]!)).not.toThrow()
  })

  test('a field id with spaces still wires its label and error message', () => {
    const spaced: Node = {
      type: 'Form',
      id: 'spaced',
      fields: [{ id: 'first name', label: 'First name', input: 'text', required: true }],
      submitLabel: 'Go',
    } as Node
    const { element } = mount(spaced)
    const control = element.querySelector<HTMLInputElement>('[name="first name"]')!
    expect(control.id).not.toMatch(/\s/)
    expect(element.querySelector('label')!.getAttribute('for')).toBe(control.id)
    expect(control.getAttribute('aria-describedby')).not.toMatch(/\s/)
    expect(element.querySelector(`#${control.getAttribute('aria-describedby')}`)).toBe(element.querySelector('.intui-field-error'))
  })
})

describe('text forms', () => {
  test('a tree parsed with a custom catalog draws its own text form without passing the catalog again', () => {
    const catalog = new Catalog(core.kinds.map(kind => (kind.type === 'Flow' ? { ...kind, toText: () => 'CUSTOM FLOW TEXT' } : kind)))
    const tree = Tree.parse({ v: 1, root: Flow.example }, { catalog })
    const window = new Window()
    const element = render(tree, { source: 's', document: window.document as unknown as Document })
    expect(element.textContent).toContain('CUSTOM FLOW TEXT')
  })
})

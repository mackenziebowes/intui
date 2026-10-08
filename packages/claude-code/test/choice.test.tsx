import { describe, expect, test } from 'bun:test'
import { choiceView, describeError, hotkeyAt, variantOf } from '../src/draw/choice-view'
import { choice as choiceDrawer } from '../src/draw/choice'
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


const choice = (repeat: 'once' | 'many' = 'once') => ({
  type: 'Choice',
  id: 'next',
  prompt: 'What next?',
  options: [
    { id: 'explore', label: 'Explore', emphasis: 'primary' },
    { id: 'park', label: 'Park' },
  ],
  repeat,
})

const props = choice() as unknown as Parameters<typeof choiceView>[0]

describe('choice decisions', () => {
  test('open until pressed', () => {
    expect(choiceView(props, undefined)).toEqual({ kind: 'open' })
  })
  test('used shows the chosen label, or the id if unknown', () => {
    expect(choiceView(props, 'park')).toEqual({ kind: 'used', chosen: '✓ Park' })
    expect(choiceView(props, 'gone')).toEqual({ kind: 'used', chosen: '✓ gone' })
  })
  test('many stays open after a press', () => {
    expect(choiceView({ ...props, repeat: 'many' }, 'park')).toEqual({ kind: 'open' })
  })
  test('variants, hotkeys, errors', () => {
    expect(variantOf('primary')).toBe('primary')
    expect(variantOf(undefined)).toBeUndefined()
    expect(hotkeyAt(0)).toBe('1')
    expect(hotkeyAt(9)).toBeUndefined()
    expect(describeError(new Error('a\nb'))).toBe('a')
    expect(describeError('plain')).toBe('plain')
  })
})

describe('Choice drawer', () => {
  for (const surface of SURFACES) {
    test(`fresh: a Button per option with unique keys on ${surface}`, async () => {
      const { drawn, recorded } = draw(choice(), { surface })
      const buttons = findAll(drawn, 'Button')
      expect(buttons.map(b => b.props.label)).toEqual(['Explore', 'Park'])
      expect(buttons.map(b => b.props.variant)).toEqual(['primary', undefined])
      expect(new Set(buttons.map(b => b.props.key)).size).toBe(2)
      expect(textOf(drawn)).toContain('What next?')
      await press(drawn, buttons[1]!.props.key as string)
      expect(recorded.presses).toEqual([{ choiceId: 'next', optionId: 'park' }])
    })

    test(`used up: no buttons, dim chosen option on ${surface}`, () => {
      const { drawn } = draw(choice(), { surface, pressed: { next: 'park' } })
      expect(findAll(drawn, 'Button')).toHaveLength(0)
      const dim = findAll(drawn, 'Text')
      expect(dim).toHaveLength(1)
      expect(dim[0]!.props.dimColor).toBe(true)
      expect(textOf(dim[0]!)).toBe('✓ Park')
    })

    test(`many keeps its buttons on ${surface}`, () => {
      const { drawn } = draw(choice('many'), { surface, pressed: { next: 'park' } })
      expect(findAll(drawn, 'Button')).toHaveLength(2)
    })
  }

  test('a failing press does not throw into the engine and is shown next draw', async () => {
    const drawn = drawThrowing(choiceDrawer, choice(), 'press')
    await press(drawn, 'toolu_test:root:option:park')
    expect(textOf(draw(choice()).drawn)).toContain('Could not send that: agent gone')
  })
})

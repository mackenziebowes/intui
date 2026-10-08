import { describe, expect, test } from 'bun:test'
import { choice as choiceDrawer } from '../src/draw/choice'
import { draw, findAll, press, textOf, type Drawn } from './harness'


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
const failedKey = 'toolu_test:root:failed'

describe('Choice drawer', () => {
  test('a Button per option, only the primary one emphasised, and a press is sent', async () => {
    const { drawn, recorded } = draw(choice())
    const buttons = findAll(drawn, 'Button')
    expect(buttons.map(b => b.props.label)).toEqual(['Explore', 'Park'])
    expect(buttons.map(b => b.props.variant)).toEqual(['primary', undefined])
    expect(textOf(drawn)).toContain('What next?')
    await press(drawn, buttons[1]!.props.key as string)
    expect(recorded.presses).toEqual([{ choiceId: 'next', optionId: 'park' }])
  })

  test('once: after a press the buttons are gone and the chosen option is shown', () => {
    const { drawn } = draw(choice('once'), { pressed: { next: 'park' } })
    expect(findAll(drawn, 'Button')).toHaveLength(0)
    expect(textOf(drawn)).toContain('✓ Park')
  })

  test('once: an unknown pressed id is shown as is', () => {
    expect(textOf(draw(choice(), { pressed: { next: 'gone' } }).drawn)).toContain('✓ gone')
  })

  test('many: the buttons stay after a press', () => {
    const { drawn } = draw(choice('many'), { pressed: { next: 'park' } })
    expect(findAll(drawn, 'Button')).toHaveLength(2)
  })

  test('a failing press is caught and left as a note, shown on the next draw', async () => {
    const failed = draw(choice(), { failOn: 'press' })
    await press(failed.drawn, 'toolu_test:root:option:park')
    const notes = failed.recorded.notes
    expect(notes).toEqual({ [failedKey]: 'agent gone' })
    expect(textOf(draw(choice(), { notes }).drawn)).toContain('Could not send that: agent gone')
  })

  test('a later press clears the old note', async () => {
    const { drawn, recorded } = draw(choice(), { notes: { [failedKey]: 'agent gone' } })
    await press(drawn, 'toolu_test:root:option:park')
    expect(recorded.notes).toEqual({})
  })
})

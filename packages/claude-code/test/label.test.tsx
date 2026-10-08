import { describe, expect, test } from 'bun:test'
import { draw, textOf } from './harness'
import { tagText } from '../src/draw/label-shape'

describe('Label', () => {
  test('draws the text as a tag, colored by tone', () => {
    const { drawn } = draw({ type: 'Label', text: 'ok', tone: 'positive' })
    expect(textOf(drawn)).toBe('[ok]')
    expect(drawn.props.color).toBe('green')
  })

  test('muted is dim with no color', () => {
    const { drawn } = draw({ type: 'Label', text: 'parked', tone: 'muted' })
    expect(drawn.props.dimColor).toBe(true)
    expect(drawn.props.color).toBeUndefined()
  })

  test('is never wider than the room', () => {
    expect(tagText('a very long status', 8)).toBe('[a ver…]')
    expect(tagText('abc', 1)).toBe('…')
    for (let c = 1; c < 12; c++) expect([...tagText('a very long status', c)].length).toBeLessThanOrEqual(c)
  })
})

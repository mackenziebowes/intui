import { describe, expect, test } from 'bun:test'
import { draw, SURFACES, textOf } from './harness'
import { tagText } from '../src/draw/label-shape'

describe('Label', () => {
  for (const surface of SURFACES) {
    test(`draws a toned tag on ${surface}`, () => {
      const { drawn } = draw({ type: 'Label', text: 'ok', tone: 'positive' }, { surface })
      expect(drawn.el).toBe('Text')
      expect(drawn.props.color).toBe('green')
      expect(textOf(drawn)).toBe('[ok]')
    })

    test(`muted is dim with no color on ${surface}`, () => {
      const { drawn } = draw({ type: 'Label', text: 'parked', tone: 'muted' }, { surface })
      expect(drawn.props.dimColor).toBe(true)
      expect(drawn.props.color).toBeUndefined()
    })
  }

  test('never wider than the room', () => {
    expect(tagText('a very long status', 8)).toBe('[a ver…]')
    expect(tagText('abc', 2)).toBe('a…')
    expect(tagText('abc', 1)).toBe('…')
    for (let c = 1; c < 12; c++) expect([...tagText('a very long status', c)].length).toBeLessThanOrEqual(c)
  })
})

import { describe, expect, test } from 'bun:test'
import { draw, findAll, SURFACES, textOf } from './harness'
import { changeText, formatNumber, statLines } from '../src/draw/stat-shape'

const stat = (extra = {}) => ({ type: 'Stat', label: 'Visitors', value: 1204, tone: 'positive', ...extra })

describe('Stat', () => {
  for (const surface of SURFACES) {
    test(`draws label, value and change on ${surface}`, () => {
      const { drawn } = draw(stat({ change: { value: 18, as: 'percent' } }), { surface })
      const texts = findAll(drawn, 'Text')
      expect(texts.map(t => textOf(t))).toEqual(['Visitors', '1,204', '▲ 18%'])
      expect(texts[2]!.props.color).toBe('green')
    })

    test(`without a change draws two lines on ${surface}`, () => {
      const { drawn } = draw(stat({ unit: 'ms' }), { surface })
      expect(findAll(drawn, 'Text').map(t => textOf(t))).toEqual(['Visitors', '1,204 ms'])
    })
  }

  test('the tone colors the change, not the sign', () => {
    const { drawn } = draw(stat({ tone: 'critical', change: { value: 5, as: 'amount' } }))
    const change = findAll(drawn, 'Text')[2]!
    expect(textOf(change)).toBe('▲ 5')
    expect(change.props.color).toBe('red')
  })

  test('muted tone dims and a down change gets a down marker', () => {
    const { drawn } = draw(stat({ tone: 'muted', change: { value: -3.456, as: 'amount' } }))
    const change = findAll(drawn, 'Text')[2]!
    expect(textOf(change)).toBe('▼ 3.46')
    expect(change.props.dimColor).toBe(true)
    expect(change.props.color).toBeUndefined()
  })

  test('formatting and flat change', () => {
    expect(formatNumber(12, '%')).toBe('12%')
    expect(changeText({ value: 0, as: 'percent' })).toBe('– 0%')
  })

  test('lines are cut to the room', () => {
    const lines = statLines({ label: 'A very long label', value: 123456789, change: { value: 10, as: 'percent' } }, 6)
    for (const line of [lines.label, lines.value, lines.change!]) expect([...line].length).toBeLessThanOrEqual(6)
  })
})

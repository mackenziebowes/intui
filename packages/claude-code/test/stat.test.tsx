import { describe, expect, test } from 'bun:test'
import { draw, findAll, textOf } from './harness'
import { statLines } from '../src/draw/stat-shape'

const stat = (extra = {}) => ({ type: 'Stat', label: 'Visitors', value: 1204, tone: 'positive', ...extra })
const changeOf = (extra: object) => findAll(draw(stat(extra)).drawn, 'Text')[2]!

describe('Stat', () => {
  test('draws label, value and change', () => {
    const { drawn } = draw(stat({ change: { value: 18, as: 'percent' } }))
    expect(findAll(drawn, 'Text').map(t => textOf(t))).toEqual(['Visitors', '1,204', '▲ 18%'])
  })

  test('without a change draws two lines, with the unit', () => {
    const { drawn } = draw(stat({ unit: 'ms' }))
    expect(findAll(drawn, 'Text').map(t => textOf(t))).toEqual(['Visitors', '1,204 ms'])
  })

  test('the tone colors the change, not the sign', () => {
    const up = changeOf({ tone: 'critical', change: { value: 5, as: 'amount' } })
    expect(textOf(up)).toBe('▲ 5')
    expect(up.props.color).toBe('red')
    const down = changeOf({ tone: 'positive', change: { value: -5, as: 'amount' } })
    expect(textOf(down)).toBe('▼ 5')
    expect(down.props.color).toBe('green')
  })

  test('muted tone dims the change', () => {
    const change = changeOf({ tone: 'muted', change: { value: -3.456, as: 'amount' } })
    expect(textOf(change)).toBe('▼ 3.46')
    expect(change.props.dimColor).toBe(true)
    expect(change.props.color).toBeUndefined()
  })

  test('a zero change is flat', () => {
    expect(textOf(changeOf({ change: { value: 0, as: 'percent' } }))).toBe('– 0%')
  })

  test('lines are cut to the room', () => {
    const lines = statLines({ label: 'A very long label', value: 123456789, change: { value: 10, as: 'percent' } }, 6)
    for (const line of [lines.label, lines.value, lines.change!]) expect([...line].length).toBeLessThanOrEqual(6)
  })
})

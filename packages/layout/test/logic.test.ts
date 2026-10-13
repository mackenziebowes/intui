import { describe, expect, test } from 'bun:test'
import { alignOf, parseNumber } from '../src'

const cols = [
  { key: 'name', label: 'Name' },
  { key: 'count', label: 'Count' },
]
const rows = [
  { name: 'alpha', count: 1234567 },
  { name: 'beta', count: 12 },
]

describe('table alignment', () => {
  test('alignment: explicit wins, all-number columns go right', () => {
    expect(alignOf(cols[1]!, rows)).toBe('end')
    expect(alignOf(cols[0]!, rows)).toBe('start')
    expect(alignOf({ ...cols[1]!, align: 'start' }, rows)).toBe('start')
    expect(alignOf(cols[1]!, [{ count: 1 }, { count: 'n/a' }])).toBe('start')
  })
})

describe('number fields', () => {
  test('parseNumber: valid, invalid and cleared', () => {
    expect(parseNumber(' 12.5 ')).toEqual({ kind: 'value', value: 12.5 })
    expect(parseNumber('-3e2')).toEqual({ kind: 'value', value: -300 })
    expect(parseNumber('')).toEqual({ kind: 'cleared' })
    for (const bad of ['abc', '0x10', 'Infinity', '1,5', '1.2.3']) expect(parseNumber(bad).kind).toBe('invalid')
  })
})

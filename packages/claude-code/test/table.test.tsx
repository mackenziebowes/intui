import { describe, expect, test } from 'bun:test'
import { allocateWidths, alignOf, formatCell, layoutTable, pad, truncate } from '../src/draw/table-layout'
import { draw, findAll, SURFACES, textOf } from './harness'

const cols = [
  { key: 'name', label: 'Name' },
  { key: 'count', label: 'Count' },
]
const rows = [
  { name: 'alpha', count: 1234567 },
  { name: 'beta', count: 12 },
]

describe('table layout', () => {
  test('formatCell', () => {
    expect(formatCell(1234567.891)).toBe('1,234,567.89')
    expect(formatCell(null)).toBe('')
    expect(formatCell(true)).toBe('true')
    expect(formatCell('a\nb')).toBe('a b')
  })
  test('truncate and pad', () => {
    expect(truncate('abcdef', 4)).toBe('abc…')
    expect(truncate('abc', 4)).toBe('abc')
    expect(truncate('abc', 1)).toBe('…')
    expect(pad('ab', 4, 'end')).toBe('  ab')
    expect(pad('ab', 4, 'start')).toBe('ab  ')
  })
  test('alignment: explicit wins, all-number columns go right', () => {
    expect(alignOf(cols[1]!, rows)).toBe('end')
    expect(alignOf(cols[0]!, rows)).toBe('start')
    expect(alignOf({ ...cols[1]!, align: 'start' }, rows)).toBe('start')
    expect(alignOf({ ...cols[0]!, align: 'end' }, rows)).toBe('end')
    expect(alignOf(cols[1]!, [{ count: 1 }, { count: 'n/a' }])).toBe('start')
  })
  test('allocateWidths keeps short columns and shrinks the widest', () => {
    expect(allocateWidths([5, 30], [4, 4], 20)).toEqual([5, 13])
    expect(allocateWidths([5, 8], [4, 4], 80)).toEqual([5, 8])
  })
  test('allocateWidths gives up when minimums do not fit', () => {
    expect(allocateWidths([10, 10, 10], [4, 4, 4], 10)).toBeUndefined()
  })
  test('layoutTable grid never exceeds the width', () => {
    for (const width of [20, 30, 80]) {
      const layout = layoutTable(cols, rows, width)
      if (layout.kind !== 'grid') throw new Error('expected grid')
      for (const line of [layout.header, layout.separator, ...layout.rows]) expect(line.length).toBeLessThanOrEqual(width)
    }
  })
  test('layoutTable stacks when columns cannot fit', () => {
    const many = Array.from({ length: 6 }, (_, i) => ({ key: `k${i}`, label: `Column ${i}` }))
    const layout = layoutTable(many, [{ k0: 'x', k1: 'y' }], 30)
    expect(layout.kind).toBe('stacked')
    if (layout.kind === 'stacked') {
      expect(layout.blocks[0]![0]).toBe('Column 0: x')
      for (const line of layout.blocks[0]!) expect(line.length).toBeLessThanOrEqual(30)
    }
  })
})

describe('Table drawer', () => {
  for (const surface of SURFACES) {
    test(`draws a grid on ${surface}`, () => {
      const { drawn } = draw({ type: 'Table', caption: 'Things', columns: cols, rows }, { surface, columns: 60 })
      const texts = findAll(drawn, 'Text')
      expect(texts[0]!.children).toEqual(['Things'])
      expect(texts[0]!.props.dimColor).toBe(true)
      expect(texts[1]!.props.bold).toBe(true)
      expect(textOf(drawn)).toContain('1,234,567')
      expect(texts[3]!.children[0]).toMatch(/^alpha +1,234,567$/)
      expect(texts[4]!.children[0]).toMatch(/^beta +12$/)
    })

    test(`stacks rows on a narrow ${surface}`, () => {
      const many = Array.from({ length: 5 }, (_, i) => ({ key: `k${i}`, label: `Column ${i}` }))
      const { drawn } = draw({ type: 'Table', columns: many, rows: [{ k0: 'a', k1: 'b' }] }, { surface, columns: 30 })
      expect(findAll(drawn, 'Text').map(t => t.children[0])).toContain('Column 1: b')
      expect(findAll(drawn, 'Text').some(t => t.props.bold)).toBe(false)
    })
  }

  test('truncated cells carry an ellipsis', () => {
    const { drawn } = draw(
      { type: 'Table', columns: cols, rows: [{ name: 'a very long name indeed that goes on', count: 5 }] },
      { columns: 24 },
    )
    expect(textOf(drawn)).toContain('…')
  })
})

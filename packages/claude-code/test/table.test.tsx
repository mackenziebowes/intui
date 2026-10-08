import { describe, expect, test } from 'bun:test'
import { allocateWidths, alignOf, layoutTable } from '../src/draw/table-layout'
import { draw, findAll, textOf } from './harness'

const cols = [
  { key: 'name', label: 'Name' },
  { key: 'count', label: 'Count' },
]
const rows = [
  { name: 'alpha', count: 1234567 },
  { name: 'beta', count: 12 },
]
const many = Array.from({ length: 6 }, (_, i) => ({ key: `k${i}`, label: `Column ${i}` }))

describe('table layout', () => {
  test('alignment: explicit wins, all-number columns go right', () => {
    expect(alignOf(cols[1]!, rows)).toBe('end')
    expect(alignOf(cols[0]!, rows)).toBe('start')
    expect(alignOf({ ...cols[1]!, align: 'start' }, rows)).toBe('start')
    expect(alignOf(cols[1]!, [{ count: 1 }, { count: 'n/a' }])).toBe('start')
  })

  test('allocateWidths keeps short columns and shrinks the widest', () => {
    expect(allocateWidths([5, 30], [4, 4], 20)).toEqual([5, 13])
    expect(allocateWidths([5, 8], [4, 4], 80)).toEqual([5, 8])
  })

  test('allocateWidths gives up when minimums do not fit', () => {
    expect(allocateWidths([10, 10, 10], [4, 4, 4], 10)).toBeUndefined()
  })

  test('a grid is never wider than the room', () => {
    for (const width of [20, 30, 80]) {
      const layout = layoutTable(cols, rows, width)
      if (layout.kind !== 'grid') throw new Error('expected grid')
      for (const line of [layout.header, layout.separator, ...layout.rows]) expect(line.length).toBeLessThanOrEqual(width)
    }
  })

  test('stacks when columns cannot fit', () => {
    const layout = layoutTable(many, [{ k0: 'x', k1: 'y' }], 30)
    if (layout.kind !== 'stacked') throw new Error('expected stacked')
    expect(layout.blocks[0]![0]).toBe('Column 0: x')
    for (const line of layout.blocks[0]!) expect(line.length).toBeLessThanOrEqual(30)
  })
})

describe('Table drawer', () => {
  test('draws the caption, header and right-aligned numbers', () => {
    const { drawn } = draw({ type: 'Table', caption: 'Things', columns: cols, rows }, { columns: 60 })
    const lines = findAll(drawn, 'Text').map(t => textOf(t))
    expect(lines[0]).toBe('Things')
    expect(lines.find(l => l.startsWith('alpha'))).toMatch(/^alpha +1,234,567$/)
    expect(lines.find(l => l.startsWith('beta'))).toMatch(/^beta +12$/)
  })

  test('stacks rows on a narrow screen', () => {
    const { drawn } = draw({ type: 'Table', columns: many, rows: [{ k0: 'a', k1: 'b' }] }, { columns: 30 })
    expect(findAll(drawn, 'Text').map(t => textOf(t))).toContain('Column 1: b')
  })

  test('truncated cells carry an ellipsis', () => {
    const { drawn } = draw(
      { type: 'Table', columns: cols, rows: [{ name: 'a very long name indeed that goes on', count: 5 }] },
      { columns: 24 },
    )
    expect(textOf(drawn)).toContain('…')
  })
})

import { describe, expect, test } from 'bun:test'
import { analyse, asSequence, breakCycles, layoutGrid, planSequence, resolveEdges, truncate, wrap } from '../src/draw/flow-layout'
import { draw, findAll, SURFACES, textOf } from './harness'

const steps = (...ids: string[]) => ids.map(id => ({ id, label: id.toUpperCase() }))
const flow = (ids: string[], links: { from: string; to: string; label?: string }[] = [], detail: Record<string, string> = {}) => ({
  type: 'Flow',
  steps: ids.map(id => ({ id, label: id.toUpperCase(), ...(detail[id] ? { detail: detail[id] } : {}) })),
  links,
})
const grid = (ids: string[], links: { from: string; to: string; label?: string }[], columns = 80) => {
  const s = steps(...ids)
  const rows = layoutGrid(s, analyse(s, links), columns)
  return rows?.map(runs => runs.map(run => run.text).join(''))
}

describe('text helpers', () => {
  test('wrap breaks at spaces and splits long words', () => {
    expect(wrap('one two three', 7)).toEqual(['one two', 'three'])
    expect(wrap('abcdefghij', 4)).toEqual(['abcd', 'efgh', 'ij'])
    expect(wrap('', 5)).toEqual([''])
  })
  test('truncate ends in an ellipsis', () => {
    expect(truncate('abcdef', 4)).toBe('abc…')
    expect(truncate('abc', 4)).toBe('abc')
  })
})

describe('layering', () => {
  test('no links chain the steps in order', () => {
    expect(resolveEdges(steps('a', 'b', 'c'), [])).toEqual([{ from: 0, to: 1 }, { from: 1, to: 2 }])
  })
  test('duplicate links merge their labels', () => {
    const edges = resolveEdges(steps('a', 'b'), [{ from: 'a', to: 'b', label: 'x' }, { from: 'a', to: 'b', label: 'y' }])
    expect(edges).toEqual([{ from: 0, to: 1, label: 'x / y' }])
  })
  test('layers follow the longest path', () => {
    const a = analyse(steps('a', 'b', 'c', 'd'), [
      { from: 'a', to: 'b' }, { from: 'b', to: 'd' }, { from: 'a', to: 'c' }, { from: 'c', to: 'd' },
    ])
    expect(a.layers).toEqual([[0], [1, 2], [3]])
  })
  test('a cycle is broken and every step still gets a layer', () => {
    const a = analyse(steps('a', 'b', 'c'), [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'c', to: 'a' }])
    expect(a.back).toEqual([{ from: 2, to: 0 }])
    expect(a.layers).toEqual([[0], [1], [2]])
  })
  test('a self loop and a full cycle with no source do not hang', () => {
    expect(breakCycles(2, [{ from: 0, to: 0 }, { from: 0, to: 1 }, { from: 1, to: 0 }]).back).toHaveLength(2)
    const a = analyse(steps('a', 'b'), [{ from: 'a', to: 'b' }, { from: 'b', to: 'a' }])
    expect(a.layers.flat().sort()).toEqual([0, 1])
  })
  test('a straight line reads as a sequence, a fork does not', () => {
    const s = steps('a', 'b', 'c')
    expect(asSequence(analyse(s, []), 3)).toEqual([0, 1, 2])
    expect(asSequence(analyse(s, [{ from: 'a', to: 'b' }, { from: 'a', to: 'c' }]), 3)).toBeUndefined()
  })
})

describe('row or column', () => {
  const s = steps('a', 'b', 'c')
  test('a row when it fits, a column when it does not', () => {
    expect(planSequence(s, [[], [], []], [undefined, undefined], 80).direction).toBe('row')
    expect(planSequence(s, [[], [], []], [undefined, undefined], 20).direction).toBe('column')
  })
  test('long labels shrink the cap before giving up on a row', () => {
    const long = [{ id: 'a', label: 'x'.repeat(40) }, { id: 'b', label: 'y'.repeat(40) }]
    expect(planSequence(long, [[], []], [undefined], 50)).toEqual({ direction: 'row', cap: 16 })
  })
})

describe('grid layout', () => {
  test('a diamond draws with merged trunks and labels', () => {
    const rows = grid(['a', 'b', 'c', 'd'], [{ from: 'a', to: 'b' }, { from: 'a', to: 'c', label: 'no' }, { from: 'b', to: 'd' }, { from: 'c', to: 'd' }])!
    expect(rows.join('\n')).toContain('no')
    expect(rows.join('\n')).toContain('┬')
    expect(rows.join('\n')).toContain('┤')
    expect([...rows.join('')].filter(c => c === '→')).toHaveLength(3)
  })
  test('an edge that skips a layer falls back', () => {
    expect(grid(['a', 'b', 'c'], [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'a', to: 'c' }])).toBeUndefined()
  })
  test('too narrow falls back, never wider than the room', () => {
    const links = [{ from: 'a', to: 'b' }, { from: 'a', to: 'c' }]
    expect(grid(['a', 'b', 'c'], links, 10)).toBeUndefined()
    for (const row of grid(['a', 'b', 'c'], links, 30)!) expect([...row].length).toBeLessThanOrEqual(30)
  })
  test('a back edge becomes a note inside its box', () => {
    const rows = grid(['a', 'b', 'c'], [{ from: 'a', to: 'b' }, { from: 'a', to: 'c' }, { from: 'c', to: 'a', label: 'retry' }])!
    expect(rows.join('\n')).toContain('↩ A (retry)')
  })
})

describe('Flow drawer', () => {
  for (const surface of SURFACES) {
    test(`a linear flow is a row of bordered boxes on ${surface}`, () => {
      const { drawn } = draw(flow(['a', 'b', 'c'], [], { b: 'the middle' }), { surface })
      expect(drawn.props.flexDirection).toBe('row')
      expect(findAll(drawn, 'Box').filter(b => b.props.borderStyle)).toHaveLength(3)
      expect(textOf(drawn)).toContain('the middle')
      expect(findAll(drawn, 'Text').filter(t => String(t.children[0]).includes('→'))).toHaveLength(2)
      expect(findAll(drawn, 'Text').find(t => t.children[0] === 'the middle')!.props.dimColor).toBe(true)
    })
  }

  test('a narrow linear flow stacks with downward arrows', () => {
    const { drawn } = draw(flow(['first step', 'second step', 'third step']), { columns: 24 })
    expect(drawn.props.flexDirection).toBe('column')
    expect(findAll(drawn, 'Text').filter(t => String(t.children[0]).startsWith('↓'))).toHaveLength(2)
  })

  test('a linked chain keeps its labels on the arrows', () => {
    const { drawn } = draw(flow(['a', 'b'], [{ from: 'a', to: 'b', label: 'ok' }]))
    expect(textOf(drawn)).toContain('─ ok ─→')
  })

  test('a branching flow draws a grid of text rows', () => {
    const { drawn } = draw(flow(['a', 'b', 'c'], [{ from: 'a', to: 'b', label: 'yes' }, { from: 'a', to: 'c', label: 'no' }]))
    expect(textOf(drawn)).toContain('yes')
    expect(findAll(drawn, 'Box').every(b => !b.props.borderStyle)).toBe(true)
  })

  test('a branching flow too tangled to draw falls back to a list of links', () => {
    const { drawn } = draw(flow(['a', 'b', 'c'], [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'a', to: 'c', label: 'skip' }]))
    expect(findAll(drawn, 'Box').filter(b => b.props.borderStyle)).toHaveLength(3)
    expect(textOf(drawn)).toContain('→ C (skip)')
  })

  test('a cyclic flow still shows every step', () => {
    const { drawn } = draw(flow(['a', 'b', 'c'], [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'c', to: 'a', label: 'retry' }]))
    const text = textOf(drawn)
    for (const label of ['A', 'B', 'C']) expect(text).toContain(label)
    expect(text).toContain('↩ A (retry)')
  })

  test('long labels never make the drawing wider than the room', () => {
    const long = 'a very long step label that must wrap '.repeat(3)
    const { drawn } = draw({ type: 'Flow', steps: [{ id: 'a', label: long, detail: long }, { id: 'b', label: long }], links: [] }, { columns: 40 })
    for (const t of findAll(drawn, 'Text')) expect([...String(t.children[0])].length).toBeLessThanOrEqual(36)
  })
})

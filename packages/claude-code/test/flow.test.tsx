import { describe, expect, test } from 'bun:test'
import { analyse, breakCycles, layoutGrid, planSequence, truncate, wrap } from '../src/draw/flow-layout'
import { draw, findAll, textOf } from './harness'

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
  test('wrap breaks at spaces and splits long words; truncate ends in an ellipsis', () => {
    expect(wrap('one two three', 7)).toEqual(['one two', 'three'])
    expect(wrap('abcdefghij', 4)).toEqual(['abcd', 'efgh', 'ij'])
    expect(wrap('', 5)).toEqual([''])
    expect(truncate('abcdef', 4)).toBe('abc…')
    expect(truncate('abc', 4)).toBe('abc')
  })
})

describe('layering', () => {
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
})

describe('row or column', () => {
  const s = steps('a', 'b', 'c')
  test('a row when it fits, a column when it does not', () => {
    expect(planSequence(s, [[], [], []], [undefined, undefined], 80).direction).toBe('row')
    expect(planSequence(s, [[], [], []], [undefined, undefined], 20).direction).toBe('column')
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
  test('too narrow falls back, never wider than the room', () => {
    const links = [{ from: 'a', to: 'b' }, { from: 'a', to: 'c' }]
    expect(grid(['a', 'b', 'c'], links, 10)).toBeUndefined()
    for (const row of grid(['a', 'b', 'c'], links, 30)!) expect([...row].length).toBeLessThanOrEqual(30)
  })
})

describe('Flow drawer', () => {

  test('a narrow linear flow stacks with downward arrows', () => {
    const { drawn } = draw(flow(['first step', 'second step', 'third step']), { columns: 24 })
    expect(drawn.props.flexDirection).toBe('column')
    expect(findAll(drawn, 'Text').filter(t => String(t.children[0]).startsWith('↓'))).toHaveLength(2)
  })

  test('link labels sit on the arrows of a chain and beside the branches of a fork', () => {
    expect(textOf(draw(flow(['a', 'b'], [{ from: 'a', to: 'b', label: 'ok' }])).drawn)).toContain('─ ok ─→')
    const fork = draw(flow(['a', 'b', 'c'], [{ from: 'a', to: 'b', label: 'yes' }, { from: 'a', to: 'c', label: 'no' }]))
    expect(textOf(fork.drawn)).toContain('yes')
    expect(textOf(fork.drawn)).toContain('no')
  })

  test('a flow too tangled to draw falls back to a list of links', () => {
    const { drawn } = draw(flow(['a', 'b', 'c'], [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'a', to: 'c', label: 'skip' }]))
    expect(textOf(drawn)).toContain('→ C (skip)')
  })

  test('a cyclic flow still shows every step and lists the back edge as ↩', () => {
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

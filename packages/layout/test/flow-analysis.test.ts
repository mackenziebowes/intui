import { describe, expect, test } from 'bun:test'
import { analyse, breakCycles } from '../src'

const steps = (...ids: string[]) => ids.map(id => ({ id, label: id.toUpperCase() }))

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


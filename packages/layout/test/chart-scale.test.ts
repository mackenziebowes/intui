import { describe, expect, test } from 'bun:test'
import { buildModel, niceDomain, niceStep, placeLabels } from '../src'

const week = {
  type: 'Chart',
  kind: 'line',
  unit: 'visitors',
  series: [{ label: 'This week', role: 'primary', points: [{ x: 'Mon', y: 120 }] }],
  annotations: [],
} as const
const model = (c: object) => buildModel(c as never)

describe('chart scales', () => {
  test('niceStep picks 1, 2, 5 or 10 times a power of ten', () => {
    expect([niceStep(0.7), niceStep(1.3), niceStep(3), niceStep(7), niceStep(23)]).toEqual([1, 2, 5, 10, 50])
    expect(niceStep(0)).toBe(1)
  })
  test('niceDomain rounds outward; bars include zero', () => {
    expect(niceDomain(90, 180, 'line')).toEqual({ lo: 80, hi: 180 })
    expect(niceDomain(90, 180, 'bar')).toEqual({ lo: 0, hi: 200 })
    expect(niceDomain(5, 5, 'line').hi).toBeGreaterThan(5)
    expect(niceDomain(0, 0, 'bar')).toEqual({ lo: 0, hi: 1 })
  })
  test('placeLabels keeps the ends and adds midpoints when there is room', () => {
    const centers = [0, 5, 10, 15, 20]
    expect(placeLabels(centers, [3, 3, 3, 3, 3], 24).map(l => l.index)).toEqual([0, 1, 2, 3, 4])
    expect(placeLabels(centers, [8, 8, 8, 8, 8], 24).map(l => l.index)).toEqual([0, 4])
    expect(placeLabels([0, 1], [10, 10], 12).map(l => l.index)).toEqual([0])
    expect(placeLabels([], [], 10)).toEqual([])
  })
  test('buildModel orders categories by first appearance, aligns values and numbers markers', () => {
    const m = model({ ...week, series: [{ label: 'a', role: 'primary', points: [{ x: 'b', y: 1 }, { x: 'a', y: 2 }] }, { label: 'c', role: 'baseline', points: [{ x: 'z', y: 3 }, { x: 'b', y: 4 }] }], annotations: [{ at: 'a', label: 'x' }, { at: 'nope', label: 'y' }] })
    expect(m.xs).toEqual(['b', 'a', 'z'])
    expect(m.series[0]!.values).toEqual([1, 2, undefined])
    expect(m.series[1]!.values).toEqual([4, undefined, 3])
    expect(m.markers.map(k => [k.n, k.index])).toEqual([[1, 1], [2, undefined]])
  })
})


import { describe, expect, test } from 'bun:test'
import type { ChartProps, FlowLink, FlowStep } from '@intui/core'
import { chartLayout, yTicks } from '../src/chart-layout'
import { buildModel } from '@intui/layout'
import { connector, flowPlan } from '../src/flow-layout'

const chart = (kind: 'line' | 'bar', ys: (number | undefined)[], extra: Partial<ChartProps> = {}): ChartProps => ({
  type: 'Chart',
  kind,
  series: [{ label: 'a', role: 'primary', points: ys.flatMap((y, i) => (y === undefined ? [] : [{ x: `d${i}`, y }])) }],
  annotations: [],
  ...extra,
})

describe('chart scales', () => {
  test('y ticks are round, inside the domain, and spaced at least the minimum apart', () => {
    for (const [domain, height] of [[{ lo: 0, hi: 180 }, 160], [{ lo: -5, hi: 10 }, 200], [{ lo: 0.2, hi: 0.5 }, 90]] as const) {
      const ticks = yTicks(domain, height)
      expect(ticks.length).toBeGreaterThanOrEqual(2)
      expect(ticks.every(t => t >= domain.lo && t <= domain.hi)).toBe(true)
      const spacing = (height * (ticks[1]! - ticks[0]!)) / (domain.hi - domain.lo)
      expect(spacing).toBeGreaterThanOrEqual(32)
      expect(ticks.every(t => Number(t.toPrecision(12)) === t)).toBe(true)
    }
  })

  test('bars that cross zero grow from the zero line, and the zero line is drawn', () => {
    const g = chartLayout(buildModel(chart('bar', [4, -3, 6])), 400)
    expect(g.zero).toBeDefined()
    const [up, down] = g.bars
    expect(up!.y + up!.height).toBeCloseTo(g.zero!, 5)
    expect(down!.y).toBeCloseTo(g.zero!, 5)
  })

  test('x labels thin out at narrow widths and never overlap', () => {
    const ys = Array.from({ length: 30 }, (_, i) => i)
    const narrow = chartLayout(buildModel(chart('line', ys)), 240)
    const wide = chartLayout(buildModel(chart('line', ys)), 1200)
    expect(narrow.xLabels.length).toBeLessThan(wide.xLabels.length)
    const width = (text: string) => text.length * 7
    for (const labels of [narrow.xLabels, wide.xLabels]) {
      for (let i = 1; i < labels.length; i++) {
        expect(labels[i]!.x - width(labels[i]!.text) / 2).toBeGreaterThan(labels[i - 1]!.x + width(labels[i - 1]!.text) / 2)
      }
    }
  })

  test('a long unit moves out of the tick labels into one caption when it would crowd the plot', () => {
    const g = chartLayout(buildModel(chart('line', [1200, 1800], { unit: 'requests per second' })), 260)
    expect(g.unitCaption).toBe('requests per second')
    expect(g.ticks.every(t => !t.label.includes('requests'))).toBe(true)
  })

  test('a missing value breaks the line instead of bridging it', () => {
    const props: ChartProps = {
      type: 'Chart',
      kind: 'line',
      series: [
        { label: 'full', role: 'baseline', points: ['a', 'b', 'c'].map(x => ({ x, y: 1 })) },
        { label: 'gappy', role: 'primary', points: [{ x: 'a', y: 2 }, { x: 'c', y: 3 }] },
      ],
      annotations: [{ at: 'zz', label: 'nowhere' }],
    }
    const g = chartLayout(buildModel(props), 400)
    expect(g.lines[1]!.runs).toHaveLength(2)
    expect(g.markers).toHaveLength(0)
  })
})

const steps = (...ids: string[]): FlowStep[] => ids.map(id => ({ id, label: id }))

describe('flow wrapping', () => {
  const chain = steps('a', 'b', 'c')

  test('a sequence runs in a row when it fits and stacks when it does not', () => {
    expect(flowPlan(chain, [], 900).direction).toBe('row')
    expect(flowPlan(chain, [], 300).direction).toBe('column')
  })

  test('a layer too wide to sit across becomes a list, and skipped links are written, not drawn', () => {
    const fan: FlowLink[] = [{ from: 'a', to: 'b' }, { from: 'a', to: 'c', label: 'fast' }, { from: 'a', to: 'd' }]
    const plan = flowPlan(steps('a', 'b', 'c', 'd'), fan, 300)
    expect(plan.direction).toBe('list')
    expect(plan.edges.map(e => `${e.from}>${e.to}`)).toEqual(['0>1'])
    expect(plan.notes[0]!.map(n => n.text)).toEqual(['To c (fast)', 'To d'])
  })

  test('a link that skips a layer forces a list when stacked, so no arrow runs through a box', () => {
    const links: FlowLink[] = [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'a', to: 'c' }]
    expect(flowPlan(chain, links, 300).direction).toBe('list')
  })

  test('a cycle is written as a note in its source box, never drawn', () => {
    const plan = flowPlan(chain, [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'c', to: 'a', label: 'again' }], 900)
    expect(plan.edges).toHaveLength(2)
    expect(plan.notes[2]).toEqual([{ text: 'Back to a (again)', kind: 'back' }])
  })

  test('long arrow labels widen the gutter, which can push a row into a column', () => {
    const labelled = [{ from: 'a', to: 'b', label: 'a rather long label' }, { from: 'b', to: 'c' }]
    expect(flowPlan(chain, labelled, 600).gutter).toBeGreaterThan(flowPlan(chain, [], 600).gutter)
    expect(flowPlan(chain, [], 520).direction).toBe('row')
    expect(flowPlan(chain, labelled, 520).direction).toBe('column')
  })

  test('connectors leave the side facing the next layer and stop short for the arrowhead', () => {
    const a = { left: 0, top: 0, width: 100, height: 40 }
    const b = { left: 150, top: 0, width: 100, height: 40 }
    expect(connector(a, b, 'row', 6).d).toMatch(/^M100 20 .* 144 20$/)
    const below = { left: 0, top: 80, width: 100, height: 40 }
    expect(connector(a, below, 'column', 6).d).toMatch(/^M50 40 .* 50 74$/)
  })
})

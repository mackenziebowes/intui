import { describe, expect, test } from 'bun:test'
import { draw, findAll, textOf, type Drawn } from './harness'
import { buildModel, niceDomain, niceStep, placeLabels } from '../src/draw/chart-scale'
import { plotBars, plotLine, plotRows, type Row } from '../src/draw/chart-text'
import { buildSvg, pathData } from '../src/draw/chart-svg'

const week = {
  type: 'Chart',
  kind: 'line',
  title: 'Visitors',
  unit: 'visitors',
  series: [
    { label: 'This week', role: 'primary', points: [{ x: 'Mon', y: 120 }, { x: 'Tue', y: 180 }, { x: 'Wed', y: 90 }, { x: 'Thu', y: 150 }, { x: 'Fri', y: 160 }] },
    { label: 'Usual', role: 'baseline', points: [{ x: 'Mon', y: 110 }, { x: 'Tue', y: 115 }, { x: 'Wed', y: 105 }, { x: 'Thu', y: 112 }, { x: 'Fri', y: 118 }] },
  ],
  annotations: [{ at: 'Tue', label: 'New pricing page' }],
} as const

const bars = { ...week, kind: 'bar' } as const

const model = (c: object) => buildModel(c as never)
const lines = (rows: Row[]) => rows.map(r => r.map(run => run.text).join(''))

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

describe('chart text plot', () => {
  test('plotLine: a baseline is dashed and the primary wins a shared cell', () => {
    const flat = (role: string) => model({ ...week, series: [{ label: 'a', role, points: [{ x: 1, y: 5 }, { x: 2, y: 5 }] }], annotations: [] })
    const solid = plotLine(flat('primary'), 20, 4).flat().filter(c => c.ch !== ' ').length
    const dashed = plotLine(flat('baseline'), 20, 4).flat().filter(c => c.ch !== ' ')
    expect(dashed.length).toBeGreaterThan(0)
    expect(dashed.every(c => c.style === 'baseline')).toBe(true)
    expect(solid).toBeGreaterThan(0)
    const both = model({ ...week, series: [{ label: 'a', role: 'baseline', points: [{ x: 1, y: 5 }, { x: 2, y: 5 }] }, { label: 'b', role: 'primary', points: [{ x: 1, y: 5 }, { x: 2, y: 5 }] }], annotations: [] })
    expect(plotLine(both, 20, 4).flat().filter(c => c.ch !== ' ').every(c => c.style === 'primary')).toBe(true)
  })
  test('plotLine survives a single point', () => {
    const one = model({ ...week, series: [{ label: 'a', role: 'primary', points: [{ x: 1, y: 5 }] }], annotations: [] })
    expect(plotLine(one, 20, 4).flat().some(c => c.ch !== ' ')).toBe(true)
  })
  test('plotBars uses block characters scaled to the domain', () => {
    const m = model({ ...bars, series: [{ label: 'a', role: 'primary', points: [{ x: 'a', y: 8 }, { x: 'b', y: 4 }, { x: 'c', y: 1 }] }], annotations: [] })
    expect(m.domain).toEqual({ lo: 0, hi: 8 })
    const { cells, columns } = plotBars(m, 9, 2)!
    const col = (c: number) => cells.map(row => row[c]!.ch).join('')
    expect(col(columns[0]!)).toBe('██')
    expect(col(columns[1]!)).toBe(' █')
    expect(col(columns[2]!)).toBe(' ▍'.replace('▍', '▂'))
  })
  test('plotRows lays out labels with the unit, the axis, x labels and marker numbers', () => {
    const out = lines(plotRows(model(week), 60)!)
    expect(out[0]).toContain('180 visitors')
    expect(out[7]).toContain('80 visitors')
    expect(out.join('\n')).toContain('Mon')
    expect(out.join('\n')).toContain('Fri')
    expect(out.at(-1)!.trim()).toBe('1')
    expect(out.join('\n')).toContain('┊')
    for (const line of out) expect(line.length).toBeLessThanOrEqual(60)
  })
  test('plotRows gives up when it cannot be drawn sensibly', () => {
    expect(plotRows(model(week), 14)).toBeUndefined()
    const negative = model({ ...bars, series: [{ label: 'a', role: 'primary', points: [{ x: 'a', y: -3 }, { x: 'b', y: 4 }] }], annotations: [] })
    expect(plotRows(negative, 60)).toBeUndefined()
    const crowded = model({ ...bars, series: [{ label: 'a', role: 'primary', points: Array.from({ length: 40 }, (_, i) => ({ x: i, y: i })) }, { label: 'b', role: 'baseline', points: [{ x: 0, y: 1 }] }], annotations: [] })
    expect(plotRows(crowded, 50)).toBeUndefined()
  })
})

describe('chart svg', () => {
  const colors = { primary: '#1fa2b8', baseline: '#888', comparison: '#1fa2b8', marker: '#888', quiet: '#888' }
  test('pathData is M then L through the points', () => {
    expect(pathData([[0, 0], [10.04, 5]])).toBe('M0 0 L10 5')
    expect(pathData([])).toBe('')
  })
  test('a line chart has a dashed baseline path, axis labels, and a marker', () => {
    const svg = buildSvg(model(week), 480, 216, colors)
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg.endsWith('</svg>')).toBe(true)
    expect(svg).toContain('viewBox="0 0 480 216"')
    expect(svg.match(/<path /g)).toHaveLength(2)
    expect(svg).toContain('stroke-dasharray="6 4"')
    expect(svg).toContain('180 visitors')
    expect(svg).toContain('>Mon<')
    expect(svg).toContain('>1<')
  })
  test('bars with negatives hang below the zero line', () => {
    const m = model({ ...bars, series: [{ label: 'a', role: 'primary', points: [{ x: 'a', y: -4 }, { x: 'b', y: 4 }] }], annotations: [] })
    const svg = buildSvg(m, 400, 180, colors)
    const [neg, pos] = [...svg.matchAll(/<rect x="[\d.]+" y="([\d.]+)" width="[\d.]+" height="([\d.]+)"/g)].map(r => [Number(r[1]), Number(r[2])] as const)
    expect(neg![0]).toBeCloseTo(pos![0] + pos![1], 0)
  })
})

describe('chart drawer', () => {
  test('terminal: title, legend, plot rows and the marker list; no Svg', () => {
    const { drawn } = draw(week, { columns: 60 })
    const all = textOf(drawn)
    expect(drawn.el).toBe('Box')
    expect(all).toContain('Visitors')
    expect(all).toContain('This week')
    expect(all).toContain('Usual (baseline)')
    expect(all).toContain('Tue: New pricing page')
    expect(findAll(drawn, 'Svg')).toHaveLength(0)
    expect(findAll(drawn, 'Markdown')).toHaveLength(0)
  })
  {
    const surface = 'desktop'
    test(`${surface}: one Svg sized to the width, with alt text, plus the same legend and markers`, () => {
      const { drawn } = draw(week, { surface, columns: 60 })
      const [svg] = findAll(drawn, 'Svg') as [Drawn]
      expect(findAll(drawn, 'Svg')).toHaveLength(1)
      expect(String(svg.props.source)).toContain('viewBox="0 0 480 216"')
      expect(String(svg.props.alt)).toContain('line chart "Visitors"')
      expect(Object.keys(svg.props).sort()).toEqual(['alt', 'source'])
      expect(textOf(drawn)).toContain('Usual (baseline)')
      expect(textOf(drawn)).toContain('Tue: New pricing page')
    })
  }
  test('under 30 columns falls back to the text form', () => {
    const { drawn } = draw(week, { columns: 28 })
    expect(drawn.el).toBe('Markdown')
    expect(String(drawn.props.text)).toContain('| This week |')
  })
  test('terminal: a chart that cannot be plotted falls back too', () => {
    const negative = { ...bars, series: [{ label: 'a', role: 'primary', points: [{ x: 'a', y: -3 }] }], annotations: [] }
    expect(draw(negative, { columns: 60 }).drawn.el).toBe('Markdown')
    expect(draw(negative, { surface: 'desktop', columns: 60 }).drawn.el).toBe('Box')
  })
})

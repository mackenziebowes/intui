/**
 * Pure geometry for the SVG Chart: where every tick, bar, line point, label and
 * marker goes at a given pixel width. The drawer turns it into elements; the
 * look (colours, dashes) is the stylesheet's job, keyed on each series' role.
 */
import { formatValue, markerGlyph, niceStep, placeLabels, project, withUnit, type ChartModel, type Domain } from '@intui/layout'

/** Width of a string in CSS pixels at the axis font. */
export type Measure = (text: string) => number

/** A fallback for when there's no canvas to measure with: about 7px a character at 12px. */
export const estimateWidth: Measure = text => [...text].length * 7

export type Tick = { value: number; y: number; label: string }
export type LinePoint = { index: number; x: number; y: number; value: number }
export type Bar = { series: number; index: number; x: number; y: number; width: number; height: number; value: number }

export type ChartGeometry = {
  width: number
  height: number
  plot: { left: number; right: number; top: number; bottom: number }
  ticks: Tick[]
  /** The y of the zero line, when zero is inside the domain but not at its edge. */
  zero?: number
  /** Set when the unit didn't fit beside the tick labels, so it's shown once as an axis caption. */
  unitCaption?: string
  xLabels: { index: number; x: number; text: string }[]
  markers: { n: number; glyph: string; x: number }[]
  bars: Bar[]
  /** Per series, runs of consecutive points; a missing value breaks the line. */
  lines: { series: number; runs: LinePoint[][] }[]
}

/** Rounds away floating-point noise, as chart-scale does. */
const clean = (n: number) => Number(n.toPrecision(12))

/**
 * Round tick values inside the domain, spaced at least `minGap` pixels apart on
 * a plot `plotHeight` tall. Always includes the domain's ends when they're round.
 */
export function yTicks(domain: Domain, plotHeight: number, minGap = 32): number[] {
  const room = Math.max(1, Math.floor(plotHeight / minGap))
  const step = niceStep((domain.hi - domain.lo) / room)
  const ticks: number[] = []
  const first = Math.ceil(clean(domain.lo / step)) * step
  for (let k = 0; ; k++) {
    const value = clean(first + k * step)
    if (value > domain.hi + step * 1e-9) break
    ticks.push(value)
  }
  return ticks
}

/** The chart's height for a width: shorter on a phone so it doesn't fill the screen. */
export const chartHeight = (width: number) => (width < 420 ? 200 : 240)

export function chartLayout(model: ChartModel, width: number, measure: Measure = estimateWidth, height = chartHeight(width)): ChartGeometry {
  const top = model.markers.some(m => m.index !== undefined) ? 22 : 10
  const bottom = height - 26
  const values = yTicks(model.domain, bottom - top)
  const labelWith = (unit: boolean) => values.map(v => (unit ? withUnit(formatValue(v), model.unit) : formatValue(v)))
  let labels = labelWith(true)
  let gutter = Math.max(...labels.map(measure)) + 10
  let unitCaption: string | undefined
  if (model.unit && gutter > width * 0.3) {
    labels = labelWith(false)
    gutter = Math.max(...labels.map(measure)) + 10
    unitCaption = model.unit
  }
  const left = Math.ceil(gutter)
  const right = width - 4
  const n = model.xs.length
  const isBar = model.kind === 'bar'
  const slot = (right - left) / n
  const pad = 10
  const xAt = (i: number) =>
    isBar ? left + slot * (i + 0.5) : n === 1 ? (left + right) / 2 : left + pad + (i * (right - left - 2 * pad)) / (n - 1)
  const yAt = (v: number) => bottom - project(v, model.domain, bottom - top)

  const ticks = values.map((value, i) => ({ value, y: yAt(value), label: labels[i]! }))
  const zero = model.domain.lo < 0 && model.domain.hi > 0 ? yAt(0) : undefined

  const bars: Bar[] = []
  const lines: ChartGeometry['lines'] = []
  if (isBar) {
    const count = model.series.length
    const group = slot * 0.72
    const gap = group / count > 8 ? 2 : 0
    const barWidth = Math.max(1, group / count - gap)
    const base = yAt(Math.max(model.domain.lo, Math.min(0, model.domain.hi)))
    model.series.forEach((series, s) =>
      series.values.forEach((value, index) => {
        if (value === undefined) return
        const x = xAt(index) - group / 2 + s * (barWidth + gap) + gap / 2
        const y = yAt(value)
        bars.push({ series: s, index, x, y: Math.min(y, base), width: barWidth, height: Math.max(1, Math.abs(base - y)), value })
      }),
    )
  } else {
    model.series.forEach((series, s) => {
      const runs: LinePoint[][] = [[]]
      series.values.forEach((value, index) => {
        if (value === undefined) {
          if (runs[runs.length - 1]!.length > 0) runs.push([])
          return
        }
        runs[runs.length - 1]!.push({ index, x: xAt(index), y: yAt(value), value })
      })
      lines.push({ series: s, runs: runs.filter(run => run.length > 0) })
    })
  }

  const texts = model.xs.map(String)
  const widths = texts.map(text => Math.ceil(measure(text)))
  const xLabels = placeLabels(model.xs.map((_, i) => xAt(i)), widths, width, 10).map(({ index, start }) => ({
    index,
    x: start + widths[index]! / 2,
    text: texts[index]!,
  }))
  const markers = model.markers.flatMap(m => (m.index === undefined ? [] : [{ n: m.n, glyph: markerGlyph(m.n), x: xAt(m.index) }]))

  return {
    width,
    height,
    plot: { left, right, top, bottom },
    ticks,
    ...(zero !== undefined ? { zero } : {}),
    ...(unitCaption ? { unitCaption } : {}),
    xLabels,
    markers,
    bars,
    lines,
  }
}

/** `M x y L x y ...` through points, rounded to a tenth of a pixel. */
export function pathData(points: readonly { x: number; y: number }[]): string {
  const r = (n: number) => Number(n.toFixed(1))
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${r(p.x)} ${r(p.y)}`).join(' ')
}

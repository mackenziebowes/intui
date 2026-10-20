/**
 * Pure geometry for the SVG Chart: where every tick, bar, line point, label and
 * marker goes at a given pixel width. The drawer turns it into elements; the
 * look (colours, dashes) is the stylesheet's job, keyed on each series' role.
 */
import type { ReadingKind } from '@intui/core'
import { formatValue, markerGlyph, niceStep, placeLabels, project, withUnit, type ChartModel, type Domain } from '@intui/layout'

/** Width of a string in CSS pixels at the axis font. */
export type Measure = (text: string) => number

/** A fallback for when there's no canvas to measure with: about 7px a character at 12px. */
export const estimateWidth: Measure = text => [...text].length * 7

export type Tick = { value: number; y: number; label: string }
/** `partial` is true when the point's period isn't over (today, so far; proposal 006). */
export type LinePoint = { index: number; x: number; y: number; value: number; kind: ReadingKind; partial: boolean }
/** `up` is true when the bar rises from the baseline, so its data end (the rounded one) is its top. */
export type Bar = { series: number; index: number; x: number; y: number; width: number; height: number; value: number; kind: ReadingKind; up: boolean; partial: boolean }

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
  /** The y of the marker glyphs' centres, in the band above the plot. */
  markerY: number
  /**
   * Direct labels on the first primary series: its latest point and its peak, one label when
   * they are the same point. Never every point (label selectively), and none on other series.
   */
  callouts: { index: number; x: number; y: number; anchor: 'start' | 'middle' | 'end'; text: string }[]
  bars: Bar[]
  /** Per series, runs of consecutive points; a missing value breaks the line. */
  lines: { series: number; runs: LinePoint[][] }[]
  /** Points that are unknown: no mark on the data, only here, at the foot of their x. */
  unknowns: { series: number; index: number; x: number }[]
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

/** `partial[s][i]` says the point of series s at x index i is a period that isn't over. */
export function chartLayout(
  model: ChartModel,
  width: number,
  measure: Measure = estimateWidth,
  height = chartHeight(width),
  partial: readonly (readonly boolean[])[] = [],
): ChartGeometry {
  const isPartial = (s: number, i: number) => partial[s]?.[i] === true
  const markerBand = model.markers.some(m => m.index !== undefined) ? 22 : 10
  const labelled = model.readable ? model.series.findIndex(s => s.role === 'primary') : -1
  // A callout above the peak needs a line of room between the plot and the marker band.
  const top = markerBand + (labelled >= 0 ? 16 : 0)
  const bottom = height - 26
  // With no readable number there is no range: no ticks, so no axis number that was made up.
  const values = model.readable ? yTicks(model.domain, bottom - top) : []
  // The unit is said once, on the top tick; the rest are plain numbers. If even that one
  // label would take too much of the width, the unit moves to a caption above the axis.
  const plain = values.map(formatValue)
  const withTop = plain.map((label, i) => (i === plain.length - 1 && model.unit ? withUnit(label, model.unit) : label))
  const gutterOf = (labels: string[]) => (labels.length > 0 ? Math.max(...labels.map(measure)) + 10 : 10)
  const fits = gutterOf(withTop) <= width * 0.3
  const labels = fits ? withTop : plain
  const gutter = gutterOf(labels)
  const unitCaption = model.readable && model.unit && !fits ? model.unit : undefined
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
  const unknowns: ChartGeometry['unknowns'] = []
  if (isBar) {
    const count = model.series.length
    // Thin marks with a 2px gap between a group's bars, so each bar reads as one mark.
    const group = slot * 0.5
    const gap = count > 1 && group / count > 6 ? 2 : 0
    const barWidth = Math.max(1, group / count - gap)
    const base = yAt(Math.max(model.domain.lo, Math.min(0, model.domain.hi)))
    model.series.forEach((series, s) =>
      series.values.forEach((value, index) => {
        if (series.kinds[index] === 'unknown') unknowns.push({ series: s, index, x: xAt(index) - group / 2 + s * (barWidth + gap) + barWidth / 2 })
        if (value === undefined) return
        const x = xAt(index) - group / 2 + s * (barWidth + gap) + gap / 2
        const y = yAt(value)
        bars.push({ series: s, index, x, y: Math.min(y, base), width: barWidth, height: Math.max(1, Math.abs(base - y)), value, kind: series.kinds[index]!, up: y <= base, partial: isPartial(s, index) })
      }),
    )
  } else {
    model.series.forEach((series, s) => {
      const runs: LinePoint[][] = [[]]
      series.values.forEach((value, index) => {
        if (series.kinds[index] === 'unknown') unknowns.push({ series: s, index, x: xAt(index) })
        if (value === undefined) {
          if (runs[runs.length - 1]!.length > 0) runs.push([])
          return
        }
        runs[runs.length - 1]!.push({ index, x: xAt(index), y: yAt(value), value, kind: series.kinds[index]!, partial: isPartial(s, index) })
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

  const callouts: ChartGeometry['callouts'] = []
  if (labelled >= 0) {
    const series = model.series[labelled]!
    const readable = series.values.flatMap((v, i) => (v === undefined ? [] : [i]))
    if (readable.length > 0) {
      const latest = readable[readable.length - 1]!
      const peak = readable.reduce((best, i) => (series.values[i]! > series.values[best]! ? i : best))
      const WORDS = { exact: '', atLeast: '≥', estimate: '~', unknown: '' } as const
      for (const index of peak === latest ? [latest] : [peak, latest]) {
        const v = series.values[index]!
        // The axis carries the unit; a currency or symbol stays, since it is part of how the number reads.
        const figure = WORDS[series.kinds[index]!] + withUnit(formatValue(v), model.unit && /^[^\p{L}\p{N}]/u.test(model.unit) ? model.unit : undefined)
        const bar = bars.find(b => b.series === labelled && b.index === index)
        const x = bar ? bar.x + bar.width / 2 : xAt(index)
        // Above the bar or dot, clear of the floor chevron an atLeast carries.
        const y = (bar ? bar.y : yAt(v) - 4) - (series.kinds[index] === 'atLeast' ? 13 : 6)
        const place = (text: string) => {
          const w = measure(text)
          const anchor: 'start' | 'middle' | 'end' = x + w / 2 > right ? 'end' : x - w / 2 < left ? 'start' : 'middle'
          const at = anchor === 'end' ? Math.min(x + w / 2, right) : anchor === 'start' ? Math.max(x - w / 2, left) : x
          // A label wider than its mark rises above every other mark under it, so it never sits on a neighbour.
          const from = anchor === 'end' ? at - w : anchor === 'start' ? at : at - w / 2
          const under = [
            ...bars.filter(b => b !== bar && b.x < from + w + 3 && b.x + b.width > from - 3).map(b => b.y - (b.kind === 'atLeast' ? 13 : 6)),
            ...lines.flatMap(l => l.runs.flat()).filter(p => p.index !== index && p.x >= from - 4 && p.x <= from + w + 4).map(p => p.y - 10),
          ]
          return { index, x: at, y: Math.min(y, ...under), anchor, text }
        }
        // "so far" goes on the label only when it fits over its own mark; a raised label reads as a
        // neighbour's, and the hollow mark already says the period isn't over.
        const long = isPartial(labelled, index) ? place(`${figure} so far`) : undefined
        callouts.push(long && long.y >= y ? long : place(figure))
      }
    }
  }

  return {
    width,
    height,
    plot: { left, right, top, bottom },
    ticks,
    ...(zero !== undefined ? { zero } : {}),
    ...(unitCaption ? { unitCaption } : {}),
    xLabels,
    markers,
    markerY: 12,
    callouts,
    bars,
    lines,
    unknowns,
  }
}

/** A bar as a path: square where it meets the baseline, rounded (up to 4px) at its data end. */
export function barPath(bar: Bar): string {
  const r = (n: number) => Number(n.toFixed(1))
  const rad = Math.min(4, bar.width / 2, bar.height)
  const { x, y, width: w, height: h } = bar
  return bar.up
    ? `M${r(x)} ${r(y + h)}V${r(y + rad)}Q${r(x)} ${r(y)} ${r(x + rad)} ${r(y)}H${r(x + w - rad)}Q${r(x + w)} ${r(y)} ${r(x + w)} ${r(y + rad)}V${r(y + h)}Z`
    : `M${r(x)} ${r(y)}V${r(y + h - rad)}Q${r(x)} ${r(y + h)} ${r(x + rad)} ${r(y + h)}H${r(x + w - rad)}Q${r(x + w)} ${r(y + h)} ${r(x + w)} ${r(y + h - rad)}V${r(y)}Z`
}

/**
 * A run of line points cut where a segment touches a partial point, so a renderer can draw
 * that stretch apart (dashed): the line into today is a day so far, not a drop.
 */
export function splitRun(run: readonly LinePoint[]): { partial: boolean; points: LinePoint[] }[] {
  const pieces: { partial: boolean; points: LinePoint[] }[] = []
  for (let k = 1; k < run.length; k++) {
    const partial = run[k - 1]!.partial || run[k]!.partial
    const last = pieces[pieces.length - 1]
    if (last && last.partial === partial) last.points.push(run[k]!)
    else pieces.push({ partial, points: [run[k - 1]!, run[k]!] })
  }
  return pieces
}

/** `M x y L x y ...` through points, rounded to a tenth of a pixel. */
export function pathData(points: readonly { x: number; y: number }[]): string {
  const r = (n: number) => Number(n.toFixed(1))
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${r(p.x)} ${r(p.y)}`).join(' ')
}

import type { ChartProps, SeriesRole } from '@intui/core'

export type Domain = { lo: number; hi: number }

export type ChartModel = {
  kind: ChartProps['kind']
  unit?: string
  /** Ordered categories, in the order they first appear: the same reading as the text form. */
  xs: (string | number)[]
  series: { label: string; role: SeriesRole; values: (number | undefined)[] }[]
  domain: Domain
  /** Numbered markers; `index` is the category they sit on, absent when no x matches. */
  markers: { n: number; at: string | number; label: string; index?: number }[]
}

/** Rounds away floating-point noise such as 0.30000000000000004. */
const clean = (n: number) => Number(n.toPrecision(12))

/** A step of 1, 2, 5 or 10 times a power of ten that is at least `raw`. */
export function niceStep(raw: number): number {
  if (!(raw > 0)) return 1
  const power = 10 ** Math.floor(Math.log10(raw))
  const f = raw / power
  return clean((f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * power)
}

/** The y range to draw: bars start at zero, lines hug their data, both on round numbers. */
export function niceDomain(min: number, max: number, kind: ChartProps['kind']): Domain {
  let lo = kind === 'bar' ? Math.min(0, min) : min
  let hi = kind === 'bar' ? Math.max(0, max) : max
  if (lo === hi) {
    if (kind === 'bar' || lo === 0) hi = lo + 1
    else {
      const pad = Math.abs(lo) * 0.1
      lo -= pad
      hi += pad
    }
  }
  const step = niceStep((hi - lo) / 5)
  return { lo: clean(Math.floor(lo / step) * step), hi: clean(Math.ceil(hi / step) * step) }
}

/** A short number for an axis: 1200 -> 1.2k, 0.5 -> 0.5. */
export function formatValue(value: number): string {
  const abs = Math.abs(value)
  const trim = (n: number, digits: number) => String(Number(n.toFixed(digits)))
  if (abs >= 1e9) return `${trim(value / 1e9, 1)}B`
  if (abs >= 1e6) return `${trim(value / 1e6, 1)}M`
  if (abs >= 1e4) return `${trim(value / 1e3, 1)}k`
  if (abs >= 100) return trim(value, 0)
  if (abs >= 10) return trim(value, 1)
  if (abs >= 0.01 || abs === 0) return trim(value, 2)
  return String(Number(value.toPrecision(2)))
}

/** A value with its unit: `$5`, `95%`, `120 ms`, `180 visitors`. */
export function withUnit(value: string, unit?: string): string {
  if (!unit) return value
  if (/^[$€£¥]$/.test(unit)) return `${unit}${value}`
  if (/^[^\p{L}\p{N}]/u.test(unit)) return `${value}${unit}`
  return `${value} ${unit}`
}

/** Where `value` falls on a 0..size axis, 0 at `lo`. */
export const project = (value: number, { lo, hi }: Domain, size: number) => ((value - lo) / (hi - lo)) * size

export type PlacedLabel = { index: number; start: number }

/**
 * Chooses which x labels to show and where they start. The first and last are
 * kept when they fit; then midpoints are added by bisection while there is room.
 * `centers` and `widths` are in the axis's own unit (cells or pixels).
 */
export function placeLabels(centers: number[], widths: number[], total: number, gap = 1): PlacedLabel[] {
  const count = centers.length
  if (count === 0) return []
  const clamped = (i: number) => Math.max(0, Math.min(total - widths[i]!, Math.round(centers[i]! - widths[i]! / 2)))
  const placed: PlacedLabel[] = [{ index: 0, start: Math.max(0, Math.min(total - widths[0]!, Math.round(centers[0]! - widths[0]! / 2))) }]
  let leftEnd = placed[0]!.start + widths[0]!
  let last: PlacedLabel | undefined
  if (count > 1) {
    const start = clamped(count - 1)
    if (start >= leftEnd + gap) last = { index: count - 1, start }
  }
  const middle: PlacedLabel[] = []
  const fill = (a: number, b: number, from: number, to: number) => {
    if (b - a < 2) return
    const mid = Math.floor((a + b) / 2)
    const start = clamped(mid)
    if (start >= from + gap && start + widths[mid]! + gap <= to) {
      middle.push({ index: mid, start })
      fill(a, mid, from, start)
      fill(mid, b, start + widths[mid]!, to)
    } else {
      fill(a, mid, from, to)
      fill(mid, b, from, to)
    }
  }
  if (count > 2) fill(0, count - 1, leftEnd, last ? last.start : total + gap)
  return [...placed, ...middle, ...(last ? [last] : [])].sort((x, y) => x.index - y.index)
}

/** The chart as a plain model: aligned values, a y domain and numbered markers. */
export function buildModel(props: ChartProps): ChartModel {
  const xs = [...new Set(props.series.flatMap(series => series.points.map(point => point.x)))]
  const series = props.series.map(s => ({
    label: s.label,
    role: s.role,
    values: xs.map(x => s.points.find(point => point.x === x)?.y),
  }))
  const all = series.flatMap(s => s.values).filter((v): v is number => v !== undefined)
  const markers = props.annotations.map((a, i) => {
    const index = xs.indexOf(a.at)
    return { n: i + 1, at: a.at, label: a.label, ...(index >= 0 ? { index } : {}) }
  })
  return {
    kind: props.kind,
    ...(props.unit ? { unit: props.unit } : {}),
    xs,
    series,
    domain: niceDomain(Math.min(...all), Math.max(...all), props.kind),
    markers,
  }
}

/** The glyph a marker wears on the plot: its number, or `*` past nine. */
export const markerGlyph = (n: number) => (n <= 9 ? String(n) : '*')

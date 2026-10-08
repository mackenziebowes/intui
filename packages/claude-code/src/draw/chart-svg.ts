import { formatValue, markerGlyph, placeLabels, project, withUnit, type ChartModel } from './chart-scale'

export type SvgColors = {
  /** Series and marker colors by role; text and grid use `quiet`. */
  primary: string
  baseline: string
  comparison: string
  marker: string
  quiet: string
}

const CHAR_WIDTH = 6.5
const FONT = 11

const round = (n: number) => Number(n.toFixed(1))

export const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** `M x y L x y ...` through points, in order. */
export function pathData(points: readonly (readonly [number, number])[]): string {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`).join(' ')
}

/** The chart as an SVG document `width` x `height` CSS pixels. */
export function buildSvg(model: ChartModel, width: number, height: number, colors: SvgColors): string {
  const top = formatValue(model.domain.hi)
  const bottom = formatValue(model.domain.lo)
  const yTop = withUnit(top, model.unit)
  const yBottom = withUnit(bottom, model.unit)
  const left = Math.ceil(Math.max(yTop.length, yBottom.length) * CHAR_WIDTH) + 12
  const x0 = left
  const x1 = width - 10
  const y0 = 16
  const y1 = height - 24
  const n = model.xs.length
  const isBar = model.kind === 'bar'
  const slot = (x1 - x0) / n
  const pad = isBar ? 0 : 8
  const xAt = (i: number) => (isBar ? x0 + slot * (i + 0.5) : n === 1 ? (x0 + x1) / 2 : x0 + pad + (i * (x1 - x0 - 2 * pad)) / (n - 1))
  const yAt = (v: number) => y1 - project(v, model.domain, y1 - y0)
  const color = (role: string) => colors[role as 'primary' | 'baseline' | 'comparison']
  const out: string[] = []
  const text = (x: number, y: number, anchor: string, fill: string, body: string) =>
    out.push(`<text x="${round(x)}" y="${round(y)}" text-anchor="${anchor}" fill="${fill}">${escapeXml(body)}</text>`)

  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="sans-serif" font-size="${FONT}">`)
  for (const [y, label] of [[y0, yTop], [y1, yBottom]] as const) {
    out.push(`<line x1="${x0}" y1="${round(y)}" x2="${x1}" y2="${round(y)}" stroke="${colors.quiet}" stroke-opacity="0.35"/>`)
    text(x0 - 6, y + 4, 'end', colors.quiet, label)
  }
  if (model.domain.lo < 0 && model.domain.hi > 0) {
    out.push(`<line x1="${x0}" y1="${round(yAt(0))}" x2="${x1}" y2="${round(yAt(0))}" stroke="${colors.quiet}" stroke-opacity="0.7"/>`)
  }
  for (const m of model.markers) {
    if (m.index === undefined) continue
    const x = xAt(m.index)
    out.push(`<line x1="${round(x)}" y1="${y0}" x2="${round(x)}" y2="${y1}" stroke="${colors.marker}" stroke-dasharray="2 3"/>`)
    text(x, y0 - 4, 'middle', colors.marker, markerGlyph(m.n))
  }
  if (isBar) {
    const bar = Math.max(2, (slot * 0.8) / model.series.length)
    const zero = yAt(Math.max(model.domain.lo, Math.min(0, model.domain.hi)))
    model.series.forEach((series, s) =>
      series.values.forEach((v, i) => {
        if (v === undefined) return
        const x = xAt(i) - (bar * model.series.length) / 2 + s * bar
        const y = yAt(v)
        const opacity = series.role === 'primary' ? 1 : series.role === 'comparison' ? 0.55 : 0.6
        out.push(`<rect x="${round(x)}" y="${round(Math.min(y, zero))}" width="${round(bar - 1)}" height="${round(Math.max(1, Math.abs(zero - y)))}" fill="${color(series.role)}" fill-opacity="${opacity}"/>`)
      }),
    )
  } else {
    for (const series of model.series) {
      const points = series.values.flatMap((v, i) => (v === undefined ? [] : [[xAt(i), yAt(v)] as const]))
      const dash = series.role === 'baseline' ? ' stroke-dasharray="6 4"' : ''
      const opacity = series.role === 'comparison' ? ' stroke-opacity="0.55"' : ''
      const stroke = series.role === 'primary' ? 2.5 : 1.75
      out.push(`<path d="${pathData(points)}" fill="none" stroke="${color(series.role)}" stroke-width="${stroke}" stroke-linejoin="round" stroke-linecap="round"${dash}${opacity}/>`)
      if (n <= 24) for (const [x, y] of points) out.push(`<circle cx="${round(x)}" cy="${round(y)}" r="${series.role === 'primary' ? 3 : 2}" fill="${color(series.role)}"${opacity.replace('stroke', 'fill')}/>`)
    }
  }
  const labels = model.xs.map(String)
  const widths = labels.map(l => Math.ceil(l.length * CHAR_WIDTH))
  for (const { index, start } of placeLabels(model.xs.map((_, i) => xAt(i)), widths, width, 6)) {
    text(start + widths[index]! / 2, y1 + 16, 'middle', colors.quiet, labels[index]!)
  }
  out.push('</svg>')
  return out.join('')
}

/** What the drawing says for a reader who can't see it. */
export function describe(model: ChartModel, title?: string): string {
  const parts = model.series.map(s => {
    const values = s.values.filter((v): v is number => v !== undefined)
    return `${s.label} from ${formatValue(Math.min(...values))} to ${formatValue(Math.max(...values))}`
  })
  const markers = model.markers.length > 0 ? `; markers: ${model.markers.map(m => `${m.at} ${m.label}`).join(', ')}` : ''
  return `${model.kind} chart${title ? ` "${title}"` : ''}${model.unit ? ` in ${model.unit}` : ''}: ${parts.join('; ')}${markers}`
}

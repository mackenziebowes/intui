import { formatValue, markerGlyph, placeLabels, project, withUnit, type ChartModel } from './chart-scale'

/** How a run of text is drawn; the drawer maps each to element props through theme.ts. */
export type Style = 'primary' | 'baseline' | 'comparison' | 'guide' | 'axis' | 'marker' | 'plain'
export type Run = { text: string; style: Style }
export type Row = Run[]
export type Cell = { ch: string; style: Style }

export const PLOT_ROWS = 8
const BLANK: Cell = { ch: ' ', style: 'plain' }
const PRIORITY = { primary: 3, comparison: 2, baseline: 1 } as const
const BARS = [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']

/** Merges neighbouring cells of one style into runs. */
export function toRow(cells: Cell[]): Row {
  const row: Row = []
  for (const { ch, style } of cells) {
    const last = row[row.length - 1]
    if (last && last.style === style) last.text += ch
    else row.push({ text: ch, style })
  }
  return row
}

/** Every integer point on the line between two points (Bresenham), both ends included. */
export function lineDots(x0: number, y0: number, x1: number, y1: number): [number, number][] {
  const dots: [number, number][] = []
  const dx = Math.abs(x1 - x0)
  const dy = -Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx + dy
  let x = x0
  let y = y0
  for (;;) {
    dots.push([x, y])
    if (x === x1 && y === y1) return dots
    const e2 = 2 * err
    if (e2 >= dy) {
      err += dy
      x += sx
    }
    if (e2 <= dx) {
      err += dx
      y += sy
    }
  }
}

const BRAILLE_BIT = [[0x01, 0x02, 0x04, 0x40], [0x08, 0x10, 0x20, 0x80]] as const

/** The cell column of each category on a line plot `width` cells wide. */
export function lineColumns(count: number, width: number): number[] {
  const dotX = (i: number) => (count === 1 ? Math.floor((width * 2 - 1) / 2) : Math.round((i * (width * 2 - 1)) / (count - 1)))
  return Array.from({ length: count }, (_, i) => Math.floor(dotX(i) / 2))
}

/** A line plot in braille: 2x4 dots per cell. A baseline is dashed. */
export function plotLine(model: ChartModel, width: number, height = PLOT_ROWS): Cell[][] {
  const W = width * 2
  const H = height * 4
  const masks = Array.from({ length: height }, () => new Array<number>(width).fill(0))
  const owner = Array.from({ length: height }, () => new Array<number>(width).fill(0))
  const n = model.xs.length
  const dotX = (i: number) => (n === 1 ? Math.floor((W - 1) / 2) : Math.round((i * (W - 1)) / (n - 1)))
  const dotY = (v: number) => Math.round((H - 1) - project(v, model.domain, H - 1))
  for (const series of model.series) {
    const points = series.values.flatMap((v, i) => (v === undefined ? [] : [[dotX(i), dotY(v)] as const]))
    let step = 0
    const mark = (x: number, y: number) => {
      if (series.role === 'baseline' && step++ % 8 >= 5) return
      const row = Math.floor(y / 4)
      const col = Math.floor(x / 2)
      masks[row]![col]! |= BRAILLE_BIT[x % 2]![y % 4]!
      owner[row]![col] = Math.max(owner[row]![col]!, PRIORITY[series.role])
    }
    if (points.length === 1) mark(...points[0]!)
    points.slice(1).forEach(([x, y], i) => lineDots(...points[i]!, x, y).forEach(([px, py]) => mark(px, py)))
  }
  const style = (p: number): Style => (p === 3 ? 'primary' : p === 2 ? 'comparison' : 'baseline')
  return masks.map((row, r) =>
    row.map((mask, c) => (mask === 0 ? BLANK : { ch: String.fromCodePoint(0x2800 + mask), style: style(owner[r]![c]!) })),
  )
}

/** Layout of grouped bars: slot per category, bar width and the offset of the group in its slot. */
export function barLayout(categories: number, seriesCount: number, width: number) {
  const slot = Math.floor(width / categories)
  if (slot < seriesCount) return undefined
  const bar = Math.max(1, Math.floor((slot - (slot > seriesCount ? 1 : 0)) / seriesCount))
  return { slot, bar, offset: Math.floor((slot - bar * seriesCount) / 2) }
}

/** Bars in block characters, eight levels per cell. Needs values >= 0 and a domain starting at 0. */
export function plotBars(model: ChartModel, width: number, height = PLOT_ROWS): { cells: Cell[][]; columns: number[] } | undefined {
  const layout = barLayout(model.xs.length, model.series.length, width)
  if (!layout) return undefined
  const cells = Array.from({ length: height }, () => new Array<Cell>(width).fill(BLANK))
  model.xs.forEach((_, i) => {
    model.series.forEach((series, s) => {
      const value = series.values[i]
      if (value === undefined) return
      let levels = Math.round(project(value, model.domain, height * 8))
      if (value > 0 && levels === 0) levels = 1
      for (let r = 0; r < height; r++) {
        const fill = Math.max(0, Math.min(8, levels - (height - 1 - r) * 8))
        if (fill === 0) continue
        for (let k = 0; k < layout.bar; k++) {
          cells[r]![i * layout.slot + layout.offset + s * layout.bar + k] = { ch: BARS[fill]!, style: series.role }
        }
      }
    })
  })
  return { cells, columns: model.xs.map((_, i) => i * layout.slot + Math.floor(layout.slot / 2)) }
}

/** The x axis: a rule, the x labels, and a line of marker numbers when there are markers. */
export function axisRows(model: ChartModel, columns: number[], width: number, indent: number): Row[] {
  const pad = ' '.repeat(indent)
  const rows: Row[] = [[{ text: `${pad}└${'─'.repeat(width)}`, style: 'axis' }]]
  const labels = model.xs.map(String)
  const line = new Array<string>(width).fill(' ')
  const widths = labels.map(l => l.length)
  for (const { index, start } of placeLabels(columns, widths, width)) {
    for (const [k, ch] of [...labels[index]!].entries()) line[start + k] = ch
  }
  rows.push([{ text: `${pad} ${line.join('')}`, style: 'axis' }])
  const marks = model.markers.filter(m => m.index !== undefined)
  if (marks.length > 0) {
    const cells: Cell[] = new Array<Cell>(width).fill(BLANK)
    for (const m of marks) cells[columns[m.index!]!] = { ch: markerGlyph(m.n), style: 'marker' }
    rows.push([{ text: `${pad} `, style: 'plain' }, ...toRow(cells)])
  }
  return rows
}

/** The y labels (top = max, bottom = min) for a gutter, without or with the unit. */
export function yLabels(model: ChartModel, withTheUnit: boolean): { top: string; bottom: string; gutter: number } {
  const label = (v: number) => (withTheUnit ? withUnit(formatValue(v), model.unit) : formatValue(v))
  const top = label(model.domain.hi)
  const bottom = label(model.domain.lo)
  return { top, bottom, gutter: Math.max(top.length, bottom.length) }
}

/**
 * The whole plot as rows of runs: y labels, the grid, a dotted guide at each marker,
 * the x axis and its labels. Undefined when it can't be drawn sensibly in `columns`.
 */
export function plotRows(model: ChartModel, columns: number): Row[] | undefined {
  let labels = yLabels(model, true)
  const unitNote = labels.gutter > Math.floor(columns * 0.4) && model.unit
  if (unitNote) labels = yLabels(model, false)
  const width = columns - labels.gutter - 2
  if (width < 10) return undefined
  let cells: Cell[][]
  let xColumns: number[]
  if (model.kind === 'bar') {
    if (model.series.some(s => s.values.some(v => v !== undefined && v < 0))) return undefined
    const bars = plotBars(model, width)
    if (!bars) return undefined
    cells = bars.cells
    xColumns = bars.columns
  } else {
    cells = plotLine(model, width)
    xColumns = lineColumns(model.xs.length, width)
  }
  for (const m of model.markers) {
    if (m.index === undefined) continue
    for (const row of cells) if (row[xColumns[m.index]!]!.ch === ' ') row[xColumns[m.index]!] = { ch: '┊', style: 'guide' }
  }
  const rows: Row[] = cells.map((row, r) => {
    const label = r === 0 ? labels.top : r === cells.length - 1 ? labels.bottom : ''
    const edge = label ? '┤' : '│'
    return [{ text: `${label.padStart(labels.gutter)} ${edge}`, style: 'axis' }, ...toRow(row)]
  })
  const head: Row[] = unitNote ? [[{ text: `y: ${model.unit}`, style: 'axis' }]] : []
  return [...head, ...rows, ...axisRows(model, xColumns, width, labels.gutter + 1)]
}

/** One legend entry per series, joined on a row when they fit, else one per row. */
export function legendRows(model: ChartModel, columns: number): Row[] {
  const swatch = (role: string) => (model.kind === 'bar' ? '██' : role === 'baseline' ? '╌╌' : '━━')
  const entries: Row[] = model.series.map(s => [
    { text: swatch(s.role), style: s.role },
    { text: ` ${s.label}${s.role === 'primary' ? '' : ` (${s.role})`}`, style: 'plain' },
  ])
  const length = (row: Row) => row.reduce((sum, run) => sum + run.text.length, 0)
  const joined = entries.flatMap((row, i) => (i === 0 ? row : [{ text: '   ', style: 'plain' as Style }, ...row]))
  return length(joined) <= columns ? [joined] : entries
}

/** The marker list: number, x and label. */
export function markerRows(model: ChartModel): Row[] {
  return model.markers.map(m => [
    { text: m.index === undefined ? '·' : markerGlyph(m.n), style: 'marker' },
    { text: ` ${m.at}: ${m.label}${m.index === undefined ? ' (no matching x)' : ''}`, style: 'plain' },
  ])
}

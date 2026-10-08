import type { CellValue, TableColumn } from '@intui/core'

/** Cells between columns. */
export const GAP = 2
/** The narrowest a column shrinks to, unless its header and content are shorter. */
const MIN_WIDTH = 4
/** A header is kept whole up to this many cells when columns shrink. */
const HEADER_KEEP = 10

const numbers = new Intl.NumberFormat('en', { maximumFractionDigits: 2 })

/** A cell's text: numbers get thousands separators (as in core's text form), null is empty. */
export function formatCell(value: CellValue | undefined): string {
  if (value === null || value === undefined) return ''
  const text = typeof value === 'number' ? numbers.format(value) : String(value)
  return text.replace(/\s*\n\s*/g, ' ')
}

/** Shortens text to `width` cells, ending in an ellipsis when it was cut. */
export function truncate(text: string, width: number): string {
  if (width <= 0) return ''
  if (text.length <= width) return text
  if (width === 1) return '…'
  return `${text.slice(0, width - 1)}…`
}

export function pad(text: string, width: number, align: 'start' | 'end'): string {
  const cut = truncate(text, width)
  return align === 'end' ? cut.padStart(width) : cut.padEnd(width)
}

/** Columns whose present values are all numbers align right unless the column says otherwise. */
export function alignOf(column: TableColumn, rows: Record<string, CellValue>[]): 'start' | 'end' {
  if (column.align) return column.align
  const values = rows.map(row => row[column.key]).filter(value => value !== null && value !== undefined)
  return values.length > 0 && values.every(value => typeof value === 'number') ? 'end' : 'start'
}

/**
 * Splits `columns` cells among columns. `natural` is each column's widest content,
 * `min` the least it may shrink to. Returns undefined when even the minimums don't fit.
 * The widest column (beyond its minimum) gives up a cell at a time, so short columns stay whole.
 */
export function allocateWidths(natural: number[], min: number[], columns: number): number[] | undefined {
  const room = columns - GAP * (natural.length - 1)
  const floor = natural.map((width, i) => Math.min(width, min[i]!))
  if (floor.reduce((a, b) => a + b, 0) > room) return undefined
  const widths = [...natural]
  let total = widths.reduce((a, b) => a + b, 0)
  while (total > room) {
    let pick = -1
    widths.forEach((width, i) => {
      if (width > floor[i]! && (pick < 0 || width > widths[pick]!)) pick = i
    })
    widths[pick]!--
    total--
  }
  return widths
}

export type GridLayout = {
  kind: 'grid'
  widths: number[]
  aligns: ('start' | 'end')[]
  header: string
  separator: string
  rows: string[]
}
export type StackedLayout = { kind: 'stacked'; blocks: string[][] }
export type TableLayout = GridLayout | StackedLayout

/** Decides grid or stacked and produces the lines to draw. */
export function layoutTable(columnDefs: TableColumn[], rows: Record<string, CellValue>[], columns: number): TableLayout {
  const cells = rows.map(row => columnDefs.map(column => formatCell(row[column.key])))
  const natural = columnDefs.map((column, i) => Math.max(column.label.length, ...cells.map(r => r[i]!.length)))
  const min = columnDefs.map(column => Math.max(MIN_WIDTH, Math.min(column.label.length, HEADER_KEEP)))
  const widths = allocateWidths(natural, min, columns)
  if (!widths) return { kind: 'stacked', blocks: stack(columnDefs, cells, columns) }
  const aligns = columnDefs.map(column => alignOf(column, rows))
  const line = (values: string[]) => values.map((value, i) => pad(value, widths[i]!, aligns[i]!)).join(' '.repeat(GAP))
  return {
    kind: 'grid',
    widths,
    aligns,
    header: line(columnDefs.map(column => column.label)),
    separator: widths.map(width => '─'.repeat(width)).join(' '.repeat(GAP)),
    rows: cells.map(line),
  }
}

/** One block per row: `label: value` lines, cut to the width. */
export function stack(columnDefs: TableColumn[], cells: string[][], columns: number): string[][] {
  return cells.map(row =>
    columnDefs.map((column, i) => truncate(`${column.label}: ${row[i]}`, columns)),
  )
}

/**
 * The character grid Flow is painted on: cells that hold a glyph and the directions a line runs through
 * them, boxes, line glyphs, labels on blank cells, and the grid read out as runs of one kind.
 */
import type { BoxLine, LineKind } from './flow-text'

export type CellKind = 'blank' | 'border' | LineKind | 'arrow' | 'edge'
export type Run = { text: string; kind: CellKind }

export const N = 1
export const E = 2
export const S = 4
export const W = 8
const GLYPH: Record<number, string> = {
  [E]: '─', [W]: '─', [E | W]: '─', [N]: '│', [S]: '│', [N | S]: '│',
  [E | S]: '╭', [W | S]: '╮', [E | N]: '╰', [W | N]: '╯',
  [N | S | E]: '├', [N | S | W]: '┤', [E | W | S]: '┬', [E | W | N]: '┴', [N | S | E | W]: '┼',
}

export type Cell = { ch: string; kind: CellKind; mask: number; edges: Set<number> }

/**
 * A character grid that boxes, edge lines and labels are painted onto: a plain value that
 * `tryGrid` builds and the functions below paint, one call at a time (hub #1956).
 */
export type Canvas = Cell[][]

export function canvasOf(rows: number, cols: number): Canvas {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ch: ' ', kind: 'blank' as CellKind, mask: 0, edges: new Set<number>() })),
  )
}

export function put(canvas: Canvas, row: number, col: number, ch: string, kind: CellKind) {
  const cell = canvas[row]?.[col]
  if (cell) Object.assign(cell, { ch, kind })
}

/** Paints a rounded box whose first line of text sits one row below `top`. */
export function paintBox(canvas: Canvas, top: number, left: number, width: number, lines: readonly BoxLine[]) {
  const bottom = top + lines.length + 1
  put(canvas, top, left, '╭', 'border')
  put(canvas, top, left + width - 1, '╮', 'border')
  put(canvas, bottom, left, '╰', 'border')
  put(canvas, bottom, left + width - 1, '╯', 'border')
  for (let c = 1; c < width - 1; c++) {
    put(canvas, top, left + c, '─', 'border')
    put(canvas, bottom, left + c, '─', 'border')
  }
  lines.forEach((line, k) => {
    put(canvas, top + 1 + k, left, '│', 'border')
    put(canvas, top + 1 + k, left + width - 1, '│', 'border')
    ;[...line.text].forEach((ch, c) => put(canvas, top + 1 + k, left + 2 + c, ch, line.kind))
  })
}

/**
 * Lays one segment of edge `id` along `row` (horizontal) or column `row` (vertical) from `a` to `b`.
 * Fails when it would touch a line of an unrelated edge, so unrelated lines never merge.
 */
export function laySegment(canvas: Canvas, id: number, edges: readonly { from: number; to: number }[], row: number, a: number, b: number, vertical: boolean): boolean {
  const [lo, hi] = [Math.min(a, b), Math.max(a, b)]
  for (let k = lo; k <= hi; k++) {
    const cell = vertical ? canvas[k]?.[row] : canvas[row]?.[k]
    if (!cell) return false
    for (const other of cell.edges) {
      if (other !== id && edges[other]!.from !== edges[id]!.from && edges[other]!.to !== edges[id]!.to) return false
    }
    cell.edges.add(id)
    const [before, after] = vertical ? [N, S] : [W, E]
    cell.mask |= (k > lo ? before : 0) | (k < hi ? after : 0)
  }
  return true
}

/** Turns the segments laid so far into line glyphs. */
export function drawLines(canvas: Canvas) {
  for (const row of canvas) for (const cell of row) if (cell.mask) Object.assign(cell, { ch: GLYPH[cell.mask] ?? '─', kind: 'arrow' })
}

/** Writes text onto blank cells only; false when it would land on anything else. */
export function paintLabel(canvas: Canvas, row: number, col: number, text: string): boolean {
  for (const [k, ch] of [...text].entries()) {
    const cell = canvas[row]?.[col + k]
    if (!cell || cell.kind !== 'blank') return false
    Object.assign(cell, { ch, kind: 'edge' })
  }
  return true
}

export function runsOf(canvas: Canvas): Run[][] {
  return canvas.map(row => toRuns(row))
}

/** Joins neighbouring cells of one kind into runs, dropping trailing blanks. */
export function toRuns(row: readonly { ch: string; kind: CellKind }[]): Run[] {
  const runs: Run[] = []
  for (const cell of row) {
    const last = runs[runs.length - 1]
    if (last && last.kind === cell.kind) last.text += cell.ch
    else runs.push({ text: cell.ch, kind: cell.kind })
  }
  if (runs[runs.length - 1]?.kind === 'blank') runs.pop()
  return runs
}

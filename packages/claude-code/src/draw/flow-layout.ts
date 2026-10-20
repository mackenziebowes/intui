/**
 * Pure layout for the Flow drawer: no elements, only numbers and strings, so the
 * hard parts (layering, cycles, routing, fitting) are worked out without an engine.
 */
import type { FlowStep } from '@intui/core'
import type { Analysis, Edge } from '@intui/layout'

/** Cuts text to `width` cells, ending in an ellipsis when it was cut. */
export function truncate(text: string, width: number): string {
  const chars = [...text]
  if (chars.length <= width) return text
  return width <= 1 ? chars.slice(0, Math.max(width, 0)).join('') : `${chars.slice(0, width - 1).join('')}…`
}

/** Wraps text at spaces into lines of at most `width` cells; a word longer than that is broken. */
export function wrap(text: string, width: number): string[] {
  const room = Math.max(1, width)
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/).filter(Boolean)) {
    let rest = [...word]
    while (rest.length > room) {
      if (line) lines.push(line)
      line = ''
      lines.push(rest.slice(0, room).join(''))
      rest = rest.slice(room)
    }
    const piece = rest.join('')
    if (!line) line = piece
    else if ([...line].length + 1 + rest.length <= room) line += ` ${piece}`
    else {
      lines.push(line)
      line = piece
    }
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

/** Whether the forward edges form one straight line through every step, so it reads as a sequence. */
export function asSequence(analysis: Analysis, count: number): number[] | undefined {
  if (analysis.layers.length !== count) return undefined
  const order = analysis.layers.map(layer => layer[0]!)
  const straight = analysis.edges.every(edge => analysis.layerOf[edge.to] === analysis.layerOf[edge.from]! + 1)
  return straight ? order : undefined
}

export type LineKind = 'title' | 'detail' | 'note'
export type BoxLine = { text: string; kind: LineKind }

/** The lines inside one step's box: label, detail, and any link back to an earlier step. */
export function boxLines(step: FlowStep, notes: readonly string[], cap: number): BoxLine[] {
  return [
    ...wrap(step.label, cap).map(text => ({ text, kind: 'title' as const })),
    ...(step.detail ? wrap(step.detail, cap).map(text => ({ text, kind: 'detail' as const })) : []),
    ...notes.flatMap(note => wrap(note, cap).map(text => ({ text, kind: 'note' as const }))),
  ]
}

/** `↩ Target (label)` lines for the back edges leaving each step. */
export function backNotes(steps: readonly FlowStep[], analysis: Analysis): string[][] {
  return steps.map((_, i) =>
    analysis.back.filter(edge => edge.from === i).map(edge => `↩ ${steps[edge.to]!.label}${edge.label ? ` (${edge.label})` : ''}`),
  )
}

export const boxWidth = (lines: readonly BoxLine[]) => Math.max(...lines.map(line => [...line.text].length)) + 4

/** Widest label allowed on an arrow between boxes in a row. */
export const ARROW_LABEL_MAX = 14
/** Row-of-boxes width caps to try, widest first. */
const ROW_CAPS = [32, 22, 16]

export const arrowText = (label: string | undefined) => (label ? `─ ${truncate(label, ARROW_LABEL_MAX)} ─→` : '──→')

export type SequencePlan =
  | { direction: 'row'; cap: number }
  | { direction: 'column'; cap: number }

/** Chooses a row when every box and arrow fits `columns` at some width cap, else a column. */
export function planSequence(
  steps: readonly FlowStep[],
  notes: readonly string[][],
  arrows: readonly (string | undefined)[],
  columns: number,
): SequencePlan {
  const arrowWidth = arrows.reduce((sum, label) => sum + [...arrowText(label)].length, 0)
  for (const cap of ROW_CAPS) {
    const boxes = steps.reduce((sum, step, i) => sum + boxWidth(boxLines(step, notes[i]!, cap)), 0)
    if (boxes + arrowWidth <= columns) return { direction: 'row', cap }
  }
  return { direction: 'column', cap: Math.max(1, columns - 4) }
}

export type CellKind = 'blank' | 'border' | LineKind | 'arrow' | 'edge'
export type Run = { text: string; kind: CellKind }

const N = 1
const E = 2
const S = 4
const W = 8
const GLYPH: Record<number, string> = {
  [E]: '─', [W]: '─', [E | W]: '─', [N]: '│', [S]: '│', [N | S]: '│',
  [E | S]: '╭', [W | S]: '╮', [E | N]: '╰', [W | N]: '╯',
  [N | S | E]: '├', [N | S | W]: '┤', [E | W | S]: '┬', [E | W | N]: '┴', [N | S | E | W]: '┼',
}

/** Gutter widths and boxes per cap are tried widest first; the first layout that fits and draws cleanly wins. */
const GRID_CAPS = [24, 16, 12]

type Cell = { ch: string; kind: CellKind; mask: number; edges: Set<number> }

/**
 * A character grid that boxes, edge lines and labels are painted onto: a plain value that
 * `tryGrid` builds and the functions below paint, one call at a time (hub #1956).
 */
type Canvas = Cell[][]

function canvasOf(rows: number, cols: number): Canvas {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ch: ' ', kind: 'blank' as CellKind, mask: 0, edges: new Set<number>() })),
  )
}

function put(canvas: Canvas, row: number, col: number, ch: string, kind: CellKind) {
  const cell = canvas[row]?.[col]
  if (cell) Object.assign(cell, { ch, kind })
}

/** Paints a rounded box whose first line of text sits one row below `top`. */
function paintBox(canvas: Canvas, top: number, left: number, width: number, lines: readonly BoxLine[]) {
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
function laySegment(canvas: Canvas, id: number, edges: readonly Edge[], row: number, a: number, b: number, vertical: boolean): boolean {
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
function drawLines(canvas: Canvas) {
  for (const row of canvas) for (const cell of row) if (cell.mask) Object.assign(cell, { ch: GLYPH[cell.mask] ?? '─', kind: 'arrow' })
}

/** Writes text onto blank cells only; false when it would land on anything else. */
function paintLabel(canvas: Canvas, row: number, col: number, text: string): boolean {
  for (const [k, ch] of [...text].entries()) {
    const cell = canvas[row]?.[col + k]
    if (!cell || cell.kind !== 'blank') return false
    Object.assign(cell, { ch, kind: 'edge' })
  }
  return true
}

function runsOf(canvas: Canvas): Run[][] {
  return canvas.map(row => toRuns(row))
}

/**
 * Draws a layered flow on a character grid, layers left to right. Returns undefined when it
 * cannot do so cleanly in `columns`: an edge skips a layer, lines would cross, a label would
 * land on a line, or the width runs out. The caller then falls back to a list.
 */
export function layoutGrid(steps: readonly FlowStep[], analysis: Analysis, columns: number): Run[][] | undefined {
  const notes = backNotes(steps, analysis)
  if (analysis.edges.some(edge => analysis.layerOf[edge.to] !== analysis.layerOf[edge.from]! + 1)) return undefined
  for (const cap of GRID_CAPS) {
    const grid = tryGrid(steps, analysis, notes, cap, columns)
    if (grid) return grid
  }
  return undefined
}

/** Vertical placement: stack each layer, pulling a step toward its predecessors, then centre steps on their successors. */
function placeVertically(analysis: Analysis, height: readonly number[]): number[] {
  const { layers, edges } = analysis
  const top = new Array<number>(height.length).fill(0)
  const mid = (i: number) => top[i]! + 1
  const centre = (neighbours: number[]) => (neighbours.length ? Math.round(neighbours.reduce((a, b) => a + b, 0) / neighbours.length) - 1 : 0)
  layers.forEach(layer => {
    let next = 0
    for (const i of layer) {
      top[i] = Math.max(next, centre(edges.filter(e => e.to === i).map(e => mid(e.from))))
      next = top[i]! + height[i]! + 1
    }
  })
  for (let l = layers.length - 2; l >= 0; l--) {
    let next = 0
    for (const i of layers[l]!) {
      const after = edges.filter(e => e.from === i).map(e => mid(e.to))
      top[i] = Math.max(next, centre(after), after.length ? 0 : top[i]!)
      next = top[i]! + height[i]! + 1
    }
  }
  const shift = Math.min(...top)
  return top.map(t => t - shift)
}

function tryGrid(steps: readonly FlowStep[], analysis: Analysis, notes: string[][], cap: number, columns: number): Run[][] | undefined {
  const { layers, edges, layerOf } = analysis
  const lines = steps.map((step, i) => boxLines(step, notes[i]!, cap))
  const width = lines.map(boxWidth)
  const height = lines.map(l => l.length + 2)
  const layerWidth = layers.map(layer => Math.max(...layer.map(i => width[i]!)))
  const gutter = layers.slice(1).map((_, l) => {
    const labels = edges.filter(e => layerOf[e.from] === l).map(e => [...(e.label ?? '')].length)
    return Math.max(5, Math.max(0, ...labels) + 5)
  })
  const left: number[] = []
  let total = 0
  layers.forEach((_, l) => {
    left.push(total)
    total += layerWidth[l]! + (gutter[l] ?? 0)
  })
  if (total > columns) return undefined

  const top = placeVertically(analysis, height)
  const canvas = canvasOf(Math.max(...steps.map((_, i) => top[i]! + height[i]!)), total)
  layers.forEach((layer, l) => {
    for (const i of layer) paintBox(canvas, top[i]!, left[l]!, width[i]!, lines[i]!)
  })

  // Routing: each edge runs from its source's first line, along a vertical trunk, to its target's first line.
  const outdeg = (i: number) => edges.filter(e => e.from === i).length
  const indeg = (i: number) => edges.filter(e => e.to === i).length
  const labels: { row: number; col: number; text: string }[] = []
  for (let id = 0; id < edges.length; id++) {
    const edge = edges[id]!
    const l = layerOf[edge.from]!
    const ys = top[edge.from]! + 1
    const yt = top[edge.to]! + 1
    const sourceRight = left[l]! + width[edge.from]!
    const gx = left[l]! + layerWidth[l]!
    const gw = gutter[l]!
    const trunkAtTarget = outdeg(edge.from) === 1 && indeg(edge.to) > 1
    const trunk = trunkAtTarget ? gx + gw - 3 : gx + 1
    if (!laySegment(canvas, id, edges, ys, sourceRight, trunk, false)) return undefined
    if (ys !== yt && !laySegment(canvas, id, edges, trunk, ys, yt, true)) return undefined
    if (!laySegment(canvas, id, edges, yt, trunk, gx + gw - 1, false)) return undefined
    if (edge.label) labels.push(trunkAtTarget ? { row: ys - 1, col: gx + 1, text: edge.label } : { row: yt - 1, col: gx + 3, text: edge.label })
  }
  drawLines(canvas)
  for (const edge of edges) {
    const l = layerOf[edge.from]!
    put(canvas, top[edge.to]! + 1, left[l]! + layerWidth[l]! + gutter[l]! - 1, '→', 'arrow')
  }
  for (const label of labels) if (!paintLabel(canvas, label.row, label.col, label.text)) return undefined
  return runsOf(canvas)
}

/** Joins neighbouring cells of one kind into runs, dropping trailing blanks. */
function toRuns(row: readonly { ch: string; kind: CellKind }[]): Run[] {
  const runs: Run[] = []
  for (const cell of row) {
    const last = runs[runs.length - 1]
    if (last && last.kind === cell.kind) last.text += cell.ch
    else runs.push({ text: cell.ch, kind: cell.kind })
  }
  if (runs[runs.length - 1]?.kind === 'blank') runs.pop()
  return runs
}

/** A list line `→ Target (label)` for an edge, cut to fit. */
export function linkLine(steps: readonly FlowStep[], edge: Edge, isBack: boolean, columns: number): string {
  return truncate(`${isBack ? '↩' : '→'} ${steps[edge.to]!.label}${edge.label ? ` (${edge.label})` : ''}`, columns)
}

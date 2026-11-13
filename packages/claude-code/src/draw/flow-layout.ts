/**
 * Pure layout for the Flow drawer: no elements, only numbers and strings, so the
 * hard parts (layering, cycles, routing, fitting) are worked out without an engine.
 * Text is in flow-text.ts, the grid in flow-canvas.ts and the back-edge lanes in flow-back.ts.
 */
import type { FlowStep } from '@intui/core'
import { planBack, type Analysis, type BackPlan, type Edge } from '@intui/layout'
import { backCells, BACK_LABEL_CELLS, layBack, paintBackLabels, type BoxRect } from './flow-back'
import { canvasOf, drawLines, laySegment, paintBox, paintLabel, put, runsOf, type Run } from './flow-canvas'
import { boxLines, boxWidth, truncate, wrapEven, type BoxLine } from './flow-text'

/** Whether the forward edges form one straight line through every step, so it reads as a sequence. */
export function asSequence(analysis: Analysis, count: number): number[] | undefined {
  if (analysis.layers.length !== count) return undefined
  const order = analysis.layers.map(layer => layer[0]!)
  const straight = analysis.edges.every(edge => analysis.layerOf[edge.to] === analysis.layerOf[edge.from]! + 1)
  return straight ? order : undefined
}

/** `↩ Target (label)` lines for the back edges in `edges` that leave each step: those drawn as text, not in a lane. */
export function backNotes(steps: readonly FlowStep[], edges: readonly Edge[]): string[][] {
  return steps.map((_, i) =>
    edges.filter(edge => edge.from === i).map(edge => `↩ ${steps[edge.to]!.label}${edge.label ? ` (${edge.label})` : ''}`),
  )
}

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

/** Gutter widths and boxes per cap are tried widest first; the first layout that fits and draws cleanly wins. */
const GRID_CAPS = [24, 16, 12]
/** Most back edges drawn below a grid. */
const GRID_LANES = 3

/**
 * Draws a layered flow on a character grid, layers left to right. Returns undefined when it
 * cannot do so cleanly in `columns`: an edge skips a layer, lines would cross, a label would
 * land on a line, or the width runs out. The caller then falls back to a list.
 */
export function layoutGrid(steps: readonly FlowStep[], analysis: Analysis, columns: number): { runs: Run[][]; routed: number } | undefined {
  if (analysis.edges.some(edge => analysis.layerOf[edge.to] !== analysis.layerOf[edge.from]! + 1)) return undefined
  // Back edges run in lanes below the boxes, so they take no width: only rows.
  const back = planBack(analysis, { lanePitch: 1, labelRoom: 0, available: Infinity, maxLanes: GRID_LANES })
  const notes = backNotes(steps, back.noted)
  for (const cap of GRID_CAPS) {
    const runs = tryGrid(steps, analysis, notes, back, cap, columns)
    if (runs) return { runs, routed: back.routes.length }
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

function tryGrid(steps: readonly FlowStep[], analysis: Analysis, notes: string[][], back: BackPlan, cap: number, columns: number): Run[][] | undefined {
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
  const boxRects = steps.map((_, i) => ({ row: top[i]!, col: left[layerOf[i]!]!, width: width[i]!, height: height[i]! }))
  const lanes = backCells(back, boxRects, 'below')
  if (lanes.cols > columns) return undefined
  const canvas = canvasOf(Math.max(lanes.rows, ...steps.map((_, i) => top[i]! + height[i]!)), Math.max(total, lanes.cols))
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
  layBack(canvas, lanes)
  drawLines(canvas)
  for (const edge of edges) {
    const l = layerOf[edge.from]!
    put(canvas, top[edge.to]! + 1, left[l]! + layerWidth[l]! + gutter[l]! - 1, '→', 'arrow')
  }
  for (const head of lanes.heads) put(canvas, head.row, head.col, head.ch, 'arrow')
  for (const label of labels) if (!paintLabel(canvas, label.row, label.col, label.text)) return undefined
  if (!paintBackLabels(canvas, lanes)) return undefined
  return runsOf(canvas)
}

/** Box widths to try for a stack, widest first. */
const STACK_CAPS = [32, 24, 16]
/** Most back edges drawn beside a stack. */
const STACK_LANES = 4

/**
 * Draws a sequence as one stack of equal boxes with the arrows between them, and its back edges as
 * lanes down the right. `order` is the steps top to bottom. Returns undefined when no box width leaves room
 * for the lanes and their labels in `columns`; the caller then writes the back edges as text.
 */
export function layoutStack(steps: readonly FlowStep[], analysis: Analysis, order: readonly number[], columns: number): { runs: Run[][]; routed: number } | undefined {
  for (const cap of STACK_CAPS) {
    const back = planBack(analysis, { lanePitch: 2, labelRoom: BACK_LABEL_CELLS + 2, available: columns - (cap + 4), maxLanes: STACK_LANES })
    if (back.routes.length === 0) return undefined
    const notes = backNotes(steps, back.noted)
    const touching = (i: number) => back.routes.filter(r => r.from === i || r.to === i).length
    const lines = steps.map((step, i) => {
      const base = boxLines(step, notes[i]!, cap)
      // A box needs a row for each route that meets it.
      while (base.length < touching(i)) base.push({ text: '', kind: 'detail' })
      return base
    })
    const width = Math.max(...lines.map(boxWidth))
    const centre = Math.floor(width / 2)
    const forward = (k: number) => analysis.edges.find(e => e.from === order[k] && e.to === order[k + 1])
    const labelRoom = Math.max(8, width - centre - 3)
    const gap = order.slice(1).map((_, k) => Math.max(2, forward(k)?.label ? wrapEven(forward(k)!.label!, labelRoom).length : 0))
    const rects: BoxRect[] = new Array(steps.length)
    let row = 0
    order.forEach((i, k) => {
      rects[i] = { row, col: 0, width, height: lines[i]!.length + 2 }
      row += lines[i]!.length + 2 + (gap[k] ?? 0)
    })
    const lanes = backCells(back, rects, 'right')
    if (lanes.cols > columns) continue
    const canvas = canvasOf(Math.max(row, lanes.rows), Math.max(width, lanes.cols))
    order.forEach(i => paintBox(canvas, rects[i]!.row, 0, width, lines[i]!))
    layBack(canvas, lanes)
    drawLines(canvas)
    for (const head of lanes.heads) put(canvas, head.row, head.col, head.ch, 'arrow')
    const labels: { row: number; col: number; text: string }[] = []
    order.slice(1).forEach((_, k) => {
      const first = rects[order[k]!]!.row + rects[order[k]!]!.height
      for (let g = 0; g < gap[k]!; g++) put(canvas, first + g, centre, g === gap[k]! - 1 ? '↓' : '│', 'arrow')
      const label = forward(k)?.label
      if (label) wrapEven(label, labelRoom).forEach((text, g) => labels.push({ row: first + g, col: centre + 2, text }))
    })
    for (const label of labels) if (!paintLabel(canvas, label.row, label.col, label.text)) return undefined
    if (!paintBackLabels(canvas, lanes)) return undefined
    return { runs: runsOf(canvas), routed: back.routes.length }
  }
  return undefined
}

/** A list line `→ Target (label)` for an edge, cut to fit. */
export function linkLine(steps: readonly FlowStep[], edge: Edge, isBack: boolean, columns: number): string {
  return truncate(`${isBack ? '↩' : '→'} ${steps[edge.to]!.label}${edge.label ? ` (${edge.label})` : ''}`, columns)
}

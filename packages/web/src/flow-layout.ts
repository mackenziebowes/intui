/**
 * Pure layout for the web Flow: which way the layers run at a given width, and
 * the connector between two measured boxes. The boxes themselves are laid out
 * by CSS; the drawer measures them and asks `connector` for each arrow.
 */
import type { FlowLink, FlowStep } from '@intui/core'
import { analyse, type Edge } from '@intui/layout'
import { estimateWidth, type Measure } from './chart-layout'

/** The narrowest a step's box gets when layers sit side by side. */
export const BOX_MIN = 136
/** Room between layers in a row, without and with labels on the arrows. */
const GUTTER_MIN = 44
const GUTTER_MAX = 150

/** Narrowest box when a layer's steps sit side by side in a stacked flow, and the gap between them. */
const COLUMN_BOX_MIN = 120
const COLUMN_GAP = 12

/**
 * - `row`: layers left to right, arrows between neighbouring layers; a link that skips
 *   a layer is written in its source box, never drawn through the boxes between.
 * - `column`: layers top to bottom, each layer's steps side by side.
 * - `list`: one box per line, in layer order. Only links between neighbours are drawn;
 *   the rest are written in the source's box, so no arrow ever crosses a box.
 */
export type FlowDirection = 'row' | 'column' | 'list'

export type FlowNote = { text: string; kind: 'back' | 'link' }

export type FlowPlan = {
  direction: FlowDirection
  /** Step indexes per layer, in drawing order. */
  layers: number[][]
  /** Arrows to draw. */
  edges: Edge[]
  /** Per step, links written as text: cycles always, and in a list the links that skip a neighbour. */
  notes: FlowNote[][]
  /** Pixels between layers in a row. */
  gutter: number
}

/** Room left and right of an arrow label inside its gutter. */
const LABEL_PAD = 28

/**
 * The gutter that fits the widest arrow label on one line, within bounds; a label wider than
 * GUTTER_MAX wraps (see `wrapLabel`), so the gutter only has to fit its longest word.
 */
export function gutterFor(edges: readonly Edge[], measure: Measure = estimateWidth): number {
  const labels = edges.flatMap(edge => (edge.label ? [edge.label] : []))
  const widest = Math.max(0, ...labels.map(measure))
  const longestWord = Math.max(0, ...labels.flatMap(label => label.split(/\s+/)).map(measure))
  return Math.round(Math.max(Math.min(GUTTER_MAX, Math.max(GUTTER_MIN, widest ? widest + LABEL_PAD : 0)), longestWord ? longestWord + LABEL_PAD : 0))
}

/** The width an arrow label may take in a row's gutter. */
export const labelRoom = (gutter: number) => gutter - LABEL_PAD + 8

/** An arrow label as lines no wider than `width`, broken at spaces; a single word wider than that stays whole. */
export function wrapLabel(label: string, width: number, measure: Measure = estimateWidth): string[] {
  const lines: string[] = []
  for (const word of label.split(/\s+/).filter(Boolean)) {
    const last = lines[lines.length - 1]
    if (last !== undefined && measure(`${last} ${word}`) <= width) lines[lines.length - 1] = `${last} ${word}`
    else lines.push(word)
  }
  return lines.length > 0 ? lines : [label]
}

/** Box padding and border either side of a step's text (0.8em a side at 16px, plus the 1px border). */
const BOX_CHROME = 28

/** A step box wide enough that its longest unbroken word in the bold label stays whole, never below `floor`. */
const boxFor = (steps: readonly FlowStep[], floor: number, measure: Measure) =>
  Math.max(floor, ...steps.flatMap(step => step.label.split(/\s+/)).map(word => Math.ceil(measure(word) * 1.1) + BOX_CHROME))

/**
 * Lays a flow out for `width` pixels: a row when every layer gets BOX_MIN, else a
 * column when every layer's steps fit side by side, else a list. Cycles are broken,
 * so this always ends.
 */
export function flowPlan(steps: readonly FlowStep[], links: readonly FlowLink[], width: number, measure: Measure = estimateWidth): FlowPlan {
  const analysis = analyse(steps, links)
  const gutter = gutterFor(analysis.edges, measure)
  const count = analysis.layers.length
  const rowBox = boxFor(steps, BOX_MIN, measure)
  const columnBox = boxFor(steps, COLUMN_BOX_MIN, measure)
  const fitsRow = count * rowBox + (count - 1) * gutter <= width
  const fitsColumn = analysis.layers.every(layer => layer.length * columnBox + (layer.length - 1) * COLUMN_GAP <= width)
  // A link that skips a layer would run through the boxes between, so a stack becomes a list.
  const skips = analysis.edges.some(edge => analysis.layerOf[edge.to] !== analysis.layerOf[edge.from]! + 1)
  const direction: FlowDirection = fitsRow ? 'row' : fitsColumn && !skips ? 'column' : 'list'
  const suffix = (edge: Edge) => (edge.label ? ` (${edge.label})` : '')
  const notes: FlowNote[][] = steps.map((_, i) =>
    analysis.back.filter(edge => edge.from === i).map(edge => ({ text: `Back to ${steps[edge.to]!.label}${suffix(edge)}`, kind: 'back' as const })),
  )
  let edges = analysis.edges
  // In a row, a link that skips a layer would be drawn through the boxes between
  // (and its label hidden under them), so it is written in its source box instead.
  if (direction === 'row') {
    const next = (edge: Edge) => analysis.layerOf[edge.to] === analysis.layerOf[edge.from]! + 1
    for (const edge of edges.filter(e => !next(e))) notes[edge.from]!.push({ text: `To ${steps[edge.to]!.label}${suffix(edge)}`, kind: 'link' })
    edges = edges.filter(next)
  }
  if (direction === 'list') {
    const position = new Map(analysis.layers.flat().map((step, k) => [step, k]))
    const adjacent = (edge: Edge) => position.get(edge.to) === position.get(edge.from)! + 1
    for (const edge of edges.filter(e => !adjacent(e))) notes[edge.from]!.push({ text: `To ${steps[edge.to]!.label}${suffix(edge)}`, kind: 'link' })
    edges = edges.filter(adjacent)
  }
  return { direction, layers: analysis.layers, edges, notes, gutter }
}

export type Box = { left: number; top: number; width: number; height: number }

/**
 * The curve from one box to another: out of the source's right side into the
 * target's left in a row, out of its bottom into the target's top in a column.
 * `end` stops short of the box by the arrowhead's length. The label point is the
 * curve's midpoint. A column and a list both run top to bottom.
 */
export function connector(from: Box, to: Box, direction: FlowDirection, arrow = 6): { d: string; label: { x: number; y: number } } {
  const r = (n: number) => Number(n.toFixed(1))
  if (direction === 'row') {
    const sx = from.left + from.width
    const sy = from.top + from.height / 2
    const ex = to.left - arrow
    const ey = to.top + to.height / 2
    const bend = Math.max(12, (ex - sx) / 2)
    return {
      d: `M${r(sx)} ${r(sy)} C${r(sx + bend)} ${r(sy)} ${r(ex - bend)} ${r(ey)} ${r(ex)} ${r(ey)}`,
      label: { x: (sx + ex) / 2, y: (sy + ey) / 2 },
    }
  }
  const sx = from.left + from.width / 2
  const sy = from.top + from.height
  const ex = to.left + to.width / 2
  const ey = to.top - arrow
  const bend = Math.max(10, (ey - sy) / 2)
  return {
    d: `M${r(sx)} ${r(sy)} C${r(sx)} ${r(sy + bend)} ${r(ex)} ${r(ey - bend)} ${r(ex)} ${r(ey)}`,
    label: { x: (sx + ex) / 2, y: (sy + ey) / 2 },
  }
}

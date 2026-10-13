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
 * - `row`: layers left to right, arrows between every linked pair.
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

/** The gutter that fits the widest arrow label, within bounds. */
export function gutterFor(edges: readonly Edge[], measure: Measure = estimateWidth): number {
  const widest = Math.max(0, ...edges.map(edge => (edge.label ? measure(edge.label) : 0)))
  return Math.round(Math.min(GUTTER_MAX, Math.max(GUTTER_MIN, widest ? widest + 28 : 0)))
}

/**
 * Lays a flow out for `width` pixels: a row when every layer gets BOX_MIN, else a
 * column when every layer's steps fit side by side, else a list. Cycles are broken,
 * so this always ends.
 */
export function flowPlan(steps: readonly FlowStep[], links: readonly FlowLink[], width: number, measure: Measure = estimateWidth): FlowPlan {
  const analysis = analyse(steps, links)
  const gutter = gutterFor(analysis.edges, measure)
  const count = analysis.layers.length
  const fitsRow = count * BOX_MIN + (count - 1) * gutter <= width
  const fitsColumn = analysis.layers.every(layer => layer.length * COLUMN_BOX_MIN + (layer.length - 1) * COLUMN_GAP <= width)
  // A link that skips a layer would run through the boxes between, so a stack becomes a list.
  const skips = analysis.edges.some(edge => analysis.layerOf[edge.to] !== analysis.layerOf[edge.from]! + 1)
  const direction: FlowDirection = fitsRow ? 'row' : fitsColumn && !skips ? 'column' : 'list'
  const suffix = (edge: Edge) => (edge.label ? ` (${edge.label})` : '')
  const notes: FlowNote[][] = steps.map((_, i) =>
    analysis.back.filter(edge => edge.from === i).map(edge => ({ text: `Back to ${steps[edge.to]!.label}${suffix(edge)}`, kind: 'back' as const })),
  )
  let edges = analysis.edges
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

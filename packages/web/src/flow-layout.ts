/**
 * Pure layout for the web Flow: which way the layers run at a given width, and
 * the connector between two measured boxes. Back-edge lanes are in flow-back.ts and
 * label placement in flow-labels.ts. The boxes themselves are laid out
 * by CSS; the drawer measures them and asks `connector` for each arrow.
 */
import type { FlowLink, FlowStep } from '@intui/core'
import { analyse, planBack, type BackPlan, type Edge, type Route } from '@intui/layout'
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
  /** Per step, links written as text: back edges that got no lane, and in a list the links that skip a neighbour. */
  notes: FlowNote[][]
  /** Back edges drawn as arrows in lanes, and those that fell back to `notes`. */
  back: BackPlan
  /** Pixels between layers in a row. */
  gutter: number
}

/** Distance between lanes, and the width a back label wraps to beside them. */
export const LANE_PITCH = 14
export const BACK_LABEL_W = 110
/** Most lanes in a row, and in a list; a list is a phone, so it gets two. */
const ROW_LANES = 4
const LIST_LANES = 2
/** A list narrower than this writes every back edge as text. */
const LIST_LANE_MIN = 320

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

/** The greedy break of a label at `width`, a single word wider than that staying whole. */
function breakLabel(label: string, width: number, measure: Measure): string[] {
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
 * An arrow label as lines no wider than `width`, broken at spaces so the lines come out even and the
 * last line is never a lone word, unless the label is one word or a word is wider than `width`
 * (then it is the greedy break, a single wide word staying whole).
 */
export function wrapLabel(label: string, width: number, measure: Measure = estimateWidth): string[] {
  const words = label.split(/\s+/).filter(Boolean)
  if (words.length < 2 || words.some(w => measure(w) > width)) return breakLabel(label, width, measure)
  const len = measure
  const n = words.length
  const best: number[] = Array(n + 1).fill(Infinity)
  const from: number[] = Array(n + 1).fill(0)
  best[0] = 0
  for (let j = 1; j <= n; j++) {
    for (let i = j - 1; i >= 0; i--) {
      const size = len(words.slice(i, j).join(' '))
      if (size > width) break
      const last = j === n
      // Slack squared evens the lines; a lone word on the last line costs more than any slack; each line costs a little.
      const cost = (last ? 0 : (width - size) ** 2) + (last && j - i === 1 && n > 1 ? width ** 2 * 100 : 0) + (width * width) / 4
      if (best[i]! + cost < best[j]!) [best[j], from[j]] = [best[i]! + cost, i]
    }
  }
  const lines: string[] = []
  for (let j = n; j > 0; j = from[j]!) lines.unshift(words.slice(from[j]!, j).join(' '))
  return lines
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
  const rowBox = boxFor(steps, BOX_MIN, measure)
  const columnBox = boxFor(steps, COLUMN_BOX_MIN, measure)
  const fitsRow = count * rowBox + (count - 1) * gutter <= width
  const fitsColumn = analysis.layers.every(layer => layer.length * columnBox + (layer.length - 1) * COLUMN_GAP <= width)
  // A link that skips a layer would run through the boxes between, so a stack becomes a list.
  const skips = analysis.edges.some(edge => analysis.layerOf[edge.to] !== analysis.layerOf[edge.from]! + 1)
  const direction: FlowDirection = fitsRow ? 'row' : fitsColumn && !skips ? 'column' : 'list'
  const widest = Math.max(0, ...analysis.back.map(edge => (edge.label ? Math.min(BACK_LABEL_W, measure(edge.label)) : 0)))
  const layerMin = Math.max(...analysis.layers.map(layer => layer.length * COLUMN_BOX_MIN + (layer.length - 1) * COLUMN_GAP))
  const back = planBack(
    analysis,
    direction === 'row'
      ? { lanePitch: LANE_PITCH, labelRoom: 0, available: Infinity, maxLanes: ROW_LANES }
      : direction === 'column'
        ? { lanePitch: LANE_PITCH, labelRoom: widest + 8, available: width - layerMin }
        : { lanePitch: LANE_PITCH, labelRoom: widest + 8, available: width < LIST_LANE_MIN ? 0 : width - COLUMN_BOX_MIN, maxLanes: LIST_LANES, order: 'flat' },
  )
  const suffix = (edge: Edge) => (edge.label ? ` (${edge.label})` : '')
  const notes: FlowNote[][] = steps.map((_, i) =>
    back.noted.filter(edge => edge.from === i).map(edge => ({ text: `Back to ${steps[edge.to]!.label}${suffix(edge)}`, kind: 'back' as const })),
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
  return { direction, layers: analysis.layers, edges, notes, back, gutter }
}

export type Box = { left: number; top: number; width: number; height: number }

export type Point = { x: number; y: number }

/**
 * The curve from one box to another: out of the source's right side into the
 * target's left in a row, out of its bottom into the target's top in a column.
 * `end` stops short of the box by the arrowhead's length. A column and a list both run
 * top to bottom. `at(t)` is the point a fraction `t` along the curve, for placing labels.
 */
export function connector(from: Box, to: Box, direction: FlowDirection, arrow = 6): { d: string; at: (t: number) => Point } {
  const r = (n: number) => Number(n.toFixed(1))
  const bezier = (a: Point, b: Point, c: Point, e: Point) => (t: number): Point => {
    const u = 1 - t
    return {
      x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * e.x,
      y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * e.y,
    }
  }
  if (direction === 'row') {
    const s: Point = { x: from.left + from.width, y: from.top + from.height / 2 }
    const e: Point = { x: to.left - arrow, y: to.top + to.height / 2 }
    const bend = Math.max(12, (e.x - s.x) / 2)
    const [b, c] = [{ x: s.x + bend, y: s.y }, { x: e.x - bend, y: e.y }]
    return { d: `M${r(s.x)} ${r(s.y)} C${r(b.x)} ${r(b.y)} ${r(c.x)} ${r(c.y)} ${r(e.x)} ${r(e.y)}`, at: bezier(s, b, c, e) }
  }
  const s: Point = { x: from.left + from.width / 2, y: from.top + from.height }
  const e: Point = { x: to.left + to.width / 2, y: to.top - arrow }
  const bend = Math.max(10, (e.y - s.y) / 2)
  const [b, c] = [{ x: s.x, y: s.y + bend }, { x: e.x, y: e.y - bend }]
  return { d: `M${r(s.x)} ${r(s.y)} C${r(b.x)} ${r(b.y)} ${r(c.x)} ${r(c.y)} ${r(e.x)} ${r(e.y)}`, at: bezier(s, b, c, e) }
}

/** Gap from a line to the label beside it, and between stacked labels. */
export const LABEL_GAP = 8
export const LABEL_STACK_GAP = 4
/** Lines of a wrapped label are this far apart. */
export const LABEL_LINE_H = 14

export type Rect = { left: number; top: number; width: number; height: number }

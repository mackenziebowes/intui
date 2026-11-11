/**
 * The back edges of a Flow on the character grid: each route's line cells, arrowhead and label, in lanes
 * below the boxes or to their right.
 */
import type { BackPlan, Route } from '@intui/layout'
import { E, N, paintLabel, S, W, type Canvas } from './flow-canvas'
import { wrap } from './flow-text'

/** Where the back edges of a flow go on a character grid: line cells, arrowheads and labels, and the size they need. */
export type BackCells = {
  /** Line cells: the directions each connects (N, E, S, W bits), merged into glyphs by `drawLines`. */
  segments: { row: number; col: number; mask: number }[]
  heads: { row: number; col: number; ch: string }[]
  labels: { row: number; col: number; text: string }[]
  /** Dotted cells from an inner lane to its label, drawn only where blank. */
  leaders: { row: number; col: number }[]
  rows: number
  cols: number
}

export type BoxRect = { row: number; col: number; width: number; height: number }

/** Widest a back label is, wrapped. */
export const BACK_LABEL_CELLS = 18

/**
 * Lays back edges out on cells. `right`: lanes run down the right of the boxes, 2 cells apart, and
 * labels sit beyond the outermost lane. `below`: lanes run along the foot of the boxes, 1 row apart, and labels
 * sit under the lanes. A route leaves one box at its slot, runs along its lane and enters the other box
 * at its slot, ending in an arrowhead against the box. Labels are placed beyond every lane, so none
 * meets a line; labels that would meet each other are moved apart.
 */
export function backCells(back: BackPlan, rects: readonly BoxRect[], orient: 'right' | 'below'): BackCells {
  const out: BackCells = { segments: [], heads: [], labels: [], leaders: [], rows: 0, cols: 0 }
  if (back.routes.length === 0) return out
  const below = orient === 'below'
  const along = (r: BoxRect) => (below ? { start: r.col, size: r.width } : { start: r.row, size: r.height })
  const across = (r: BoxRect) => (below ? { start: r.row, size: r.height } : { start: r.col, size: r.width })
  const cell = (a: number, p: number) => (below ? { row: p, col: a } : { row: a, col: p })
  const [plus, minus, alongPlus, alongMinus] = below ? [S, N, E, W] : [E, W, S, N]
  const pitch = below ? 1 : 2
  const edge = Math.max(...back.routes.flatMap(r => [r.from, r.to]).map(i => across(rects[i]!).start + across(rects[i]!).size))
  const laneP = (lane: number) => edge + 1 + lane * pitch
  const slot = (i: number, s: Route['fromSlot']) => along(rects[i]!).start + 1 + Math.min(Math.max(0, along(rects[i]!).size - 3), Math.floor(((along(rects[i]!).size - 2) * (s.index + 0.5)) / s.of))
  const mark = (a: number, p: number, mask: number) => out.segments.push({ ...cell(a, p), mask })
  const run = (a0: number, p0: number, a1: number, p1: number) => {
    // One straight run from (a0, p0) to (a1, p1): each cell connects to its neighbours on the run.
    const forward = a0 === a1 ? (p1 > p0 ? plus : minus) : a1 > a0 ? alongPlus : alongMinus
    const backward = forward === plus ? minus : forward === minus ? plus : forward === alongPlus ? alongMinus : alongPlus
    const n = Math.max(Math.abs(a1 - a0), Math.abs(p1 - p0))
    for (let k = 0; k <= n; k++) {
      const [a, p] = [a0 + Math.sign(a1 - a0) * k, p0 + Math.sign(p1 - p0) * k]
      mark(a, p, (k < n ? forward : 0) | (k > 0 ? backward : 0))
    }
  }
  for (const route of back.routes) {
    const [a0, a1, lane] = [slot(route.from, route.fromSlot), slot(route.to, route.toSlot), laneP(route.lane)]
    run(a0, edge, a0, lane)
    run(a0, lane, a1, lane)
    run(a1, lane, a1, edge)
    out.heads.push({ ...cell(a1, edge), ch: below ? '↑' : '←' })
  }
  const lanesEnd = laneP(back.lanes - 1)
  const mid = (r: Route) => (slot(r.from, r.fromSlot) + slot(r.to, r.toSlot)) / 2
  const labelled = back.routes.filter(r => r.label).sort((x, y) => mid(x) - mid(y))
  let rows = below ? lanesEnd + 1 : 0
  let cols = below ? 0 : lanesEnd + 1
  if (!below) {
    let floor = -Infinity
    for (const route of labelled) {
      const lines = wrap(route.label!, BACK_LABEL_CELLS)
      const top = Math.max(Math.round(mid(route)) - Math.floor(lines.length / 2), floor)
      floor = top + lines.length + 1
      lines.forEach((text, k) => out.labels.push({ row: top + k, col: lanesEnd + 2, text }))
      if (route.lane < back.lanes - 1) for (let c = laneP(route.lane) + 1; c < lanesEnd + 2; c++) out.leaders.push({ row: top, col: c })
      cols = Math.max(cols, lanesEnd + 2 + Math.max(...lines.map(l => [...l].length)))
      rows = Math.max(rows, top + lines.length)
    }
  } else {
    const bands: { right: number; height: number }[] = []
    for (const route of labelled) {
      const lines = wrap(route.label!, BACK_LABEL_CELLS)
      const width = Math.max(...lines.map(l => [...l].length))
      const left = Math.max(0, Math.round(mid(route)) - Math.floor(width / 2))
      let b = bands.findIndex(band => band.right + 1 <= left)
      if (b < 0) {
        bands.push({ right: -Infinity, height: 0 })
        b = bands.length - 1
      }
      bands[b]!.right = left + width
      bands[b]!.height = Math.max(bands[b]!.height, lines.length)
      const top = lanesEnd + 2 + bands.slice(0, b).reduce((n, band) => n + band.height, 0)
      lines.forEach((text, k) => out.labels.push({ row: top + k, col: left, text }))
      if (route.lane < back.lanes - 1) for (let r = laneP(route.lane) + 1; r < top; r++) out.leaders.push({ row: r, col: Math.round(mid(route)) })
      rows = Math.max(rows, top + lines.length)
      cols = Math.max(cols, left + width)
    }
  }
  out.rows = rows
  out.cols = cols
  return out
}

/** Adds the back edges' line cells to the canvas; `drawLines` turns them into glyphs. */
export function layBack(canvas: Canvas, cells: BackCells) {
  for (const seg of cells.segments) {
    const target = canvas[seg.row]?.[seg.col]
    if (target) target.mask |= seg.mask
  }
}

/** Writes the back labels and their leaders; false when a label would land on anything but blank cells. */
export function paintBackLabels(canvas: Canvas, cells: BackCells): boolean {
  for (const leader of cells.leaders) {
    const target = canvas[leader.row]?.[leader.col]
    if (target && target.kind === 'blank') Object.assign(target, { ch: '·', kind: 'edge' })
  }
  return cells.labels.every(label => paintLabel(canvas, label.row, label.col, label.text))
}

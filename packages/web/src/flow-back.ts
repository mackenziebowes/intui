/**
 * The back edges of a web Flow, placed on the measured boxes: each route's line, running in a lane to the
 * right of the boxes (a column or list) or below them (a row), and its label beyond every lane.
 */
import type { BackPlan, Route } from '@intui/layout'
import { estimateWidth, type Measure } from './chart-layout'
import { BACK_LABEL_W, LABEL_GAP, LABEL_LINE_H, LABEL_STACK_GAP, LANE_PITCH, wrapLabel, type Box, type FlowDirection, type Point, type Rect } from './flow-layout'

/** How far the first lane sits from the boxes. */
const LANE_BASE = 12
const CORNER = 6

/** The room lanes and a label column take to the right of the boxes in a column or list, known before any box is measured. */
export function sideExtent(back: BackPlan, measure: Measure = estimateWidth): number {
  if (back.routes.length === 0) return 0
  const widest = Math.max(0, ...back.routes.map(r => (r.label ? Math.min(BACK_LABEL_W, measure(r.label)) : 0)))
  return LANE_BASE + (back.lanes - 1) * LANE_PITCH + (widest ? LABEL_GAP + widest : 0) + 2
}

export type PlacedBackLabel = {
  lines: string[]
  /** Left edge of the text block, or its centre when `anchor` is middle. */
  x: number
  /** Centre of the first line. */
  y: number
  anchor: 'start' | 'middle'
  rect: Rect
  /** A dotted line from the route's lane to the label, when other lanes lie between. */
  leader?: { from: { x: number; y: number }; to: { x: number; y: number } }
}
export type PlacedRoute = { d: string; /** Points along the line and its leader, close enough to test a rect against. */ points: Point[]; label?: PlacedBackLabel }
export type BackGeometry = {
  routes: PlacedRoute[]
  /** Room the lanes and labels need beyond the boxes: to the right in a column or list, below in a row. */
  extent: number
}

/** Points along the straight pieces between `corners`, a few pixels apart. */
function densify(corners: readonly Point[], step = 3): Point[] {
  const out: Point[] = []
  for (let i = 1; i < corners.length; i++) {
    const [a, b] = [corners[i - 1]!, corners[i]!]
    const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / step))
    for (let k = 0; k <= n; k++) out.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n })
  }
  return out
}

/** A line through `points` with its corners rounded. */
function rounded(points: readonly { x: number; y: number }[]): string {
  const r = (n: number) => Number(n.toFixed(1))
  let d = `M${r(points[0]!.x)} ${r(points[0]!.y)}`
  for (let i = 1; i < points.length - 1; i++) {
    const [a, b, c] = [points[i - 1]!, points[i]!, points[i + 1]!]
    const radius = Math.min(CORNER, Math.hypot(b.x - a.x, b.y - a.y) / 2, Math.hypot(c.x - b.x, c.y - b.y) / 2)
    const toward = (p: { x: number; y: number }) => {
      const len = Math.hypot(p.x - b.x, p.y - b.y) || 1
      return { x: b.x + ((p.x - b.x) / len) * radius, y: b.y + ((p.y - b.y) / len) * radius }
    }
    const [p, q] = [toward(a), toward(c)]
    d += ` L${r(p.x)} ${r(p.y)} Q${r(b.x)} ${r(b.y)} ${r(q.x)} ${r(q.y)}`
  }
  const last = points[points.length - 1]!
  return `${d} L${r(last.x)} ${r(last.y)}`
}

/**
 * The lines and labels of the back edges, placed on the measured boxes. Lanes run to the
 * right of the boxes in a column or list, below them in a row. A label is placed by
 * construction beyond every lane (to the right, or below), so no label meets a line; labels
 * that would meet each other are pushed apart.
 */
export function backGeometry(
  back: BackPlan,
  boxes: readonly Box[],
  direction: FlowDirection,
  measure: Measure = estimateWidth,
  arrow = 7,
): BackGeometry {
  if (back.routes.length === 0) return { routes: [], extent: 0 }
  const horizontal = direction === 'row'
  // Along the flow is x in a row and y otherwise; across it is the other way round.
  const along = (b: Box) => (horizontal ? { start: b.left, size: b.width } : { start: b.top, size: b.height })
  const across = (b: Box) => (horizontal ? { start: b.top, size: b.height } : { start: b.left, size: b.width })
  const laneAt = (route: Route) => base + route.lane * LANE_PITCH
  const point = (a: number, c: number) => (horizontal ? { x: a, y: c } : { x: c, y: a })
  const slotAt = (i: number, slot: Route['fromSlot']) => along(boxes[i]!).start + (along(boxes[i]!).size * (slot.index + 1)) / (slot.of + 1)
  const edgeAt = (i: number) => across(boxes[i]!).start + across(boxes[i]!).size
  // Lanes clear every box a route runs past, not only its two ends: a layer between them can be taller than both.
  const spanEnd = (route: Route) => {
    const [a0, a1] = [slotAt(route.from, route.fromSlot), slotAt(route.to, route.toSlot)]
    const [lo, hi] = [Math.min(a0, a1), Math.max(a0, a1)]
    const under = boxes.filter(b => along(b).start < hi && along(b).start + along(b).size > lo)
    return Math.max(edgeAt(route.from), edgeAt(route.to), ...under.map(b => across(b).start + across(b).size))
  }
  const base = Math.max(...back.routes.map(spanEnd)) + LANE_BASE
  const lanesEnd = base + (back.lanes - 1) * LANE_PITCH

  const placed = back.routes.map(route => {
    const [a0, a1] = [slotAt(route.from, route.fromSlot), slotAt(route.to, route.toSlot)]
    const lane = laneAt(route)
    const corners = [point(a0, edgeAt(route.from)), point(a0, lane), point(a1, lane), point(a1, edgeAt(route.to) + arrow)]
    return { route, d: rounded(corners), points: densify(corners), a0, a1, lane }
  })

  // Labels, in order along the flow so stacking is stable.
  const labelled = placed.filter(p => p.route.label).sort((p, q) => (p.a0 + p.a1) / 2 - (q.a0 + q.a1) / 2)
  const labels = new Map<Route, PlacedBackLabel>()
  let extent = lanesEnd - base + LANE_BASE
  if (!horizontal) {
    const x = lanesEnd + LABEL_GAP
    let floor = -Infinity
    let widest = 0
    for (const p of labelled) {
      const lines = wrapLabel(p.route.label!, BACK_LABEL_W, measure)
      const height = lines.length * LABEL_LINE_H
      const mid = (p.a0 + p.a1) / 2
      const top = Math.max(mid - height / 2, floor)
      floor = top + height + LABEL_STACK_GAP
      widest = Math.max(widest, ...lines.map(measure))
      const y = top + LABEL_LINE_H / 2
      labels.set(p.route, {
        lines,
        rect: { left: x, top, width: Math.max(...lines.map(measure)), height },
        x,
        y,
        anchor: 'start',
        ...(p.route.lane < back.lanes - 1 ? { leader: { from: { x: p.lane, y: Math.min(Math.max(y, Math.min(p.a0, p.a1)), Math.max(p.a0, p.a1)) }, to: { x: x - 3, y } } } : {}),
      })
    }
    extent = lanesEnd - base + LANE_BASE + (widest ? LABEL_GAP + widest : 0)
  } else {
    const rowTop = lanesEnd + LABEL_GAP
    const rows: { right: number; height: number }[] = []
    let used = 0
    for (const p of labelled) {
      const run = Math.abs(p.a0 - p.a1)
      const lines = wrapLabel(p.route.label!, Math.min(160, Math.max(80, run - 8)), measure)
      const width = Math.max(...lines.map(measure))
      const mid = (p.a0 + p.a1) / 2
      const left = mid - width / 2
      let r = rows.findIndex(row => row.right + LABEL_STACK_GAP <= left)
      if (r < 0) {
        rows.push({ right: -Infinity, height: 0 })
        r = rows.length - 1
      }
      rows[r]!.right = left + width
      rows[r]!.height = Math.max(rows[r]!.height, lines.length * LABEL_LINE_H)
      const top = rowTop + rows.slice(0, r).reduce((n, row) => n + row.height + LABEL_STACK_GAP, 0)
      used = Math.max(used, top + rows[r]!.height - rowTop)
      const y = top + LABEL_LINE_H / 2
      labels.set(p.route, {
        lines,
        rect: { left, top, width, height: lines.length * LABEL_LINE_H },
        x: mid,
        y,
        anchor: 'middle',
        ...(p.route.lane < back.lanes - 1 ? { leader: { from: { x: mid, y: p.lane }, to: { x: mid, y: top - 3 } } } : {}),
      })
    }
    extent = lanesEnd - base + LANE_BASE + (used ? LABEL_GAP + used : 0)
  }
  return {
    routes: placed.map(p => {
      const label = labels.get(p.route)
      const leader = label?.leader ? densify([label.leader.from, label.leader.to]) : []
      return { d: p.d, points: [...p.points, ...leader], ...(label ? { label } : {}) }
    }),
    extent,
  }
}

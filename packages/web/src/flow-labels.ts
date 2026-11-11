/**
 * Where the forward labels of a web Flow go: beside their curve, on a free spot found by search, so no
 * label meets a line, a box, another label or the edge of the canvas.
 */
import { estimateWidth, type Measure } from './chart-layout'
import { LABEL_GAP, LABEL_LINE_H, wrapLabel, type FlowDirection, type Point, type Rect } from './flow-layout'

export type PlacedLabel = { lines: string[]; rect: Rect; x: number; y: number; anchor: 'start' | 'middle' | 'end' }

const hits = (a: Rect, b: Rect, pad = 0) => a.left < b.left + b.width + pad && b.left < a.left + a.width + pad && a.top < b.top + b.height + pad && b.top < a.top + a.height + pad
const inside = (p: Point, r: Rect, pad = 0) => p.x > r.left - pad && p.x < r.left + r.width + pad && p.y > r.top - pad && p.y < r.top + r.height + pad

/**
 * Places each forward label beside its curve, on a free spot found by search, so no label meets
 * a line, a box, another label or the edge of the canvas. Candidates run along the curve
 * (middle first, then nearer each end), to the side of it (right, then left in a column;
 * above, then below in a row), and from the full width down to a narrow one. If nothing is
 * free the first candidate is used and `crowded` says so.
 */
export function placeLabels(input: {
  labels: readonly { text: string; at: (t: number) => Point }[]
  direction: FlowDirection
  boxes: readonly Rect[]
  /** Points of every line already drawn: all the curves and the back lanes. */
  lines: readonly Point[]
  /** Rects already taken, such as back labels. */
  taken: readonly Rect[]
  /** The canvas's drawable width. */
  width: number
  /** Widest a label may be. */
  room: number
  measure: Measure
}): { placed: (PlacedLabel | undefined)[]; crowded: number } {
  const { direction, boxes, lines, width, measure } = input
  const row = direction === 'row'
  const taken = [...input.taken]
  let crowded = 0
  const placed = input.labels.map(label => {
    const free = (rect: Rect) =>
      rect.left >= 0 && rect.left + rect.width <= width && !boxes.some(b => hits(rect, b, 3)) && !taken.some(t => hits(rect, t, 3)) && !lines.some(p => inside(p, rect, 4))
    const widths = [...new Set([input.room, Math.min(input.room, 100), Math.min(input.room, 70)])]
    let first: PlacedLabel | undefined
    for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8, 0.1, 0.9]) {
      const [p, before, after] = [label.at(t), label.at(Math.max(0, t - 0.02)), label.at(Math.min(1, t + 0.02))]
      const len = Math.hypot(after.x - before.x, after.y - before.y) || 1
      // The curve's normal, pointing right in a column and up in a row, then the other way.
      const n0 = { x: -(after.y - before.y) / len, y: (after.x - before.x) / len }
      const n = (row ? n0.y > 0 : n0.x < 0) ? { x: -n0.x, y: -n0.y } : n0
      for (const side of [1, -1]) {
        for (const w of widths) {
          const text = wrapLabel(label.text, w, measure)
          const [bw, bh] = [Math.max(...text.map(measure)), text.length * LABEL_LINE_H]
          // Far enough along the normal that the block's near edge is `LABEL_GAP` from the curve.
          const away = LABEL_GAP + Math.abs(n.x) * (bw / 2) + Math.abs(n.y) * (bh / 2)
          const centre = { x: p.x + side * n.x * away, y: p.y + side * n.y * away }
          const rect: Rect = { left: centre.x - bw / 2, top: centre.y - bh / 2, width: bw, height: bh }
          const sideways = Math.abs(n.x) > 0.9
          const result: PlacedLabel = {
            lines: text,
            rect,
            x: sideways ? (side * n.x > 0 ? rect.left : rect.left + bw) : centre.x,
            y: rect.top + LABEL_LINE_H / 2,
            anchor: sideways ? (side * n.x > 0 ? 'start' : 'end') : 'middle',
          }
          first ??= result
          if (free(rect)) {
            taken.push(rect)
            return result
          }
        }
      }
    }
    crowded++
    taken.push(first!.rect)
    return first
  })
  return { placed, crowded }
}

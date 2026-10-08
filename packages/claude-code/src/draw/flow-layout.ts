/**
 * Pure layout for the Flow drawer: no elements, only numbers and strings, so the
 * hard parts (layering, cycles, routing, fitting) are unit-tested without an engine.
 */
import type { FlowLink, FlowStep } from '@intui/core'

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

export type Edge = { from: number; to: number; label?: string }

export type Analysis = {
  /** Edges that go forward in the layering, duplicates merged. */
  edges: Edge[]
  /** Edges that close a cycle; they are listed, not drawn as arrows. */
  back: Edge[]
  /** Step indexes per layer, in drawing order. */
  layers: number[][]
  layerOf: number[]
}

/** Resolves links to step indexes. No links means each step leads to the next. Unknown ids are skipped. */
export function resolveEdges(steps: readonly FlowStep[], links: readonly FlowLink[]): Edge[] {
  if (links.length === 0) return steps.slice(1).map((_, i) => ({ from: i, to: i + 1 }))
  const index = new Map(steps.map((step, i) => [step.id, i]))
  const merged = new Map<string, Edge>()
  for (const link of links) {
    const from = index.get(link.from)
    const to = index.get(link.to)
    if (from === undefined || to === undefined) continue
    const key = `${from}>${to}`
    const seen = merged.get(key)
    if (!seen) merged.set(key, { from, to, ...(link.label ? { label: link.label } : {}) })
    else if (link.label && seen.label !== link.label) seen.label = seen.label ? `${seen.label} / ${link.label}` : link.label
  }
  return [...merged.values()]
}

/** Splits edges into forward and back edges by a depth-first walk from the first step, so cycles never hang. */
export function breakCycles(count: number, edges: readonly Edge[]): { forward: Edge[]; back: Edge[] } {
  const out: Edge[][] = Array.from({ length: count }, () => [])
  for (const edge of edges) out[edge.from]!.push(edge)
  const state = new Array<0 | 1 | 2>(count).fill(0)
  const back = new Set<Edge>()
  const visit = (node: number) => {
    state[node] = 1
    for (const edge of out[node]!) {
      if (state[edge.to] === 1) back.add(edge)
      else if (state[edge.to] === 0) visit(edge.to)
    }
    state[node] = 2
  }
  for (let node = 0; node < count; node++) if (state[node] === 0) visit(node)
  return { forward: edges.filter(edge => !back.has(edge)), back: edges.filter(edge => back.has(edge)) }
}

/** Layers a flow: longest path from the sources, cycles broken, order within a layer by neighbours' order. */
export function analyse(steps: readonly FlowStep[], links: readonly FlowLink[]): Analysis {
  const count = steps.length
  const { forward, back } = breakCycles(count, resolveEdges(steps, links))
  const layerOf = new Array<number>(count).fill(0)
  const indegree = new Array<number>(count).fill(0)
  for (const edge of forward) indegree[edge.to]!++
  const queue = [...Array(count).keys()].filter(node => indegree[node] === 0)
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head]!
    for (const edge of forward.filter(e => e.from === node)) {
      layerOf[edge.to] = Math.max(layerOf[edge.to]!, layerOf[node]! + 1)
      if (--indegree[edge.to]! === 0) queue.push(edge.to)
    }
  }
  const depth = Math.max(...layerOf)
  const layers: number[][] = Array.from({ length: depth + 1 }, () => [])
  const position = new Array<number>(count).fill(0)
  layers.forEach((_, l) => {
    const members = [...Array(count).keys()].filter(node => layerOf[node] === l)
    const desire = (node: number) => {
      const before = forward.filter(e => e.to === node).map(e => position[e.from]!)
      return before.length ? before.reduce((a, b) => a + b, 0) / before.length : 0
    }
    members.sort((a, b) => desire(a) - desire(b) || a - b)
    members.forEach((node, i) => (position[node] = i))
    layers[l] = members
  })
  return { edges: forward, back, layers, layerOf }
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

type Cell = { ch: string; kind: CellKind; mask: number; edges: Set<number> }

/** Gutter widths and boxes per cap are tried widest first; the first layout that fits and draws cleanly wins. */
const GRID_CAPS = [24, 16, 12]

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

function tryGrid(steps: readonly FlowStep[], analysis: Analysis, notes: string[][], cap: number, columns: number): Run[][] | undefined {
  const { layers, edges } = analysis
  const lines = steps.map((step, i) => boxLines(step, notes[i]!, cap))
  const width = lines.map(boxWidth)
  const height = lines.map(l => l.length + 2)
  const layerWidth = layers.map(layer => Math.max(...layer.map(i => width[i]!)))
  const gutter = layers.slice(1).map((_, l) => {
    const labels = edges.filter(e => analysis.layerOf[e.from] === l).map(e => [...(e.label ?? '')].length)
    return Math.max(5, Math.max(0, ...labels) + 5)
  })
  const left: number[] = []
  let x = 0
  layers.forEach((_, l) => {
    left.push(x)
    x += layerWidth[l]! + (gutter[l] ?? 0)
  })
  if (x > columns) return undefined

  // Vertical placement: stack each layer, pulling a step toward its predecessors, then centre steps on their successors.
  const top = new Array<number>(steps.length).fill(0)
  const mid = (i: number) => top[i]! + 1
  layers.forEach(layer => {
    let next = 0
    for (const i of layer) {
      const before = edges.filter(e => e.to === i).map(e => mid(e.from))
      const want = before.length ? Math.round(before.reduce((a, b) => a + b, 0) / before.length) - 1 : 0
      top[i] = Math.max(next, want)
      next = top[i]! + height[i]! + 1
    }
  })
  for (let l = layers.length - 2; l >= 0; l--) {
    let next = 0
    for (const i of layers[l]!) {
      const after = edges.filter(e => e.from === i).map(e => mid(e.to))
      const want = after.length ? Math.round(after.reduce((a, b) => a + b, 0) / after.length) - 1 : 0
      top[i] = Math.max(next, want, after.length ? 0 : top[i]!)
      next = top[i]! + height[i]! + 1
    }
  }
  const shift = Math.min(...top)
  const rows = Math.max(...steps.map((_, i) => top[i]! - shift + height[i]!))
  const cells: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: x }, () => ({ ch: ' ', kind: 'blank' as CellKind, mask: 0, edges: new Set<number>() })),
  )
  const put = (row: number, col: number, ch: string, kind: CellKind) => {
    const cell = cells[row]?.[col]
    if (cell) Object.assign(cell, { ch, kind })
  }

  layers.forEach((layer, l) => {
    for (const i of layer) {
      const y = top[i]! - shift
      const w = width[i]!
      const x0 = left[l]!
      put(y, x0, '╭', 'border')
      put(y, x0 + w - 1, '╮', 'border')
      put(y + height[i]! - 1, x0, '╰', 'border')
      put(y + height[i]! - 1, x0 + w - 1, '╯', 'border')
      for (let c = 1; c < w - 1; c++) {
        put(y, x0 + c, '─', 'border')
        put(y + height[i]! - 1, x0 + c, '─', 'border')
      }
      lines[i]!.forEach((line, k) => {
        put(y + 1 + k, x0, '│', 'border')
        put(y + 1 + k, x0 + w - 1, '│', 'border')
        ;[...line.text].forEach((ch, c) => put(y + 1 + k, x0 + 2 + c, ch, line.kind))
      })
    }
  })

  // Routing: each edge runs from its source's first line, along a vertical trunk, to its target's first line.
  const outdeg = (i: number) => edges.filter(e => e.from === i).length
  const indeg = (i: number) => edges.filter(e => e.to === i).length
  const link = (id: number, row: number, a: number, b: number, vertical: boolean) => {
    for (let k = Math.min(a, b); k <= Math.max(a, b); k++) {
      const r = vertical ? k : row
      const c = vertical ? row : k
      const cell = cells[r]?.[c]
      if (!cell) return false
      for (const other of cell.edges) {
        const o = edges[other]!
        const e = edges[id]!
        if (other !== id && o.from !== e.from && o.to !== e.to) return false
      }
      cell.edges.add(id)
      if (vertical) cell.mask |= (k > Math.min(a, b) ? N : 0) | (k < Math.max(a, b) ? S : 0)
      else cell.mask |= (k > Math.min(a, b) ? W : 0) | (k < Math.max(a, b) ? E : 0)
    }
    return true
  }
  const labels: { row: number; col: number; text: string }[] = []
  for (let id = 0; id < edges.length; id++) {
    const edge = edges[id]!
    const l = analysis.layerOf[edge.from]!
    const ys = top[edge.from]! - shift + 1
    const yt = top[edge.to]! - shift + 1
    const sourceRight = left[l]! + width[edge.from]!
    const gx = left[l]! + layerWidth[l]!
    const gw = gutter[l]!
    const arrowCol = gx + gw - 1
    const trunkAtTarget = outdeg(edge.from) === 1 && indeg(edge.to) > 1
    const trunk = trunkAtTarget ? gx + gw - 3 : gx + 1
    if (!link(id, ys, sourceRight, trunk, false)) return undefined
    if (ys !== yt && !link(id, trunk, ys, yt, true)) return undefined
    if (!link(id, yt, trunk, arrowCol, false)) return undefined
    if (edge.label) labels.push(trunkAtTarget ? { row: ys - 1, col: gx + 1, text: edge.label } : { row: yt - 1, col: gx + 3, text: edge.label })
  }
  for (const row of cells) for (const cell of row) if (cell.mask) Object.assign(cell, { ch: GLYPH[cell.mask] ?? '─', kind: 'arrow' })
  for (const edge of edges) {
    const l = analysis.layerOf[edge.from]!
    put(top[edge.to]! - shift + 1, left[l]! + layerWidth[l]! + gutter[l]! - 1, '→', 'arrow')
  }
  for (const label of labels) {
    for (const [k, ch] of [...label.text].entries()) {
      const cell = cells[label.row]?.[label.col + k]
      if (!cell || cell.kind !== 'blank') return undefined
      Object.assign(cell, { ch, kind: 'edge' })
    }
  }
  return cells.map(row => toRuns(row))
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

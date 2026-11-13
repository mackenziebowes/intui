/**
 * Works out a Flow's structure before it is drawn: links resolved to step indexes, cycles
 * broken into forward and back edges by a depth-first walk, and steps put in layers. It
 * always finishes, whatever the links.
 */
import type { FlowLink, FlowStep } from '@intui/core'

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

/** Where a route meets a box's side: the `index`th of `of` places along that side, so routes never share a point. */
export type Slot = { index: number; of: number }

/** A back edge drawn as an arrow in a lane. */
export type Route = {
  from: number
  to: number
  label?: string
  /** 0 is the lane nearest the boxes. */
  lane: number
  fromSlot: Slot
  toSlot: Slot
}

export type BackPlan = {
  /** Back edges drawn as arrows. */
  routes: Route[]
  /** Back edges that did not get a lane (not at the edge of their layer, or no room); the drawer writes them as `↩` text. */
  noted: Edge[]
  /** Lanes used. */
  lanes: number
  /** Pairs of routes whose spans partly overlap, so their lines must cross once. Reported, never hidden. */
  crossings: number
}

/** What the drawer can spare for lanes, in its own units (pixels or cells). */
export type BackRoom = {
  /** Distance between lanes. */
  lanePitch: number
  /** Width a label beside the lanes needs. */
  labelRoom: number
  /** Space beyond the boxes that lanes and labels may use. */
  available: number
  /** Most lanes drawn; routes past it fall back to notes. */
  maxLanes?: number
  /** `layers`: a route needs both ends last in their layer, and its span is in layers. `flat`: every step is its own line, and its span is in lines. */
  order?: 'layers' | 'flat'
}

/**
 * Decides which back edges are drawn as arrows and in which lane. Spans are laid out by interval
 * colouring, shortest first, so a nested loop sits inside the loop around it. A route that
 * interleaves another crosses it once; that is counted. Where routes meet a box they take
 * separate places along its side, ordered so that nested routes do not cross there.
 */
export function planBack(analysis: Analysis, room: BackRoom): BackPlan {
  const flat = room.order === 'flat'
  const position = new Map(analysis.layers.flat().map((step, k) => [step, k]))
  const lastInLayer = new Set(analysis.layers.map(layer => layer[layer.length - 1]!))
  const at = (step: number) => (flat ? position.get(step)! : analysis.layerOf[step]!)
  const eligible = (edge: Edge) => edge.from !== edge.to && (flat || (lastInLayer.has(edge.from) && lastInLayer.has(edge.to)))
  const noted: Edge[] = analysis.back.filter(edge => !eligible(edge))
  const span = (edge: Edge) => [Math.min(at(edge.from), at(edge.to)), Math.max(at(edge.from), at(edge.to))] as const
  const candidates = analysis.back
    .filter(eligible)
    .sort((a, b) => span(a)[1] - span(a)[0] - (span(b)[1] - span(b)[0]) || span(a)[0] - span(b)[0] || a.from - b.from)
  const laneOf = new Map<Edge, number>()
  for (const edge of candidates) {
    const taken = new Set(candidates.filter(o => laneOf.has(o) && overlaps(span(o), span(edge))).map(o => laneOf.get(o)!))
    let lane = 0
    while (taken.has(lane)) lane++
    laneOf.set(edge, lane)
  }
  // Lanes cost room; the outermost go first when there is not enough.
  const allowed = Math.min(room.maxLanes ?? Infinity, Math.floor((room.available - room.labelRoom) / room.lanePitch))
  const kept = candidates.filter(edge => {
    const ok = laneOf.get(edge)! < allowed
    if (!ok) noted.push(edge)
    return ok
  })
  noted.sort((a, b) => analysis.back.indexOf(a) - analysis.back.indexOf(b))

  // Places along each box's side: routes arriving first (outer lane on top), then routes leaving (inner lane first).
  const routes: Route[] = kept.map(edge => ({
    from: edge.from,
    to: edge.to,
    ...(edge.label ? { label: edge.label } : {}),
    lane: laneOf.get(edge)!,
    fromSlot: { index: 0, of: 1 },
    toSlot: { index: 0, of: 1 },
  }))
  const touching = (step: number) => ({
    arriving: routes.filter(r => r.to === step).sort((a, b) => b.lane - a.lane),
    leaving: routes.filter(r => r.from === step).sort((a, b) => a.lane - b.lane),
  })
  const steps = new Set(routes.flatMap(r => [r.from, r.to]))
  for (const step of steps) {
    const { arriving, leaving } = touching(step)
    const of = arriving.length + leaving.length
    arriving.forEach((r, k) => (r.toSlot = { index: k, of }))
    leaving.forEach((r, k) => (r.fromSlot = { index: arriving.length + k, of }))
  }
  let crossings = 0
  for (let i = 0; i < routes.length; i++)
    for (let j = i + 1; j < routes.length; j++) {
      const [a, b] = [spanOf(routes[i]!, at), spanOf(routes[j]!, at)]
      if (overlaps(a, b) && !(within(a, b) || within(b, a))) crossings++
    }
  return { routes, noted, lanes: routes.reduce((n, r) => Math.max(n, r.lane + 1), 0), crossings }
}

type Span = readonly [number, number]
const spanOf = (r: { from: number; to: number }, at: (step: number) => number): Span => [Math.min(at(r.from), at(r.to)), Math.max(at(r.from), at(r.to))]
const overlaps = (a: Span, b: Span) => a[0] <= b[1] && b[0] <= a[1]
const within = (inner: Span, outer: Span) => inner[0] >= outer[0] && inner[1] <= outer[1]

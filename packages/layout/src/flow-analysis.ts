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

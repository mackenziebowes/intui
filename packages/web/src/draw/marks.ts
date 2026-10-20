/**
 * The browser drawers for Marks and Ladder (proposal 005): one glyph per thing counted, so a count of
 * seven looks like seven. The first kind is drawn filled, the second hollow, the third as a ring; a
 * state's tone colours the glyph. Above THIN marks a field is a count in text and a band instead of
 * glyphs (points are for small numbers). Nothing needs a hover: details are listed under the row. Glyphs
 * may drift a little, and are still under prefers-reduced-motion (style.css).
 */
import { haloText, kindCounts, keyText, stateCounts, type LadderProps, type Mark, type MarkKind, type MarkState, type MarksProps } from '@intui/core'
import type { Dom, DrawContext, Drawer } from '../dom'
import { asText } from './chart'

/** Above this many marks in one field, glyphs become a count and a band. */
const THIN = 30
/** Up to this many visits on a step line are drawn as one spark each. */
const SPARKS = 30
const SHAPES = ['filled', 'hollow', 'ring'] as const

type Look = { kinds: MarkKind[]; states: MarkState[] }

function glyph(dom: Dom, mark: Mark, look: Look, i: number): HTMLElement {
  const state = look.states.find(s => s.id === mark.state)
  const shape = SHAPES[Math.max(0, look.kinds.findIndex(k => k.id === mark.kind))] ?? 'ring'
  return dom.el('li', { class: `intui-mark intui-tone-${state?.tone ?? 'neutral'}`, 'data-shape': shape, 'data-state': mark.state, style: `--i:${i}`, title: mark.detail ?? state?.label }, )
}

/** A field of marks: glyphs when few, otherwise the count in text and a band split by state (or by kind). */
function field(dom: Dom, marks: Mark[], look: Look, count?: string): HTMLElement {
  const spoken = count ?? [kindCounts(marks, look.kinds), stateCounts(marks, look.states)].filter(Boolean).join(': ')
  if (count !== undefined || marks.length > THIN) {
    const out = dom.el('div', { class: 'intui-marks-field intui-marks-field--count' }, dom.el('span', { class: 'intui-marks-count' }, count ?? kindCounts(marks, look.kinds)))
    if (marks.length > 0) {
      const parts = look.states.length ? look.states.map(s => ({ s, n: marks.filter(m => m.state === s.id).length })).filter(p => p.n > 0) : []
      const rest = marks.length - parts.reduce((a, p) => a + p.n, 0)
      const band = dom.el('span', { class: 'intui-band', 'aria-hidden': 'true' })
      for (const p of parts) band.append(dom.el('span', { class: `intui-band-part intui-tone-${p.s.tone}`, style: `flex-grow:${p.n}`, title: `${p.n} ${p.s.label}` }))
      if (rest > 0 || parts.length === 0) band.append(dom.el('span', { class: 'intui-band-part intui-tone-neutral', style: `flex-grow:${rest || marks.length}` }))
      out.append(band)
    }
    return out
  }
  const list = dom.el('ul', { class: 'intui-marks-glyphs', 'aria-hidden': 'true' }, ...marks.map((m, i) => glyph(dom, m, look, i)))
  return dom.el('div', { class: 'intui-marks-field', role: 'img', 'aria-label': spoken || 'none' }, list)
}

function key(dom: Dom, look: Look): HTMLElement {
  const kinds = look.kinds.map((k, i) => dom.el('li', { class: 'intui-key-item' }, dom.el('span', { class: 'intui-mark', 'data-shape': SHAPES[i] ?? 'ring', 'aria-hidden': 'true' }), ` ${k.label}`))
  const states = look.states.map(s => dom.el('li', { class: 'intui-key-item' }, dom.el('span', { class: `intui-mark intui-tone-${s.tone}`, 'data-shape': 'filled', 'aria-hidden': 'true' }), ` ${s.label}`))
  return dom.el('ul', { class: 'intui-marks-key', 'aria-label': keyText(look.kinds) }, ...kinds, ...states)
}

export const marks: Drawer<MarksProps> = (props, ctx) => {
  const { dom } = ctx
  const look = { kinds: props.kinds, states: props.states }
  const figure = dom.el('figure', { class: 'intui-marks' })
  for (const row of props.rows) {
    const details = row.marks.filter(m => m.detail)
    const body =
      row.unknown !== undefined
        ? dom.el('p', { class: 'intui-unknown' }, `unknown, ${row.unknown}`)
        : dom.el(
            'div',
            { class: `intui-marks-halo${row.halo ? ' has-halo' : ''}` },
            field(dom, row.marks, look),
            row.halo ? dom.el('p', { class: 'intui-marks-halo-text' }, haloText(row.halo)) : null,
          )
    figure.append(
      dom.el(
        'div',
        { class: 'intui-marks-row' },
        dom.el('div', { class: 'intui-marks-head' }, dom.el('strong', {}, row.label), row.note ? dom.el('span', { class: 'intui-muted' }, ` ${row.note}`) : null),
        body,
        details.length ? dom.el('ul', { class: 'intui-marks-details' }, ...details.map(m => dom.el('li', {}, `${props.states.find(s => s.id === m.state)?.label ?? ''}${m.state ? ': ' : ''}${m.detail}`))) : null,
      ),
    )
  }
  figure.append(key(dom, look), asText(ctx, ctx.text(props), 'Show as text'))
  return figure
}

export const ladder: Drawer<LadderProps> = (props, ctx) => {
  const { dom } = ctx
  const look = { kinds: props.kinds, states: props.states }
  const rungOf = new Map(props.rungs.flatMap((r, i) => r.nodes.map(n => [n.id, i] as const)))
  const labelOf = new Map(props.rungs.flatMap(r => r.nodes.map(n => [n.id, n.label] as const)))
  const figure = dom.el('figure', { class: 'intui-ladder' })
  const canvas = dom.el('div', { class: 'intui-ladder-canvas' })
  const lines = dom.svg('svg', { class: 'intui-ladder-lines', 'aria-hidden': 'true' })
  const sparks = dom.el('div', { class: 'intui-ladder-sparks', 'aria-hidden': 'true' })
  const stack = dom.el('ol', { class: 'intui-ladder-rungs', reversed: true })
  // Top rung first. A step is shown under the rung it climbs to, between that rung and the one below.
  for (let r = props.rungs.length - 1; r >= 0; r--) {
    const rung = props.rungs[r]!
    const nodes = rung.nodes.map(node => {
      const body =
        node.unknown !== undefined
          ? dom.el('p', { class: 'intui-unknown' }, `unknown, ${node.unknown}`)
          : field(dom, node.marks, look, node.count)
      return dom.el('li', { class: 'intui-ladder-node', 'data-group': node.group, 'data-node': node.id }, dom.el('strong', { class: 'intui-ladder-node-label' }, node.label), node.group ? dom.el('span', { class: 'intui-muted intui-ladder-group' }, node.group) : null, body)
    })
    const steps = props.steps.filter(s => rungOf.get(s.to) === r)
    stack.append(
      dom.el(
        'li',
        { class: 'intui-ladder-rung', style: `--depth:${props.rungs.length - 1 - r}` },
        dom.el('h4', { class: 'intui-ladder-label' }, rung.label),
        nodes.length ? dom.el('ul', { class: 'intui-ladder-nodes' }, ...nodes) : dom.el('p', { class: 'intui-muted intui-ladder-empty' }, rung.empty ?? 'none'),
        steps.length
          ? dom.el('ul', { class: 'intui-ladder-steps' }, ...steps.map(s => dom.el('li', {}, dom.el('span', { 'aria-hidden': 'true' }, '↑ '), `${labelOf.get(s.from)} → ${labelOf.get(s.to)}: ${s.label}`)))
          : null,
      ),
    )
  }
  canvas.append(stack, lines, sparks)
  figure.append(canvas, key(dom, look), asText(ctx, ctx.text(props), 'Show as text'))
  // Steps as lines from node to node, drawn from the nodes' measured places and redrawn when the width changes. A line's weight
  // never says a number: its number is the text on it. Up to SPARKS visits on a line each travel it as one spark; above that the
  // line glows steadily and the number says the rest. Under reduced motion the sparks stand still, spread along the line.
  ctx.onWidth(canvas, () => {
    const origin = canvas.getBoundingClientRect()
    lines.setAttribute('viewBox', `0 0 ${origin.width} ${origin.height}`)
    lines.setAttribute('width', String(origin.width))
    lines.setAttribute('height', String(origin.height))
    lines.replaceChildren()
    sparks.replaceChildren()
    const place = (id: string) => {
      const el = canvas.querySelector(`[data-node="${CSS.escape(id)}"]`)
      if (!el) return undefined
      const r = el.getBoundingClientRect()
      return { x: r.left - origin.left + r.width / 2, top: r.top - origin.top, bottom: r.top - origin.top + r.height }
    }
    const paths = props.steps.flatMap(step => {
      const from = place(step.from)
      const to = place(step.to)
      if (!from || !to) return []
      const bend = Math.max(14, (from.top - to.bottom) / 2)
      const d = `M${from.x.toFixed(1)} ${from.top.toFixed(1)} C${from.x.toFixed(1)} ${(from.top - bend).toFixed(1)} ${to.x.toFixed(1)} ${(to.bottom + bend).toFixed(1)} ${to.x.toFixed(1)} ${to.bottom.toFixed(1)}`
      return [{ step, d, mid: { x: (from.x + to.x) / 2, y: (from.top + to.bottom) / 2 } }]
    })
    for (const { step, d, mid } of paths) {
      const glow = (step.n ?? 0) > SPARKS
      lines.append(dom.svg('path', { class: `intui-ladder-line${glow ? ' is-glowing' : ''}`, d }, dom.svg('title', {}, step.label)))
      if (step.n !== undefined) lines.append(dom.svg('text', { class: 'intui-ladder-line-n', x: mid.x.toFixed(1), y: mid.y.toFixed(1), 'text-anchor': 'middle' }, String(step.n)))
      const count = glow ? 0 : Math.min(step.n ?? 0, SPARKS)
      for (let i = 0; i < count; i++) {
        sparks.append(dom.el('span', { class: 'intui-spark', style: `offset-path:path('${d}');--at:${((i + 0.5) / count) * 100}%;--delay:${-(i / count) * 6}s` }))
      }
    }
  })
  return figure
}

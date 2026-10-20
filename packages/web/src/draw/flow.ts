/**
 * The browser Flow drawer: steps as boxes laid out by CSS, with the arrows drawn as SVG
 * from the boxes' measured positions and redrawn when the width changes. The full list of
 * links is kept in the DOM order for screen readers.
 */
import type { FlowProps } from '@intui/core'
import type { DrawContext, Drawer } from '../dom'
import { connector, flowPlan, labelRoom, wrapLabel, type Box } from '../flow-layout'
import { asText } from './chart'

const LABEL_FONT = 12
/** Line height of a wrapped arrow label, in pixels. */
const LABEL_LINE = 14

/** Text with a break opportunity after each `.`, `/`, `-` and `_`, so a long name (`intui.schema.json`) breaks there, not mid-word. */
function breakable(dom: DrawContext['dom'], text: string): (string | Node)[] {
  return text.split(/(?<=[./_-])/).flatMap((part, i) => (i === 0 ? [part] : [dom.el('wbr'), part]))
}

/**
 * Steps are boxes laid out by CSS, one layer after another: side by side when
 * there's room, stacked when narrow. Arrows are an SVG drawn over them from the
 * boxes' measured positions, redrawn whenever the flow changes size.
 */
export const flow: Drawer<FlowProps> = (props, ctx) => {
  const { dom } = ctx
  const figure = dom.el('figure', { class: 'intui-flow' })
  const canvas = dom.el('div', { class: 'intui-flow-canvas' })
  const edgesSvg = dom.svg('svg', { class: 'intui-flow-edges', 'aria-hidden': 'true' })
  const markerId = ctx.uid('arrow')
  // At unbounded width every forward link is an arrow: the full list, for screen readers and the DOM order.
  const plan0 = flowPlan(props.steps, props.links, Infinity)
  const nameOf = (i: number) => props.steps[i]!.label

  const notes = props.steps.map(() => dom.el('span', { class: 'intui-flow-notes' }))
  const boxes = props.steps.map((step, i) => {
    const out = plan0.edges.filter(edge => edge.from === i)
    return dom.el(
      'li',
      { class: 'intui-flow-step' },
      dom.el('strong', { class: 'intui-flow-label' }, ...breakable(dom, step.label)),
      step.detail ? dom.el('span', { class: 'intui-flow-detail' }, ...breakable(dom, step.detail)) : null,
      notes[i]!,
      out.length > 0
        ? dom.el('span', { class: 'intui-sr' }, `Leads to ${out.map(edge => `${nameOf(edge.to)}${edge.label ? ` (${edge.label})` : ''}`).join(', ')}.`)
        : null,
    )
  })
  const layers = dom.el(
    'ol',
    { class: 'intui-flow-layers' },
    ...plan0.layers.map(layer => dom.el('li', { class: 'intui-flow-layer' }, dom.el('ul', {}, ...layer.map(i => boxes[i]!)))),
  )
  canvas.append(layers, edgesSvg)
  figure.append(canvas, asText(ctx, ctx.text(props), 'Show as text'))

  ctx.onWidth(canvas, width => {
    const measure = ctx.measureIn(canvas, LABEL_FONT)
    const plan = flowPlan(props.steps, props.links, width, measure)
    // In a row a label must fit its gutter, so it wraps; stacked, it has the width of the flow.
    const room = plan.direction === 'row' ? labelRoom(plan.gutter) : Math.max(120, width / 2)
    canvas.dataset.direction = plan.direction
    plan.notes.forEach((list, i) =>
      notes[i]!.replaceChildren(...list.map(note => dom.el('span', { class: `intui-flow-note intui-flow-note--${note.kind}`, 'aria-hidden': note.kind === 'link' ? 'true' : undefined }, note.text))),
    )
    canvas.style.setProperty('--intui-flow-gutter', `${plan.gutter}px`)
    // In a list, only boxes an arrow points into need room above them for it.
    boxes.forEach((box, i) => box.toggleAttribute('data-arrow-in', plan.edges.some(edge => edge.to === i)))
    const origin = canvas.getBoundingClientRect()
    const boxOf = (i: number): Box => {
      const r = boxes[i]!.getBoundingClientRect()
      return { left: r.left - origin.left, top: r.top - origin.top, width: r.width, height: r.height }
    }
    edgesSvg.setAttribute('viewBox', `0 0 ${origin.width} ${origin.height}`)
    edgesSvg.setAttribute('width', String(origin.width))
    edgesSvg.setAttribute('height', String(origin.height))
    const defs = dom.svg(
      'defs',
      {},
      dom.svg(
        'marker',
        { id: markerId, viewBox: '0 0 8 8', refX: 1, refY: 4, markerWidth: 8, markerHeight: 8, orient: 'auto-start-reverse', markerUnits: 'userSpaceOnUse' },
        dom.svg('path', { class: 'intui-flow-head', d: 'M0 0 8 4 0 8Z' }),
      ),
    )
    // Every line first, then every label, so no line is drawn over a label's halo.
    const curves = plan.edges.map(edge => ({ edge, c: connector(boxOf(edge.from), boxOf(edge.to), plan.direction, 7) }))
    const paths = [
      ...curves.map(({ c }) => dom.svg('path', { class: 'intui-flow-arrow', d: c.d, 'marker-end': `url(#${markerId})` })),
      ...curves.flatMap(({ edge, c }) =>
        edge.label
          ? [labelText(edge.label, c.label)]
          : [],
      ),
    ]
    edgesSvg.replaceChildren(defs, ...paths)

    /** One line per wrapped line, centred on the curve's midpoint. */
    function labelText(label: string, at: { x: number; y: number }) {
      const lines = wrapLabel(label, room, measure)
      const top = at.y - ((lines.length - 1) * LABEL_LINE) / 2
      return dom.svg(
        'text',
        { class: 'intui-flow-edge-label', 'text-anchor': 'middle', 'dominant-baseline': 'central' },
        ...lines.map((line, k) => dom.svg('tspan', { x: at.x.toFixed(1), y: (top + k * LABEL_LINE).toFixed(1) }, line)),
      )
    }
  })
  return figure
}

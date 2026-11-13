/**
 * The browser Flow drawer: steps as boxes laid out by CSS, with the arrows drawn as SVG
 * from the boxes' measured positions and redrawn when the width changes. The full list of
 * links, back edges included, is kept in the DOM order for screen readers. Back edges are drawn in lanes
 * beside or below the boxes, with their labels placed clear of every line.
 */
import type { FlowProps } from '@intui/core'
import type { DrawContext, Drawer } from '../dom'
import { backGeometry, sideExtent } from '../flow-back'
import { connector, flowPlan, labelRoom, type Box } from '../flow-layout'
import { placeLabels } from '../flow-labels'
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
  // Back edges are read out whether they are drawn as lanes or written as text, so the visible text is hidden from screen readers.
  const back0 = [...plan0.back.routes, ...plan0.back.noted]

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
      ...back0
        .filter(edge => edge.from === i)
        .map(edge => dom.el('span', { class: 'intui-sr' }, `Leads back to ${nameOf(edge.to)}${edge.label ? ` (${edge.label})` : ''}.`)),
    )
  })
  const layers = dom.el(
    'ol',
    { class: 'intui-flow-layers' },
    ...plan0.layers.map(layer => dom.el('li', { class: 'intui-flow-layer' }, dom.el('ul', {}, ...layer.map(i => boxes[i]!)))),
  )
  canvas.append(layers, edgesSvg)
  figure.append(canvas, asText(ctx, ctx.text(props), 'Show as text'))

  ctx.onWidth(canvas, function lay(width: number, extra = 0) {
    const measure = ctx.measureIn(canvas, LABEL_FONT)
    const plan = flowPlan(props.steps, props.links, width, measure)
    // In a row a label must fit its gutter, so it wraps; stacked, it has the width of the flow.
    const room = plan.direction === 'row' ? labelRoom(plan.gutter) : Math.max(120, width / 2)
    canvas.dataset.direction = plan.direction
    plan.notes.forEach((list, i) =>
      notes[i]!.replaceChildren(...list.map(note => dom.el('span', { class: `intui-flow-note intui-flow-note--${note.kind}`, 'aria-hidden': 'true' }, note.text))),
    )
    canvas.style.setProperty('--intui-flow-gutter', `${plan.gutter}px`)
    // Lanes need room beyond the boxes: to the right in a column or list (known now), below in a row (set once the labels are placed).
    canvas.style.setProperty('--intui-flow-lane-right', plan.direction === 'row' ? '0px' : `${sideExtent(plan.back, measure)}px`)
    canvas.style.setProperty('--intui-flow-lane-bottom', '0px')
    // Stacked layers sit further apart when a label cannot find a free spot in the gap (see below).
    canvas.style.setProperty('--intui-flow-extra-gap', `${extra}px`)
    // In a list, only boxes an arrow points into need room above them for it.
    boxes.forEach((box, i) => box.toggleAttribute('data-arrow-in', plan.edges.some(edge => edge.to === i)))
    const origin = canvas.getBoundingClientRect()
    const boxOf = (i: number): Box => {
      const r = boxes[i]!.getBoundingClientRect()
      return { left: r.left - origin.left, top: r.top - origin.top, width: r.width, height: r.height }
    }
    const geometry = backGeometry(plan.back, boxes.map((_, i) => boxOf(i)), plan.direction, measure, 7)
    if (plan.direction === 'row') canvas.style.setProperty('--intui-flow-lane-bottom', `${geometry.extent}px`)
    const size = canvas.getBoundingClientRect()
    edgesSvg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`)
    edgesSvg.setAttribute('width', String(size.width))
    edgesSvg.setAttribute('height', String(size.height))
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
    const labelled = curves.filter(({ edge }) => edge.label)
    const curvePoints = curves.flatMap(({ c }) => Array.from({ length: 161 }, (_, k) => c.at(k / 160)))
    const { placed, crowded } = placeLabels({
      labels: labelled.map(({ edge, c }) => ({ text: edge.label!, at: c.at })),
      direction: plan.direction,
      boxes: boxes.map((_, i) => boxOf(i)),
      lines: [...curvePoints, ...geometry.routes.flatMap(r => r.points)],
      taken: geometry.routes.flatMap(r => (r.label ? [r.label.rect] : [])),
      width: size.width,
      room,
      measure,
    })
    if (crowded > 0 && plan.direction !== 'row' && extra < 56) return lay(width, extra + 14)
    const paths = [
      ...curves.map(({ c }) => dom.svg('path', { class: 'intui-flow-arrow', d: c.d, 'marker-end': `url(#${markerId})` })),
      ...placed.map(label =>
        dom.svg(
          'text',
          { class: 'intui-flow-edge-label', 'text-anchor': label!.anchor, 'dominant-baseline': 'central' },
          ...label!.lines.map((line, k) => dom.svg('tspan', { x: label!.x.toFixed(1), y: (label!.y + k * LABEL_LINE).toFixed(1) }, line)),
        ),
      ),
    ]
    const lanes = geometry.routes.map(r => dom.svg('path', { class: 'intui-flow-arrow intui-flow-arrow--back', d: r.d, 'marker-end': `url(#${markerId})` }))
    const leaders = geometry.routes.flatMap(r =>
      r.label?.leader
        ? [dom.svg('path', { class: 'intui-flow-leader', d: `M${r.label.leader.from.x.toFixed(1)} ${r.label.leader.from.y.toFixed(1)} L${r.label.leader.to.x.toFixed(1)} ${r.label.leader.to.y.toFixed(1)}` })]
        : [],
    )
    const backLabels = geometry.routes.flatMap(r =>
      r.label
        ? [
            dom.svg(
              'text',
              { class: 'intui-flow-edge-label intui-flow-edge-label--back', 'text-anchor': r.label.anchor, 'dominant-baseline': 'central' },
              ...r.label.lines.map((line, k) => dom.svg('tspan', { x: r.label!.x.toFixed(1), y: (r.label!.y + k * LABEL_LINE).toFixed(1) }, line)),
            ),
          ]
        : [],
    )
    edgesSvg.replaceChildren(defs, ...paths, ...lanes, ...leaders, ...backLabels)

  })
  return figure
}

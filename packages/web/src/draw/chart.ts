import { formatNumber, type ChartProps } from '@intui/core'
import { chartLayout, pathData } from '../chart-layout'
import { buildModel, describeChart, type ChartModel } from '@intui/layout'
import type { DrawContext, Drawer } from '../dom'
import { markdownToHtml } from '../markdown'

const AXIS_FONT = 12

export const chart: Drawer<ChartProps> = (props, ctx) => {
  const { dom } = ctx
  const model = buildModel(props)
  const figure = dom.el('figure', { class: `intui-chart intui-chart--${props.kind}` })
  if (props.title) figure.append(dom.el('figcaption', { class: 'intui-chart-title' }, props.title))
  const plot = dom.el('div', { class: 'intui-chart-plot' })
  figure.append(plot)
  figure.append(legend(model, ctx))
  if (model.markers.length > 0) figure.append(markerList(model, ctx))
  figure.append(asText(ctx, ctx.text(props), 'Show data'))

  const label = describeChart(model, props.title)
  let drawn = -1
  ctx.onWidth(plot, width => {
    const w = Math.max(160, Math.floor(width))
    if (w === drawn) return
    drawn = w
    plot.replaceChildren(svgFor(model, props, w, ctx, label, plot))
  })
  return figure
}

function svgFor(model: ChartModel, props: ChartProps, width: number, ctx: DrawContext, label: string, host: Element): SVGSVGElement {
  const { dom } = ctx
  const g = chartLayout(model, width, ctx.measureIn(host, AXIS_FONT))
  const svg = dom.svg('svg', { viewBox: `0 0 ${g.width} ${g.height}`, width: g.width, height: g.height, role: 'img', 'aria-label': label })
  const t = (n: number) => Number(n.toFixed(1))
  const value = (v: number) => formatNumber(v, props.unit)

  const grid = dom.svg('g', { class: 'intui-chart-grid' })
  for (const tick of g.ticks) {
    grid.append(dom.svg('line', { x1: g.plot.left, x2: g.plot.right, y1: t(tick.y), y2: t(tick.y) }))
    grid.append(dom.svg('text', { x: g.plot.left - 8, y: t(tick.y), 'text-anchor': 'end', 'dominant-baseline': 'middle' }, tick.label))
  }
  if (g.zero !== undefined) grid.append(dom.svg('line', { class: 'intui-chart-zero', x1: g.plot.left, x2: g.plot.right, y1: t(g.zero), y2: t(g.zero) }))
  svg.append(grid)

  const markers = dom.svg('g', { class: 'intui-chart-markers' })
  for (const m of g.markers) {
    markers.append(dom.svg('line', { x1: t(m.x), x2: t(m.x), y1: g.plot.top, y2: g.plot.bottom }))
    markers.append(dom.svg('circle', { cx: t(m.x), cy: g.plot.top - 10, r: 8 }))
    markers.append(dom.svg('text', { x: t(m.x), y: g.plot.top - 10, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, m.glyph))
  }
  svg.append(markers)

  const marks = dom.svg('g', { class: 'intui-chart-marks' })
  for (const bar of g.bars) {
    const series = model.series[bar.series]!
    marks.append(
      dom.svg(
        'rect',
        { class: `intui-role-${series.role}`, x: t(bar.x), y: t(bar.y), width: t(bar.width), height: t(bar.height), rx: Math.min(2, bar.width / 4) },
        dom.svg('title', {}, `${series.label}, ${model.xs[bar.index]}: ${value(bar.value)}`),
      ),
    )
  }
  for (const line of g.lines) {
    const series = model.series[line.series]!
    const layer = dom.svg('g', { class: `intui-role-${series.role}` })
    for (const run of line.runs) layer.append(dom.svg('path', { class: 'intui-chart-line', d: pathData(run) }))
    if (model.xs.length <= 24) {
      for (const p of line.runs.flat()) {
        layer.append(
          dom.svg(
            'circle',
            { class: 'intui-chart-dot', cx: t(p.x), cy: t(p.y), r: series.role === 'primary' ? 3.5 : 2.5 },
            dom.svg('title', {}, `${series.label}, ${model.xs[p.index]}: ${value(p.value)}`),
          ),
        )
      }
    }
    marks.append(layer)
  }
  svg.append(marks)

  const axis = dom.svg('g', { class: 'intui-chart-axis' })
  axis.append(dom.svg('line', { x1: g.plot.left, x2: g.plot.right, y1: g.plot.bottom, y2: g.plot.bottom }))
  for (const l of g.xLabels) axis.append(dom.svg('text', { x: t(l.x), y: g.plot.bottom + 17, 'text-anchor': 'middle' }, l.text))
  if (g.unitCaption) axis.append(dom.svg('text', { class: 'intui-chart-unit', x: 0, y: 10 }, g.unitCaption))
  svg.append(axis)
  return svg
}

function legend(model: ChartModel, { dom }: DrawContext): HTMLElement {
  return dom.el(
    'ul',
    { class: 'intui-chart-legend' },
    ...model.series.map(s =>
      dom.el(
        'li',
        { class: `intui-role-${s.role}` },
        dom.el('span', { class: 'intui-swatch', 'aria-hidden': 'true' }),
        s.role === 'primary' ? s.label : `${s.label} `,
        s.role === 'primary' ? null : dom.el('span', { class: 'intui-muted' }, `(${s.role})`),
      ),
    ),
  )
}

function markerList(model: ChartModel, { dom }: DrawContext): HTMLElement {
  return dom.el(
    'ol',
    { class: 'intui-chart-notes' },
    ...model.markers.map(m =>
      dom.el(
        'li',
        {},
        dom.el('span', { class: 'intui-chart-glyph', 'aria-hidden': 'true' }, m.index === undefined ? '·' : String(m.n)),
        dom.el('span', {}, dom.el('strong', {}, String(m.at)), ` ${m.label}`, m.index === undefined ? dom.el('span', { class: 'intui-muted' }, ' (not on the chart: no matching x)') : null),
      ),
    ),
  )
}

/** A disclosure holding a component's text form, for reading and copying. */
export function asText({ dom }: DrawContext, markdown: string, summary: string): HTMLElement {
  return dom.el('details', { class: 'intui-as-text' }, dom.el('summary', {}, summary), dom.html('div', { class: 'intui-text' }, markdownToHtml(markdown)))
}

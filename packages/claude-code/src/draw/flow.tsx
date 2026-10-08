import type { FlowProps, FlowStep } from '@intui/core'
import type { RenderElement } from 'claude-code'
import { defineDrawer, type DrawContext } from './drawer'
import {
  analyse,
  arrowText,
  asSequence,
  backNotes,
  boxLines,
  boxWidth,
  layoutGrid,
  linkLine,
  planSequence,
  truncate,
  type BoxLine,
  type CellKind,
} from './flow-layout'
import { ACCENT } from './theme'

/**
 * Flow draws with Box and Text on every surface. Svg would give smooth curves on
 * desktop, but Box arrows stay aligned with the transcript's own font and wrap, and
 * one code path means the terminal and the apps look the same.
 */

const textProps = (kind: CellKind) =>
  kind === 'title' ? { bold: true }
  : kind === 'detail' || kind === 'note' ? { dimColor: true }
  : kind === 'arrow' ? { color: ACCENT }
  : {}

function stepBox(ctx: DrawContext, lines: BoxLine[], key: string): RenderElement {
  const { el } = ctx
  return (
    <el.Box key={ctx.key(key)} flexDirection="column" borderStyle="round" paddingX={1} flexShrink={0}>
      {lines.map((line, i) => (
        <el.Text key={ctx.key(key, String(i))} {...textProps(line.kind)}>
          {line.text}
        </el.Text>
      ))}
    </el.Box>
  )
}

/** Steps in one line, or stacked with downward arrows when they do not fit. */
function drawSequence(props: FlowProps, order: number[], ctx: DrawContext): RenderElement {
  const { el, columns } = ctx
  const analysis = analyse(props.steps, props.links)
  const notes = backNotes(props.steps, analysis)
  const steps = order.map(i => props.steps[i]!)
  const arrows = order.slice(1).map((to, k) => analysis.edges.find(e => e.from === order[k] && e.to === to)?.label)
  const plan = planSequence(steps, order.map(i => notes[i]!), arrows, columns)
  const boxes = order.map(i => boxLines(props.steps[i]!, notes[i]!, plan.cap))
  if (plan.direction === 'row') {
    return (
      <el.Box flexDirection="row" alignItems="center">
        {boxes.flatMap((lines, k) => [
          ...(k > 0 ? [<el.Text key={ctx.key('arrow', String(k))} color={ACCENT}>{arrowText(arrows[k - 1])}</el.Text>] : []),
          stepBox(ctx, lines, `step${k}`),
        ])}
      </el.Box>
    )
  }
  return (
    <el.Box flexDirection="column">
      {boxes.flatMap((lines, k) => {
        const pad = Math.floor(boxWidth(lines) / 2)
        const label = arrows[k - 1]
        return [
          ...(k > 0
            ? [
                <el.Box key={ctx.key('arrow', String(k))} paddingLeft={pad}>
                  <el.Text color={ACCENT}>{truncate(label ? `↓ ${label}` : '↓', Math.max(1, columns - pad))}</el.Text>
                </el.Box>,
              ]
            : []),
          stepBox(ctx, lines, `step${k}`),
        ]
      })}
    </el.Box>
  )
}

/** The clear fallback: each step box, then its outgoing links. */
function drawList(props: FlowProps, ctx: DrawContext): RenderElement {
  const { el, columns } = ctx
  const analysis = analyse(props.steps, props.links)
  return (
    <el.Box flexDirection="column">
      {props.steps.map((step: FlowStep, i) => {
        const links = [
          ...analysis.edges.filter(e => e.from === i).map(edge => linkLine(props.steps, edge, false, columns - 2)),
          ...analysis.back.filter(e => e.from === i).map(edge => linkLine(props.steps, edge, true, columns - 2)),
        ]
        return (
          <el.Box key={ctx.key('step', String(i))} flexDirection="column">
            {stepBox(ctx, boxLines(step, [], Math.max(1, columns - 4)), `box${i}`)}
            {links.map((line, k) => (
              <el.Text key={ctx.key('link', String(i), String(k))} color={ACCENT}>
                {`  ${line}`}
              </el.Text>
            ))}
          </el.Box>
        )
      })}
    </el.Box>
  )
}

export const flow = defineDrawer<FlowProps>({
  type: 'Flow',
  draw: (props, ctx) => {
    const { el } = ctx
    const analysis = analyse(props.steps, props.links)
    const order = asSequence(analysis, props.steps.length)
    if (order) return drawSequence(props, order, ctx)
    const grid = layoutGrid(props.steps, analysis, ctx.columns)
    if (!grid) return drawList(props, ctx)
    return (
      <el.Box flexDirection="column">
        {grid.map((runs, row) => (
          <el.Box key={ctx.key('row', String(row))} flexDirection="row">
            {runs.length === 0 ? <el.Text>{' '}</el.Text> : runs.map((run, i) => (
              <el.Text key={ctx.key('run', String(row), String(i))} {...textProps(run.kind)}>
                {run.text}
              </el.Text>
            ))}
          </el.Box>
        ))}
      </el.Box>
    )
  },
})

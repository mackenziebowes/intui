import type { ElementTable, RenderElement, RenderSurface } from 'claude-code'
import { core, type Node, type Tree } from '@intui/core'
import type { DrawContext, Drawer } from './drawer'
import { chart } from './chart'
import { choice } from './choice'
import { flow } from './flow'
import { form } from './form'
import { group } from './group'
import { label } from './label'
import { stat } from './stat'
import { table } from './table'
import { text } from './text'

/** Every component Claude Code draws natively. Anything else falls back to its text form. */
const DRAWERS: ReadonlyMap<string, Drawer> = new Map([text, group, label, stat, table, chart, flow, choice, form].map(drawer => [drawer.type, drawer]))

export type Surroundings = {
  surface: RenderSurface
  el: ElementTable
  columns: number
  /** Names the tool call that drew the tree, so keys and events are unique to it. */
  source: string
  pressed: DrawContext['pressed']
  press: DrawContext['press']
  field: DrawContext['field']
  setField: DrawContext['setField']
  submitted: DrawContext['submitted']
  submit: DrawContext['submit']
  note: DrawContext['note']
  setNote: DrawContext['setNote']
}

/** Draws a whole tree for one transcript row. */
export function drawTree(tree: Tree, around: Surroundings): RenderElement {
  const text = (node: Node) => core.kindOf(node).toText(node, text)
  const draw = (node: Node, path: string, columns: number): RenderElement => {
    let index = 0
    const ctx: DrawContext = {
      surface: around.surface,
      el: around.el,
      columns,
      tree,
      child: (child, room = columns) => draw(child, `${path}.${index++}`, room),
      text,
      key: (...parts) => [around.source, path, ...parts].join(':'),
      pressed: around.pressed,
      press: around.press,
      field: around.field,
      setField: around.setField,
      submitted: around.submitted,
      submit: around.submit,
      note: around.note,
      setNote: around.setNote,
    }
    const drawer = DRAWERS.get(node.type)
    return drawer ? drawer.draw(node, ctx) : <around.el.Markdown text={text(node)} />
  }
  return draw(tree.root, 'root', around.columns)
}

/** The component types drawn natively here, for the docs and tests. */
export const drawnTypes = () => [...DRAWERS.keys()]

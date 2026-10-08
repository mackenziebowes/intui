import type { ElementTable, RenderElement, RenderSurface } from 'claude-code'
import { core, type Node, type Tree } from '@intui/core'
import type { DrawContext, Drawer } from './drawer'
import { group } from './group'
import { text } from './text'

/** Every component Claude Code draws natively. Anything else falls back to its text form. */
const DRAWERS: ReadonlyMap<string, Drawer> = new Map([text, group].map(drawer => [drawer.type, drawer]))

export type Surroundings = {
  surface: RenderSurface
  el: ElementTable
  columns: number
  /** Names the tool call that drew the tree, so keys and events are unique to it. */
  source: string
  pressed: (choiceId: string) => string | undefined
  press: (choiceId: string, optionId: string) => Promise<void>
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
    }
    const drawer = DRAWERS.get(node.type)
    return drawer ? drawer.draw(node, ctx) : <around.el.Markdown text={text(node)} />
  }
  return draw(tree.root, 'root', around.columns)
}

/** The component types drawn natively here, for the docs and tests. */
export const drawnTypes = () => [...DRAWERS.keys()]

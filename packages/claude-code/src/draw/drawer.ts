import type { ElementTable, RenderElement, RenderSurface } from 'claude-code'
import type { Node, Tree } from '@intui/core'

/**
 * What a drawer gets besides its props: the surface's elements, the room it has,
 * and the tree's interaction state.
 */
export type DrawContext = {
  surface: RenderSurface
  /** The surface's element constructors. Narrow on `surface` before using Raster, Svg, Input or Select. */
  el: ElementTable
  /** Width in character cells this node may use. */
  columns: number
  tree: Tree
  /** Draws a child node, with less room if a container indents it. */
  child: (node: Node, columns?: number) => RenderElement
  /** The node's Markdown text form: every drawer's fallback. */
  text: (node: Node) => string
  /** A stable key for an element, unique within the row. */
  key: (...parts: string[]) => string
  /** The option already pressed in a used-up Choice, if any. */
  pressed: (choiceId: string) => string | undefined
  /** Sends a press back to the agent. */
  press: (choiceId: string, optionId: string) => Promise<void>
}

/** Draws one kind of component on Claude Code's surfaces. */
export type Drawer<P extends Node = Node> = {
  type: P['type']
  draw: (props: P, ctx: DrawContext) => RenderElement
}

export function defineDrawer<P extends Node>(drawer: Drawer<P>): Drawer {
  return drawer as unknown as Drawer
}

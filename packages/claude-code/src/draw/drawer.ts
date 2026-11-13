/**
 * The shape of a Claude Code drawer and the context it is given: the surface's elements,
 * the width in cells, the tree's interaction state (what was pressed, typed or submitted)
 * and the calls that send a press or a submit back to the agent. `defineDrawer` makes a
 * drawer for one component kind.
 */
import type { ElementTable, RenderElement, RenderSurface } from 'claude-code'
import type { Answer, ControlState, FieldValue, Node, Tree } from '@intui/core'

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
  /**
   * Says this node was drawn as its text form though the surface has a drawer for it (too narrow, or the
   * surface can't do it). Only collects: the plugin writes the count after drawing, never while drawing.
   */
  fellBack: (node: Node) => void
  /** A stable key for an element, unique within the row. */
  key: (...parts: string[]) => string
  /** A Choice or Form's state in core's control machine (hub #1956). */
  control: (controlId: string) => ControlState
  /** Sends the person's answer into the machine; the plugin carries out what it says. Never throws. */
  answer: (controlId: string, answer: Answer) => Promise<void>
  /** A Form field's current value, as typed or selected so far. */
  field: (formId: string, fieldId: string) => FieldValue | undefined
  setField: (formId: string, fieldId: string, value: FieldValue) => Promise<void>
  /**
   * A short note shown beside a field the person is still typing in, such as why a number was refused.
   * Kept in plugin state, so it survives a reload and setting it redraws the row.
   * Write it from a handler, never while drawing.
   */
  note: (id: string) => string | undefined
  setNote: (id: string, text: string | undefined) => Promise<void>
}

/** Draws one kind of component on Claude Code's surfaces. */
export type Drawer<P extends Node = Node> = {
  type: P['type']
  draw: (props: P, ctx: DrawContext) => RenderElement
}

export function defineDrawer<P extends Node>(drawer: Drawer<P>): Drawer {
  return drawer as unknown as Drawer
}

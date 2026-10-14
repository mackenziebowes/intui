/**
 * The Text drawer for Claude Code: the component's Markdown, drawn by the engine's own
 * Markdown element.
 */
import type { TextProps } from '@intui/core'
import { defineDrawer } from './drawer'

export const text = defineDrawer<TextProps>({
  type: 'Text',
  draw: (props, { el }) => <el.Markdown text={props.markdown} />,
})

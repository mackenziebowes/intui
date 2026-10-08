import type { TableProps } from '@intui/core'
import { defineDrawer } from './drawer'

// Stub: draws the text form until the real drawer lands.
export const table = defineDrawer<TableProps>({
  type: 'Table',
  draw: (props, { el, text }) => <el.Markdown text={text(props)} />,
})

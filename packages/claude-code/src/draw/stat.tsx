import type { StatProps } from '@intui/core'
import { defineDrawer } from './drawer'

// Stub: draws the text form until the real drawer lands.
export const stat = defineDrawer<StatProps>({
  type: 'Stat',
  draw: (props, { el, text }) => <el.Markdown text={text(props)} />,
})

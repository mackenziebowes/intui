import type { FlowProps } from '@intui/core'
import { defineDrawer } from './drawer'

// Stub: draws the text form until the real drawer lands.
export const flow = defineDrawer<FlowProps>({
  type: 'Flow',
  draw: (props, { el, text }) => <el.Markdown text={text(props)} />,
})

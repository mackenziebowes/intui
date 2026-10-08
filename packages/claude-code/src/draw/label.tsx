import type { LabelProps } from '@intui/core'
import { defineDrawer } from './drawer'

// Stub: draws the text form until the real drawer lands.
export const label = defineDrawer<LabelProps>({
  type: 'Label',
  draw: (props, { el, text }) => <el.Markdown text={text(props)} />,
})

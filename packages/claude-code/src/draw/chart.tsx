import type { ChartProps } from '@intui/core'
import { defineDrawer } from './drawer'

// Stub: draws the text form until the real drawer lands.
export const chart = defineDrawer<ChartProps>({
  type: 'Chart',
  draw: (props, { el, text }) => <el.Markdown text={text(props)} />,
})

import type { ChoiceProps } from '@intui/core'
import { defineDrawer } from './drawer'

// Stub: draws the text form until the real drawer lands.
export const choice = defineDrawer<ChoiceProps>({
  type: 'Choice',
  draw: (props, { el, text }) => <el.Markdown text={text(props)} />,
})

import type { FormProps } from '@intui/core'
import { defineDrawer } from './drawer'

// Stub: draws the text form until the real drawer lands.
export const form = defineDrawer<FormProps>({
  type: 'Form',
  draw: (props, { el, text }) => <el.Markdown text={text(props)} />,
})

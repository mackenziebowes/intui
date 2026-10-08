import type { TextProps } from '@intui/core'
import { defineDrawer } from './drawer'

export const text = defineDrawer<TextProps>({
  type: 'Text',
  draw: (props, { el }) => <el.Markdown text={props.markdown} />,
})

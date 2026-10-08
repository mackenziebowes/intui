import type { LabelProps } from '@intui/core'
import { defineDrawer } from './drawer'
import { tagText } from './label-shape'
import { isDim, TONE_COLOR } from './theme'

export const label = defineDrawer<LabelProps>({
  type: 'Label',
  draw: (props, { el, columns }) => (
    <el.Text color={TONE_COLOR[props.tone]} dimColor={isDim(props.tone)} bold={props.tone !== 'muted'} wrap="truncate-end">
      {tagText(props.text, columns)}
    </el.Text>
  ),
})

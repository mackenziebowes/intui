import type { StatProps } from '@intui/core'
import { defineDrawer } from './drawer'
import { statLines } from './stat-shape'
import { isDim, TONE_COLOR } from './theme'

export const stat = defineDrawer<StatProps>({
  type: 'Stat',
  draw: (props, { el, columns }) => {
    const lines = statLines(props, columns)
    return (
      <el.Box flexDirection="column">
        <el.Text dimColor wrap="truncate-end">{lines.label}</el.Text>
        <el.Text bold wrap="truncate-end">{lines.value}</el.Text>
        {lines.change ? (
          <el.Text color={TONE_COLOR[props.tone]} dimColor={isDim(props.tone)} wrap="truncate-end">{lines.change}</el.Text>
        ) : null}
      </el.Box>
    )
  },
})

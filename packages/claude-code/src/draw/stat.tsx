/**
 * The Stat drawer for Claude Code: a label, a big value, an optional change and an optional
 * note (the reason in words, wrapped so none of it is lost), coloured by tone, as laid out by stat-shape.
 */
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
        {props.note ? (
          <el.Text color={props.tone === 'neutral' ? undefined : TONE_COLOR[props.tone]} dimColor={props.tone === 'neutral' || isDim(props.tone)} wrap="wrap">{props.note}</el.Text>
        ) : null}
      </el.Box>
    )
  },
})

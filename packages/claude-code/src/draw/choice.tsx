/**
 * The Choice drawer for Claude Code: a row of buttons that sends a press back to the
 * agent, and, once used, only the chosen option. A refused answer keeps the buttons and
 * says why in one line. The control's state comes from core's machine; nothing here decides.
 */
import type { ChoiceProps } from '@intui/core'
import { defineDrawer } from './drawer'
import { choiceView, variantOf } from './choice-view'

// Digit hotkeys are left off on purpose: they only fire while a band or pane holds
// the keyboard, never in a transcript row, and two rows with the same digit clash.
export const choice = defineDrawer<ChoiceProps>({
  type: 'Choice',
  draw: (props, ctx) => {
    const { el, key } = ctx
    const view = choiceView(props, ctx.control(props.id))
    const prompt = props.prompt ? <el.Markdown text={props.prompt} /> : null
    if (view.kind === 'used') {
      return (
        <el.Box flexDirection="column">
          {prompt}
          <el.Text dimColor>{view.chosen}</el.Text>
        </el.Box>
      )
    }
    return (
      <el.Box flexDirection="column">
        {prompt}
        <el.Box flexDirection="row" gap={1} flexWrap="wrap">
          {props.options.map(option => (
            <el.Button
              key={key('option', option.id)}
              label={option.label}
              variant={variantOf(option.emphasis)}
              onPress={() => ctx.answer(props.id, { kind: 'press', option: option.id })}
            />
          ))}
        </el.Box>
        {view.refused ? <el.Text color="red">{`Could not send that: ${view.refused}`}</el.Text> : null}
      </el.Box>
    )
  },
})

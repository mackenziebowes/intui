import type { ChoiceProps } from '@intui/core'
import { defineDrawer } from './drawer'
import { choiceView, describeError, variantOf } from './choice-view'

/** The last failed press per button key, so the next draw can show why nothing happened. */
const failures = new Map<string, string>()

// Digit hotkeys are left off on purpose: they only fire while a band or pane holds
// the keyboard, never in a transcript row, and two rows with the same digit clash.
export const choice = defineDrawer<ChoiceProps>({
  type: 'Choice',
  draw: (props, ctx) => {
    const { el, key } = ctx
    const view = choiceView(props, ctx.pressed(props.id))
    const prompt = props.prompt ? <el.Markdown text={props.prompt} /> : null
    if (view.kind === 'used') {
      return (
        <el.Box flexDirection="column">
          {prompt}
          <el.Text dimColor>{view.chosen}</el.Text>
        </el.Box>
      )
    }
    const failed = failures.get(key('failed'))
    return (
      <el.Box flexDirection="column">
        {prompt}
        <el.Box flexDirection="row" gap={1} flexWrap="wrap">
          {props.options.map(option => (
            <el.Button
              key={key('option', option.id)}
              label={option.label}
              variant={variantOf(option.emphasis)}
              onPress={async () => {
                try {
                  failures.delete(key('failed'))
                  await ctx.press(props.id, option.id)
                } catch (error) {
                  failures.set(key('failed'), describeError(error))
                }
              }}
            />
          ))}
        </el.Box>
        {failed ? <el.Text color="red">{`Could not send that: ${failed}`}</el.Text> : null}
      </el.Box>
    )
  },
})

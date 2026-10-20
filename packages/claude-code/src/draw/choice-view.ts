/**
 * What a Choice shows in Claude Code: its option buttons, or, once a `once` choice is used
 * up, only the option that was chosen, read from the control's state in core's machine.
 */
import type { ChoiceProps, ControlState } from '@intui/core'

export type ChoiceView =
  | { kind: 'open'; refused?: string }
  | { kind: 'used'; chosen: string }

/** What a Choice shows for its state: its buttons (with why the last answer didn't go), or, once used up, the option chosen. */
export function choiceView(props: ChoiceProps, state: ControlState): ChoiceView {
  if (state.kind === 'refused') return { kind: 'open', refused: state.why }
  if (state.kind !== 'sent' || props.repeat === 'many' || state.answer.kind !== 'press') return { kind: 'open' }
  const pressed = state.answer.option
  return { kind: 'used', chosen: `✓ ${props.options.find(o => o.id === pressed)?.label ?? pressed}` }
}

/** The Button variant for an option: only `emphasis: "primary"` stands out. */
export const variantOf = (emphasis: 'primary' | undefined) => (emphasis === 'primary' ? ('primary' as const) : undefined)

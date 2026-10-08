import type { ChoiceProps } from '@intui/core'

export type ChoiceView =
  | { kind: 'open' }
  | { kind: 'used'; chosen: string }

/** What a Choice shows: its buttons, or (once used up) the option that was chosen. */
export function choiceView(props: ChoiceProps, pressed: string | undefined): ChoiceView {
  if (pressed === undefined || props.repeat === 'many') return { kind: 'open' }
  const option = props.options.find(o => o.id === pressed)
  return { kind: 'used', chosen: `✓ ${option?.label ?? pressed}` }
}

/** The Button variant for an option: only `emphasis: "primary"` stands out. */
export const variantOf = (emphasis: 'primary' | undefined) => (emphasis === 'primary' ? ('primary' as const) : undefined)

/** A short, one-line reason from anything a handler caught. */
export const describeError = (error: unknown) => (error instanceof Error ? error.message : String(error)).split('\n')[0]!.slice(0, 160)

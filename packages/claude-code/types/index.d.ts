/** Which option was pressed in each used-up Choice, keyed `<tool_use_id>:<choice id>`. Read once at session start and rewritten into `controls` (hub #1956); delete when no store holds it. */
export type IntuiUsed = Record<string, string>

/**
 * Each Choice and Form in core's control machine, keyed `<tool_use_id>:<control id>`. Written out here because the
 * plugin's contract can't import; register.tsx stores core's ControlState in it, so the compiler holds the two together.
 */
export type IntuiAnswer = { readonly kind: 'press'; readonly option: string } | { readonly kind: 'submit'; readonly values: Readonly<Record<string, string | number | boolean>> }
export type IntuiControlState =
  | { readonly kind: 'readOnly' }
  | { readonly kind: 'ready' }
  | { readonly kind: 'sending'; readonly answer: IntuiAnswer }
  | { readonly kind: 'sent'; readonly answer: IntuiAnswer }
  | { readonly kind: 'refused'; readonly answer: IntuiAnswer; readonly why: string }
export type IntuiControls = Record<string, IntuiControlState>

/** Form values typed so far, keyed `<tool_use_id>:<form id>`, then by field id. */
export type IntuiForms = Record<string, Record<string, string | number | boolean>>

/** Short-lived notes a drawer shows beside a field the person is still typing in (a refused number), keyed `<tool_use_id>:<note id>`. */
export type IntuiNotes = Record<string, string>

/** Trees plugin tools returned, keyed by `tool_use_id`, newest last; capped. */
export type IntuiTrees = Record<string, { v: 1; root: unknown }>

declare module 'claude-code' {
  interface PluginState {
    intui: { used: IntuiUsed; controls: IntuiControls; forms: IntuiForms; notes: IntuiNotes; trees: IntuiTrees }
  }
}

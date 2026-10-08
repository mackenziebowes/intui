/** Which option was pressed in each used-up Choice, keyed `<tool_use_id>:<choice id>`. */
export type IntuiUsed = Record<string, string>

/** Form values typed so far, keyed `<tool_use_id>:<form id>`, then by field id. */
export type IntuiForms = Record<string, Record<string, string | number | boolean>>

/** Short-lived notes a drawer shows next to a control (a refused number, a failed press), keyed `<tool_use_id>:<note id>`. */
export type IntuiNotes = Record<string, string>

declare module 'claude-code' {
  interface PluginState {
    intui: { used: IntuiUsed; forms: IntuiForms; notes: IntuiNotes }
  }
}

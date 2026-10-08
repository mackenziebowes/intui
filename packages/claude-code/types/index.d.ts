/** Which option was pressed in each used-up Choice, keyed `<tool_use_id>:<choice id>`. */
export type IntuiUsed = Record<string, string>

/** Form values typed so far, keyed `<tool_use_id>:<form id>`, then by field id. */
export type IntuiForms = Record<string, Record<string, string | number | boolean>>

declare module 'claude-code' {
  interface PluginState {
    intui: { used: IntuiUsed; forms: IntuiForms }
  }
}

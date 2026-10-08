/** Which option was pressed in each used-up Choice, keyed `<tool_use_id>:<choice id>`. */
export type IntuiUsed = Record<string, string>

declare module 'claude-code' {
  interface PluginState {
    intui: { used: IntuiUsed }
  }
}

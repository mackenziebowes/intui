/**
 * Conformance: one real check per component through Claude Code's own engine.
 *
 * The drawer tests run against fake element tables, so they cannot say whether
 * the engine accepts what a drawer returns. Here the engine's plugin test kit
 * mounts a `ToolUse` row of `mcp__intui__show` carrying each core component's
 * example, on every surface, and the engine validates the tree the plugin drew.
 *
 * Run with `bun run conformance` (builds, then `claude plugin test`).
 */
import { expect, test } from 'claude-code/testing'
import { core } from '@intui/core'

const SURFACES = ['terminal', 'desktop', 'vscode', 'mobile'] as const

// `mount` and `drawn` reject when the engine refused the tree ("refused: <reason>")
// or when the plugin returned `next(e)` and nothing beneath it draws ("no implementation
// for ui.render"). So a pass means the engine accepted a tree our plugin drew.
//
// Components the model may not write (writer "code": Chart, Stat) are parsed by the
// ToolUse hook as the model's, so it hands them to the engine's own row. That is the
// contract: the show tool never draws them. Their drawers are only reachable from code.
for (const kind of core.kinds) {
  for (const surface of SURFACES) {
    test(`${kind.type} draws through the engine on ${surface}`, async $ => {
      const input = { v: 1, root: kind.example }
      const mount = () => $.ui.mount({
        plugin: 'intui',
        surface,
        component: 'ToolUse',
        props: {
          tool_use_id: `conformance-${kind.type}-${surface}`,
          tool: 'mcp__intui__show',
          input,
          isRunning: false,
          isErrored: false,
          isInterrupted: false,
        },
        viewport: { columns: 100, rows: 40 },
      })
      if (kind.writer === 'code') {
        await expect(mount()).rejects.toThrow(/no implementation for ui\.render/)
        return
      }
      const ui = await mount()
      expect(await ui.drawn()).toBeDefined()
      await ui.unmount()
    })
  }
}

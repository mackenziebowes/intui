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
// contract: the show tool never draws them. They draw only from a tool's result
// (the ToolResult tests below), where code wrote them.
for (const kind of core.kinds.filter(kind => kind.writer !== 'code')) {
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
      const ui = await mount()
      expect(await ui.drawn()).toBeDefined()
      await ui.unmount()
    })
  }
}

test('Chart and Stat in a show call are left to the engine', async $ => {
  for (const kind of core.kinds.filter(kind => kind.writer === 'code')) {
    await expect(
      $.ui.mount({
        plugin: 'intui',
        surface: 'terminal',
        component: 'ToolUse',
        props: { tool_use_id: `conformance-refused-${kind.type}`, tool: 'mcp__intui__show', input: { v: 1, root: kind.example }, isRunning: false, isErrored: false, isInterrupted: false },
        viewport: { columns: 100, rows: 40 },
      }),
    ).rejects.toThrow(/no implementation for ui\.render/)
  }
})

// A tool returns a tree in an envelope (TOOLS.md). Every component, Chart and Stat
// included, must draw from a ToolResult on every surface, in both result shapes.
const resultMount = ($: Parameters<Parameters<typeof test>[1]>[0], surface: (typeof SURFACES)[number], output: unknown, id: string) =>
  $.ui.mount({
    plugin: 'intui',
    surface,
    component: 'ToolResult',
    props: { tool_use_id: id, tool: 'mcp__intui__demo_chart', output, isErrored: false },
    viewport: { columns: 100, rows: 40 },
  })

// One tree holding every component, so each element table is shown to draw
// all of them from a tool result. Envelope shapes are covered by test/envelope.test.ts.
const everything = { v: 1, root: { type: 'Group', direction: 'column', children: core.kinds.map(kind => kind.example) } }

for (const surface of SURFACES) {
  test(`a tool result holding every component draws on ${surface}`, async $ => {
    const output = { content: [{ type: 'text', text: 'text form' }], structuredContent: { intui: everything }, isError: false }
    const ui = await resultMount($, surface, output, `conformance-all-${surface}`)
    expect(await ui.drawn()).toBeDefined()
    await ui.unmount()
  })
}

test('a result that is not a tree, and one with a bad node, are left to the engine', async $ => {
  await expect(resultMount($, 'terminal', 'just text', 'conformance-not-tree')).rejects.toThrow(/no implementation for ui\.render/)
  const badNode = { intui: { v: 1, root: { type: 'Stat', label: 'x' } } }
  await expect(resultMount($, 'terminal', badNode, 'conformance-bad-tree')).rejects.toThrow(/no implementation for ui\.render/)
})

test('a plugin tool result that is an object does not match its output shape (demo_chart)', async ($, on) => {
  on('session.id', () => ({ value: 'conformance-session' }))
  const stored = new Map<string, unknown>()
  on('store.get', (_$, e) => ({ value: stored.get((e as { key: string }).key) }))
  on('store.set', (_$, e) => {
    stored.set((e as { key: string }).key, (e as { value: unknown }).value)
    return { value: undefined }
  })
  const answer = (await $.tool.call({ tool: 'mcp__intui__demo_chart', input: {}, tool_use_id: 'conformance-demo' } as never)) as { result?: unknown }
  // The engine rejects a plugin tool's result unless it is a string, an array or undefined.
  // The test kit does not check this itself, so the conformance test does.
  const allowed = answer.result === undefined || typeof answer.result === 'string' || Array.isArray(answer.result)
  expect(allowed).toBe(true)
  expect(answer.result as string).toContain('Sample visitors')
  // The row draws the kept tree, not the string.
  const ui = await resultMount($, 'terminal', answer.result, 'conformance-demo')
  expect(await ui.drawn()).toBeDefined()
  await ui.unmount()
  // The tree was logged as code-written, by shape only.
  const log = stored.get('usage') as { author?: string; types: Record<string, number> }[]
  expect(log).toHaveLength(1)
  expect(log[0]?.author).toBe('code')
  expect(log[0]?.types.Chart).toBe(1)
})

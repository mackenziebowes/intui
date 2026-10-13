/**
 * Contracts, through Claude Code's own engine: what the model gets back from
 * `show`, and what a person's press or submit sends to the agent.
 *
 * The model reads `show`'s refusals and retries, so a refusal must name the
 * path, the rule and what to do. A press or submit reaches the agent as a
 * prompt, and a used-up Choice or Form must not fire twice.
 *
 * Run with `bun run conformance` (builds, then `claude plugin test`).
 */
import { expect, test, type TestBody } from 'claude-code/testing'

type Engine = Parameters<TestBody>[0]
type On = Parameters<TestBody>[1]

/** A session with a working store, and every prompt the plugin submits recorded. */
function session(on: On) {
  const stored = new Map<string, unknown>()
  const prompts: string[] = []
  on('session.id', () => ({ value: 'contracts-session' }))
  on('store.get', (_$, e) => ({ value: stored.get((e as { key: string }).key) }))
  on('store.set', (_$, e) => {
    stored.set((e as { key: string }).key, (e as { value: unknown }).value)
    return { value: undefined }
  })
  on('prompt.submit', (_$, e) => {
    const { text } = e as { text: string }
    prompts.push(text)
    return { text }
  })
  return { prompts }
}

// The engine hands a tool call's input to the plugin's hook as the event's own keys.
const show = ($: Engine, input: object, id: string) =>
  $.tool.call({ tool: 'mcp__intui__show', ...input, tool_use_id: id } as never) as Promise<{ result?: unknown; isError?: boolean; text?: string; deny?: string }>

/** The text the model sees for a refused call, whichever field the engine puts it in. */
const refusal = (answer: { text?: string; deny?: string; result?: unknown }) =>
  String(answer.deny ?? answer.text ?? answer.result ?? '')

const mountRow = ($: Engine, surface: 'terminal' | 'desktop', input: unknown, id: string) =>
  $.ui.mount({
    plugin: 'intui',
    surface,
    component: 'ToolUse',
    props: { tool_use_id: id, tool: 'mcp__intui__show', input, isRunning: false, isErrored: false, isInterrupted: false },
    viewport: { columns: 100, rows: 40 },
  })

test('show answers a good tree with its text form, which the model reads back', async ($, on) => {
  session(on)
  const answer = await show($, { v: 1, root: { type: 'Text', markdown: '**Ideas inbox**' } }, 'contracts-good')
  expect(String(answer.result)).toContain('**Ideas inbox**')
})

test('show refuses a bad tree with every problem, its path, and what to do', async ($, on) => {
  session(on)
  const bad = {
    v: 1,
    root: {
      type: 'Group',
      children: [
        { type: 'Txt', markdown: 'typo' },
        { type: 'Flow', steps: [{ id: 'a', label: 'A' }], links: [{ from: 'a', to: 'nowhere' }] },
      ],
    },
  }
  const text = refusal(await show($, bad, 'contracts-bad'))
  // The unknown component is named, with its path, and the real ones are listed.
  expect(text).toMatch(/Txt/)
  expect(text).toMatch(/children/)
  expect(text).toMatch(/Text/)
  // Both problems are in one refusal, so one retry can fix them all.
  expect(text).toMatch(/nowhere/)
})

// The result is the model's only memory of what it showed, so it must hold the content faithfully.
test("show's text form keeps a table's cells, even ones holding a pipe", async ($, on) => {
  session(on)
  const table = {
    v: 1,
    root: {
      type: 'Table',
      columns: [{ key: 'cmd', label: 'Command' }, { key: 'does', label: 'Does' }],
      rows: [{ cmd: 'ls | wc -l', does: 'counts files' }],
    },
  }
  const text = String((await show($, table, 'contracts-table')).result)
  expect(text).toContain('| Command | Does |')
  expect(text).toContain('ls \\| wc -l')
  expect(text).toContain('counts files')
})

test("a chart a tool returns reads back to the model as a table of its numbers", async ($, on) => {
  session(on)
  const answer = (await $.tool.call({ tool: 'mcp__intui__demo_chart', input: {}, tool_use_id: 'contracts-demo' } as never)) as { result?: unknown }
  const text = String(answer.result)
  expect(text).toMatch(/chart/)
  expect(text).toMatch(/\| --- \|/)
  expect(text).toMatch(/\| \w+ \| \d+/)
})

test('show refuses two Choices with the same id, since a press could not say which', async ($, on) => {
  session(on)
  const twin = { type: 'Choice', id: 'twin', options: [{ id: 'a', label: 'A' }] }
  const text = refusal(await show($, { v: 1, root: { type: 'Group', children: [twin, twin] } }, 'contracts-dup'))
  expect(text).toMatch(/twin/)
  expect(text).toMatch(/id/)
})

test('show refuses a tree with no version, and asks for one', async ($, on) => {
  session(on)
  const text = refusal(await show($, { root: { type: 'Text', markdown: 'hi' } }, 'contracts-no-v'))
  expect(text).toMatch(/\bv\b/)
})

test('the model cannot write numbers: Chart and Stat in show are refused', async ($, on) => {
  session(on)
  const stat = { v: 1, root: { type: 'Stat', label: 'Visitors', value: 120 } }
  const text = refusal(await show($, stat, 'contracts-stat'))
  expect(text).toMatch(/Stat/)
  expect(text).toMatch(/code|tool/i)
})

const choice = (repeat: 'once' | 'many') => ({
  v: 1,
  root: {
    type: 'Choice',
    id: 'next',
    prompt: 'What next?',
    options: [
      { id: 'explore', label: 'Explore', emphasis: 'primary' },
      { id: 'park', label: 'Park' },
    ],
    repeat,
  },
})

for (const surface of ['terminal', 'desktop'] as const) {
  test(`${surface}: pressing a once Choice tells the agent, then it is used up`, async ($, on) => {
    const { prompts } = session(on)
    const id = `contracts-once-${surface}`
    const ui = await mountRow($, surface, choice('once'), id)
    expect(await ui.findAll({ type: 'Button' })).toHaveLength(2)
    await ui.press({ key: `${id}:root:option:park` })
    expect(prompts).toHaveLength(1)
    expect(prompts[0]).toContain('Park')
    expect(prompts[0]).toContain(id)
    // Drawn again, as the transcript does: no buttons, the choice shown.
    await ui.redraw()
    expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
    expect(await ui.find({ text: /Park/ })).toBeDefined()
    await ui.unmount()
  })
}

test('a many Choice keeps its buttons after a press', async ($, on) => {
  const { prompts } = session(on)
  const id = 'contracts-many'
  const ui = await mountRow($, 'terminal', choice('many'), id)
  await ui.press({ key: `${id}:root:option:explore` })
  await ui.redraw()
  expect(await ui.findAll({ type: 'Button' })).toHaveLength(2)
  await ui.press({ key: `${id}:root:option:park` })
  expect(prompts).toHaveLength(2)
  await ui.unmount()
})

const form = {
  v: 1,
  root: {
    type: 'Form',
    id: 'f',
    submitLabel: 'Add',
    fields: [
      { id: 'title', label: 'Title', input: 'text', required: true },
      { id: 'qty', label: 'Qty', input: 'number' },
      { id: 'kind', label: 'Kind', input: 'select', options: ['a', 'b'] },
    ],
  },
}

test('a Form names the missing required field and sends nothing until it is filled', async ($, on) => {
  const { prompts } = session(on)
  const id = 'contracts-form-required'
  const ui = await mountRow($, 'desktop', form, id)
  expect(await ui.find({ text: /Still needed: Title/ })).toBeDefined()
  await ui.press({ key: `${id}:root:submit` })
  expect(prompts).toHaveLength(0)
  await ui.input({ key: `${id}:root:field:title`, text: 'Groceries', kind: 'change' })
  await ui.press({ key: `${id}:root:submit` })
  expect(prompts).toHaveLength(1)
  expect(prompts[0]).toContain('Groceries')
  await ui.redraw()
  expect(await ui.find({ type: 'Input' })).toBeUndefined()
  await ui.unmount()
})

test('a Form refuses a number with a typo instead of sending it empty', async ($, on) => {
  const { prompts } = session(on)
  const id = 'contracts-form-number'
  const ui = await mountRow($, 'desktop', form, id)
  await ui.input({ key: `${id}:root:field:title`, text: 'Groceries', kind: 'change' })
  await ui.input({ key: `${id}:root:field:qty`, text: '4o', kind: 'change' })
  await ui.press({ key: `${id}:root:submit` })
  expect(prompts).toHaveLength(0)
  expect(await ui.find({ text: /"4o" is not a number/ })).toBeDefined()
  await ui.input({ key: `${id}:root:field:qty`, text: '40', kind: 'change' })
  await ui.select({ key: `${id}:root:field:kind`, value: 'b' })
  await ui.press({ key: `${id}:root:submit` })
  expect(prompts).toHaveLength(1)
  expect(prompts[0]).toContain('40')
  expect(prompts[0]).toContain('b')
  await ui.unmount()
})

test('/intui counts shows and refusals by component, with no content', async ($, on) => {
  session(on)
  await show($, { v: 1, root: { type: 'Text', markdown: 'secret words' } }, 'contracts-count-1')
  await show($, { v: 1, root: { type: 'Nope' } }, 'contracts-count-2')
  const { text } = (await $.command.run({ command: 'intui' } as never)) as { text: string }
  expect(text).toMatch(/\| Refused \| 1 \(50%\) \|/)
  expect(text).toMatch(/\| Text \| 1 \|/)
  expect(text).not.toContain('secret words')
})

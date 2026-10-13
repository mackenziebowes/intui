/**
 * Runs the eval cases: asks headless Claude Code each question with the plugin
 * loaded and records what happened: every show call (drawn or refused, and why),
 * the components in it, and the reply's text. Nothing is graded. A case's
 * `expect` is a hope to read the record against, by eye, as a trend over runs
 * (the eval-design skill). Each run writes evals/results/<date>-<model>.jsonl.
 *
 *   bun evals/run.ts [--model <model>] [--only id,id] [--plugin <dir>]
 *
 * The plugin folder defaults to packages/claude-code/plugin (run `bun run plugin` first).
 */
import { join } from 'node:path'
import { parseArgs } from 'node:util'

type Case = { id: string; prompt: string; expect: { show: boolean; includes?: string[]; excludes?: string[]; note?: string } }
/** One show call: drawn, or refused with the message the model read. */
type Call = { kind: 'drawn'; types: string[] } | { kind: 'refused'; types: string[]; refusal: string }
type Record = { id: string; prompt: string; hoped: Case['expect']; calls: Call[]; reply: string; ms: number }

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: { model: { type: 'string' }, only: { type: 'string' }, plugin: { type: 'string' } },
})
const root = join(import.meta.dir, '..')
const plugin = values.plugin ?? join(root, 'packages/claude-code/plugin')
const only = values.only?.split(',')
const cases = ((await Bun.file(join(import.meta.dir, 'cases.json')).json()) as Case[]).filter(c => !only || only.includes(c.id))

function typesIn(node: unknown): string[] {
  if (typeof node !== 'object' || node === null) return []
  const self = 'type' in node && typeof node.type === 'string' ? [node.type] : []
  return [...self, ...Object.values(node).flatMap(value => (Array.isArray(value) ? value.flatMap(typesIn) : typesIn(value)))]
}

async function ask(prompt: string): Promise<{ calls: Call[]; reply: string }> {
  const argv = ['claude', '-p', prompt, '--plugin-dir', plugin, '--output-format', 'stream-json', '--verbose', '--allowedTools', 'mcp__intui__show']
  if (values.model) argv.push('--model', values.model)
  const proc = Bun.spawn(argv, { cwd: '/tmp', stdout: 'pipe', stderr: 'pipe' })
  const out = await new Response(proc.stdout).text()
  await proc.exited
  const uses = new Map<string, unknown>()
  const refusals = new Map<string, string>()
  const said: string[] = []
  for (const line of out.split('\n')) {
    if (!line.trim()) continue
    const message = JSON.parse(line)
    for (const block of message.message?.content ?? []) {
      if (block.type === 'tool_use' && block.name === 'mcp__intui__show') uses.set(block.id, block.input)
      if (block.type === 'tool_result' && uses.has(block.tool_use_id) && block.is_error) refusals.set(block.tool_use_id, resultText(block.content))
      if (message.type === 'assistant' && block.type === 'text') said.push(block.text)
    }
  }
  const calls = [...uses].map(([id, input]): Call => {
    const types = [...new Set(typesIn((input as { root?: unknown }).root))]
    const refusal = refusals.get(id)
    return refusal === undefined ? { kind: 'drawn', types } : { kind: 'refused', types, refusal }
  })
  return { calls, reply: said.join('\n\n') }
}

function resultText(content: unknown): string {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) return content.map(part => (typeof part?.text === 'string' ? part.text : '')).join('\n')
  return JSON.stringify(content)
}

const day = new Date().toISOString().slice(0, 10)
const file = join(import.meta.dir, 'results', `${day}-${values.model ?? 'default'}.jsonl`)
const records: Record[] = []
for (const c of cases) {
  const started = performance.now()
  const { calls, reply } = await ask(c.prompt)
  records.push({ id: c.id, prompt: c.prompt, hoped: c.expect, calls, reply, ms: Math.round(performance.now() - started) })
  const used = calls.map(call => `${call.kind === 'refused' ? '✗' : ''}[${call.types.join(' ')}]`).join(' ') || 'text'
  const hoped = c.expect.show ? `show ${[...(c.expect.includes ?? [])].join(' ')}`.trim() : 'text'
  console.log(`${c.id.padEnd(20)} did ${used.padEnd(28)} hoped ${hoped}`)
}
await Bun.write(file, records.map(record => JSON.stringify(record)).join('\n') + '\n')
console.log(`\nRecorded ${records.length} cases with their replies in ${file}. Read it as a trend across runs; nothing here is a score.`)

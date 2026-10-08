/**
 * Runs the eval cases: asks headless Claude Code each question with the plugin
 * loaded, records which components it showed, and grades against the case.
 *
 *   bun evals/run.ts [--model <model>] [--only id,id] [--plugin <dir>]
 *
 * The plugin folder defaults to packages/claude-code/plugin (run `bun run plugin` first).
 */
import { join } from 'node:path'
import { parseArgs } from 'node:util'

type Case = { id: string; prompt: string; expect: { show: boolean; includes?: string[]; excludes?: string[] } }
type Call = { ok: boolean; types: string[] }

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

async function ask(prompt: string): Promise<Call[]> {
  const argv = ['claude', '-p', prompt, '--plugin-dir', plugin, '--output-format', 'stream-json', '--verbose', '--allowedTools', 'mcp__intui__show']
  if (values.model) argv.push('--model', values.model)
  const proc = Bun.spawn(argv, { cwd: '/tmp', stdout: 'pipe', stderr: 'pipe' })
  const out = await new Response(proc.stdout).text()
  await proc.exited
  const uses = new Map<string, unknown>()
  const results = new Map<string, boolean>()
  for (const line of out.split('\n')) {
    if (!line.trim()) continue
    const message = JSON.parse(line)
    for (const block of message.message?.content ?? []) {
      if (block.type === 'tool_use' && block.name === 'mcp__intui__show') uses.set(block.id, block.input)
      if (block.type === 'tool_result' && uses.has(block.tool_use_id)) results.set(block.tool_use_id, !block.is_error)
    }
  }
  return [...uses].map(([id, input]) => ({ ok: results.get(id) ?? false, types: typesIn((input as { root?: unknown }).root) }))
}

function grade(c: Case, calls: Call[]): string[] {
  const shown = calls.filter(call => call.ok)
  const types = new Set(shown.flatMap(call => call.types))
  const failures: string[] = []
  if (!c.expect.show && calls.length > 0) failures.push(`expected plain text, but it called show (${[...types].join(', ')})`)
  if (c.expect.show && shown.length === 0) failures.push(calls.length ? 'every show call was refused' : 'expected a show call, got plain text')
  for (const type of c.expect.includes ?? []) if (c.expect.show && !types.has(type)) failures.push(`expected a ${type}`)
  for (const type of c.expect.excludes ?? []) if (calls.some(call => call.types.includes(type))) failures.push(`should not try a ${type}`)
  return failures
}

let passed = 0
for (const c of cases) {
  const calls = await ask(c.prompt)
  const failures = grade(c, calls)
  if (failures.length === 0) passed++
  const used = calls.map(call => `${call.ok ? '' : '✗'}[${[...new Set(call.types)].join(' ')}]`).join(' ') || 'text'
  console.log(`${failures.length ? 'FAIL' : 'pass'}  ${c.id.padEnd(20)} ${used}${failures.length ? `\n      ${failures.join('; ')}` : ''}`)
}
console.log(`\n${passed}/${cases.length} passed`)

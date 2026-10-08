/**
 * Builds the plugin folder Claude Code loads: a manifest, hooks.json, and one
 * bundled hooks module. Plugins can only import their own files, so
 * @intui/core and zod are bundled in.
 *
 *   bun build.ts                 # into packages/claude-code/plugin
 *   bun build.ts --out <folder>  # e.g. a session's mods folder, for hot reload
 */
import { mkdir, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { parseArgs } from 'node:util'

const { values } = parseArgs({ args: Bun.argv.slice(2), options: { out: { type: 'string' } } })
const here = import.meta.dir
const out = resolve(values.out ?? join(here, 'plugin'))
const pkg = await Bun.file(join(here, 'package.json')).json()

await rm(join(out, 'hooks'), { recursive: true, force: true })
await mkdir(join(out, '.claude-plugin'), { recursive: true })

const built = await Bun.build({
  entrypoints: [join(here, 'src/register.tsx')],
  outdir: join(out, 'hooks'),
  naming: 'register.js',
  target: 'browser',
  format: 'esm',
  // The engine provides 'claude-code' at run time.
  external: ['claude-code'],
  tsconfig: join(here, 'tsconfig.json'),
})
if (!built.success) {
  for (const log of built.logs) console.error(log)
  process.exit(1)
}

// The engine reads the hooks module's source and wants `export const register`
// written at the top level; the bundler declares it with `var` and exports it at the end.
const hooksFile = join(out, 'hooks/register.js')
const source = await Bun.file(hooksFile).text()
const fixed = source.replace('\nvar register = ', '\nexport const register = ').replace(/\nexport \{\n  register\n\};\n?$/, '\n')
if (fixed === source || fixed.includes('export {')) throw new Error('build: could not rewrite the register export; check the bundle')
await Bun.write(hooksFile, fixed)

await Bun.write(
  join(out, '.claude-plugin/plugin.json'),
  JSON.stringify(
    { name: 'intui', version: pkg.version, description: pkg.description, types: './types/index.d.ts' },
    null,
    2,
  ) + '\n',
)
await Bun.write(join(out, 'hooks/hooks.json'), JSON.stringify({ modules: ['./register.js'] }, null, 2) + '\n')
await mkdir(join(out, 'types'), { recursive: true })
await Bun.write(join(out, 'types/index.d.ts'), Bun.file(join(here, 'types/index.d.ts')))

// Conformance tests run against the real engine with `claude plugin test <out>`.
// A plugin folder can only hold its own files, so the test is bundled with
// @intui/core; only the engine's modules stay external.
const tests = await Bun.build({
  entrypoints: [join(here, 'conformance/conformance.test.ts')],
  outdir: out,
  naming: 'conformance.test.ts',
  target: 'browser',
  format: 'esm',
  external: ['claude-code', 'claude-code/testing'],
})
if (!tests.success) {
  for (const log of tests.logs) console.error(log)
  process.exit(1)
}

const size = built.outputs.reduce((sum, file) => sum + file.size, 0)
console.log(`built ${out} (${(size / 1024).toFixed(0)} KB)`)

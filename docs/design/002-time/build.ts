/** Builds proposal 002's review page as one self-contained file: docs/design/002-time.html. */
import { join } from 'node:path'

const here = import.meta.dir
const built = await Bun.build({ entrypoints: [join(here, 'page.ts')], target: 'browser', format: 'iife', minify: true })
if (!built.success) {
  for (const log of built.logs) console.error(log)
  process.exit(1)
}
const js = (await built.outputs[0]!.text()).replaceAll('</script', '<\\/script')
const css = await Bun.file(join(here, '../../../packages/web/src/style.css')).text()
const shell = await Bun.file(join(here, '../../../packages/web/src/page.css')).text()
const out = join(here, '../002-time.html')
await Bun.write(
  out,
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Visible time</title>
<style>${css}
${shell}</style>
<body><script>${js}</script></body>`,
)
console.log(out)

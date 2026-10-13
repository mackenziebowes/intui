/** Builds proposal 001's review page into proposals/001-certainty/dist/index.html. */
import { join } from 'node:path'

const here = import.meta.dir
const out = join(here, 'dist')
const built = await Bun.build({ entrypoints: [join(here, 'page.ts')], outdir: out, naming: 'page.js', target: 'browser', format: 'iife' })
if (!built.success) {
  for (const log of built.logs) console.error(log)
  process.exit(1)
}
const css = await Bun.file(join(here, '../../packages/web/src/style.css')).text()
await Bun.write(
  join(out, 'index.html'),
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>How sure a number is</title>
<style>${css}
:root { color-scheme: light dark; }
body { background: Canvas; color: CanvasText; max-width: 72rem; margin: 0 auto; padding: 24px 16px 64px; }</style><body><script src="page.js"></script></body>`,
)
console.log(join(out, 'index.html'))

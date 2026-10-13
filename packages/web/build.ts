/**
 * Builds the browser files into packages/web/dist:
 *   intui-web.js   ES module: render, textOf, markdownToHtml (core and marked bundled in)
 *   intui-web.css  the stylesheet
 *   intui-page.css the opt-in page shell (background, width, gutter) for pages made only of trees
 *   demo.html      every core component's example at three widths; open it from disk
 */
import { copyFile, mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

const here = import.meta.dir
const out = join(here, 'dist')
await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })

const builds = [
  // The library, for a host page to import.
  { entrypoints: [join(here, 'src/index.ts')], naming: 'intui-web.js', format: 'esm' as const },
  // The demo, as a classic script so it runs from file:// (module scripts are blocked there).
  { entrypoints: [join(here, 'demo/demo.ts')], naming: 'demo.js', format: 'iife' as const },
]
for (const build of builds) {
  const result = await Bun.build({ ...build, outdir: out, target: 'browser', sourcemap: 'linked', tsconfig: join(here, 'tsconfig.json') })
  if (!result.success) {
    for (const log of result.logs) console.error(log)
    process.exit(1)
  }
}
await copyFile(join(here, 'src/style.css'), join(out, 'intui-web.css'))
await copyFile(join(here, 'src/page.css'), join(out, 'intui-page.css'))
await copyFile(join(here, 'demo/demo.html'), join(out, 'demo.html'))
console.log(`built ${out}`)

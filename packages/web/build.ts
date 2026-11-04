/**
 * Builds the browser files into packages/web/dist: the library, its stylesheets and the
 * demo page.
 *
 * - intui-web.js: ES module with render, textOf, markdownToHtml (core and marked bundled in)
 * - intui-web.css: the stylesheet
 * - intui-page.css: the opt-in page shell (background, width, gutter) for pages made only of trees
 * - demo.html: every core component's example at three widths; open it from disk
 */
import { copyFile, mkdir, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { joinedStyles } from './join-styles'

const here = import.meta.dir
const out = join(here, 'dist')

// src/style.css is generated from src/styles/ (see join-styles.ts); land refuses a style.css that differs (check-style.ts).
await Bun.write(join(here, 'src/style.css'), await joinedStyles(here))

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
// The stylesheet is style.css then marks.css (Marks and Ladder), one file for a host that links one.
await Bun.write(join(out, 'intui-web.css'), (await Bun.file(join(here, 'src/style.css')).text()) + '\n' + (await Bun.file(join(here, 'src/marks.css')).text()))
await copyFile(join(here, 'src/page.css'), join(out, 'intui-page.css'))
await copyFile(join(here, 'demo/demo.html'), join(out, 'demo.html'))
console.log(`built ${out}`)

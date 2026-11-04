/** Land-time check (#3263): src/style.css must be exactly what build.ts would write from src/styles/. A rule edited only in style.css is deleted by the next build. */
import { join } from 'node:path'
import { joinedStyles } from './join-styles'

const root = import.meta.dir
const built = await joinedStyles(root)
const have = await Bun.file(join(root, 'src/style.css')).text()
if (built !== have) {
  console.error('packages/web/src/style.css differs from src/styles/*.css joined: edit the files in src/styles/, then run `bun packages/web/build.ts`, and commit style.css with them.')
  process.exit(1)
}
console.log('style.css matches src/styles/')

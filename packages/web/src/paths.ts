/**
 * Where the built files are on disk, for a server that serves them (the hub).
 * Not for the browser: import `@intui/web` there, and link the stylesheet.
 */
import { join } from 'node:path'

const root = join(import.meta.dir, '..')

/** The stylesheet, with its tokens and light and dark themes. */
export const stylesheetPath = join(root, 'src/style.css')
/** The browser bundle built by `bun run build` in packages/web: `render` and friends as an ES module. */
export const bundlePath = join(root, 'dist/intui-web.js')

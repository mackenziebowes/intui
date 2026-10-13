/**
 * Markdown to HTML for Text components. Trees can come from a model, so the
 * output must be safe to put in `innerHTML`:
 *
 * - raw HTML is dropped, and the contents of `<script>`, `<style>` and similar
 *   elements go with it, so they neither run nor show up as text;
 * - links keep only safe URLs (http, https, mailto, and relative ones);
 *   anything else becomes plain text;
 * - images keep only relative URLs, so model-written text can't make the
 *   viewer's browser call an outside server (a tracking pixel); any other
 *   image shows as its alt text;
 * - every attribute value is escaped, so `&#58;` can't smuggle in a scheme.
 *
 * Code spans and fences are still shown, escaped, because that's text the
 * author meant to show.
 */
import { Marked, type Token, type Tokens } from 'marked'

const SWALLOWED = /^<\s*(script|style|iframe|object|embed|noscript|template|textarea|title|xmp|noembed|noframes)\b/i

export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/**
 * Whether a URL may go into an `href` or `src`. Links: http(s), mailto, or no
 * scheme at all. Images: only relative URLs, never `//host` (or `/\host`, which
 * browsers read the same way), because those load from another server.
 */
export function isSafeUrl(url: string, kind: 'link' | 'image' = 'link'): boolean {
  // Browsers ignore control characters and whitespace inside a scheme, so they can't hide one.
  const squashed = url.replace(/[\u0000- \u007f-\u009f]/g, '').toLowerCase()
  const scheme = /^([a-z][a-z0-9+.-]*):/.exec(squashed)?.[1]
  if (kind === 'image') return scheme === undefined && !/^[/\\]{2}/.test(squashed)
  return scheme === undefined || scheme === 'https' || scheme === 'http' || scheme === 'mailto'
}

const marked = new Marked({
  gfm: true,
  async: false,
  renderer: {
    html: () => '',
    link(token: Tokens.Link) {
      const inner = this.parser.parseInline(token.tokens)
      if (!isSafeUrl(token.href)) return inner
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : ''
      return `<a href="${escapeHtml(token.href)}"${title} rel="noopener noreferrer nofollow">${inner}</a>`
    },
    image(token: Tokens.Image) {
      if (!isSafeUrl(token.href, 'image')) return escapeHtml(token.text)
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : ''
      return `<img src="${escapeHtml(token.href)}" alt="${escapeHtml(token.text)}"${title} loading="lazy" referrerpolicy="no-referrer">`
    },
  },
})

/** Removes raw HTML tokens, and whatever sits between an inline `<script>` and its closing tag. */
function stripHtml(tokens: Token[]): Token[] {
  const kept: Token[] = []
  let swallowing: string | undefined
  for (const token of tokens) {
    if (swallowing) {
      if (token.type === 'html' && new RegExp(`^<\\s*/\\s*${swallowing}\\b`, 'i').test(token.raw)) swallowing = undefined
      continue
    }
    if (token.type === 'html') {
      const opened = SWALLOWED.exec(token.raw)?.[1]
      // A block of HTML holds its own closing tag; an inline tag needs the rest of the run dropped.
      if (opened && !new RegExp(`<\\s*/\\s*${opened}\\b`, 'i').test(token.raw)) swallowing = opened
      continue
    }
    const nested = token as { tokens?: Token[]; items?: Token[]; header?: { tokens: Token[] }[]; rows?: { tokens: Token[] }[][] }
    if (nested.tokens) nested.tokens = stripHtml(nested.tokens)
    if (nested.items) for (const item of nested.items as { tokens: Token[] }[]) item.tokens = stripHtml(item.tokens)
    if (nested.header) for (const cell of nested.header) cell.tokens = stripHtml(cell.tokens)
    if (nested.rows) for (const row of nested.rows) for (const cell of row) cell.tokens = stripHtml(cell.tokens)
    kept.push(token)
  }
  return kept
}

/** Safe HTML for a Markdown string. */
export function markdownToHtml(markdown: string): string {
  const tokens = marked.lexer(markdown)
  const clean = Object.assign(stripHtml(tokens), { links: tokens.links })
  return marked.parser(clean)
}

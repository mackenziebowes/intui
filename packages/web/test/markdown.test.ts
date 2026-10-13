import { describe, expect, test } from 'bun:test'
import { Tree } from '@intui/core'
import { Window } from 'happy-dom'
import { isSafeUrl, markdownToHtml } from '../src/markdown'
import { render } from '../src/render'

// Trees can come from a model, so Text must never carry script into the page.
describe('Markdown sanitising', () => {
  test('a script block neither runs nor shows its source', () => {
    const html = markdownToHtml('<script>alert(1)</script>\n\nhello')
    expect(html).not.toContain('<script')
    expect(html).not.toContain('alert')
    expect(html).toContain('hello')
  })

  test('an inline script inside a paragraph is dropped with its contents', () => {
    const html = markdownToHtml('Hi <script>steal()</script> there **bold**')
    expect(html).not.toContain('steal')
    expect(html).toContain('<strong>bold</strong>')
  })

  test('raw HTML with event handlers is dropped, in lists and tables too', () => {
    const html = markdownToHtml('x <img src=x onerror=alert(1)> y\n\n- <b onmouseover=go()>a</b>\n\n| a |\n|---|\n| <svg onload=z()> |')
    expect(html).not.toMatch(/\son\w+=/i)
    expect(html).not.toContain('<img')
    expect(html).not.toContain('<svg')
  })

  test('javascript: links lose their href however the scheme is disguised', () => {
    const html = markdownToHtml('[a](javascript:alert(1)) [b](JaVa%09Script:x) <javascript:alert(2)> [r][1]\n\n[1]: vbscript:x')
    expect(html).not.toMatch(/href="\s*(javascript|vbscript)/i)
    expect(isSafeUrl('java\tscript:alert(1)')).toBe(false)
    expect(isSafeUrl(' JAVASCRIPT:alert(1)')).toBe(false)
    expect(isSafeUrl('data:text/html,<script>', 'image')).toBe(false)
  })

  test('an entity cannot smuggle a colon into an href', () => {
    // Escaping & keeps "&#58;" literal, so the browser never decodes it into "javascript:".
    expect(markdownToHtml('[c](javascript&#58;alert(1))')).not.toContain('href="javascript&#58;')
  })

  test('safe links and images survive, and code still shows tags as text', () => {
    const html = markdownToHtml('[ok](https://example.com) [rel](/board?task=1) ![i](/a.png) `<script>`')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('href="/board?task=1"')
    expect(html).toContain('src="/a.png"')
    expect(html).toContain('<code>&lt;script&gt;</code>')
  })

  test('an outside image or a //host image shows as its alt text and loads nothing', () => {
    for (const href of ['https://tracker.test/p.png', 'http://tracker.test/p.png', '//tracker.test/p.png', '/\\tracker.test/p.png']) {
      const html = markdownToHtml(`![pixel alt](${href})`)
      expect(html).not.toContain('<img')
      expect(html).not.toContain('tracker.test')
      expect(html).toContain('pixel alt')
    }
    expect(markdownToHtml('![ok](img/a.png)')).toContain('src="img/a.png"')
  })

  test('rendered into a real DOM, a Text holds no script and no handler', () => {
    const window = new Window()
    const document = window.document as unknown as Document
    const tree = Tree.of({ type: 'Text', markdown: 'Before <script>window.hacked = 1</script><img src=x onerror="window.hacked=2"> after' } as never)
    const element = render(tree, { source: 's', document })
    document.body.append(element)
    expect(element.querySelector('script, [onerror], img')).toBeNull()
    expect(element.textContent).not.toContain('hacked')
    expect(element.textContent).toContain('after')
  })
})

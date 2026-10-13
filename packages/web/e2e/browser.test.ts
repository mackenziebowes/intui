/**
 * @intui/web in a real browser: the renderer bundled as a host page bundles it,
 * opened in headless Chromium by agent-browser, and driven with real clicks and
 * typing. Checks the contracts a host relies on: what reaches `onEvent`, that a
 * used-up control can't fire again, and that Markdown can't run code.
 *
 *   bun test packages/web/e2e
 */
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'bun:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const SESSION = `intui-e2e-${process.pid}`
let dir = ''

function browser(...args: string[]): string {
  const run = Bun.spawnSync(['agent-browser', '--session', SESSION, ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (run.exitCode !== 0) throw new Error(`agent-browser ${args.join(' ')} failed: ${run.stderr.toString() || run.stdout.toString()}`)
  return run.stdout.toString()
}

/** Runs `js` in the page and returns its value, which must be JSON. */
function page<T>(js: string): T {
  const out = JSON.parse(browser('--json', 'eval', `JSON.stringify(${js})`)) as { data?: { result?: unknown } }
  const result = out.data?.result
  return JSON.parse(typeof result === 'string' ? result : JSON.stringify(result)) as T
}

const events = (fixture: string) =>
  page<{ fixture: string; event: Record<string, unknown>; fits: boolean }[]>('window.intuiEvents').filter(e => e.fixture === fixture)
const buttons = (fixture: string) =>
  page<{ label: string; disabled: boolean; pressed: string | null }[]>(
    `[...document.querySelectorAll('#${fixture} .intui-choice button')].map(b => ({ label: b.textContent.trim(), disabled: b.disabled, pressed: b.getAttribute('aria-pressed') }))`,
  )
/** Lets the page settle after a click: handlers are async. */
const settle = () => browser('wait', '100')

beforeAll(async () => {
  dir = await mkdtemp(join(tmpdir(), 'intui-web-e2e-'))
  const built = await Bun.build({
    entrypoints: [join(import.meta.dir, 'page.ts')],
    outdir: dir,
    naming: 'page.js',
    target: 'browser',
    format: 'iife',
    tsconfig: join(import.meta.dir, '../tsconfig.json'),
  })
  if (!built.success) throw new AggregateError(built.logs, 'the e2e page did not build')
  const css = await Bun.file(join(import.meta.dir, '../src/style.css')).text()
  await Bun.write(
    join(dir, 'index.html'),
    `<!doctype html><meta charset="utf-8"><title>intui e2e</title><style>${css}</style><body><script src="page.js"></script></body>`,
  )
  browser('open', `file://${join(dir, 'index.html')}`)
  browser('wait', 'body[data-ready="true"]')
})

// A fresh page per check, so no check leans on what an earlier one typed or pressed.
beforeEach(() => {
  browser('reload')
  browser('wait', 'body[data-ready="true"]')
})

afterAll(async () => {
  try {
    browser('close')
  } finally {
    if (dir) await rm(dir, { recursive: true, force: true })
  }
})

describe('Choice', () => {
  test('a press reaches onEvent with the source and ids, fits the tree, and uses the choice up', () => {
    browser('click', '#choice .intui-choice button:nth-of-type(2)')
    settle()
    browser('click', '#choice .intui-choice button:nth-of-type(1)')
    settle()
    const sent = events('choice')
    expect(sent).toHaveLength(1)
    expect(sent[0]!.event).toEqual({ v: 1, source: 'toolu_choice', target: 'next-step', action: 'press', value: 'park' })
    expect(sent[0]!.fits).toBe(true)
    expect(buttons('choice').every(b => b.disabled)).toBe(true)
  })

  test('when sending fails, the choice stays open and says why', () => {
    browser('click', '#choice-failing .intui-choice button:nth-of-type(1)')
    settle()
    expect(buttons('choice-failing').some(b => !b.disabled)).toBe(true)
    expect(page<string>(`document.querySelector('#choice-failing .intui-status').textContent`)).toContain('offline')
  })

  test("the host's record of a past press draws it used up, the chosen one marked", () => {
    const drawn = buttons('choice-pressed')
    expect(drawn.every(b => b.disabled)).toBe(true)
    expect(drawn.find(b => b.label.includes('Start exploring'))!.pressed).toBe('true')
  })

  test('with no handler the controls are drawn disabled', () => {
    expect(buttons('choice-readonly').every(b => b.disabled)).toBe(true)
  })
})

describe('Form', () => {
  const field = (name: string) => `#form [name="${name}"]`
  const submit = () => {
    browser('click', '#form button[type="submit"]')
    settle()
  }

  test('a missing required field blocks the submit and names the field', () => {
    submit()
    expect(events('form')).toHaveLength(0)
    expect(page<string | null>(`document.querySelector('${field('title')}').getAttribute('aria-invalid')`)).toBe('true')
    expect(page<string>(`document.querySelector('#form .intui-field-error').textContent`)).toContain('Title')
  })

  test('a number with a typo is refused, not sent as empty', () => {
    browser('fill', field('title'), 'x')
    browser('fill', field('points'), '3,5')
    submit()
    expect(events('form')).toHaveLength(0)
  })

  test('an unchecked checkbox is sent as false, not left out', () => {
    browser('fill', field('title'), 'x')
    submit()
    expect(events('form').map(e => e.event.value)).toEqual([{ title: 'x', urgent: false }])
  })

  test('field ids like constructor and __proto__ submit like any other', () => {
    browser('fill', '#form-odd [name="constructor"]', 'built')
    browser('fill', '#form-odd [name="__proto__"]', 'plain')
    browser('click', '#form-odd button[type="submit"]')
    settle()
    const sent = events('form-odd')
    expect(sent).toHaveLength(1)
    expect(JSON.stringify(sent[0]!.event.value)).toBe('{"constructor":"built","__proto__":"plain"}')
    expect(sent[0]!.fits).toBe(true)
  })

  test('a submit sends typed values: trimmed text, parsed numbers, empty optionals left out', () => {
    browser('fill', field('title'), '  Web renderer  ')
    browser('fill', field('points'), '3.5')
    browser('check', field('urgent'))
    submit()
    const sent = events('form')
    expect(sent).toHaveLength(1)
    expect(sent[0]!.event).toEqual({
      v: 1,
      source: 'toolu_form',
      target: 'new-idea',
      action: 'submit',
      value: { title: 'Web renderer', points: 3.5, urgent: true },
    })
    expect(sent[0]!.fits).toBe(true)
  })

  test('a field id with spaces still has a working label', () => {
    const wired = page<boolean>(`(() => {
      const control = document.querySelector('${field('first name')}')
      const label = document.querySelector('#form label[for="' + control.id + '"]')
      return !/\\s/.test(control.id) && label !== null && label.textContent.includes('First name')
    })()`)
    expect(wired).toBe(true)
  })

  test("the host's record of a submit draws the form used up, showing what was sent", () => {
    expect(page<string>(`document.querySelector('#form-submitted [name="title"]').value`)).toBe('Sent before')
    expect(page<boolean>(`document.querySelector('#form-submitted [name="title"]').disabled`)).toBe(true)
    expect(page<boolean>(`document.querySelector('#form-submitted button[type="submit"]').disabled`)).toBe(true)
  })
})

describe('Markdown', () => {
  test('hostile Markdown runs nothing, keeps no handler or script, and loads nothing from outside', () => {
    // Raw HTML is dropped whole, so there is nothing to hover or click; an onerror would have fired on load.
    const found = page<{ scriptText: boolean; pwned: unknown; scripts: number; handlers: number; jsLinks: number; outsideImages: number; code: string; safeLink: string | null }>(`(() => {
      const root = document.querySelector('#hostile')
      const all = [...root.querySelectorAll('*')]
      return {
        pwned: window.pwned ?? null,
        scripts: root.querySelectorAll('script').length,
        handlers: all.filter(el => [...el.attributes].some(a => a.name.startsWith('on'))).length,
        // What the browser would follow, not how the href is spelled: an escaped entity is a harmless relative link.
        jsLinks: [...root.querySelectorAll('a')].filter(a => a.protocol === 'javascript:').length,
        outsideImages: [...root.querySelectorAll('img')].filter(img => /^(https?:)?\\/\\//.test(img.getAttribute('src') ?? '')).length,
        code: root.querySelector('code')?.textContent ?? '',
        scriptText: root.textContent.includes('window.pwned'),
        safeLink: root.querySelector('a[href="https://example.com"]')?.textContent ?? null,
      }
    })()`)
    expect(found.pwned).toBeNull()
    expect(found.scripts).toBe(0)
    expect(found.handlers).toBe(0)
    expect(found.jsLinks).toBe(0)
    expect(found.scriptText).toBe(false)
    expect(found.outsideImages).toBe(0)
    expect(found.code).toContain('<script>')
    expect(found.safeLink).toBe('safe link')
  })
})

describe('awkward trees', () => {
  test('a cyclic Flow, a one-point chart and a wide table draw in 200px without spilling, every step shown', () => {
    const drawn = page<{ text: string; spill: number }>(`(() => {
      const root = document.querySelector('#awkward')
      return { text: root.textContent, spill: root.scrollWidth - root.clientWidth }
    })()`)
    for (const step of ['Alpha', 'Beta', 'Gamma']) expect(drawn.text).toContain(step)
    expect(drawn.text).toContain('One point')
    expect(drawn.spill).toBeLessThanOrEqual(0)
  })
})

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

describe('Text', () => {
  test('a code block uses the width it is given, not the prose measure, so a long line is not cut off', () => {
    const sizes = page<{ pre: number; scroll: number; p: number }>(`(() => {
      const root = document.querySelector('#code')
      const pre = root.querySelector('pre')
      return { pre: pre.clientWidth, scroll: pre.scrollWidth, p: root.querySelector('p').getBoundingClientRect().width }
    })()`)
    expect(sizes.pre).toBeGreaterThan(sizes.p)
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.pre)
  })
})

describe('Flow', () => {
  test('in a row, a link that skips a layer is written in its source box, never drawn through the boxes between', () => {
    const flow = page<{ direction: string; arrows: number; who: string; labels: string[] }>(`(() => {
      const root = document.querySelector('#skipping')
      const who = [...root.querySelectorAll('.intui-flow-step')].find(step => step.querySelector('.intui-flow-label').textContent === 'Who')
      return {
        direction: root.querySelector('.intui-flow-canvas').dataset.direction,
        arrows: root.querySelectorAll('.intui-flow-arrow').length,
        who: who.querySelector('.intui-flow-notes').textContent,
        labels: [...root.querySelectorAll('.intui-flow-edge-label')].map(label => label.textContent),
      }
    })()`)
    expect(flow.direction).toBe('row')
    expect(flow.who).toContain('To Refused (notYours)')
    // write→who, who→shape, shape→drawn, shape→refused, refused→text; the loop back is a note too.
    expect(flow.arrows).toBe(5)
    expect(flow.labels).not.toContain('notYours')
  })
})

describe('readings: how sure a number is', () => {
  test('each kind draws its mark, and an unknown draws the word and no number', () => {
    // What a sighted reader sees: the screen-reader-only words are left out.
    const seen = `(el) => { const c = el.cloneNode(true); c.querySelectorAll('.intui-sr').forEach(n => n.remove()); return c.textContent.replace(/\\s+/g, ' ').trim() }`
    const stats = page<{ label: string; value: string; change: string | null; data: string[] }[]>(`(() => { const seen = ${seen}; return [...document.querySelectorAll('#readings .intui-stat')].map(s => ({
      label: s.querySelector('.intui-stat-label').textContent,
      value: seen(s.querySelector('.intui-stat-value')),
      change: s.querySelector('.intui-stat-change') ? seen(s.querySelector('.intui-stat-change')) : null,
      data: [...s.querySelectorAll('.intui-stat-value data')].map(d => d.getAttribute('value')),
    })) })()`)
    const by = Object.fromEntries(stats.map(s => [s.label, s]))
    expect(by.Exact!.value).toBe('216 tokens')
    expect(by.Floor!.value).toBe('≥ 216 tokens')
    expect(by.Floor!.change).toContain('≥ 4%')
    expect(by.Guess!.value).toBe('~216 tokens')
    expect(by.Guess!.change).toContain('~3')
    // A lost reading is the word, never a digit, and carries no machine-readable value.
    expect(by.Lost!.value).toBe('— unknown')
    expect(by.Lost!.value).not.toMatch(/\d/)
    expect(by.Lost!.data).toEqual([])
    expect(by.Lost!.change).toBe('— unknown')
    // A change follows its own reading: the value stays a number while its change is lost.
    expect(by['Sure but change lost']!.value).toBe('7')
    expect(by['Sure but change lost']!.change).toBe('— unknown')
  })

  test('a chart with an unknown point still draws, breaks its line there, and marks floors and estimates', () => {
    const chart = page<{ paths: number; unknown: number; unknownTitle: string; floors: number; hollow: number; dots: number; label: string; text: string }>(`(() => {
      const fig = [...document.querySelectorAll('#readings .intui-chart')][0]
      return {
        paths: fig.querySelectorAll('.intui-chart-line').length,
        unknown: fig.querySelectorAll('.intui-chart-unknown').length,
        unknownTitle: fig.querySelector('.intui-chart-unknown title')?.textContent ?? '',
        floors: fig.querySelectorAll('.intui-chart-floor').length,
        hollow: fig.querySelectorAll('.intui-chart-dot.is-estimate').length,
        dots: fig.querySelectorAll('.intui-chart-dot').length,
        label: fig.querySelector('svg').getAttribute('aria-label'),
        text: fig.querySelector('.intui-as-text').textContent,
      }
    })()`)
    // Mon, a gap, then Wed to Fri: two runs, not one line through the lost day.
    expect(chart.paths).toBe(2)
    expect(chart.dots).toBe(4)
    expect(chart.unknown).toBe(1)
    expect(chart.unknownTitle).toContain('Tue')
    expect(chart.unknownTitle).toContain('unknown')
    expect(chart.floors).toBe(1)
    expect(chart.hollow).toBe(1)
    expect(chart.label).toContain('1 unknown')
    expect(chart.text).toContain('unknown')
    expect(chart.text).toContain('at least 30')
    expect(chart.text).toContain('about 25')
  })

  test('a chart whose every point is unknown draws no line or bar and no made-up range', () => {
    const drawn = page<{ marks: number; unknown: number; label: string }>(`(() => {
      const fig = [...document.querySelectorAll('#readings .intui-chart')][1]
      return {
        marks: fig.querySelectorAll('rect, .intui-chart-line, .intui-chart-dot').length,
        unknown: fig.querySelectorAll('.intui-chart-unknown').length,
        label: fig.querySelector('svg').getAttribute('aria-label'),
      }
    })()`)
    expect(drawn.marks).toBe(0)
    expect(drawn.unknown).toBe(2)
    expect(drawn.label).toContain('no readable values')
    expect(drawn.label).not.toMatch(/Infinity/)
  })

  test('a change that rounds to 0 reads as flat, not as an up arrow with a plus sign', () => {
    const tiny = page<{ way: string; text: string; words: string }>(`(() => {
      const stat = [...document.querySelectorAll('#readings .intui-stat')].find(s => s.querySelector('.intui-stat-label').textContent === 'Tiny')
      const change = stat.querySelector('.intui-stat-change')
      return { way: change.querySelector('path').getAttribute('d'), text: change.textContent, words: window.intuiChecks.readingText }
    })()`)
    expect(tiny.way).toBe('M1 4h8v2H1Z')
    expect(tiny.text).not.toContain('+')
    expect(tiny.words).toContain('**Tiny:** 5 (about 0%)')
  })

  test('an all-unknown chart draws no number on its axis, since there is no range to show', () => {
    const drawn = page<{ ticks: number; digits: string }>(`(() => {
      const fig = [...document.querySelectorAll('#readings .intui-chart')][1]
      return {
        ticks: fig.querySelectorAll('.intui-chart-grid text, .intui-chart-grid line').length,
        digits: [...fig.querySelectorAll('svg text')].map(t => t.textContent).filter(t => /\\d/.test(t)).join(','),
      }
    })()`)
    expect(drawn.ticks).toBe(0)
    expect(drawn.digits).toBe('')
  })

  test('a floor bar carries its own mark, where an exact bar has none', () => {
    const bars = page<{ floors: number; stroke: string; centered: boolean; bars: number }>(`(() => {
      const fig = [...document.querySelectorAll('#readings .intui-chart')][2]
      const floor = fig.querySelector('.intui-chart-floor')
      const bar = fig.querySelector('rect[data-reading="atLeast"]')
      const f = floor.getBBox(), b = bar.getBBox()
      return {
        bars: fig.querySelectorAll('rect[data-reading]').length,
        floors: fig.querySelectorAll('.intui-chart-floor').length,
        stroke: getComputedStyle(floor).stroke,
        centered: Math.abs(f.x + f.width / 2 - (b.x + b.width / 2)) < 1 && f.y + f.height <= b.y + 0.5,
      }
    })()`)
    expect(bars.bars).toBe(3)
    expect(bars.floors).toBe(1)
    expect(bars.stroke).not.toBe('none')
    expect(bars.centered).toBe(true)
  })

  test('single points between unknowns keep their dots past 24 x values', () => {
    const dots = page<number>(`[...document.querySelectorAll('#readings .intui-chart')][3].querySelectorAll('.intui-chart-dot').length`)
    expect(dots).toBe(15)
  })

  test("the model's text form says at least, about and unknown", () => {
    const { readingText } = page<{ readingText: string }>('window.intuiChecks')
    expect(readingText).toContain('**Floor:** at least 216 tokens (at least +4%)')
    expect(readingText).toContain('**Guess:** about 216 tokens (about -3)')
    expect(readingText).toContain('**Lost:** unknown (unknown)')
    expect(readingText).toContain('| Tue | unknown |')
  })

  test('kind unknown with a value is refused with its path and what to do', () => {
    const { refusal } = page<{ refusal: string }>('window.intuiChecks')
    expect(refusal).toContain('root.value: kind "unknown" has no value; remove value, or use kind "atLeast" or "estimate" if you have a number')
  })

  test('a tree of exact numbers writes back as bare numbers, so older copies still read it', () => {
    const { roundTrip, roundTripFrom } = page<{ roundTrip: string; roundTripFrom: string }>('window.intuiChecks')
    expect(roundTrip).toBe(roundTripFrom)
    expect(typeof JSON.parse(roundTrip).root.value).toBe('number')
  })
})

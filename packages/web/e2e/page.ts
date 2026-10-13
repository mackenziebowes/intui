/**
 * The page the browser checks drive: a few trees drawn by the real renderer,
 * each in its own section. Events land in `window.intuiEvents` as JSON, so a
 * check reads exactly what a host's `onEvent` received.
 */
import { IntuiEvent, Reading, Tree, type Node } from '@intui/core'
import { render, type RenderOptions } from '../src/index'

declare global {
  interface Window {
    intuiEvents: { fixture: string; event: unknown; fits: boolean }[]
    intuiChecks: { refusal: string; roundTrip: string; roundTripFrom: string; readingText: string }
  }
}
window.intuiEvents = []

const choice: Node = {
  type: 'Choice',
  id: 'next-step',
  options: [{ id: 'explore', label: 'Start exploring', emphasis: 'primary' }, { id: 'park', label: 'Park' }],
  repeat: 'once',
} as Node

const form: Node = {
  type: 'Form',
  id: 'new-idea',
  fields: [
    { id: 'title', label: 'Title', input: 'text', required: true },
    { id: 'points', label: 'Points', input: 'number', required: false },
    { id: 'source', label: 'Source', input: 'select', options: ['self', 'client'], required: false },
    { id: 'urgent', label: 'Urgent', input: 'checkbox', required: false },
    { id: 'first name', label: 'First name', input: 'text', required: false },
  ],
  submitLabel: 'Add idea',
} as Node

// Markdown that tries every way in the security review's findings to run code or load from outside.
const hostile: Node = {
  type: 'Text',
  markdown: [
    '<script>window.pwned = "script block"</script>',
    'Inline <script>window.pwned = "inline"</script> script, and <img src=x onerror="window.pwned=\'onerror\'">.',
    '- <b onmouseover="window.pwned=\'list\'">in a list</b>',
    '',
    '| a | b |',
    '| --- | --- |',
    '| <span onclick="window.pwned=\'table\'">cell</span> | x |',
    '',
    '[tab](<java\tscript:window.pwned="tab">) [plain](javascript:window.pwned="link") [cased](JaVaScRiPt:alert(1)) [spaced]( javascript:alert(1)) [entity](javascript&#58;alert(1))',
    '',
    '[safe link](https://example.com) ![outside](https://example.com/x.png) ![protocol-relative](//example.com/y.png)',
    '',
    '`<script>shown as code</script>`',
  ].join('\n'),
} as Node

// Field ids that collide with Object.prototype's keys.
const oddForm: Node = {
  type: 'Form',
  id: 'odd',
  fields: [
    { id: 'constructor', label: 'Ctor', input: 'text', required: true },
    { id: '__proto__', label: 'Proto', input: 'text', required: false },
  ],
  submitLabel: 'Go',
} as Node

// Trees that once hung or overflowed a drawer, drawn in a narrow column.
const awkward: Node = {
  type: 'Group',
  direction: 'column',
  children: [
    {
      type: 'Flow',
      steps: [{ id: 'a', label: 'Alpha step with a long label' }, { id: 'b', label: 'Beta' }, { id: 'c', label: 'Gamma' }],
      links: [{ from: 'a', to: 'a' }, { from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'c', to: 'a', label: 'again' }],
    },
    { type: 'Chart', kind: 'line', title: 'One point', series: [{ label: 'Only', points: [{ x: 'Mon', y: 3 }] }] },
    {
      type: 'Table',
      columns: ['one', 'two', 'three', 'four', 'five', 'six'].map(key => ({ key, label: `Column ${key}` })),
      rows: [Object.fromEntries(['one', 'two', 'three', 'four', 'five', 'six'].map(key => [key, 'a fairly long cell value']))],
    },
  ],
} as Node

// Numbers that say how sure they are: one Stat per kind, a change that follows its own reading, and charts
// with a floor, an estimate and an unknown point.
const readings: Node = {
  type: 'Group',
  direction: 'column',
  children: [
    { type: 'Stat', label: 'Exact', value: 216, unit: 'tokens', change: { value: 18, as: 'percent' } },
    { type: 'Stat', label: 'Floor', value: Reading.atLeast(216), unit: 'tokens', change: { value: Reading.atLeast(4), as: 'percent' } },
    { type: 'Stat', label: 'Guess', value: Reading.estimate(216), unit: 'tokens', change: { value: Reading.estimate(-3), as: 'amount' } },
    { type: 'Stat', label: 'Lost', value: Reading.unknown(), unit: 'tokens', change: { value: Reading.unknown(), as: 'percent' } },
    { type: 'Stat', label: 'Tiny', value: 5, change: { value: Reading.estimate(0.001), as: 'percent' } },
    { type: 'Stat', label: 'Sure but change lost', value: 7, change: { value: Reading.unknown(), as: 'amount' } },
    {
      type: 'Chart',
      kind: 'line',
      title: 'Tokens by day',
      unit: 'tokens',
      series: [
        {
          label: 'Mine',
          points: [{ x: 'Mon', y: 10 }, { x: 'Tue', y: Reading.unknown() }, { x: 'Wed', y: Reading.atLeast(30) }, { x: 'Thu', y: Reading.estimate(25) }, { x: 'Fri', y: 40 }],
        },
      ],
    },
    {
      type: 'Chart',
      kind: 'bar',
      title: 'Every point lost',
      series: [{ label: 'Nothing', points: [{ x: 'a', y: Reading.unknown() }, { x: 'b', y: Reading.unknown() }] }],
    },
    {
      type: 'Chart',
      kind: 'bar',
      title: 'Bars by day',
      series: [{ label: 'Bars', points: [{ x: 'Mon', y: 100 }, { x: 'Tue', y: Reading.atLeast(180) }, { x: 'Wed', y: Reading.estimate(120) }] }],
    },
    {
      type: 'Chart',
      kind: 'line',
      title: 'Alternating',
      series: [
        {
          label: 'Every other day',
          points: Array.from({ length: 30 }, (_, i) => ({ x: `d${i}`, y: i % 2 === 0 ? Reading.exact(10 + i) : Reading.unknown() })),
        },
      ],
    },
  ],
} as Node

// A row with a link that skips a layer (who → refused) and a loop back (refused → write).
const skipping: Node = {
  type: 'Flow',
  steps: [
    { id: 'write', label: 'Write' },
    { id: 'who', label: 'Who' },
    { id: 'shape', label: 'Shape' },
    { id: 'refused', label: 'Refused' },
    { id: 'drawn', label: 'Drawn' },
    { id: 'text', label: 'Gives up' },
  ],
  links: [
    { from: 'write', to: 'who' },
    { from: 'who', to: 'shape', label: 'yes' },
    { from: 'who', to: 'refused', label: 'notYours' },
    { from: 'shape', to: 'drawn', label: 'fits' },
    { from: 'shape', to: 'refused', label: 'problems' },
    { from: 'refused', to: 'write', label: 'retry' },
    { from: 'refused', to: 'text', label: 'give up' },
  ],
} as Node

type Fixture = { id: string; root: Node; options?: Partial<RenderOptions>; width?: number }

const fixtures: Fixture[] = [
  { id: 'choice', root: choice },
  { id: 'choice-failing', root: choice, options: { onEvent: () => Promise.reject(new Error('offline')) } },
  { id: 'choice-pressed', root: choice, options: { pressed: id => (id === 'next-step' ? 'explore' : undefined) } },
  { id: 'choice-readonly', root: choice, options: { onEvent: undefined } },
  { id: 'form', root: form },
  { id: 'form-submitted', root: form, options: { submitted: id => (id === 'new-idea' ? { title: 'Sent before', urgent: true } : undefined) } },
  { id: 'form-odd', root: oddForm },
  { id: 'hostile', root: hostile },
  { id: 'awkward', root: awkward, width: 200 },
  { id: 'skipping', root: skipping, width: 1200 },
  {
    id: 'code',
    root: { type: 'Text', markdown: 'A short paragraph.\n\n```ts\n' + 'const aLongTypeSketch = { kind: "expires", at: Instant, until: Instant } // read then; stale once the clock passes until\n```' } as Node,
    width: 1200,
  },
  { id: 'readings', root: readings },
]

for (const fixture of fixtures) {
  const tree = Tree.of(fixture.root)
  const section = document.createElement('section')
  section.id = fixture.id
  if (fixture.width) section.style.width = `${fixture.width}px`
  const record = (event: IntuiEvent) => {
    let fits = true
    try {
      tree.verify(event)
    } catch {
      fits = false
    }
    window.intuiEvents.push({ fixture: fixture.id, event: event.toJSON(), fits })
  }
  section.append(render(tree, { source: `toolu_${fixture.id}`, onEvent: record, ...fixture.options }))
  document.body.append(section)
}
// What code sees when it parses readings: the refusal it reads, and what an exact-only tree writes back.
const refused = (input: unknown) => {
  try {
    Tree.of(input as Node)
    return 'parsed'
  } catch (error) {
    return (error as Error).message
  }
}
const oldTree = { type: 'Stat', label: 'Visitors', value: 1204, change: { value: 18, as: 'percent' }, tone: 'positive' }
window.intuiChecks = {
  refusal: refused({ type: 'Stat', label: 'Tokens', value: { kind: 'unknown', value: 3 } }),
  roundTrip: JSON.stringify(Tree.of(oldTree as Node).toJSON()),
  roundTripFrom: JSON.stringify({ v: 1, root: oldTree }),
  readingText: Tree.of(readings).toText(),
}
document.body.dataset.ready = 'true'

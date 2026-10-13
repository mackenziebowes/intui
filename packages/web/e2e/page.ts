/**
 * The page the browser checks drive: a few trees drawn by the real renderer,
 * each in its own section. Events land in `window.intuiEvents` as JSON, so a
 * check reads exactly what a host's `onEvent` received.
 */
import { IntuiEvent, Tree, type Node } from '@intui/core'
import { render, type RenderOptions } from '../src/index'

declare global {
  interface Window {
    intuiEvents: { fixture: string; event: unknown; fits: boolean }[]
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
    '[plain](javascript:window.pwned="link") [cased](JaVaScRiPt:alert(1)) [spaced]( javascript:alert(1)) [entity](javascript&#58;alert(1))',
    '',
    '[safe link](https://example.com) ![outside](https://example.com/x.png) ![protocol-relative](//example.com/y.png)',
    '',
    '`<script>shown as code</script>`',
  ].join('\n'),
} as Node

type Fixture = { id: string; root: Node; options?: Partial<RenderOptions> }

const fixtures: Fixture[] = [
  { id: 'choice', root: choice },
  { id: 'choice-failing', root: choice, options: { onEvent: () => Promise.reject(new Error('offline')) } },
  { id: 'choice-pressed', root: choice, options: { pressed: id => (id === 'next-step' ? 'explore' : undefined) } },
  { id: 'choice-readonly', root: choice, options: { onEvent: undefined } },
  { id: 'form', root: form },
  { id: 'form-submitted', root: form, options: { submitted: id => (id === 'new-idea' ? { title: 'Sent before', urgent: true } : undefined) } },
  { id: 'hostile', root: hostile },
]

for (const fixture of fixtures) {
  const tree = Tree.of(fixture.root)
  const section = document.createElement('section')
  section.id = fixture.id
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
document.body.dataset.ready = 'true'

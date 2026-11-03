/**
 * The demo page: every core component's example at three widths, plus a few
 * harder trees, so a person can check the look in light and dark.
 * `?theme=dark` or `?theme=light` forces a theme; otherwise it follows the system.
 */
import { core, IntuiEvent, Tree, type Node } from '@intui/core'
import { render } from '../src/index'
import { threadCase } from './thread-case'

const WIDTHS = [320, 520, 860]

const extras: { title: string; note: string; root: Node }[] = [
  threadCase,
  {
    title: 'Every tone inside every box',
    note: 'A Group boxed as apart, said or waiting (proposal 007). The waiting box is the dark one: each tone must keep its contrast there.',
    root: {"type": "Group", "direction": "column", "children": [{"type": "Group", "direction": "column", "children": [{"type": "Text", "markdown": "**No box**: a line of words, then one label for each tone."}, {"type": "Group", "direction": "row", "children": [{"type": "Label", "text": "neutral", "tone": "neutral"}, {"type": "Label", "text": "positive", "tone": "positive"}, {"type": "Label", "text": "warning", "tone": "warning"}, {"type": "Label", "text": "critical", "tone": "critical"}, {"type": "Label", "text": "muted", "tone": "muted"}]}, {"type": "Stat", "label": "Idle CPU", "value": 0.4, "unit": "%", "tone": "positive", "note": "steady"}]}, {"type": "Group", "direction": "column", "children": [{"type": "Text", "markdown": "**apart**: a line of words, then one label for each tone."}, {"type": "Group", "direction": "row", "children": [{"type": "Label", "text": "neutral", "tone": "neutral"}, {"type": "Label", "text": "positive", "tone": "positive"}, {"type": "Label", "text": "warning", "tone": "warning"}, {"type": "Label", "text": "critical", "tone": "critical"}, {"type": "Label", "text": "muted", "tone": "muted"}]}, {"type": "Stat", "label": "Idle CPU", "value": 0.4, "unit": "%", "tone": "positive", "note": "steady"}], "box": "apart"}, {"type": "Group", "direction": "column", "children": [{"type": "Text", "markdown": "**said**: a line of words, then one label for each tone."}, {"type": "Group", "direction": "row", "children": [{"type": "Label", "text": "neutral", "tone": "neutral"}, {"type": "Label", "text": "positive", "tone": "positive"}, {"type": "Label", "text": "warning", "tone": "warning"}, {"type": "Label", "text": "critical", "tone": "critical"}, {"type": "Label", "text": "muted", "tone": "muted"}]}, {"type": "Stat", "label": "Idle CPU", "value": 0.4, "unit": "%", "tone": "positive", "note": "steady"}], "box": "said"}, {"type": "Group", "direction": "column", "children": [{"type": "Text", "markdown": "**waiting**: a line of words, then one label for each tone."}, {"type": "Group", "direction": "row", "children": [{"type": "Label", "text": "neutral", "tone": "neutral"}, {"type": "Label", "text": "positive", "tone": "positive"}, {"type": "Label", "text": "warning", "tone": "warning"}, {"type": "Label", "text": "critical", "tone": "critical"}, {"type": "Label", "text": "muted", "tone": "muted"}]}, {"type": "Stat", "label": "Idle CPU", "value": 0.4, "unit": "%", "tone": "positive", "note": "steady"}], "box": "waiting"}]} as Node,
  },
  {
    title: 'A branching Flow with labels and a loop',
    note: 'Layers side by side when they fit, stacked when a layer still fits across, else a list where links that skip a neighbour are written in the box. The loop back is always written, not drawn.',
    root: {
      type: 'Flow',
      steps: [
        { id: 'draft', label: 'Draft', detail: 'Written by the builder' },
        { id: 'review', label: 'Review' },
        { id: 'fix', label: 'Fix pass' },
        { id: 'ship', label: 'Ship', detail: 'Moved to done' },
        { id: 'park', label: 'Park' },
      ],
      links: [
        { from: 'draft', to: 'review' },
        { from: 'review', to: 'fix', label: 'findings' },
        { from: 'review', to: 'ship', label: 'clean' },
        { from: 'review', to: 'park', label: 'later' },
        { from: 'fix', to: 'review', label: 'verify' },
      ],
    } as Node,
  },
  {
    title: 'A bar chart that crosses zero',
    note: 'Bars start at zero; the zero line is drawn when the domain spans it.',
    root: {
      type: 'Chart',
      kind: 'bar',
      title: 'Net change per week',
      unit: '%',
      series: [
        { label: 'This year', role: 'primary', points: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((x, i) => ({ x, y: [4, -2.5, 6, 1, -4, 8][i]! })) },
        { label: 'Last year', role: 'comparison', points: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((x, i) => ({ x, y: [2, 1, 3, -1, 0, 2][i]! })) },
      ],
      annotations: [{ at: 'W5', label: 'Outage' }],
    } as Node,
  },
  {
    title: 'A dashboard row',
    note: 'Stats and labels in a row Group wrap; a wide Table becomes one block per row in a narrow column.',
    root: {
      type: 'Group',
      direction: 'column',
      children: [
        {
          type: 'Group',
          direction: 'row',
          children: [
            { type: 'Stat', label: 'Tokens', value: 1268000, change: { value: -12, as: 'percent' }, tone: 'positive' },
            { type: 'Stat', label: 'Agent time', value: 47, unit: 'min', change: { value: 9, as: 'amount' }, tone: 'warning' },
            { type: 'Stat', label: 'Open findings', value: 3, tone: 'neutral' },
          ],
        },
        {
          type: 'Table',
          caption: 'Runs this week',
          columns: [
            { key: 'agent', label: 'Agent' },
            { key: 'role', label: 'Role' },
            { key: 'tokens', label: 'Tokens' },
            { key: 'minutes', label: 'Minutes' },
            { key: 'outcome', label: 'Outcome' },
          ],
          rows: [
            { agent: 'opus-intui-web', role: 'build', tokens: 412000, minutes: 38, outcome: '12 tests' },
            { agent: 'sonnet-chart', role: 'review', tokens: 68558, minutes: 9, outcome: '2 findings' },
            { agent: 'sonnet-fix', role: 'fix', tokens: 51200, minutes: 6.5, outcome: null },
          ],
        },
        {
          type: 'Group',
          direction: 'row',
          children: [
            { type: 'Text', markdown: '**Status**' },
            { type: 'Label', text: 'running', tone: 'positive' },
            { type: 'Label', text: 'needs review', tone: 'warning' },
            { type: 'Label', text: 'blocked', tone: 'critical' },
            { type: 'Label', text: 'queued', tone: 'neutral' },
            { type: 'Label', text: 'parked', tone: 'muted' },
          ],
        },
      ],
    } as Node,
  },
  {
    title: 'Answered controls',
    note: 'A used-up Choice and Form, from the host\'s own record of what was sent.',
    root: {
      type: 'Group',
      direction: 'column',
      children: [
        { type: 'Choice', id: 'answered', prompt: 'Ship it?', options: [{ id: 'yes', label: 'Ship', emphasis: 'primary' }, { id: 'no', label: 'Hold' }], repeat: 'once' },
        {
          type: 'Form',
          id: 'answered-form',
          fields: [
            { id: 'title', label: 'Title', input: 'text', required: true },
            { id: 'points', label: 'Estimate', input: 'number', required: false },
            { id: 'urgent', label: 'Urgent', input: 'checkbox', required: false },
          ],
          submitLabel: 'File ticket',
        },
      ],
    } as Node,
  },
  {
    title: 'Markdown from a model',
    note: 'Raw HTML is dropped and unsafe links lose their href; code stays visible.',
    root: {
      type: 'Text',
      markdown:
        '### Notes\n\nThe `render()` call returns a detached element. <script>alert("never")</script>A [safe link](https://example.com) and an [unsafe one](javascript:alert(1)).\n\n- one\n- two with `<img onerror>` in code\n\n```ts\nconst el = render(tree, { source })\n```',
    } as Node,
  },
]

const theme = new URLSearchParams(location.search).get('theme')
if (theme === 'dark' || theme === 'light') document.documentElement.dataset.theme = theme

const log = document.getElementById('log')!
const onEvent = async (event: IntuiEvent) => {
  await new Promise(resolve => setTimeout(resolve, 350))
  const line = document.createElement('li')
  line.textContent = JSON.stringify(event)
  log.prepend(line)
}

const main = document.getElementById('kinds')!
let n = 0
function section(title: string, note: string, root: Node) {
  const tree = Tree.of(root)
  const block = document.createElement('section')
  block.className = 'demo-kind'
  const h = document.createElement('h2')
  h.textContent = title
  const p = document.createElement('p')
  p.className = 'demo-note'
  p.textContent = note
  const frames = document.createElement('div')
  frames.className = 'demo-frames'
  for (const width of WIDTHS) {
    const frame = document.createElement('div')
    frame.className = 'demo-frame'
    frame.style.setProperty('--w', `${width}px`)
    const tag = document.createElement('span')
    tag.className = 'demo-width'
    tag.textContent = `${width}px`
    frame.append(
      tag,
      render(tree, {
        source: `demo-${++n}`,
        onEvent,
        pressed: id => (id === 'answered' ? 'yes' : undefined),
        submitted: id => (id === 'answered-form' ? { title: 'Web renderer in the hub', points: 3, urgent: true } : undefined),
      }),
    )
    frames.append(frame)
  }
  block.append(h, p, frames)
  main.append(block)
}

for (const kind of core.kinds) section(kind.type, kind.summary, kind.example)
for (const extra of extras) section(extra.title, extra.note, extra.root)

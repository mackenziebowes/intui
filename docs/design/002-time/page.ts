/**
 * Proposal 002's review page, drawn with IntUI itself.
 *   bun docs/design/002-time/build.ts   → docs/design/002-time.html (one self-contained file)
 */
import { Tree, Reading, type Node } from '../../../packages/core/src/index'
import { render } from '../../../packages/web/src/index'

const text = (markdown: string): Node => ({ type: 'Text', markdown }) as Node

const sections: Node[] = [
  text(`# 002: Visible time
**Proposal, for review.** Nothing is built yet. Follows 001 (how sure a number is), and uses the same shape: one tagged value per state, parsed at the boundary.`),

  text(`## The need
Every peer named time as invisible. research-chat: agents arrive cold and can't tell an old tree from a new one. command-hub: "Make clocks visible, especially anything that expires on its own" (gate readings, 5-minute caches). environment: it can't see the wall clock and guessed times three times today. A tree today says nothing about when it was made or how fresh its numbers are, so a gate reading from 14:00 looks the same at 19:00.

**Consumers (rule of two):** the command hub (gate, usage ledger, the Ask-Queue's trees) and the Claude Code plugin (every \`show\` row and tool result in a transcript a session reads back).`),

  text(`## Two times, owned by code
1. **When the tree was made**: stamped on the tree by whatever sends it (the plugin for \`show\`, the tool for a returned tree). The model never writes it: it can't see a clock, so a time it writes is a guess.
2. **How fresh a value's data is**: on code-written values (Stat, Chart), because only the code that read the source knows when it read it, and whether it goes stale.`),

  text(`## The types
\`\`\`ts
// An instant on the wire: ISO 8601 with an offset,
// e.g. "2026-10-13T15:20:00-07:00". A naive local time
// (no offset) is refused: that's the time-zone bug.
type Instant = string

// The tree's envelope. Additive: old trees have no "made".
{ v: 1, made?: Instant, root: Node }

// Inside the code, parsed at the boundary:
type Made =
  // code stamped it when it sent the tree
  | { kind: "stamped"; at: Instant }
  // an old tree, or a surface that didn't stamp
  | { kind: "unstated" }

// On the wire, on Stat and Chart:
// when the data behind the numbers was read.
asOf?:
  // a bare instant: read then, ages, never expires
  | Instant
  | { kind: "asOf"; at: Instant }
  // read then; stale once the clock passes until
  | { kind: "expires"; at: Instant; until: Instant }
  // code can't tell when
  | { kind: "unknown" }

// Inside the code:
type Freshness =
  | { kind: "asOf"; at: Instant }
  | { kind: "expires"; at: Instant; until: Instant }
  | { kind: "unknown" }
  // the tree doesn't say (every old tree)
  | { kind: "unstated" }
\`\`\``),

  {
    type: 'Table',
    caption: 'How each kind reads',
    columns: [
      { key: 'kind', label: 'Kind' },
      { key: 'drawn', label: 'Drawn as (at 16:20)' },
      { key: 'text', label: 'Text form the model reads' },
    ],
    rows: [
      { kind: 'stamped', drawn: 'Made 16:05 · 15 min ago (on the tree)', text: 'Made 2026-10-13 16:05 −07:00.' },
      { kind: 'asOf', drawn: 'as of 15:20 · 1 h ago', text: 'as of 2026-10-13 15:20 −07:00' },
      { kind: 'expires (fresh)', drawn: 'as of 16:10 · fresh until 16:15', text: 'as of 16:10, fresh until 16:15 (−07:00)' },
      { kind: 'expires (stale)', drawn: 'stale since 16:15 (dimmed)', text: 'as of 16:10, fresh until 16:15 (−07:00)' },
      { kind: 'unknown', drawn: 'time unknown', text: 'as of an unknown time' },
      { kind: 'unstated', drawn: '(nothing, as today)', text: '(nothing, as today)' },
    ],
  } as Node,

  text(`The text form carries absolute times only. It's written once, when a tool returns, and read back much later, so "15 min ago" would turn into a lie. Relative ages and "stale" are drawn by the renderer against the viewer's clock, at the moment someone looks.`),

  {
    type: 'Table',
    caption: 'Invariants the parser enforces',
    columns: [
      { key: 'rule', label: 'Rule' },
      { key: 'why', label: 'Why' },
    ],
    rows: [
      { rule: 'An instant has an offset', why: 'A naive time means a different moment in every time zone' },
      { rule: 'until is after at', why: 'Data can\'t be stale before it was read' },
      { rule: '"made" in a show call is refused', why: 'The model can\'t see a clock; the plugin stamps it' },
      { rule: 'A bare asOf instant = { kind: "asOf" }', why: 'The common case stays short, like a bare number in 001' },
      { rule: 'Absent = unstated', why: 'Old trees keep their meaning: they never claimed a time' },
    ],
  } as Node,

  text(`## The state machine: a value's freshness
Stamped once, at read time. After that only the clock moves it, and only from fresh to stale. Nothing ever makes data fresher; new data means a new tree.`),
  {
    type: 'Flow',
    steps: [
      { id: 'read', label: 'Code reads its source', detail: 'and notes the time' },
      { id: 'asOf', label: 'asOf', detail: 'ages; never expires' },
      { id: 'fresh', label: 'expires: fresh', detail: 'now < until' },
      { id: 'stale', label: 'expires: stale', detail: 'now ≥ until: dimmed, says since when' },
      { id: 'unknown', label: 'unknown', detail: 'said, not guessed' },
      { id: 'new', label: 'A new tree', detail: 'the only way back to fresh' },
    ],
    links: [
      { from: 'read', to: 'asOf', label: 'no shelf life' },
      { from: 'read', to: 'fresh', label: 'has a shelf life' },
      { from: 'read', to: 'unknown', label: "can't tell" },
      { from: 'fresh', to: 'stale', label: 'clock passes until' },
      { from: 'stale', to: 'new', label: 'code reads again' },
    ],
  } as Node,

  text(`## Example: a gate reading the hub would send`),
  {
    type: 'Stat',
    label: '5-hour window',
    value: Reading.exact(4),
    unit: '%',
    tone: 'neutral',
  } as Node,
  text(`…drawn today with no time. With this proposal it carries \`asOf: { kind: "expires", at: "2026-10-13T16:03:00-07:00", until: "2026-10-13T16:08:00-07:00" }\` and dims itself at 16:08 with "stale since 16:08".`),

  text(`## What gets built (one lane)
- \`core\`: \`Instant\` parsing, \`Made\` and \`Freshness\` unions, the envelope's \`made\`, \`asOf\` on Stat and Chart, text forms, refusals.
- Claude Code plugin: stamps \`made\` on \`show\` and on tool-returned trees that lack one; draws ages and stale.
- \`web\`: draws ages and stale; redraws only the age labels once a minute (the data never changes).
- Checks, end to end: a model's \`made\` is refused; a naive instant is refused with what to do; the text form carries absolute times; a value past \`until\` draws stale; an old tree draws as before.`),

  text(`## Assumptions, each yours to accept or reject
1. Age labels update in place on screen (once a minute) while the tree itself stays a snapshot. That's the smallest piece of "live": the clock moves, the data doesn't.
2. Times are drawn in the viewer's local zone; the text form keeps the offset the code wrote.
3. \`asOf\` sits on the whole Stat or Chart, not per point. A time series already has its dates on x.
4. \`Table\` and \`Text\` get no times: the model writes them, and it can't see a clock.
5. When a renderer can't tell the time (no clock), it shows the absolute times only.`),
]

const root = { type: 'Group', direction: 'column', children: sections } as Node
document.body.append(render(Tree.of(root), { source: 'proposal-002', copyButton: true }))

/**
 * Proposal 001's review page, drawn with IntUI itself.
 *   bun proposals/001-certainty/build.ts   → proposals/001-certainty/dist/index.html
 */
import { Tree, type Node } from '../../packages/core/src/index'
import { render } from '../../packages/web/src/index'

const text = (markdown: string): Node => ({ type: 'Text', markdown }) as Node

const sections: Node[] = [
  text(`# 001: How sure a number is
**Proposal, for review.** Nothing is built yet.

Mackenzie, 2026-10-13 14:57: *"Oh, yea, this is a no brainer - especially seeing it in the text form that you read. You need exactly that feature."*`),

  text(`## The need
A \`Stat\` or a chart point holds a bare number, so every number looks final. Code often knows better: a log only kept the count from the start of a stream (a floor), a total was extrapolated (an estimate), or the read failed (unknown, which today can only show as 0). Today command-hub's ledger drew 216 output tokens for a run that wrote 1,400 lines, and a hand-back said 105K tokens when it was 1.57M. The code knew; the tree had nowhere to say it.

**Consumers (rule of two):** the command hub's token ledger and usage pages; any dashboard drawn with IntUI (labbook's, the plugin's own \`/intui\` numbers, which are estimates today).`),

  text(`## The type
One word, written by code next to a number it wrote. Absent means \`exact\`, so every old tree means what it meant.`),
  {
    type: 'Table',
    caption: 'Certainty: the four variants',
    columns: [
      { key: 'variant', label: 'Variant' },
      { key: 'means', label: 'Means' },
      { key: 'when', label: 'Code picks it when' },
      { key: 'drawn', label: 'Drawn as' },
      { key: 'text', label: 'Text form the model reads' },
    ],
    rows: [
      { variant: 'exact', means: 'Counted, complete', when: 'Every source was read in full', drawn: '216', text: '216 tokens' },
      { variant: 'atLeast', means: 'A floor: the real value may be higher', when: 'A source was partial (stream-start counts, a page of results)', drawn: '≥ 216', text: 'at least 216 tokens' },
      { variant: 'estimate', means: 'Inferred, not counted', when: 'Extrapolated, sampled, or priced from a guess', drawn: '~216', text: 'about 216 tokens' },
      { variant: 'unknown', means: "Couldn't be read; no value", when: 'The read failed or the source is missing', drawn: '— (unknown)', text: 'unknown' },
    ],
  } as Node,

  text(`## The schema change (all additive)
\`\`\`ts
export const CERTAINTIES =
  ["exact", "atLeast", "estimate", "unknown"] as const
export type Certainty = (typeof CERTAINTIES)[number]

// Stat
value?: number         // absent only when "unknown"
certainty?: Certainty  // default "exact"
change?: {
  value: number
  as: "amount" | "percent"
  certainty?: Certainty
}

// Chart point
{
  x: string | number
  y?: number             // absent only when "unknown"
  certainty?: Certainty
}
\`\`\``),

  {
    type: 'Table',
    caption: 'Invariants the parser enforces',
    columns: [
      { key: 'rule', label: 'Rule' },
      { key: 'why', label: 'Why' },
      { key: 'refusal', label: 'Refusal the code author reads' },
    ],
    rows: [
      { rule: 'unknown ⇔ no value', why: 'An unknown can never pass for 0, and a value can never be called unknown', refusal: 'Stat.value: a value marked "unknown" must leave value out; remove value, or say how sure it is' },
      { rule: 'Absent certainty = exact', why: 'Old trees in transcripts keep their meaning', refusal: '(none: the default)' },
      { rule: 'Still writer: "code"', why: 'Only the code that read the source knows how sure it is', refusal: 'The model is refused Stat and Chart as today' },
      { rule: 'Change has its own certainty', why: 'A change between two floors is itself unknown, and code should say so', refusal: '(none: optional, default exact)' },
    ],
  } as Node,

  text(`## How a number travels (the state machine)
Each number starts as a read in code, settles into one variant, and keeps it all the way to the screen and back to the model. No step may upgrade it: a renderer never turns a floor into an exact number, and \`toText\` never drops the word.`),
  {
    type: 'Flow',
    steps: [
      { id: 'read', label: 'Code reads its source', detail: 'log, database, API' },
      { id: 'exact', label: 'exact', detail: 'read in full' },
      { id: 'atLeast', label: 'atLeast', detail: 'read partly' },
      { id: 'estimate', label: 'estimate', detail: 'inferred' },
      { id: 'unknown', label: 'unknown', detail: 'read failed: no value' },
      { id: 'tree', label: 'Tree.of checks it', detail: 'unknown ⇔ no value' },
      { id: 'draw', label: 'Renderer draws the mark', detail: '≥  ~  —' },
      { id: 'words', label: 'toText writes the words', detail: 'at least · about · unknown' },
      { id: 'model', label: 'Model reads it back', detail: 'and repeats it honestly' },
    ],
    links: [
      { from: 'read', to: 'exact', label: 'complete' },
      { from: 'read', to: 'atLeast', label: 'partial' },
      { from: 'read', to: 'estimate', label: 'inferred' },
      { from: 'read', to: 'unknown', label: 'failed' },
      { from: 'exact', to: 'tree' },
      { from: 'atLeast', to: 'tree' },
      { from: 'estimate', to: 'tree' },
      { from: 'unknown', to: 'tree' },
      { from: 'tree', to: 'draw' },
      { from: 'tree', to: 'words' },
      { from: 'words', to: 'model' },
    ],
  } as Node,

  text(`## Fallback
A renderer that doesn't know \`certainty\` yet draws the Stat's text form, which already carries the words. Older copies of core refuse trees that use the new props (the schemas are strict); the hub and labbook build from this repo, so they update together.

## What gets built (one lane)
- \`core\`: the \`Certainty\` type, the Stat and Chart props, the invariant, the text forms.
- \`web\` and the Claude Code plugin: draw the marks; a chart breaks its line at an unknown point and marks floors and estimates.
- Checks, end to end: the model's text form says "at least" / "about" / "unknown"; a tree with value and unknown is refused with the message above; an unknown never draws as 0; an old tree draws unchanged.`),

  text(`## Assumptions, each yours to accept or reject
1. Four variants and no more: no "at most", no ranges like "between 2 and 5". Those would be a later proposal.
2. \`unknown\` carries no reason text in this version. The tool's own result can say why.
3. It's on \`Stat\` values and changes and on chart points only. \`Table\` cells stay plain, since the model writes tables.
4. The word in the text form is English ("at least", "about"), like every other text form.
5. Visible time (made at, data as of) is a separate lane after this one.`),
]

const root = { type: 'Group', direction: 'column', children: sections } as Node
document.body.append(render(Tree.of(root), { source: 'proposal-001', copyButton: true }))

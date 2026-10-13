/**
 * Proposal 001's review page, drawn with IntUI itself.
 *   bun proposals/001-certainty/build.ts   → proposals/001-certainty/dist/index.html
 */
import { Tree, type Node } from '../../packages/core/src/index'
import { render } from '../../packages/web/src/index'

const text = (markdown: string): Node => ({ type: 'Text', markdown }) as Node

const sections: Node[] = [
  text(`# 001: How sure a number is
**Accepted 2026-10-13; building.** The design moved during review: from an optional word beside the number to one tagged value.

Mackenzie, 14:57: *"Oh, yea, this is a no brainer - especially seeing it in the text form that you read. You need exactly that feature."*

Mackenzie, 15:03, on the first sketch: *"Classic production code - everything may be missing."* and *"what do you think about union types?"*

Mackenzie, 15:13, on one-key objects: *"It would be difficult to extend certainty to be anything other than semantic - if an agent is semantically unsure or wanting to hedge a figure, fine, we solved that, but what if they want to indicate a standard deviation? A p-value?"*

Mackenzie, 15:17: *"Yea, I like this model, send it"*`),

  text(`## The need
A \`Stat\` or a chart point holds a bare number, so every number looks final. Code often knows better: a log only kept the count from the start of a stream (a floor), a total was extrapolated (an estimate), or the read failed (unknown, which today can only show as 0). Today command-hub's ledger drew 216 output tokens for a run that wrote 1,400 lines, and a hand-back said 105K tokens when it was 1.57M. The code knew; the tree had nowhere to say it.

**Consumers (rule of two):** the command hub's token ledger and usage pages; any dashboard drawn with IntUI (labbook's, the plugin's own \`/intui\` numbers, which are estimates today).`),

  text(`## The type
A number becomes one value that says how sure it is. A bare number still means exact, so every old tree means what it meant. Each kind carries only its own fields, so an unknown can't hold a number and a floor can't lose its value.`),
  {
    type: 'Table',
    caption: 'Reading: the four kinds built now',
    columns: [
      { key: 'variant', label: 'Kind' },
      { key: 'means', label: 'Means' },
      { key: 'when', label: 'Code picks it when' },
      { key: 'drawn', label: 'Drawn as' },
      { key: 'text', label: 'Text form the model reads' },
    ],
    rows: [
      { variant: 'exact (or a bare number)', means: 'Counted, complete', when: 'Every source was read in full', drawn: '216', text: '216 tokens' },
      { variant: 'atLeast', means: 'A floor: the real value may be higher', when: 'A source was partial (stream-start counts, a page of results)', drawn: '≥ 216', text: 'at least 216 tokens' },
      { variant: 'estimate', means: 'Inferred, not counted', when: 'Extrapolated, sampled, or priced from a guess', drawn: '~216', text: 'about 216 tokens' },
      { variant: 'unknown', means: "Couldn't be read; no value", when: 'The read failed or the source is missing', drawn: '— (unknown)', text: 'unknown' },
    ],
  } as Node,

  text(`## The schema change (all additive)
\`\`\`ts
// On the wire: Stat.value, Stat.change.value, a Chart point's y
value: number                                  // exact (every old tree)
     | { kind: "exact";    value: number }
     | { kind: "atLeast";  value: number }
     | { kind: "estimate"; value: number }
     | { kind: "unknown" }

// Inside the code: parsed at the boundary into
type Reading =
  | { kind: "exact";    value: number }
  | { kind: "atLeast";  value: number }
  | { kind: "estimate"; value: number }
  | { kind: "unknown" }

// Built by code with constructors, never by hand:
Reading.atLeast(216)   Reading.unknown()
\`\`\`

**How it grows.** A new kind is a new member of the union, with its own fields, and the compiler points at every drawer and text form that doesn't handle it. Planned, not built: \`{ kind: "spread", value, sd, n? }\` (216 ± 12, 1 sd) and \`{ kind: "interval", low, high, level }\` (200 to 230, 95%). A p-value describes a comparison, not one number, so it belongs on a Stat's change, between two series, or on a Claim, in a proposal of its own.`),

  {
    type: 'Table',
    caption: 'Invariants the parser enforces',
    columns: [
      { key: 'rule', label: 'Rule' },
      { key: 'why', label: 'Why' },
      { key: 'refusal', label: 'Refusal the code author reads' },
    ],
    rows: [
      { rule: 'Each kind has exactly its fields', why: 'An unknown can never pass for 0; a floor can never lose its number', refusal: 'root.value: kind "unknown" has no value; remove value, or use kind "atLeast" or "estimate" if you have a number' },
      { rule: 'A bare number = exact', why: 'Old trees in transcripts keep their meaning', refusal: '(none)' },
      { rule: 'Still writer: "code"', why: 'Only the code that read the source knows how sure it is', refusal: 'The model is refused Stat and Chart as today' },
      { rule: 'Every value is its own reading', why: 'A change or one chart point can be a floor while the rest are exact', refusal: '(none)' },
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
      { id: 'tree', label: 'Tree.of parses it', detail: 'into a Reading' },
      { id: 'draw', label: 'Renderer draws the mark', detail: 'switch on kind: ≥  ~  —' },
      { id: 'words', label: 'toText writes the words', detail: 'switch on kind: at least · about · unknown' },
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
A renderer that doesn't know readings yet draws the Stat's text form, which already carries the words. Older copies of core refuse trees that use readings (the schemas are strict); the hub and labbook build from this repo, so they update together.

## What gets built (one lane)
- \`core\`: the \`Reading\` union and its constructors, the wider Stat and Chart values, the text forms.
- \`web\` and the Claude Code plugin: draw the marks; a chart breaks its line at an unknown point and marks floors and estimates.
- Checks, end to end: the model's text form says "at least" / "about" / "unknown"; an unknown with a value is refused with the message above; an unknown never draws as 0; an old tree draws unchanged.`),

  text(`## Settled in review
1. The wire uses \`kind\` plus that kind's fields; a bare number still means exact.
2. This lane builds exact, atLeast, estimate and unknown. Spread and interval are the planned way it grows, not built.
3. P-values go with comparisons, in their own proposal.

## Still open (assumptions, each yours to reject)
1. \`unknown\` carries no reason text in this version; the tool's own result can say why.
2. \`Table\` cells stay plain numbers, since the model writes tables.
3. Visible time is the lane after this one; friendlier refusals the one after that.`),
]

const root = { type: 'Group', direction: 'column', children: sections } as Node
document.body.append(render(Tree.of(root), { source: 'proposal-001', copyButton: true }))

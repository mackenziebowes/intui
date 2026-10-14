/**
 * Proposal 003's review page, drawn with IntUI itself.
 *
 * Build it with `bun docs/design/003-refusals/build.ts`, which writes docs/design/003-refusals.html (one self-contained file).
 */
import { Tree, type Node } from '../../../packages/core/src/index'
import { render } from '../../../packages/web/src/index'

const text = (markdown: string): Node => ({ type: 'Text', markdown }) as Node

const sections: Node[] = [
  text(`# 003: Refusals a model can act on
**Proposal, for review.** Nothing is built yet.

Mackenzie, 2026-10-13 15:03: *"And what do you think about adding friendlier error messages that the other agents asked for?"*`),

  text(`## The need
A model's \`show\` call that doesn't fit is refused, and the model retries from the message alone. Most messages follow the formula (what failed, which rule, what to do), but three things cost retries today:`),
  {
    type: 'Table',
    caption: 'Seen today, through Tree.parse',
    columns: [
      { key: 'wrote', label: 'The model wrote' },
      { key: 'got', label: 'It was told' },
      { key: 'cost', label: 'What that costs' },
    ],
    rows: [
      { wrote: 'A Stat with value "120"', got: 'Invalid input: expected number, received string', cost: 'A raw library message, and the wrong fix: it fixes the type, retries, and is refused again because the model may not write a Stat at all. Two wasted calls.' },
      { wrote: '{ "type": "Txt" }', got: '"Txt" isn\'t a component; use one of Text, Group, Label, Table, Chart, Stat, Flow, Choice, Form', cost: 'Right, but it has to spot the typo in a list of nine.' },
      { wrote: 'Any missing or misspelled prop', got: 'what is wrong', cost: 'Never the corrected fragment. Elm\'s compiler is loved for showing the fix next to the error; research-chat and environment asked for exactly that.' },
    ],
  } as Node,

  text(`## The types
A problem stops being a path plus a free-text message. Each kind carries what it needs, and writes its own message from those fields, so every message keeps the formula by construction.
\`\`\`ts
type Problem =
  // A component this author may not write: checked first, so the
  // node's own props aren't reported (they don't matter).
  | { kind: "notYours"; path: Path; type: string;
      // e.g. "use a Table, or a tool that returns it"
      instead: string }
  | { kind: "unknownComponent"; path: Path; got: string;
      closest?: string; known: string[] }
  | { kind: "unknownProp"; path: Path; key: string;
      closest?: string; known: string[] }
  | { kind: "missing"; path: Path; prop: string;
      expected: string; example: Json }
  | { kind: "wrongType"; path: Path; prop: string;
      expected: string; got: string; example: Json }
  // A rule a component states itself (Flow links, duplicate ids,
  // reading kinds): its own words, and its fix.
  | { kind: "rule"; path: Path; rule: string; fix: string }

// Every kind renders three parts; "try" only when there's a real fix.
type Said = { what: string; rule: string; next: string; try?: Json }
\`\`\`

\`IntuiError\` keeps \`problems\` (now with kinds) and its message text, so code that reads \`problem.path\` and \`problem.message\` keeps working. Code that wants more (the hub, the evals) can count problems by kind.`),

  {
    type: 'Table',
    caption: 'The same three cases, after',
    columns: [
      { key: 'kind', label: 'Kind' },
      { key: 'says', label: 'The model reads' },
    ],
    rows: [
      { kind: 'notYours', says: 'root (Stat): a model can\'t write a Stat, because numbers on screen must come from code that read them. Show it as a Table or in Text, or call a tool that returns the Stat.' },
      { kind: 'unknownComponent', says: 'root (Txt).type: "Txt" isn\'t a component; did you mean "Text"? Try: { "type": "Text", "markdown": "…" }' },
      { kind: 'missing', says: 'root (Choice).options: a Choice needs at least one option. Try: "options": [{ "id": "go", "label": "Go" }]' },
    ],
  } as Node,

  text(`## The state machine: one show call
The model writes, the parser refuses with every problem at once, and the model retries until it's drawn or it gives up and answers in text. A good refusal shortens this loop; the plugin's \`/intui\` already counts retries per success, so the effect shows up as a trend.`),
  {
    type: 'Flow',
    steps: [
      { id: 'write', label: 'Model writes a tree' },
      { id: 'who', label: 'Who may write it?', detail: 'checked first' },
      { id: 'shape', label: 'Does it fit?', detail: 'every problem, not the first' },
      { id: 'refused', label: 'Refused', detail: 'each problem: what, rule, next, try' },
      { id: 'drawn', label: 'Drawn', detail: 'text form returned' },
      { id: 'text', label: 'Gives up', detail: 'answers in text' },
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
  } as Node,

  text(`## Rules
- Never repair silently. A refusal teaches; it never guesses the tree the model meant and draws that (research-chat's warning about OpenUI's Autofix).
- "Did you mean" only for a close match (case-insensitive, or one or two letters off). Otherwise list the real options.
- A \`try\` fragment is always valid on its own: built from the component's own example, never invented.
- Every problem at once, so one retry can fix them all (as today).

## What gets built (one lane, all in core and the plugin's checks)
- \`problems.ts\`: the \`Problem\` union, the three-part rendering, closest-match.
- \`tree.ts\`: the writer check before the schema check, per node.
- Components keep their own rules, now as \`rule\` problems with a fix.
- Checks, end to end through \`show\`: each case in the table above reads as shown; a Stat from the model gets one problem, not its schema's.

## Assumptions, each yours to accept or reject
1. The \`try\` fragment is JSON, shown inline, short: one prop or one node, never a whole tree.
2. The message stays English prose with fixed parts, not JSON. Models read prose refusals well, and code gets the kinds from \`problems\`.
3. The plugin's \`/intui\` adds refusals by kind to its numbers, so the trend shows which kinds still cost retries.`),
]

const root = { type: 'Group', direction: 'column', children: sections } as Node
document.body.append(render(Tree.of(root), { source: 'proposal-003', copyButton: true }))

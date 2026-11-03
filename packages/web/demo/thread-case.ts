/**
 * The demo's thread case (proposal 008): a short thread, a long one and verbatim text, so a
 * person can check that a thread sits at the foot of its area, starts at its end, and that
 * verbatim text keeps its spacing. Built by code so the messages are not written out twice.
 */
import type { Node } from '@intui/core'

const message = (n: number): Node => ({
  type: 'Group',
  direction: 'column',
  ...(n % 2 === 0 ? { box: 'said' as const } : {}),
  children: [{ type: 'Text', markdown: `**${n % 2 === 0 ? 'Mackenzie' : 'Rowan'}** 18:${10 + n}  Message number ${n + 1}: a line of the chat, long enough that it wraps once in a narrow column and shows how the thread reads.` } as Node],
} as Node)

const messages = Array.from({ length: 14 }, (_, n) => message(n))
const heading = (markdown: string): Node => ({ type: 'Text', markdown, size: 'heading' } as Node)
const pane = '… 9 earlier turns\n● Bash hub task context 3003\n  ⎿ #3003 Owner header · draft 2 attached 18:04\nTwo header layouts.\n    indented by four spaces\n● Bash land status\n  ⎿ lock free\n✱ Working… (41s)'

export const threadCase: { title: string; note: string; root: Node } = {
  title: 'A thread and verbatim text',
  note: 'A thread (Group, thread) sits at the foot of its area and starts at its end; the demo bounds the area at 260 px. Verbatim text keeps its spacing and is shown as written.',
  root: {
    type: 'Group',
    direction: 'column',
    children: [
      heading('**A short thread** sits at the foot of its area'),
      { type: 'Group', direction: 'column', thread: true, children: messages.slice(0, 2) },
      heading('**A long thread** fills its area and scrolls, starting at its end'),
      { type: 'Group', direction: 'column', thread: true, children: messages },
      heading('**Verbatim**: a pane, spacing kept'),
      { type: 'Text', markdown: pane, verbatim: true },
      { type: 'Text', markdown: 'fence ``` inside\n  and `ticks`', verbatim: true, size: 'small', tone: 'muted' },
    ],
  } as Node,
}

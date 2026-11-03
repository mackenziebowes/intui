/**
 * The follow state of a thread (proposal 008): a reader is either following the end, so
 * what arrives is in view, or holding a place they scrolled to, so what arrives does not
 * move it. One transition, `step`; the thread's drawer only sends events in and reads the
 * state out. The state is kept per thread (by its page-unique id) because a host redraws
 * the tree when a message arrives, and the new element must pick up where the old one was.
 */

export type Follow = { kind: 'followed' } | { kind: 'held'; fromEnd: number }

export type FollowEvent =
  /** The reader scrolled; `fromEnd` is how far the view is from the end, in px. */
  | { kind: 'scrolled'; fromEnd: number }
  /** The thread was drawn again with its children (new ones may have arrived). */
  | { kind: 'redrawn' }

/** Within this many px of the end counts as at the end. */
const AT_END = 4

export function step(state: Follow, event: FollowEvent): Follow {
  switch (event.kind) {
    case 'scrolled':
      return event.fromEnd <= AT_END ? { kind: 'followed' } : { kind: 'held', fromEnd: event.fromEnd }
    case 'redrawn':
      return state
  }
}

/** Where `scrollTop` goes for a state, given the content and view heights. */
export function scrollTopFor(state: Follow, scrollHeight: number, clientHeight: number): number {
  return state.kind === 'followed' ? scrollHeight : Math.max(0, scrollHeight - clientHeight - state.fromEnd)
}

const remembered = new Map<string, Follow>()
export const recall = (id: string): Follow => remembered.get(id) ?? { kind: 'followed' }
export const remember = (id: string, state: Follow): void => void remembered.set(id, state)

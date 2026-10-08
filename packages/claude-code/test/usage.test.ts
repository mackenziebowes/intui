import { describe, expect, test } from 'bun:test'
import { Tree } from '@intui/core'
import {
  appended,
  MAX_ENTRIES,
  MAX_START_DAYS,
  pendingAfterAnswer,
  pendingAfterPrompt,
  pendingAfterShow,
  refusedEntry,
  retryPairs,
  shownEntry,
  startCounted,
  summary,
  type UsageEntry,
} from '../src/usage'

const tree = Tree.parse({
  v: 1,
  root: { type: 'Group', children: [{ type: 'Text', markdown: 'a' }, { type: 'Text', markdown: 'b' }, { type: 'Label', text: 'x' }] },
})
const choiceTree = Tree.parse({
  v: 1,
  root: { type: 'Choice', id: 'c', options: [{ id: 'a', label: 'A' }] },
})
const at = (iso: string) => new Date(iso)

describe('usage log', () => {
  test('counts component types and keeps no content', () => {
    const entry = shownEntry(tree, 's1', undefined, at('2026-10-07T00:00:00Z'))
    expect(entry).toEqual({ at: '2026-10-07T00:00:00.000Z', session: 's1', outcome: 'shown', types: { Group: 1, Text: 2, Label: 1 } })
    expect(JSON.stringify(entry)).not.toContain('"a"')
  })

  test('records interactive components and nodes without a native drawer', () => {
    const entry = shownEntry(choiceTree, 's', undefined, new Date(), ['Text', 'Group'])
    expect(entry.interactive).toBe(1)
    expect(entry.fallbacks).toBe(1)
  })

  test('stays capped', () => {
    let log = Array.from({ length: MAX_ENTRIES }, () => refusedEntry(1, 's', undefined))
    log = appended(log, shownEntry(tree, 's', 'a Timeline'))
    expect(log).toHaveLength(MAX_ENTRIES)
    expect(log.at(-1)?.wanted).toBe('a Timeline')
    const days = Object.fromEntries(Array.from({ length: MAX_START_DAYS }, (_, i) => [`2026-01-${String(i).padStart(2, '0')}`, 1]))
    expect(Object.keys(startCounted(days, at('2026-10-07T00:00:00Z')))).toHaveLength(MAX_START_DAYS)
  })
})

describe('retries', () => {
  test('pairs refusals with the next success in the same session, interleaved sessions apart', () => {
    const log = [
      refusedEntry(1, 'a', undefined),
      refusedEntry(1, 'b', undefined),
      refusedEntry(1, 'a', undefined),
      shownEntry(tree, 'a', undefined),
    ]
    const { recovered, abandoned } = retryPairs(log)
    expect([...recovered].sort()).toEqual([0, 2])
    expect(abandoned).toBe(1)
  })
})

describe('escapes', () => {
  test('only the person typing over a waiting Choice or Form is an escape', () => {
    const waiting = pendingAfterShow({}, 's', 2)
    expect(pendingAfterPrompt(waiting, 's', 'plugin').escaped).toBe(false)
    expect(pendingAfterPrompt(waiting, 'other', 'composer').escaped).toBe(false)
    const typed = pendingAfterPrompt(waiting, 's', 'composer')
    expect(typed.escaped).toBe(true)
    expect(pendingAfterPrompt(typed.pending, 's', 'composer').escaped).toBe(false)
  })

  test('a press or submit, or a show with nothing to answer, clears the wait', () => {
    const waiting = pendingAfterShow({}, 's', 1)
    expect(pendingAfterPrompt(pendingAfterAnswer(waiting, 's'), 's', 'composer').escaped).toBe(false)
    expect(pendingAfterPrompt(pendingAfterShow(waiting, 's', 0), 's', 'composer').escaped).toBe(false)
  })
})

describe('summary', () => {
  const now = at('2026-10-07T12:00:00Z')

  test('buckets by day over 14 days, newest first, and totals', () => {
    const log: UsageEntry[] = [
      shownEntry(tree, 's1', undefined, at('2026-09-01T10:00:00Z')),
      refusedEntry(2, 's2', undefined, at('2026-10-06T10:00:00Z')),
      shownEntry(choiceTree, 's2', 'a Timeline', at('2026-10-06T10:01:00Z'), ['Text']),
    ]
    const text = summary(log, { now, escapes: [{ at: '2026-10-06T11:00:00Z', session: 's2' }], starts: { '2026-10-06': 2 }, toolTokens: 1200 })
    const rows = text.split('\n').filter(line => /^\| 2026-/.test(line))
    expect(rows).toHaveLength(14)
    expect(rows[0]).toStartWith('| 2026-10-07 | 0 | - | - | 0 | 0 |')
    expect(rows[1]).toBe('| 2026-10-06 | 2 | 50% | 1.00 | 1 | 1 |')
    expect(text).not.toContain('2026-09-01')
    expect(text).toContain('| Show calls | 3 across 2 sessions |')
    expect(text).toContain('| Escape rate | 1 typed over 1 shows')
    expect(text).toContain('about 1200 tokens per session (estimate')
    expect(text).toContain('| Show calls per session | 1.50 over 2 recorded session starts |')
    expect(text).toContain('| Text | 2 |')
    expect(text).toContain('- a Timeline')
  })

  test('summarizes old entries that lack the newer fields, and an empty log', () => {
    const old = [{ at: '2026-10-07T00:00:00.000Z', session: 's', outcome: 'shown', types: { Text: 1 } }] as UsageEntry[]
    expect(summary(old, { now })).toContain('| Show calls | 1 across 1 session |')
    expect(summary([])).toContain('No `show` calls')
  })
})

import { describe, expect, test } from 'bun:test'
import { Tree } from '@intui/core'
import { appended, MAX_ENTRIES, refusedEntry, shownEntry, summary } from '../src/usage'

const tree = Tree.parse({
  v: 1,
  root: { type: 'Group', children: [{ type: 'Text', markdown: 'a' }, { type: 'Text', markdown: 'b' }, { type: 'Label', text: 'x' }] },
})

describe('usage log', () => {
  test('counts component types and keeps no content', () => {
    const entry = shownEntry(tree, 's1', undefined, new Date('2026-10-07T00:00:00Z'))
    expect(entry).toEqual({ at: '2026-10-07T00:00:00.000Z', session: 's1', outcome: 'shown', types: { Group: 1, Text: 2, Label: 1 } })
    expect(JSON.stringify(entry)).not.toContain('"a"')
  })

  test('stays capped', () => {
    let log = Array.from({ length: MAX_ENTRIES }, () => refusedEntry(1, 's', undefined))
    log = appended(log, shownEntry(tree, 's', 'a Timeline'))
    expect(log).toHaveLength(MAX_ENTRIES)
    expect(log.at(-1)?.wanted).toBe('a Timeline')
  })

  test('summarizes usage, refusals and wishes', () => {
    const log = [shownEntry(tree, 's1', undefined), shownEntry(tree, 's2', 'a Timeline'), refusedEntry(2, 's2', undefined)]
    const text = summary(log)
    expect(text).toContain('**3 show calls** across 2 sessions, 1 refused (33%)')
    expect(text).toContain('| Text | 4 |')
    expect(text).toContain('- a Timeline')
    expect(summary([])).toContain('No `show` calls')
  })
})

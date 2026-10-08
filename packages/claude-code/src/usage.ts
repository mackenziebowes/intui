import type { Tree } from '@intui/core'

/**
 * One `show` call, kept for evals: which components the model picked, whether
 * the tree was refused, and what it wished existed. No content is kept, only
 * shapes, so the log is safe to read and share.
 */
export type UsageEntry = {
  at: string
  session: string
  outcome: 'shown' | 'refused'
  /** Component types in the tree, with counts. Empty when refused. */
  types: Record<string, number>
  /** How many problems a refused tree had. */
  problems?: number
  /** A component the model said it needed but doesn't exist. */
  wanted?: string
}

/** Keeps the store well under its 4 MiB limit. */
export const MAX_ENTRIES = 2000

export function shownEntry(tree: Tree, session: string, wanted: string | undefined, at = new Date()): UsageEntry {
  const types: Record<string, number> = {}
  for (const { node } of tree.walk()) types[node.type] = (types[node.type] ?? 0) + 1
  return { at: at.toISOString(), session, outcome: 'shown', types, ...(wanted ? { wanted } : {}) }
}

export function refusedEntry(problems: number, session: string, wanted: string | undefined, at = new Date()): UsageEntry {
  return { at: at.toISOString(), session, outcome: 'refused', types: {}, problems, ...(wanted ? { wanted } : {}) }
}

export function appended(log: readonly UsageEntry[], entry: UsageEntry): UsageEntry[] {
  return [...log, entry].slice(-MAX_ENTRIES)
}

/** A short Markdown report of the log, for the `/intui` command. */
export function summary(log: readonly UsageEntry[]): string {
  if (log.length === 0) return 'No `show` calls recorded yet.'
  const shown = log.filter(entry => entry.outcome === 'shown')
  const refused = log.length - shown.length
  const sessions = new Set(log.map(entry => entry.session)).size
  const counts = new Map<string, number>()
  for (const entry of shown) {
    for (const [type, count] of Object.entries(entry.types)) counts.set(type, (counts.get(type) ?? 0) + count)
  }
  const ranked = [...counts].sort((a, b) => b[1] - a[1])
  const wanted = log.flatMap(entry => (entry.wanted ? [entry.wanted] : [])).slice(-10)
  const lines = [
    `**${log.length} show calls** across ${sessions} ${sessions === 1 ? 'session' : 'sessions'}, ${refused} refused (${percent(refused, log.length)}).`,
    '',
    '| Component | Times used |',
    '| --- | --- |',
    ...ranked.map(([type, count]) => `| ${type} | ${count} |`),
  ]
  if (wanted.length > 0) lines.push('', '**Wanted but missing** (latest first):', ...wanted.reverse().map(text => `- ${text}`))
  return lines.join('\n')
}

const percent = (part: number, whole: number) => `${Math.round((part / whole) * 100)}%`

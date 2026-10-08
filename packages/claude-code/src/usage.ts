import type { Tree } from '@intui/core'

/**
 * One `show` call, kept for evals: which components the model picked, whether
 * the tree was refused, and what it wished existed. No content is kept, only
 * shapes, so the log is safe to read and share. Every field after `types` is
 * optional: older entries lack them and still summarize.
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
  /** Choices and Forms in the tree, left out when none. */
  interactive?: number
  /** Nodes with no native drawer, so drawn as their text form. Left out when none. */
  fallbacks?: number
}

/** The person typed their own reply while a Choice or Form was still waiting. Shape only. */
export type EscapeEntry = { at: string; session: string }

/** Unanswered interactive components from each session's latest `show`. */
export type Pending = Record<string, number>

/** Keeps each log well under the store's 4 MiB limit (about 200 bytes an entry). */
export const MAX_ENTRIES = 2000
/** Days of session starts kept. */
export const MAX_START_DAYS = 60
export const TREND_DAYS = 14

const INTERACTIVE = new Set(['Choice', 'Form'])
/** Prompt origins that are the person typing, at the terminal or through the phone/web bridge. */
const PERSON = new Set(['composer', 'bridge'])

export function shownEntry(
  tree: Tree,
  session: string,
  wanted: string | undefined,
  at = new Date(),
  drawnNatively?: Iterable<string>,
): UsageEntry {
  const types: Record<string, number> = {}
  for (const { node } of tree.walk()) types[node.type] = (types[node.type] ?? 0) + 1
  const native = drawnNatively ? new Set(drawnNatively) : undefined
  const interactive = sum(Object.entries(types).filter(([type]) => INTERACTIVE.has(type)).map(([, n]) => n))
  const fallbacks = native ? sum(Object.entries(types).filter(([type]) => !native.has(type)).map(([, n]) => n)) : 0
  return {
    at: at.toISOString(),
    session,
    outcome: 'shown',
    types,
    ...(interactive ? { interactive } : {}),
    ...(fallbacks ? { fallbacks } : {}),
    ...(wanted ? { wanted } : {}),
  }
}

export function refusedEntry(problems: number, session: string, wanted: string | undefined, at = new Date()): UsageEntry {
  return { at: at.toISOString(), session, outcome: 'refused', types: {}, problems, ...(wanted ? { wanted } : {}) }
}

export function appended<T>(log: readonly T[], entry: T): T[] {
  return [...log, entry].slice(-MAX_ENTRIES)
}

/** Counts a session start under its UTC day, dropping the oldest days past the cap. */
export function startCounted(starts: Record<string, number>, at = new Date()): Record<string, number> {
  const day = dayOf(at.toISOString())
  const next = { ...starts, [day]: (starts[day] ?? 0) + 1 }
  return Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)).slice(-MAX_START_DAYS))
}

/** After a `show`: remember how many Choices and Forms await an answer, or forget if none. */
export function pendingAfterShow(pending: Pending, session: string, interactive: number): Pending {
  const { [session]: _old, ...rest } = pending
  return interactive > 0 ? { ...rest, [session]: interactive } : rest
}

/** A press or submit answers what the latest `show` offered. */
export function pendingAfterAnswer(pending: Pending, session: string): Pending {
  const { [session]: _old, ...rest } = pending
  return rest
}

/**
 * A prompt arrived. It is an escape when the person (not a plugin, task or
 * peer) typed it while something was waiting. Either way a typed prompt ends the wait.
 */
export function pendingAfterPrompt(pending: Pending, session: string, originKind: string): { escaped: boolean; pending: Pending } {
  if (!PERSON.has(originKind) || !pending[session]) return { escaped: false, pending }
  return { escaped: true, pending: pendingAfterAnswer(pending, session) }
}

/**
 * Pairs refusals with the next success in the same session. Returns the
 * indexes of refused entries a later success followed, and how many refusals
 * never got one.
 */
export function retryPairs(log: readonly UsageEntry[]): { recovered: Set<number>; abandoned: number } {
  const open = new Map<string, number[]>()
  const recovered = new Set<number>()
  log.forEach((entry, index) => {
    if (entry.outcome === 'refused') open.set(entry.session, [...(open.get(entry.session) ?? []), index])
    else {
      for (const i of open.get(entry.session) ?? []) recovered.add(i)
      open.delete(entry.session)
    }
  })
  return { recovered, abandoned: sum([...open.values()].map(run => run.length)) }
}

export type SummaryInput = {
  escapes?: readonly EscapeEntry[]
  /** Session starts per UTC day. */
  starts?: Record<string, number>
  /** Estimated tokens the pinned tool adds to every session. */
  toolTokens?: number
  now?: Date
}

/** A Markdown trend report of the log, for the `/intui` command. */
export function summary(log: readonly UsageEntry[], input: SummaryInput = {}): string {
  if (log.length === 0) return 'No `show` calls recorded yet.'
  const now = input.now ?? new Date()
  const escapes = input.escapes ?? []
  const starts = input.starts ?? {}
  const { recovered, abandoned } = retryPairs(log)
  const shown = log.filter(entry => entry.outcome === 'shown')
  const refused = log.length - shown.length
  const sessions = new Set(log.map(entry => entry.session)).size

  const days = lastDays(now, TREND_DAYS)
  const rows = days.map(day => {
    const calls = log.filter(entry => dayOf(entry.at) === day)
    const ok = calls.filter(entry => entry.outcome === 'shown')
    const retried = log.filter((entry, i) => dayOf(entry.at) === day && recovered.has(i)).length
    return {
      day,
      calls: calls.length,
      refused: calls.length - ok.length,
      ok: ok.length,
      retried,
      escapes: escapes.filter(escape => dayOf(escape.at) === day).length,
      fallbacks: sum(ok.map(entry => entry.fallbacks ?? 0)),
    }
  })

  const interactiveShows = shown.filter(entry => (entry.interactive ?? 0) > 0).length
  const startCount = sum(Object.values(starts))
  const lines = [
    `**Last ${TREND_DAYS} days** (UTC, newest first). Read as a trend, not a gate.`,
    '',
    '| Day | Calls | Refused | Retries per success | Escapes | Fallbacks |',
    '| --- | --- | --- | --- | --- | --- |',
    ...rows
      .reverse()
      .map(r => `| ${r.day} | ${r.calls} | ${r.calls ? percent(r.refused, r.calls) : '-'} | ${ratio(r.retried, r.ok)} | ${r.escapes} | ${r.fallbacks} |`),
    '',
    '**Totals**',
    '',
    '| Signal | Value |',
    '| --- | --- |',
    `| Show calls | ${log.length} across ${sessions} ${sessions === 1 ? 'session' : 'sessions'} |`,
    `| Refused | ${refused} (${percent(refused, log.length)}) |`,
    `| Retries per success | ${ratio(recovered.size, shown.length)} (${abandoned} refused with no later success) |`,
    `| Escape rate | ${escapes.length} typed over ${interactiveShows} shows with a Choice or Form (${interactiveShows ? percent(escapes.length, interactiveShows) : '-'}) |`,
    `| Fallbacks | ${sum(shown.map(entry => entry.fallbacks ?? 0))} nodes drawn as text because no drawer exists (width-based fallbacks are not observable) |`,
    `| Pinned tool cost | ${input.toolTokens === undefined ? 'unknown' : `about ${input.toolTokens} tokens per session (estimate, ~4 characters per token)`} |`,
    `| Show calls per session | ${startCount ? (log.length / startCount).toFixed(2) : '-'} over ${startCount} recorded session starts |`,
  ]

  const counts = new Map<string, number>()
  for (const entry of shown) for (const [type, count] of Object.entries(entry.types)) counts.set(type, (counts.get(type) ?? 0) + count)
  const ranked = [...counts].sort((a, b) => b[1] - a[1])
  lines.push('', '| Component | Times used |', '| --- | --- |', ...ranked.map(([type, count]) => `| ${type} | ${count} |`))

  const wanted = log.flatMap(entry => (entry.wanted ? [entry.wanted] : [])).slice(-10)
  if (wanted.length > 0) lines.push('', '**Wanted but missing** (latest first):', ...wanted.reverse().map(text => `- ${text}`))
  return lines.join('\n')
}

const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0)
const dayOf = (iso: string) => iso.slice(0, 10)
const percent = (part: number, whole: number) => `${Math.round((part / whole) * 100)}%`
const ratio = (part: number, whole: number) => (whole ? (part / whole).toFixed(2) : '-')
const lastDays = (now: Date, count: number) =>
  Array.from({ length: count }, (_, i) => new Date(now.getTime() - (count - 1 - i) * 86_400_000).toISOString().slice(0, 10))

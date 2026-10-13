import { never, shownNumber, type CellValue, type ChangeReading, type ReadingKind, type TableColumn } from '@intui/core'
import { formatValue, type ChartModel } from './chart-scale'

/** Columns whose present values are all numbers align right unless the column says otherwise. */
export function alignOf(column: TableColumn, rows: Record<string, CellValue>[]): 'start' | 'end' {
  if (column.align) return column.align
  const values = rows.map(row => row[column.key]).filter(value => value !== null && value !== undefined)
  return values.length > 0 && values.every(value => typeof value === 'number') ? 'end' : 'start'
}

export type NumberInput = { kind: 'value'; value: number } | { kind: 'cleared' } | { kind: 'invalid'; note: string }

const NUMBER = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i

/** Reads what was typed into a number field. Never throws. */
export function parseNumber(raw: string): NumberInput {
  const trimmed = raw.trim()
  if (trimmed === '') return { kind: 'cleared' }
  const value = NUMBER.test(trimmed) ? Number(trimmed) : NaN
  return Number.isFinite(value) ? { kind: 'value', value } : { kind: 'invalid', note: `"${trimmed.slice(0, 20)}" is not a number` }
}

/** What a chart says for a reader who can't see it, including points that are floors, estimates or unknown. */
export function chartLabel(model: ChartModel, title?: string): string {
  const parts = model.series.map(s => {
    const values = s.values.filter((v): v is number => v !== undefined)
    const range = values.length > 0 ? `from ${formatValue(Math.min(...values))} to ${formatValue(Math.max(...values))}` : 'has no readable values'
    const count = (kind: ReadingKind) => s.kinds.filter(k => k === kind).length
    const notes = [
      count('atLeast') > 0 ? `${count('atLeast')} at least` : '',
      count('estimate') > 0 ? `${count('estimate')} about` : '',
      count('unknown') > 0 ? `${count('unknown')} unknown` : '',
    ].filter(Boolean)
    return `${s.label} ${range}${notes.length > 0 ? ` (${notes.join(', ')})` : ''}`
  })
  const markers = model.markers.length > 0 ? `; markers: ${model.markers.map(m => `${m.at} ${m.label}`).join(', ')}` : ''
  return `${model.kind} chart${title ? ` "${title}"` : ''}${model.unit ? ` in ${model.unit}` : ''}: ${parts.join('; ')}${markers}`
}

/** The marks a renderer puts before a number: a floor and an estimate say so; an exact number and an unknown wear none. */
export const READING_MARK = { exact: '', atLeast: '≥ ', estimate: '~', unknown: '' } as const satisfies Record<ReadingKind, string>

/**
 * How a Stat's change draws: which way it points (none when the reading can't say) and the
 * figure beside it. A floor below zero has no direction (it may still be positive), so it
 * keeps its sign instead of an arrow. Whether it is good news is the tone's job.
 */
export function changeShape(change: ChangeReading): { way?: 'up' | 'down' | 'flat'; figure?: number; kind: ReadingKind } {
  const r = change.value
  switch (r.kind) {
    case 'unknown':
      return { kind: 'unknown' }
    case 'atLeast':
      return shownNumber(r.value) > 0 ? { way: 'up', figure: shownNumber(r.value), kind: 'atLeast' } : { figure: shownNumber(r.value), kind: 'atLeast' }
    case 'exact':
    case 'estimate': {
      // Direction follows the figure as shown: a change that rounds to 0 is flat.
      const shown = shownNumber(r.value)
      return { way: shown > 0 ? 'up' : shown < 0 ? 'down' : 'flat', figure: Math.abs(shown), kind: r.kind }
    }
    default:
      return never(r)
  }
}

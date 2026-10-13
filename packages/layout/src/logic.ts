import type { CellValue, Change, TableColumn } from '@intui/core'
import { formatValue, type ChartModel } from './chart-scale'

/** What the chart says for a reader who can't see it. */
export function describeChart(model: ChartModel, title?: string): string {
  const parts = model.series.map(s => {
    const values = s.values.filter((v): v is number => v !== undefined)
    return `${s.label} from ${formatValue(Math.min(...values))} to ${formatValue(Math.max(...values))}`
  })
  const markers = model.markers.length > 0 ? `; markers: ${model.markers.map(m => `${m.at} ${m.label}`).join(', ')}` : ''
  return `${model.kind} chart${title ? ` "${title}"` : ''}${model.unit ? ` in ${model.unit}` : ''}: ${parts.join('; ')}${markers}`
}

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

/** Which way a change went. Direction only: whether it is good news is the tone's job. */
export function direction(change: Change): 'up' | 'down' | 'flat' {
  return change.value > 0 ? 'up' : change.value < 0 ? 'down' : 'flat'
}

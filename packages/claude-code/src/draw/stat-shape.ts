import type { Change } from '@intui/core'
import { fit } from './label-shape'

const numbers = new Intl.NumberFormat('en', { maximumFractionDigits: 2 })

/** Same formatting as the text form in @intui/core (which doesn't export it). */
export function formatNumber(value: number, unit?: string): string {
  const formatted = numbers.format(value)
  if (!unit) return formatted
  return unit === '%' ? `${formatted}%` : `${formatted} ${unit}`
}

/** Which way a change went. Direction only: whether it is good news is the tone's job. */
export function direction(change: Change): 'up' | 'down' | 'flat' {
  return change.value > 0 ? 'up' : change.value < 0 ? 'down' : 'flat'
}

const MARKER = { up: '▲', down: '▼', flat: '–' } as const

/** The change line, such as `▲ 18%` or `▼ 3 ms`. The marker shows direction; the size has no sign. */
export function changeText(change: Change): string {
  const size = formatNumber(Math.abs(change.value), change.as === 'percent' ? '%' : undefined)
  return `${MARKER[direction(change)]} ${size}`
}

/** The three lines of a Stat, each cut to the room. */
export function statLines(
  props: { label: string; value: number; unit?: string; change?: Change },
  columns: number,
): { label: string; value: string; change?: string } {
  return {
    label: fit(props.label, columns),
    value: fit(formatNumber(props.value, props.unit), columns),
    change: props.change ? fit(changeText(props.change), columns) : undefined,
  }
}

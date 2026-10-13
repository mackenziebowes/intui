import { formatNumber, type Change } from '@intui/core'
import { direction } from '@intui/layout'
import { fit } from './label-shape'

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

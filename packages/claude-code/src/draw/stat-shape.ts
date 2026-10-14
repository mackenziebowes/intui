/**
 * The lines of a Stat as strings: the label, the value with its unit, and the change with
 * a direction marker, each cut to the room. A floor reads `≥`, an estimate `~`, and a
 * number we don't have reads `unknown`, never 0.
 */
import { formatNumber, type ChangeReading, type Reading } from '@intui/core'
import { changeShape, READING_MARK } from '@intui/layout'
import { fit } from './label-shape'

const MARKER = { up: '▲', down: '▼', flat: '–' } as const

/** A reading as one string: `≥ 216 tokens`, `~216`, or `— unknown`. Never a bare 0 for a number we don't have. */
export function readingLine(reading: Reading, unit?: string): string {
  switch (reading.kind) {
    case 'exact':
    case 'atLeast':
    case 'estimate':
      return `${READING_MARK[reading.kind]}${formatNumber(reading.value, unit)}`
    case 'unknown':
      return '— unknown'
    default:
      return reading satisfies never
  }
}

/** The change line, such as `▲ 18%`, `▲ ≥ 4%` or `▼ 3 ms`. The marker shows direction; the size has no sign. */
export function changeText(change: ChangeReading): string {
  const shape = changeShape(change)
  const unit = change.as === 'percent' ? '%' : undefined
  const figure = readingLine(shape.figure === undefined ? change.value : { kind: shape.kind, value: shape.figure } as Reading, unit)
  return shape.way ? `${MARKER[shape.way]} ${figure}` : figure
}

/** The three lines of a Stat, each cut to the room. */
export function statLines(
  props: { label: string; value: Reading; unit?: string; change?: ChangeReading },
  columns: number,
): { label: string; value: string; change?: string } {
  return {
    label: fit(props.label, columns),
    value: fit(readingLine(props.value, props.unit), columns),
    change: props.change ? fit(changeText(props.change), columns) : undefined,
  }
}

/**
 * Text pieces of the Flow drawer in character cells: cutting and wrapping text, and the lines inside
 * one step's box.
 */
import type { FlowStep } from '@intui/core'

/** Cuts text to `width` cells, ending in an ellipsis when it was cut. */
export function truncate(text: string, width: number): string {
  const chars = [...text]
  if (chars.length <= width) return text
  return width <= 1 ? chars.slice(0, Math.max(width, 0)).join('') : `${chars.slice(0, width - 1).join('')}…`
}

/** Wraps text at spaces into lines of at most `width` cells; a word longer than that is broken. */
export function wrap(text: string, width: number): string[] {
  const room = Math.max(1, width)
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/).filter(Boolean)) {
    let rest = [...word]
    while (rest.length > room) {
      if (line) lines.push(line)
      line = ''
      lines.push(rest.slice(0, room).join(''))
      rest = rest.slice(room)
    }
    const piece = rest.join('')
    if (!line) line = piece
    else if ([...line].length + 1 + rest.length <= room) line += ` ${piece}`
    else {
      lines.push(line)
      line = piece
    }
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

export type LineKind = 'title' | 'detail' | 'note'
export type BoxLine = { text: string; kind: LineKind }

/** The lines inside one step's box: label, detail, and any link back to an earlier step. */
export function boxLines(step: FlowStep, notes: readonly string[], cap: number): BoxLine[] {
  return [
    ...wrap(step.label, cap).map(text => ({ text, kind: 'title' as const })),
    ...(step.detail ? wrap(step.detail, cap).map(text => ({ text, kind: 'detail' as const })) : []),
    ...notes.flatMap(note => wrap(note, cap).map(text => ({ text, kind: 'note' as const }))),
  ]
}

export const boxWidth = (lines: readonly BoxLine[]) => Math.max(...lines.map(line => [...line.text].length)) + 4

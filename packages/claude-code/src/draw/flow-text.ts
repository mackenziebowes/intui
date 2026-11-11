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

/**
 * A label wrapped at `width` cells with even lines and never a lone word on the last line, unless
 * the label is one word or a word is wider than `width` (then the greedy `wrap`).
 */
export function wrapEven(text: string, width: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const len = (s: string) => [...s].length
  if (words.length < 2 || words.some(w => len(w) > width)) return wrap(text, width)
  const n = words.length
  const best: number[] = Array(n + 1).fill(Infinity)
  const from: number[] = Array(n + 1).fill(0)
  best[0] = 0
  for (let j = 1; j <= n; j++) {
    for (let i = j - 1; i >= 0; i--) {
      const size = len(words.slice(i, j).join(' '))
      if (size > width) break
      const last = j === n
      // Slack squared evens the lines; a lone word on the last line costs more than any slack; each line costs a little.
      const cost = (last ? 0 : (width - size) ** 2) + (last && j - i === 1 && n > 1 ? width ** 2 * 100 : 0) + (width * width) / 4
      if (best[i]! + cost < best[j]!) [best[j], from[j]] = [best[i]! + cost, i]
    }
  }
  const lines: string[] = []
  for (let j = n; j > 0; j = from[j]!) lines.unshift(words.slice(from[j]!, j).join(' '))
  return lines
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

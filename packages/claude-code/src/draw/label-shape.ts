/** Cuts text to fit a width in character cells, ending in an ellipsis when it had to cut. */
export function fit(text: string, columns: number): string {
  const room = Math.max(1, columns)
  const chars = [...text]
  if (chars.length <= room) return text
  return room === 1 ? '…' : chars.slice(0, room - 1).join('') + '…'
}

/** A Label's tag text: the text in brackets, as its text form shows it, cut to the room. */
export function tagText(text: string, columns: number): string {
  if (columns < 3) return fit(text, columns)
  return `[${fit(text, columns - 2)}]`
}

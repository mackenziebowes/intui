import type { Tone } from '@intui/core'

/**
 * How each tone looks in Claude Code. The one place colors are chosen, so every
 * drawer agrees and a change of palette is one edit.
 */
export const TONE_COLOR: Record<Tone, string | undefined> = {
  neutral: undefined,
  positive: 'green',
  warning: 'yellow',
  critical: 'red',
  muted: undefined,
}

export const isDim = (tone: Tone) => tone === 'muted'

/** The accent for primary actions and a chart's main series. */
export const ACCENT = 'cyan'

/**
 * Hex colors for Svg surfaces, where named terminal colors don't apply.
 * `QUIET` is for axes, grid lines, secondary text and baselines.
 */
export const SVG = {
  accent: '#1fa2b8',
  quiet: '#888888',
} as const

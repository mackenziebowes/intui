import type { ChartProps } from '@intui/core'
import type { ElementTable } from 'claude-code'
import { defineDrawer } from './drawer'
import { buildModel } from './chart-scale'
import { buildSvg, describe, type SvgColors } from './chart-svg'
import { legendRows, markerRows, plotRows, type Row, type Style } from './chart-text'
import { ACCENT, SVG, TONE_COLOR } from './theme'

/** Narrower than this the plot has no room, so the chart is its text form. */
const MIN_COLUMNS = 30
/** A character cell is about this many CSS pixels wide on the Svg surfaces. */
const PIXELS_PER_COLUMN = 8
const MAX_SVG_WIDTH = 720

/** Svg surfaces take hex colors from theme.ts. */
const SVG_COLORS: SvgColors = {
  primary: SVG.accent,
  baseline: SVG.quiet,
  comparison: SVG.accent,
  marker: SVG.warning,
  quiet: SVG.quiet,
}

type TextStyle = { color?: string; dimColor?: boolean; bold?: boolean }

/** How each run style looks in the terminal's Text. */
const TEXT_STYLE: Record<Style, TextStyle> = {
  primary: { color: ACCENT },
  comparison: { color: ACCENT, dimColor: true },
  baseline: { dimColor: true },
  guide: { dimColor: true },
  axis: { dimColor: true },
  marker: { color: TONE_COLOR.warning },
  plain: {},
}

const hasSvg = (el: ElementTable): el is Extract<ElementTable, { Svg: unknown }> => 'Svg' in el

export const chart = defineDrawer<ChartProps>({
  type: 'Chart',
  draw: (props, { el, columns, text, surface }) => {
    const fallback = <el.Markdown text={text(props)} />
    if (columns < MIN_COLUMNS) return fallback
    const model = buildModel(props)
    const asRows = (rows: Row[]) =>
      rows.map(row => (
        <el.Box flexDirection="row">
          {row.map(run => (
            <el.Text {...TEXT_STYLE[run.style]}>{run.text}</el.Text>
          ))}
        </el.Box>
      ))
    let plot: unknown
    if (surface === 'terminal' || !hasSvg(el)) {
      const rows = plotRows(model, columns)
      if (!rows) return fallback
      plot = asRows(rows)
    } else {
      const width = Math.min(columns * PIXELS_PER_COLUMN, MAX_SVG_WIDTH)
      plot = <el.Svg source={buildSvg(model, width, Math.round(width * 0.45), SVG_COLORS)} alt={describe(model, props.title)} />
    }
    return (
      <el.Box flexDirection="column">
        {props.title ? <el.Text bold>{props.title}</el.Text> : null}
        {asRows(legendRows(model, columns))}
        {plot as never}
        {asRows(markerRows(model))}
      </el.Box>
    )
  },
})

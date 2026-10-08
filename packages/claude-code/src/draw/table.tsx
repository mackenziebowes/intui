import type { TableProps } from '@intui/core'
import { defineDrawer } from './drawer'
import { layoutTable } from './table-layout'

export const table = defineDrawer<TableProps>({
  type: 'Table',
  draw: (props, { el, columns, key }) => {
    const layout = layoutTable(props.columns, props.rows, columns)
    const caption = props.caption ? <el.Text key={key('caption')} dimColor wrap="truncate">{props.caption}</el.Text> : null
    if (layout.kind === 'stacked') {
      return (
        <el.Box flexDirection="column" gap={1}>
          {caption}
          {layout.blocks.map((lines, r) => (
            <el.Box key={key('row', String(r))} flexDirection="column">
              {lines.map((line, i) => (
                <el.Text key={key('row', String(r), String(i))} wrap="truncate">{line}</el.Text>
              ))}
            </el.Box>
          ))}
        </el.Box>
      )
    }
    return (
      <el.Box flexDirection="column">
        {caption}
        <el.Text key={key('header')} bold wrap="truncate">{layout.header}</el.Text>
        <el.Text key={key('rule')} dimColor wrap="truncate">{layout.separator}</el.Text>
        {layout.rows.map((line, r) => (
          <el.Text key={key('row', String(r))} wrap="truncate">{line}</el.Text>
        ))}
      </el.Box>
    )
  },
})

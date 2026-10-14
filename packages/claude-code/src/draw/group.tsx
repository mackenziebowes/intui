/**
 * The Group drawer for Claude Code: its children in a row or a column, with a row stacking
 * into a column when the width is too narrow for it.
 */
import type { GroupProps } from '@intui/core'
import { defineDrawer } from './drawer'

/** Below this width a row stacks into a column, as on a phone. */
const ROW_MIN_COLUMNS = 60

export const group = defineDrawer<GroupProps>({
  type: 'Group',
  draw: (props, { el, columns, child }) => {
    const isRow = props.direction === 'row' && columns >= ROW_MIN_COLUMNS
    const each = isRow ? Math.floor(columns / props.children.length) - 2 : columns
    return (
      <el.Box flexDirection={isRow ? 'row' : 'column'} gap={isRow ? 2 : 1} flexWrap={isRow ? 'wrap' : 'nowrap'}>
        {props.children.map(node => child(node, each))}
      </el.Box>
    )
  },
})

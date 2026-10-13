import { cellText, formatNumber, type GroupProps, type LabelProps, type StatProps, type TableProps, type TextProps } from '@intui/core'
import type { Drawer } from '../dom'
import { alignOf, direction } from '@intui/layout'
import { markdownToHtml } from '../markdown'

export const text: Drawer<TextProps> = (props, { dom }) => dom.html('div', { class: 'intui-text' }, markdownToHtml(props.markdown))

export const group: Drawer<GroupProps> = (props, { dom, child }) =>
  dom.el('div', { class: `intui-group intui-group--${props.direction}` }, ...props.children.map(child))

export const label: Drawer<LabelProps> = (props, { dom }) =>
  dom.el('span', { class: `intui-label intui-tone-${props.tone}` }, props.text)

const ARROW = { up: 'M5 1 9 8H1Z', down: 'M5 9 1 2H9Z', flat: 'M1 4h8v2H1Z' } as const
const SPOKEN = { up: 'up', down: 'down', flat: 'unchanged,' } as const

export const stat: Drawer<StatProps> = (props, { dom }) => {
  const value = dom.el('data', { value: props.value }, formatNumber(props.value, props.unit))
  const change = props.change
    ? (() => {
        const way = direction(props.change)
        const size = formatNumber(Math.abs(props.change.value), props.change.as === 'percent' ? '%' : undefined)
        return dom.el(
          'p',
          { class: 'intui-stat-change' },
          dom.svg('svg', { viewBox: '0 0 10 10', width: 10, height: 10, 'aria-hidden': 'true' }, dom.svg('path', { d: ARROW[way] })),
          dom.el('span', { class: 'intui-sr' }, `${SPOKEN[way]} `),
          size,
        )
      })()
    : null
  return dom.el(
    'div',
    { class: `intui-stat intui-tone-${props.tone}` },
    dom.el('p', { class: 'intui-stat-label' }, props.label),
    dom.el('p', { class: 'intui-stat-value' }, value),
    change,
  )
}

/** Tables with this many columns turn into one card per row in a narrow column. */
const STACK_FROM = 3

export const table: Drawer<TableProps> = (props, { dom }) => {
  const aligns = props.columns.map(column => alignOf(column, props.rows))
  const cls = (i: number) => (aligns[i] === 'end' ? 'is-end' : undefined)
  const head = dom.el(
    'thead',
    {},
    dom.el('tr', {}, ...props.columns.map((column, i) => dom.el('th', { scope: 'col', class: cls(i) }, column.label))),
  )
  const body = dom.el(
    'tbody',
    {},
    ...props.rows.map(row =>
      dom.el(
        'tr',
        {},
        ...props.columns.map((column, i) => dom.el('td', { class: cls(i), 'data-label': column.label }, cellText(row[column.key]))),
      ),
    ),
  )
  const empty = props.rows.length === 0 ? dom.el('p', { class: 'intui-empty' }, 'No rows.') : null
  const caption = props.caption ? dom.el('caption', {}, props.caption) : null
  const stackable = props.columns.length >= STACK_FROM ? ' intui-table--stackable' : ''
  return dom.el(
    'div',
    { class: `intui-table${stackable}` },
    dom.el('div', { class: 'intui-table-scroll', tabindex: 0, role: 'region', 'aria-label': props.caption ?? 'Table' }, dom.el('table', {}, caption, head, body)),
    empty,
  )
}

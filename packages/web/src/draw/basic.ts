/**
 * The browser drawers for the display components: Text, Group, Label, Stat and Table. A
 * table with many columns becomes one card per row when narrow, and a Stat's reading wears
 * its floor or estimate mark with words a screen reader says.
 */
import { recall, remember, scrollTopFor, step } from '../follow'
import { cellOf, cellText, formatNumber, never, type Reading, type GroupProps, type LabelProps, type StatProps, type TableProps, type TextProps } from '@intui/core'
import type { Dom, DrawContext, Drawer } from '../dom'
import { alignOf, changeShape, READING_MARK } from '@intui/layout'
import { markdownToHtml } from '../markdown'

/** Body and neutral are the plain look and add no class, so a Text that sets neither draws as it always did. */
export const text: Drawer<TextProps> = (props, { dom }) => {
  const size = props.size && props.size !== 'body' ? ` intui-text--${props.size}` : ''
  const tone = props.tone && props.tone !== 'neutral' ? ` intui-text-tone intui-tone-${props.tone}` : ''
  // Verbatim: spacing and line breaks are part of what it says, and the markdown is shown as written.
  const who = props.who ? { 'data-who': props.who } : {}
  if (props.verbatim) return dom.el('div', { class: `intui-text intui-text--verbatim${size}${tone}`, ...who }, props.markdown)
  return dom.html('div', { class: `intui-text${size}${tone}`, ...who }, markdownToHtml(props.markdown))
}

export const group: Drawer<GroupProps> = (props, { dom, child, uid, onWidth }) => {
  const sized = props.direction === 'row' && props.widths !== undefined
  const divided = props.divider === true
  const kids = props.children.map((node, index) => {
    const element = child(node, index)
    if (sized && element instanceof HTMLElement) {
      const width = props.widths![index]
      element.style.setProperty('--intui-w', width === 'rest' ? '0px' : `${width}px`)
      element.style.setProperty('--intui-grow', width === 'rest' ? '1' : '0')
      element.style.setProperty('--intui-min', `${props.floors?.[index] ?? 0}px`)
    }
    return element
  })
  const parts = divided ? kids.flatMap((element, index) => (index === 0 ? [element] : [dom.el('span', { class: 'intui-divider', 'aria-hidden': true }), element])) : kids
  const classes = ['intui-group', `intui-group--${props.direction}`, sized ? 'intui-group--sized' : '', divided ? 'intui-group--divided' : '', props.box === undefined ? '' : `intui-box--${props.box}`]
  const threaded = props.thread === true
  if (threaded) classes.push('intui-group--thread')
  if (props.foot === true) classes.push('intui-group--foot')
  if (props.idle === true) classes.push('intui-group--idle')
  const element = dom.el('div', { class: classes.filter(Boolean).join(' '), ...(props.who ? { 'data-who': props.who } : {}) }, ...parts)
  if (threaded) followEnd(element, uid('thread'), onWidth)
  return element
}

/** A thread starts at the end and stays there until the reader scrolls away; see follow.ts. */
function followEnd(element: HTMLElement, id: string, onWidth: DrawContext['onWidth']): void {
  let state = recall(id)
  let placing = false
  element.addEventListener('scroll', () => {
    if (placing) return
    state = step(state, { kind: 'scrolled', fromEnd: element.scrollHeight - element.clientHeight - element.scrollTop })
    remember(id, state)
  })
  // Runs when the element is on the page and whenever its size changes, so late content keeps the place.
  onWidth(element, () => {
    state = step(state, { kind: 'redrawn' })
    placing = true
    element.scrollTop = scrollTopFor(state, element.scrollHeight, element.clientHeight)
    placing = false
  })
}

export const label: Drawer<LabelProps> = (props, { dom }) =>
  dom.el('span', { class: `intui-label intui-tone-${props.tone}`, ...(props.who ? { 'data-who': props.who } : {}) }, props.text)

const ARROW = { up: 'M5 1 9 8H1Z', down: 'M5 9 1 2H9Z', flat: 'M1 4h8v2H1Z' } as const
const SPOKEN = { up: 'up', down: 'down', flat: 'unchanged,' } as const

const SPOKEN_KIND = { exact: '', atLeast: 'at least ', estimate: 'about ', unknown: '' } as const

/** A reading as a drawn figure: its mark, the number, and the words a screen reader says. */
function figure(dom: Dom, text: string, reading: Reading): HTMLElement[] {
  switch (reading.kind) {
    case 'exact':
    case 'atLeast':
    case 'estimate':
      return [
        dom.el('span', { class: 'intui-sr' }, SPOKEN_KIND[reading.kind]),
        dom.el('span', { class: 'intui-reading-mark', 'aria-hidden': 'true' }, READING_MARK[reading.kind]),
        dom.el('data', { value: reading.value }, text),
      ]
    case 'unknown':
      return [dom.el('span', { class: 'intui-reading-none', 'aria-hidden': 'true' }, '—'), dom.el('span', { class: 'intui-reading-word' }, ' unknown')]
    default:
      return never(reading)
  }
}

export const stat: Drawer<StatProps> = (props, { dom }) => {
  const readingText = props.value.kind === 'unknown' ? '' : formatNumber(props.value.value, props.unit)
  const value = dom.el('span', { class: 'intui-reading', 'data-reading': props.value.kind }, ...figure(dom, readingText, props.value))
  const change = props.change
    ? (() => {
        const shape = changeShape(props.change)
        const unit = props.change.as === 'percent' ? '%' : undefined
        const text = shape.figure === undefined ? '' : formatNumber(shape.figure, unit)
        const arrow = shape.way
          ? [
              dom.svg('svg', { viewBox: '0 0 10 10', width: 10, height: 10, 'aria-hidden': 'true' }, dom.svg('path', { d: ARROW[shape.way] })),
              dom.el('span', { class: 'intui-sr' }, SPOKEN[shape.way] + ' '),
            ]
          : []
        return dom.el(
          'p',
          { class: 'intui-stat-change', 'data-reading': shape.kind },
          ...arrow,
          dom.el('span', { class: 'intui-reading' }, ...figure(dom, text, props.change.value)),
        )
      })()
    : null
  return dom.el(
    'div',
    { class: `intui-stat intui-tone-${props.tone}` },
    dom.el('p', { class: 'intui-stat-label' }, props.label),
    dom.el('p', { class: 'intui-stat-value' }, value),
    change,
    props.note ? dom.el('p', { class: 'intui-stat-note' }, props.note) : null,
  )
}

/** Tables with this many columns turn into one card per row in a narrow column. */
const STACK_FROM = 3

/** A cell of one word this short stays whole: a hyphen or slash is a break point, so a table squeezed by a long text column would otherwise split `command-hub` across two lines. */
const TOKEN_MAX = 28
const isToken = (text: string) => text.length <= TOKEN_MAX && !/\s/.test(text)

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
        ...props.columns.map((column, i) => {
          const text = cellText(cellOf(row, column.key))
          return dom.el('td', { class: [cls(i), isToken(text) ? 'is-token' : undefined].filter(Boolean).join(' ') || undefined, 'data-label': column.label }, text)
        }),
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

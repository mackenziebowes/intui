/**
 * The browser drawers for Areas and Tabs. An area is a header (a type button that opens a
 * menu of the producer's kinds, and a filter chip) above its content, or above "waiting for
 * <kind>" when the producer has sent none. Picking a kind or a tab sends a `press` to the
 * host and nothing else: the arrangement the person sees is whatever tree comes back. A
 * row cut wraps to a column when it is narrow. Moving a cut is not drawn here. A share is a whole number, so a part that wraps alone still fills its line.
 */
import { IntuiEvent, type AreaKind, type AreaLayout, type AreaSlot, type AreasProps, type TabsProps } from '@intui/core'
import type { Dom, DrawContext, Drawer } from '../dom'

export const areas: Drawer<AreasProps> = (props, ctx) => {
  const { dom } = ctx
  const byId = new Map(props.areas.map((area, index) => [area.id, { area, index }]))
  const place = (layout: AreaLayout): HTMLElement => {
    if (typeof layout === 'string') {
      const found = byId.get(layout)
      return found ? one(props, found.area, found.index, ctx) : dom.el('div', { class: 'intui-area' })
    }
    const a = place(layout.a)
    const b = place(layout.b)
    a.style.setProperty('--intui-share', String(Math.round(layout.ratio * 100)))
    b.style.setProperty('--intui-share', String(Math.round((1 - layout.ratio) * 100)))
    return dom.el('div', { class: `intui-areas-split intui-areas-split--${layout.split}` }, a, b)
  }
  const root = dom.el('div', { class: 'intui-areas' }, place(props.layout))
  // A menu closes when the person presses anywhere else.
  root.addEventListener('click', event => {
    for (const open of root.querySelectorAll('.intui-area-menu:not([hidden])')) if (!open.parentElement?.contains(event.target as Node)) (open as HTMLElement).hidden = true
  })
  return root
}

function one(props: AreasProps, area: AreaSlot, index: number, ctx: DrawContext): HTMLElement {
  const { dom } = ctx
  const kind = props.kinds.find(k => k.id === area.kind)
  const label = kind?.label ?? area.kind
  const menuId = ctx.uid(`menu-${area.id}`)
  const type = dom.el('button', { type: 'button', class: 'intui-area-type', 'aria-haspopup': 'menu', 'aria-expanded': 'false', 'aria-controls': menuId }, label, dom.el('span', { class: 'intui-area-caret', 'aria-hidden': true }, '▾'))
  const menu = dom.el('div', { class: 'intui-area-menu', id: menuId, role: 'menu', hidden: true }, ...props.kinds.map(k => item(props, area, k, dom, ctx, () => close())))
  const close = () => {
    menu.hidden = true
    type.setAttribute('aria-expanded', 'false')
  }
  type.addEventListener('click', event => {
    event.stopPropagation()
    const wasHidden = menu.hidden
    menu.hidden = !wasHidden
    type.setAttribute('aria-expanded', String(wasHidden))
  })
  const chip = area.filter ? dom.el('span', { class: 'intui-area-filter' }, area.filter) : null
  const header = dom.el('div', { class: 'intui-area-header' }, dom.el('div', { class: 'intui-area-typewrap' }, type, menu), ...(chip ? [chip] : []))
  const body = area.children?.length
    ? dom.el('div', { class: 'intui-area-body' }, ...area.children.map((node, i) => ctx.child(node, index * 1000 + i)))
    : dom.el('div', { class: 'intui-area-body intui-area-body--waiting' }, dom.el('p', { class: 'intui-area-waiting' }, `waiting for ${label}`))
  wearLegend(body, props)
  return dom.el('section', { class: 'intui-area', 'aria-label': label }, header, body)
}

function item(props: AreasProps, area: AreaSlot, kind: AreaKind, dom: Dom, ctx: DrawContext, close: () => void): HTMLElement {
  const button = dom.el('button', { type: 'button', role: 'menuitemradio', 'aria-checked': String(kind.id === area.kind), class: 'intui-area-item' }, dom.el('span', { class: 'intui-area-item-label' }, kind.label), ...(kind.hint ? [dom.el('span', { class: 'intui-area-item-hint' }, kind.hint)] : []))
  button.addEventListener('click', () => {
    close()
    if (kind.id !== area.kind) void ctx.send?.(IntuiEvent.press(ctx.source, props.id, `${area.id}:${kind.id}`))
  })
  return button
}

export const tabs: Drawer<TabsProps> = (props, ctx) => {
  const { dom } = ctx
  const buttons = props.tabs.map(tab => {
    const open = tab.id === props.active
    const button = dom.el('button', { type: 'button', role: 'tab', class: open ? 'intui-tab is-open' : 'intui-tab', 'aria-selected': String(open) }, tab.label)
    button.addEventListener('click', () => {
      if (!open) void ctx.send?.(IntuiEvent.press(ctx.source, props.id, tab.id))
    })
    return button
  })
  return dom.el('div', { class: 'intui-tabs', role: 'tablist' }, ...buttons)
}

/** A `who` key the legend gives a colour wears it: the element gets `--who` and the `intui-who` class. A key with no entry keeps its tone. */
function wearLegend(body: HTMLElement, props: AreasProps): void {
  const colours = new Map((props.legend ?? []).map(entry => [entry.who, entry.colour]))
  for (const element of body.querySelectorAll<HTMLElement>('[data-who]')) {
    const colour = colours.get(element.dataset.who ?? '')
    if (colour === undefined) continue
    element.style.setProperty('--who', colour)
    element.classList.add('intui-who')
  }
}

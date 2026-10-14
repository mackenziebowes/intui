/**
 * `render` draws a parsed Tree as one detached `<div class="intui">` for the host to
 * place, in light or dark, with every Choice and Form reporting to the host's `onEvent`. A
 * drawer that throws shows that node's text form instead, and a kind with no drawer is
 * drawn as its text form, so a valid tree never comes out blank.
 */
import { type FieldValue, type IntuiEvent, type Node, type Tree } from '@intui/core'
import { estimateWidth, type Measure } from './chart-layout'
import { Dom, type DrawContext, type Drawer } from './dom'
import { group, label, stat, table, text } from './draw/basic'
import { chart } from './draw/chart'
import { choice, form } from './draw/controls'
import { flow } from './draw/flow'
import { markdownToHtml } from './markdown'

export type RenderOptions = {
  /**
   * The id of whatever drew this tree (a tool call, a message). Every event
   * carries it, so the agent knows which of several trees the person used.
   */
  source: string
  /**
   * Called when a person presses a Choice option or submits a Form, with an
   * event already checked against the tree. Return a promise to show "Sending…"
   * until it settles; throw to show that sending failed. Leave it out for a
   * read-only view: the controls are drawn disabled.
   */
  onEvent?: (event: IntuiEvent) => void | Promise<void>
  /** The option already pressed in a used-up Choice, from the host's own record. */
  pressed?: (choiceId: string) => string | undefined
  /** The values a Form was already submitted with (`{}` if they weren't kept), or undefined if it wasn't. */
  submitted?: (formId: string) => Record<string, FieldValue> | undefined
  /** `light` or `dark` to force a theme; by default it follows the host's `[data-theme]` or the system. */
  theme?: 'light' | 'dark'
  /** Show a "Copy as text" button under the tree. Default true. */
  copyButton?: boolean
  /** The document to build in; defaults to the global one. */
  document?: Document
}

const DRAWERS: Record<string, Drawer> = {
  Text: text as Drawer,
  Group: group as Drawer,
  Label: label as Drawer,
  Table: table as Drawer,
  Chart: chart as Drawer,
  Stat: stat as Drawer,
  Flow: flow as Drawer,
  Choice: choice as Drawer,
  Form: form as Drawer,
}

/** The kinds this renderer draws natively; anything else is drawn as its text form. */
export const drawnKinds: readonly string[] = Object.keys(DRAWERS)

let counter = 0

/** A node's Markdown text form, written by the catalog the tree was parsed with. */
export function textOf(tree: Tree, node: Node): string {
  return tree.textOf(node)
}

/** A DOM id from a name that may hold anything (a field id with spaces): only letters, digits, `_` and `-`, and unique on the page. */
function domId(prefix: string, name: string, n: number): string {
  const safe = name.replace(/[^A-Za-z0-9-]/g, ch => `_${ch.codePointAt(0)!.toString(16)}_`)
  return `${prefix}-${safe}-${n}`
}

/**
 * Draws a parsed tree as DOM. Returns a detached `<div class="intui">` for the
 * host to place; include the stylesheet (`@intui/web/style.css`) on the page.
 */
export function render(tree: Tree, options: RenderOptions): HTMLElement {
  const doc = options.document ?? globalThis.document
  const dom = new Dom(doc)
  const view = doc.defaultView
  const prefix = `intui${++counter}`
  let ids = 0

  const ctx: DrawContext = {
    dom,
    tree,
    source: options.source,
    child: node => draw(node),
    text: node => tree.textOf(node),
    ...(options.onEvent ? { send: async (event: IntuiEvent) => void (await options.onEvent!(event)) } : {}),
    pressed: options.pressed ?? (() => undefined),
    submitted: options.submitted ?? (() => undefined),
    uid: name => domId(prefix, name, ++ids),
    onWidth: (element, draw) => {
      draw(element.getBoundingClientRect().width || 560)
      const Observer = view?.ResizeObserver
      if (!Observer) return
      new Observer(entries => {
        const width = entries[entries.length - 1]!.contentRect.width
        if (width > 0) draw(width)
      }).observe(element)
    },
    measureIn: (element, fontSize) => measurer(element, fontSize, doc),
  }

  function draw(node: Node): HTMLElement {
    const drawer = DRAWERS[node.type]
    if (drawer) {
      try {
        return drawer(node, ctx)
      } catch (error) {
        // A drawer bug shouldn't blank the tree: the text form carries the same information.
        console.error(`@intui/web: couldn't draw a ${node.type}, showing its text form instead`, error)
      }
    }
    return dom.html('div', { class: 'intui-text intui-fallback', 'data-type': node.type }, markdownToHtml(tree.textOf(node)))
  }

  const root = dom.el('div', { class: 'intui', 'data-theme': options.theme, 'data-source': options.source }, draw(tree.root))
  if (options.copyButton !== false) root.append(copyButton(dom, tree.toText()))
  return root
}

function copyButton(dom: Dom, text: string): HTMLElement {
  const status = dom.el('span', { class: 'intui-status', role: 'status' })
  const button = dom.el('button', { type: 'button', class: 'intui-button intui-button--quiet' }, 'Copy as text')
  button.addEventListener('click', async () => {
    try {
      await dom.doc.defaultView!.navigator.clipboard.writeText(text)
      status.textContent = 'Copied.'
    } catch {
      // No clipboard (an insecure origin, a denied permission): hand over the text to copy by hand.
      status.textContent = "Couldn't reach the clipboard. The text is below, selected; copy it with your keyboard."
      const box = dom.el('textarea', { class: 'intui-copy-box', readonly: true, rows: 6, 'aria-label': 'Text form' })
      box.value = text
      actions.after(box)
      box.select()
    }
  })
  const actions = dom.el('div', { class: 'intui-actions' }, button, status)
  return actions
}

/** Text width in the element's font, via a canvas; an estimate when there's no canvas (tests, SSR). */
function measurer(element: Element, fontSize: number, doc: Document): Measure {
  try {
    const context = doc.createElement('canvas').getContext('2d')
    if (!context) return estimateWidth
    const family = doc.defaultView?.getComputedStyle(element).fontFamily || 'sans-serif'
    context.font = `${fontSize}px ${family}`
    const cache = new Map<string, number>()
    return text => {
      let width = cache.get(text)
      if (width === undefined) cache.set(text, (width = context.measureText(text).width))
      return width
    }
  } catch {
    return estimateWidth
  }
}

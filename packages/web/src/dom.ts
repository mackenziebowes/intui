/**
 * The browser renderer's building blocks: `Dom` builds HTML and SVG elements in one
 * document, and `DrawContext` is what each drawer gets besides its props (child drawing,
 * the host's event handler, pressed and submitted state, width and text measuring). A
 * drawer is a function from props and context to an element.
 */
import type { FieldValue, IntuiEvent, Node, Tree } from '@intui/core'
import type { Measure } from './chart-layout'

type Attrs = Record<string, string | number | boolean | undefined>
type DomNode = globalThis.Node

/** Builds HTML and SVG elements in one document. */
export class Dom {
  constructor(readonly doc: Document) {}

  el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs = {}, ...children: (DomNode | string | null | undefined | false)[]): HTMLElementTagNameMap[K] {
    const element = this.doc.createElement(tag)
    setAttrs(element, attrs)
    for (const child of children) if (child !== null && child !== undefined && child !== false) element.append(child)
    return element
  }

  svg<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Attrs = {}, ...children: (DomNode | string | null | undefined | false)[]): SVGElementTagNameMap[K] {
    const element = this.doc.createElementNS('http://www.w3.org/2000/svg', tag)
    setAttrs(element, attrs)
    for (const child of children) if (child !== null && child !== undefined && child !== false) element.append(child)
    return element
  }

  /** An element whose content is already-safe HTML (the Markdown renderer's output). */
  html<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs, safeHtml: string): HTMLElementTagNameMap[K] {
    const element = this.el(tag, attrs)
    element.innerHTML = safeHtml
    return element
  }
}

function setAttrs(element: Element, attrs: Attrs) {
  for (const [name, value] of Object.entries(attrs)) {
    if (value === undefined || value === false) continue
    element.setAttribute(name, value === true ? '' : String(value))
  }
}

/** What a drawer gets besides its props. */
export type DrawContext = {
  dom: Dom
  tree: Tree
  /** The id of whatever drew the tree, carried by every event. */
  source: string
  /** Draws a child node. */
  child: (node: Node) => HTMLElement
  /** A node's Markdown text form. */
  text: (node: Node) => string
  /** Sends an event to the host, or undefined when the host gave no handler (a read-only view). */
  send?: (event: IntuiEvent) => Promise<void>
  /** The option already pressed in a used-up Choice, if any. */
  pressed: (choiceId: string) => string | undefined
  /** The values a Form was submitted with, or undefined if it hasn't been. */
  submitted: (formId: string) => Record<string, FieldValue> | undefined
  /** An id unique on the page, for aria wiring. */
  uid: (prefix: string) => string
  /** Calls `draw` with the element's width now (a guess before it's on the page) and whenever it changes. */
  onWidth: (element: HTMLElement, draw: (width: number) => void) => void
  /** Measures text in the element's own font, falling back to an estimate before it's on the page. */
  measureIn: (element: Element, fontSize: number) => Measure
}

export type Drawer<P extends Node = Node> = (props: P, ctx: DrawContext) => HTMLElement

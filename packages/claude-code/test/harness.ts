/**
 * Draws trees without a Claude Code session, for unit tests of the drawers.
 *
 * The element tables are fakes that record what was drawn as plain data, so a
 * test can assert on structure: which elements, which props, which text.
 * Interaction calls are recorded too. This tests our drawing logic, not the
 * engine's validation: run `claude plugin validate` and a live `show` for that.
 */
import type { ElementTable, RenderElement, RenderSurface } from 'claude-code'
import { Tree, type FieldValue, type Node } from '@intui/core'
import { drawTree } from '../src/draw'

export type Drawn = { el: string; props: Record<string, unknown>; children: (Drawn | string)[] }

const flat = (children: unknown[]): (Drawn | string)[] =>
  children.flat(Infinity).filter(child => child !== null && child !== undefined && child !== false).map(child =>
    typeof child === 'object' ? (child as Drawn) : String(child),
  )

const g = globalThis as Record<string, unknown>
g.h = (tag: unknown, props: Record<string, unknown> | null, ...children: unknown[]) =>
  typeof tag === 'function' ? tag({ ...props, children: flat(children) }) : { el: String(tag), props: props ?? {}, children: flat(children) }
g.Fragment = (props: { children?: unknown[] }) => ({ el: 'Box', props: { flexDirection: 'column' }, children: flat(props.children ?? []) })

const NAMES: Record<RenderSurface, string[]> = {
  terminal: ['Box', 'Text', 'Button', 'Input', 'Select', 'Link', 'Code', 'Markdown', 'Client', 'Raster', 'Image'],
  desktop: ['Box', 'Text', 'Button', 'Input', 'Select', 'Svg', 'Link', 'Code', 'Markdown', 'Client'],
  vscode: ['Box', 'Text', 'Button', 'Input', 'Select', 'Svg', 'Link', 'Code', 'Markdown'],
  mobile: ['Box', 'Text', 'Button', 'Svg', 'Link', 'Code', 'Markdown'],
}

export const SURFACES = Object.keys(NAMES) as RenderSurface[]

function fakeElements(surface: RenderSurface): ElementTable {
  const table: Record<string, unknown> = {}
  for (const name of NAMES[surface]) {
    table[name] = ({ children, ...props }: { children?: unknown[] } & Record<string, unknown>) => ({
      el: name,
      props,
      children: flat(children ?? []),
    })
  }
  return table as unknown as ElementTable
}

export type Recorded = {
  presses: { choiceId: string; optionId: string }[]
  fields: Record<string, Record<string, FieldValue>>
  submits: string[]
  notes: Record<string, string>
}

export type DrawOptions = {
  surface?: RenderSurface
  columns?: number
  /** Options already pressed, by Choice id. */
  pressed?: Record<string, string>
  /** Field values already entered, by Form id then field id. */
  fields?: Record<string, Record<string, FieldValue>>
  submitted?: string[]
  /** Notes already set, by note id. */
  notes?: Record<string, string>
  /** Makes `press` or `submit` throw, to test that a drawer catches it. */
  failOn?: 'press' | 'submit'
}

/** Draws a node (or a whole tree) as code would, returning the drawing and the recorded interactions. */
export function draw(root: object, options: DrawOptions = {}): { drawn: Drawn; recorded: Recorded } {
  const surface = options.surface ?? 'terminal'
  const recorded: Recorded = { presses: [], fields: structuredClone(options.fields ?? {}), submits: [], notes: { ...options.notes } }
  const drawn = drawTree(Tree.of(root as Node), {
    surface,
    el: fakeElements(surface),
    columns: options.columns ?? 80,
    source: 'toolu_test',
    pressed: id => options.pressed?.[id],
    press: async (choiceId, optionId) => {
      if (options.failOn === 'press') throw new Error('agent gone')
      recorded.presses.push({ choiceId, optionId })
    },
    field: (formId, fieldId) => recorded.fields[formId]?.[fieldId],
    setField: async (formId, fieldId, value) => {
      recorded.fields[formId] = { ...recorded.fields[formId], [fieldId]: value }
    },
    submitted: id => options.submitted?.includes(id) ?? false,
    submit: async formId => {
      if (options.failOn === 'submit') throw new Error('agent gone')
      recorded.submits.push(formId)
    },
    note: id => recorded.notes[id],
    setNote: async (id, text) => {
      if (text === undefined) delete recorded.notes[id]
      else recorded.notes[id] = text
    },
  }) as unknown as Drawn
  return { drawn, recorded }
}

/** Every element of a kind in the drawing, depth first. */
export function findAll(drawn: Drawn | string, el: string): Drawn[] {
  if (typeof drawn === 'string') return []
  return [...(drawn.el === el ? [drawn] : []), ...drawn.children.flatMap(child => findAll(child, el))]
}

/** All visible text in the drawing: Text children, Markdown text, Button labels, joined by spaces. */
export function textOf(drawn: Drawn | string): string {
  if (typeof drawn === 'string') return drawn
  const own = [drawn.props.text, drawn.props.label].filter(value => typeof value === 'string') as string[]
  return [...own, ...drawn.children.map(textOf)].filter(Boolean).join(' ')
}

/** Presses a Button by key, running its handler. */
export async function press(drawn: Drawn, key: string): Promise<void> {
  const button = findAll(drawn, 'Button').find(b => b.props.key === key)
  if (!button) throw new Error(`no Button with key "${key}"; keys are ${findAll(drawn, 'Button').map(b => b.props.key).join(', ')}`)
  await (button.props.onPress as (e: unknown) => unknown)({})
}

export type { RenderElement }

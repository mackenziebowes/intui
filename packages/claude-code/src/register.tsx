/**
 * The plugin's wiring into Claude Code: registers the `show` and demo tools and the
 * `/intui` command, refuses a bad `show` tree with every problem listed, draws a tree on
 * the transcript row of the call or result that carries it, and turns a press or submit
 * into a message to the agent through core's control machine. It keeps each control's state, typed form values, notes and
 * pending counts across redraws in the plugin's store.
 */
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, RenderInput } from 'claude-code'
import { startControl, stepControl, Tree, whyOf, type Answer, type ControlEvent, type ControlState } from '@intui/core'
import type { IntuiControls, IntuiForms, IntuiNotes, IntuiTrees, IntuiUsed } from '../types'
import { drawnTypes, drawTree } from './draw'
import { DEMO_TOOL, DEMO_TOOL_FULL_NAME, demoTree } from './demo'
import { MAX_TREES, treeFromOutput } from './envelope'
import { estimatedToolTokens, SHOW_TOOL } from './tool'
import {
  appended,
  codeEntry,
  fallbacksRecorded,
  pendingAfterAnswer,
  pendingAfterPrompt,
  pendingAfterShow,
  refusedEntry,
  shownEntry,
  startCounted,
  summary,
  type EscapeEntry,
  type FallbackEntry,
  type Pending,
  type UsageEntry,
} from './usage'

const LOG = 'usage'
const ESCAPES = 'escapes'
const FALLBACKS = 'fallbacks'
const STARTS = 'starts'
const PENDING = 'pending'

const used = atom({ plugin: 'intui', key: 'used' } as const, {} as IntuiUsed)
const controls = atom({ plugin: 'intui', key: 'controls' } as const, {} as IntuiControls)
const forms = atom({ plugin: 'intui', key: 'forms' } as const, {} as IntuiForms)
const trees = atom({ plugin: 'intui', key: 'trees' } as const, {} as IntuiTrees)
const notes = atom({ plugin: 'intui', key: 'notes' } as const, {} as IntuiNotes)

/** Splits a tool call's input into the tree and the optional `wanted` note, dropping the keys the engine reserves. */
function showInput(input: Record<string, unknown>): { tree: Record<string, unknown>; wanted?: string } {
  const { tool, tool_use_id, consent, agentId, wanted, ...tree } = input
  return { tree, wanted: typeof wanted === 'string' && wanted.trim() ? wanted.trim().slice(0, 200) : undefined }
}

/** Draws a tree for one transcript row: the model's `show` call, or a tree a tool returned. */
async function drawForRow($: EngineInterface, e: RenderInput<'ToolUse' | 'ToolResult'>, tree: Tree) {
  const source = e.props.tool_use_id
  // A press or submit answers what is waiting. Written from a handler, never while drawing.
  const answered = async () =>
    $.store.set(PENDING, pendingAfterAnswer(((await $.store.get(PENDING)) ?? {}) as Pending, await $.session.id()))
  const controlsNow = await read($, controls)
  const formsNow = await read($, forms)
  const notesNow = await read($, notes)
  const at = (id: string) => `${source}:${id}`
  const fresh: ControlState = startControl(true, undefined)
  /** One step of a control's machine, written back to the store; returns the step so its effects can run. */
  const advance = async (controlId: string, event: ControlEvent) => {
    const control = Tree.interactive(tree, controlId)
    if (!control) return undefined
    const step = stepControl({ source, control }, (await read($, controls))[at(controlId)] ?? fresh, event)
    if (!step.ignored) await update($, controls, all => ({ ...all, [at(controlId)]: step.state }))
    return step
  }
  // Collected while drawing, written once drawing is done.
  const fellBack: FallbackEntry[] = []
  const session = await $.session.id()
  const drawn = drawTree(tree, {
    surface: e.surface,
    el: $.ui.resolve(e),
    columns: e.viewport?.columns ?? 80,
    source,
    control: controlId => controlsNow[at(controlId)] ?? fresh,
    // The send effect is a message to the agent; once the engine takes it the answer is accepted.
    answer: async (controlId: string, answer: Answer) => {
      const step = await advance(controlId, { kind: 'answered', answer })
      for (const effect of step?.effects ?? []) {
        try {
          await answered()
          await $.prompt.submit({ text: Tree.describe(tree, effect.event) })
          await advance(controlId, { kind: 'accepted' })
        } catch (error) {
          await advance(controlId, { kind: 'refused', why: whyOf(error) })
        }
      }
    },
    field: (formId, fieldId) => formsNow[at(formId)]?.[fieldId],
    setField: async (formId, fieldId, value) => {
      await update($, forms, all => ({ ...all, [at(formId)]: { ...all[at(formId)], [fieldId]: value } }))
    },
    fellBack: (path, type) => fellBack.push({ key: `${source}:${path}:${type}`, at: new Date().toISOString(), session, type }),
    note: id => notesNow[at(id)],
    setNote: async (id, text) => {
      await update($, notes, all => {
        const { [at(id)]: _old, ...rest } = all
        return text === undefined ? rest : { ...rest, [at(id)]: text }
      })
    },
  })
  if (fellBack.length) await $.store.set(FALLBACKS, fallbacksRecorded(((await $.store.get(FALLBACKS)) ?? []) as FallbackEntry[], fellBack))
  return drawn
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    // Rewrite the old record of used-up controls into the machine's states (hub #1956), once.
    const old = await read($, used)
    if (Object.keys(old).length > 0) {
      await update($, controls, all => ({
        ...Object.fromEntries(Object.entries(old).map(([key, value]): [string, ControlState] => [key, { kind: 'sent', answer: value === 'submitted' ? { kind: 'submit', values: {} } : { kind: 'press', option: value } }])),
        ...all,
      }))
      await update($, used, () => ({}))
    }
    await $.store.set(STARTS, startCounted(((await $.store.get(STARTS)) ?? {}) as Record<string, number>))
    await $.tool.register(SHOW_TOOL)
    await $.tool.register(DEMO_TOOL)
    await $.command.register({ name: 'intui', description: 'IntUI: how often each component was used, for evals' })
    return next(e)
  })

  // Claude Code defers plugin tools behind ToolSearch, where the model sees only
  // the name. Evals showed it then never reaches for `show`, so keep the schema in the prompt.
  on('tool.describe', { tool: 'mcp__intui__show' }, async ($, e, next) => ({ ...(await next(e)), isDeferred: false }))

  on('command.run', { command: 'intui' }, async $ => ({
    text: summary(((await $.store.get(LOG)) ?? []) as UsageEntry[], {
      escapes: ((await $.store.get(ESCAPES)) ?? []) as EscapeEntry[],
      drawnAsText: ((await $.store.get(FALLBACKS)) ?? []) as FallbackEntry[],
      starts: ((await $.store.get(STARTS)) ?? {}) as Record<string, number>,
      toolTokens: estimatedToolTokens(),
    }),
  }))

  // Escape rate: a prompt the person types while a Choice or Form from the
  // latest `show` is still unanswered. Plugin, task and peer prompts (including
  // the ones a press sends) never count. Only a count is kept, never the text.
  on('prompt.submit', async ($, e, next) => {
    const session = await $.session.id()
    const verdict = pendingAfterPrompt(((await $.store.get(PENDING)) ?? {}) as Pending, session, e.origin.kind)
    if (verdict.escaped) {
      await $.store.set(PENDING, verdict.pending)
      await $.store.set(ESCAPES, appended(((await $.store.get(ESCAPES)) ?? []) as EscapeEntry[], { at: new Date().toISOString(), session }))
    }
    return next(e)
  })

  // Validate what the model wrote. A bad tree is refused with every problem
  // listed, so the model can fix them all in one retry.
  // Every call is logged (shapes only, no content) for evals.
  on('tool.call', { tool: 'mcp__intui__show' }, async ($, e) => {
    const { tree: input, wanted } = showInput(e as Record<string, unknown>)
    const session = await $.session.id()
    const log = async (entry: UsageEntry) =>
      $.store.set(LOG, appended(((await $.store.get(LOG)) ?? []) as UsageEntry[], entry))
    const result = Tree.parse(input, { author: 'model' })
    if (result.kind === 'refused') {
      await log(refusedEntry(result.problems.length || 1, session, wanted))
      return { deny: result.message }
    }
    const entry = shownEntry(result.value, session, wanted, new Date(), drawnTypes())
    await log(entry)
    await $.store.set(PENDING, pendingAfterShow(((await $.store.get(PENDING)) ?? {}) as Pending, session, entry.interactive ?? 0))
    return { result: Tree.toText(result.value) }
  })

  on('ui.render', { component: 'ToolUse', props: { tool: 'mcp__intui__show' } }, async ($, e, next) => {
    if (e.props.isErrored || e.props.isInterrupted) return next(e)
    const result = Tree.parse(showInput(e.props.input as Record<string, unknown>).tree, { author: 'model' })
    return result.kind === 'parsed' ? drawForRow($, e, result.value) : next(e)
  })

  // The result is the tree's text form, for the model. The row above already
  // draws the tree, so the person doesn't need it twice.
  on('ui.render', { component: 'ToolResult', props: { tool: 'mcp__intui__show' } }, async ($, e, next) => {
    if (e.props.isErrored) return next(e)
    const { Box } = $.ui.resolve(e)
    return <Box />
  })
  // A tool answers with a tree, and code wrote it: Chart and Stat are allowed.
  // The result carries the envelope (see TOOLS.md). Drawn here, whichever tool
  // returned it, so the tool needs no hook of its own. Anything that is not a
  // valid envelope is the engine's to draw.
  on('ui.render', { component: 'ToolResult' }, async ($, e, next) => {
    if (e.props.isErrored) return next(e)
    const kept = (await read($, trees))[e.props.tool_use_id]
    const fromStore = kept ? Tree.parse(kept, { author: 'code' }) : undefined
    const tree = fromStore ? (fromStore.kind === 'parsed' ? fromStore.value : undefined) : treeFromOutput(e.props.output)
    return tree ? drawForRow($, e, tree) : next(e)
  })

  // Every tool call passes here to record trees tools return (shapes only, marked
  // as code-written). A plugin tool's result may only be a string, so the demo
  // tool answers with the tree's text and keeps the tree in state for the ToolResult row.
  // An MCP tool's envelope stays in its result and is read from there.
  on('tool.call', async ($, e, next) => {
    let tree: Tree | undefined
    let answer
    if (e.tool === DEMO_TOOL_FULL_NAME) {
      const made = demoTree()
      tree = made
      await update($, trees, all => Object.fromEntries(Object.entries({ ...all, [e.tool_use_id]: Tree.toJSON(made) }).slice(-MAX_TREES)))
      answer = { result: Tree.toText(made) }
    } else {
      answer = await next(e)
      if (e.tool !== 'mcp__intui__show' && 'result' in answer && answer.result !== undefined) tree = treeFromOutput(answer.result)
    }
    if (tree) {
      const entry = codeEntry(tree, await $.session.id(), e.tool, new Date(), drawnTypes())
      await $.store.set(LOG, appended(((await $.store.get(LOG)) ?? []) as UsageEntry[], entry))
    }
    return answer
  })
}

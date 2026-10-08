import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'
import { IntuiError, IntuiEvent, Tree } from '@intui/core'
import type { IntuiForms, IntuiNotes, IntuiUsed } from '../types'
import { drawnTypes, drawTree } from './draw'
import { estimatedToolTokens, SHOW_TOOL } from './tool'
import {
  appended,
  pendingAfterAnswer,
  pendingAfterPrompt,
  pendingAfterShow,
  refusedEntry,
  shownEntry,
  startCounted,
  summary,
  type EscapeEntry,
  type Pending,
  type UsageEntry,
} from './usage'

const LOG = 'usage'
const ESCAPES = 'escapes'
const STARTS = 'starts'
const PENDING = 'pending'

const used = atom({ plugin: 'intui', key: 'used' } as const, {} as IntuiUsed)
const forms = atom({ plugin: 'intui', key: 'forms' } as const, {} as IntuiForms)
const notes = atom({ plugin: 'intui', key: 'notes' } as const, {} as IntuiNotes)

/** Splits a tool call's input into the tree and the optional `wanted` note, dropping the keys the engine reserves. */
function showInput(input: Record<string, unknown>): { tree: Record<string, unknown>; wanted?: string } {
  const { tool, tool_use_id, consent, agentId, wanted, ...tree } = input
  return { tree, wanted: typeof wanted === 'string' && wanted.trim() ? wanted.trim().slice(0, 200) : undefined }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.store.set(STARTS, startCounted(((await $.store.get(STARTS)) ?? {}) as Record<string, number>))
    await $.tool.register(SHOW_TOOL)
    await $.command.register({ name: 'intui', description: 'IntUI: how often each component was used, for evals' })
    return next(e)
  })

  // Claude Code defers plugin tools behind ToolSearch, where the model sees only
  // the name. Evals showed it then never reaches for `show`, so keep the schema in the prompt.
  on('tool.describe', { tool: 'mcp__intui__show' }, async ($, e, next) => ({ ...(await next(e)), isDeferred: false }))

  on('command.run', { command: 'intui' }, async $ => ({
    text: summary(((await $.store.get(LOG)) ?? []) as UsageEntry[], {
      escapes: ((await $.store.get(ESCAPES)) ?? []) as EscapeEntry[],
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
    try {
      const tree = Tree.parse(input, { author: 'model' })
      const entry = shownEntry(tree, session, wanted, new Date(), drawnTypes())
      await log(entry)
      await $.store.set(PENDING, pendingAfterShow(((await $.store.get(PENDING)) ?? {}) as Pending, session, entry.interactive ?? 0))
      return { result: tree.toText() }
    } catch (error) {
      if (!(error instanceof IntuiError)) throw error
      await log(refusedEntry(error.problems.length || 1, session, wanted))
      return { deny: error.message }
    }
  })

  on('ui.render', { component: 'ToolUse', props: { tool: 'mcp__intui__show' } }, async ($, e, next) => {
    if (e.props.isErrored || e.props.isInterrupted) return next(e)
    let tree: Tree
    try {
      tree = Tree.parse(showInput(e.props.input as Record<string, unknown>).tree, { author: 'model' })
    } catch {
      return next(e)
    }
    const source = e.props.tool_use_id
    // A press or submit answers what is waiting. Written from a handler, never while drawing.
    const answered = async () =>
      $.store.set(PENDING, pendingAfterAnswer(((await $.store.get(PENDING)) ?? {}) as Pending, await $.session.id()))
    const usedNow = await read($, used)
    const formsNow = await read($, forms)
    const notesNow = await read($, notes)
    const at = (id: string) => `${source}:${id}`
    return drawTree(tree, {
      surface: e.surface,
      el: $.ui.resolve(e),
      columns: e.viewport?.columns ?? 80,
      source,
      pressed: choiceId => usedNow[at(choiceId)],
      press: async (choiceId, optionId) => {
        const event = IntuiEvent.press(source, choiceId, optionId)
        tree.verify(event)
        const choice = tree.interactive(choiceId)
        if (choice?.type === 'Choice' && choice.repeat === 'once') {
          await update($, used, all => ({ ...all, [at(choiceId)]: optionId }))
        }
        await answered()
        await $.prompt.submit({ text: tree.describe(event) })
      },
      field: (formId, fieldId) => formsNow[at(formId)]?.[fieldId],
      setField: async (formId, fieldId, value) => {
        await update($, forms, all => ({ ...all, [at(formId)]: { ...all[at(formId)], [fieldId]: value } }))
      },
      submitted: formId => usedNow[at(formId)] !== undefined,
      submit: async formId => {
        const event = IntuiEvent.submit(source, formId, (await read($, forms))[at(formId)] ?? {})
        tree.verify(event)
        await update($, used, all => ({ ...all, [at(formId)]: 'submitted' }))
        await answered()
        await $.prompt.submit({ text: tree.describe(event) })
      },
      note: id => notesNow[at(id)],
      setNote: async (id, text) => {
        await update($, notes, all => {
          const { [at(id)]: _old, ...rest } = all
          return text === undefined ? rest : { ...rest, [at(id)]: text }
        })
      },
    })
  })

  // The result is the tree's text form, for the model. The row above already
  // draws the tree, so the person doesn't need it twice.
  on('ui.render', { component: 'ToolResult', props: { tool: 'mcp__intui__show' } }, async ($, e, next) => {
    if (e.props.isErrored) return next(e)
    const { Box } = $.ui.resolve(e)
    return <Box />
  })
}

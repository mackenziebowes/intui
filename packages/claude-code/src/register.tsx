import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'
import { IntuiError, IntuiEvent, Tree } from '@intui/core'
import type { IntuiForms, IntuiUsed } from '../types'
import { drawTree } from './draw'
import { SHOW_TOOL } from './tool'
import { appended, refusedEntry, shownEntry, summary, type UsageEntry } from './usage'

const LOG = 'usage'

const used = atom({ plugin: 'intui', key: 'used' } as const, {} as IntuiUsed)
const forms = atom({ plugin: 'intui', key: 'forms' } as const, {} as IntuiForms)

/** Splits a tool call's input into the tree and the optional `wanted` note, dropping the keys the engine reserves. */
function showInput(input: Record<string, unknown>): { tree: Record<string, unknown>; wanted?: string } {
  const { tool, tool_use_id, consent, agentId, wanted, ...tree } = input
  return { tree, wanted: typeof wanted === 'string' && wanted.trim() ? wanted.trim().slice(0, 200) : undefined }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.tool.register(SHOW_TOOL)
    await $.command.register({ name: 'intui', description: 'IntUI: how often each component was used, for evals' })
    return next(e)
  })

  // Claude Code defers plugin tools behind ToolSearch, where the model sees only
  // the name. Evals showed it then never reaches for `show`, so keep the schema in the prompt.
  on('tool.describe', { tool: 'mcp__intui__show' }, async ($, e, next) => ({ ...(await next(e)), isDeferred: false }))

  on('command.run', { command: 'intui' }, async $ => ({ text: summary(((await $.store.get(LOG)) ?? []) as UsageEntry[]) }))

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
      await log(shownEntry(tree, session, wanted))
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
    const usedNow = await read($, used)
    const formsNow = await read($, forms)
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
        await $.prompt.submit({ text: tree.describe(event) })
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

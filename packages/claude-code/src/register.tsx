import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'
import { IntuiError, IntuiEvent, Tree } from '@intui/core'
import type { IntuiForms, IntuiUsed } from '../types'
import { drawTree } from './draw'
import { SHOW_TOOL } from './tool'

const used = atom({ plugin: 'intui', key: 'used' } as const, {} as IntuiUsed)
const forms = atom({ plugin: 'intui', key: 'forms' } as const, {} as IntuiForms)

/** The tool's own arguments: the tool call's input less the keys the engine reserves. */
function treeInput(input: Record<string, unknown>): Record<string, unknown> {
  const { tool, tool_use_id, consent, agentId, ...rest } = input
  return rest
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.tool.register(SHOW_TOOL)
    return next(e)
  })

  // Validate what the model wrote. A bad tree is refused with every problem
  // listed, so the model can fix them all in one retry.
  on('tool.call', { tool: 'mcp__intui__show' }, async (_$, e) => {
    try {
      const tree = Tree.parse(treeInput(e as Record<string, unknown>), { author: 'model' })
      return { result: tree.toText() }
    } catch (error) {
      if (error instanceof IntuiError) return { deny: error.message }
      throw error
    }
  })

  on('ui.render', { component: 'ToolUse', props: { tool: 'mcp__intui__show' } }, async ($, e, next) => {
    if (e.props.isErrored || e.props.isInterrupted) return next(e)
    let tree: Tree
    try {
      tree = Tree.parse(e.props.input, { author: 'model' })
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

import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'
import { IntuiError, IntuiEvent, Tree } from '@intui/core'
import type { IntuiUsed } from '../types'
import { drawTree } from './draw'
import { SHOW_TOOL, TOOL_NAME } from './tool'

const PLUGIN = 'intui'
// Matchers below spell the tool name out: the engine reads them from the source.
const TOOL = `mcp__${PLUGIN}__${TOOL_NAME}`
const used = atom({ plugin: 'intui', key: 'used' } as const, {} as IntuiUsed)

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
    return drawTree(tree, {
      surface: e.surface,
      el: $.ui.resolve(e),
      columns: e.viewport?.columns ?? 80,
      source,
      pressed: choiceId => usedNow[`${source}:${choiceId}`],
      press: async (choiceId, optionId) => {
        const event = IntuiEvent.press(source, choiceId, optionId)
        tree.verify(event)
        const choice = tree.interactive(choiceId)
        if (choice?.type === 'Choice' && choice.repeat === 'once') {
          await update($, used, all => ({ ...all, [`${source}:${choiceId}`]: optionId }))
        }
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

import { core } from '@intui/core'

export const TOOL_NAME = 'show'

const DESCRIPTION = `Show the person an interactive answer: components drawn in the transcript instead of plain text.

Use it when a component says it better than prose: a Flow instead of an ASCII diagram, a Table for a comparison, a Choice when you want the person to pick what happens next. Don't use it when a sentence or two is enough.

The input is a tree: {"v": 1, "root": <component>}. Components:
${core.writableBy('model').describe()}

Group holds others in a row or column. Pressing a Choice option sends you a message saying what was pressed. Charts and stats with numbers can't be written here: they must come from a tool that ran a query. The tool result is the tree's text form, so you can refer back to what you showed.`

export const SHOW_TOOL = {
  name: TOOL_NAME,
  description: DESCRIPTION,
  inputSchema: core.writableBy('model').jsonSchema(),
}

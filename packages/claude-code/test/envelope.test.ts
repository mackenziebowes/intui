import { describe, expect, test } from 'bun:test'
import { mcpResult, treeFromOutput } from '../src/envelope'
import { DEMO_ROOT } from '../src/demo'

const stat = { type: 'Stat', label: 'Visitors', value: 12 }
const envelope = { intui: { v: 1, root: stat } }

describe('treeFromOutput', () => {
  test('reads a tree from every shape a tool result can take, and allows what only code may write', () => {
    const shapes: unknown[] = [
      envelope,
      { content: [{ type: 'text', text: 'Visitors: 12' }], structuredContent: envelope, isError: false },
      { content: [{ type: 'text', text: JSON.stringify(envelope) }] },
      JSON.stringify(envelope),
      [{ type: 'text', text: JSON.stringify(envelope) }],
    ]
    for (const shape of shapes) expect(treeFromOutput(shape)?.root.type).toBe('Stat')
  })

  test('is undefined for a result that is not a tree', () => {
    for (const output of [undefined, null, 'plain text', '{"other":1}', { stdout: 'x' }, { content: [{ type: 'text', text: 'hi' }] }, { intui: 'nope' }, { intui: { root: stat } }]) {
      expect(treeFromOutput(output)).toBeUndefined()
    }
  })

  test('is undefined for a tree with a bad node, instead of throwing', () => {
    expect(treeFromOutput({ intui: { v: 1, root: { type: 'Stat', label: 'Visitors' } } })).toBeUndefined()
    expect(treeFromOutput({ intui: { v: 1, root: { type: 'Nope' } } })).toBeUndefined()
  })
})

describe('mcpResult', () => {
  test('gives the model the tree text and the plugin the envelope, which round-trips', () => {
    const result = mcpResult(DEMO_ROOT)
    expect(result.content[0]?.text).toContain('Sample visitors')
    expect(treeFromOutput(result)?.toText()).toBe(result.content[0]?.text)
  })
})

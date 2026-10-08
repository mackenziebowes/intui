import { describe, expect, test } from 'bun:test'
import { draw, findAll, SURFACES, textOf } from './harness'

describe('foundation', () => {
  for (const surface of SURFACES) {
    test(`Text draws as Markdown on ${surface}`, () => {
      const { drawn } = draw({ type: 'Text', markdown: '**hi**' }, { surface })
      expect(drawn.el).toBe('Markdown')
      expect(drawn.props.text).toBe('**hi**')
    })
  }

  test('a row Group stacks into a column when narrow', () => {
    const row = { type: 'Group', direction: 'row', children: [{ type: 'Text', markdown: 'a' }, { type: 'Text', markdown: 'b' }] }
    expect(draw(row, { columns: 100 }).drawn.props.flexDirection).toBe('row')
    expect(draw(row, { columns: 40 }).drawn.props.flexDirection).toBe('column')
  })

  test('textOf and findAll see nested content', () => {
    const { drawn } = draw({ type: 'Group', direction: 'column', children: [{ type: 'Text', markdown: 'hello' }] })
    expect(findAll(drawn, 'Markdown')).toHaveLength(1)
    expect(textOf(drawn)).toContain('hello')
  })
})

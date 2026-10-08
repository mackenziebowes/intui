import { Tree, type Node } from '@intui/core'

export const DEMO_TOOL_NAME = 'demo_chart'

export const DEMO_TOOL_FULL_NAME = `mcp__intui__${DEMO_TOOL_NAME}`

export const DEMO_TOOL = {
  name: DEMO_TOOL_NAME,
  description:
    'IntUI demo: returns a Chart and a Stat built by code from FIXED SAMPLE DATA (not real figures). Call it only to check that code-written trees draw.',
  inputSchema: { type: 'object', properties: {} },
}

/** Sample data, labelled as such, so nobody mistakes it for a measurement. */
export const DEMO_ROOT: Node = {
  type: 'Group',
  direction: 'column',
  children: [
    { type: 'Text', markdown: '**Demo: sample data, not real figures**' },
    { type: 'Stat', label: 'Sample visitors', value: 1204, change: { value: 18, as: 'percent' }, tone: 'positive' },
    {
      type: 'Chart',
      kind: 'line',
      title: 'Sample visitors (demo)',
      unit: 'visitors',
      series: [
        { label: 'This week', role: 'primary', points: [{ x: 'Mon', y: 120 }, { x: 'Tue', y: 180 }, { x: 'Wed', y: 90 }] },
        { label: 'Usual', role: 'baseline', points: [{ x: 'Mon', y: 110 }, { x: 'Tue', y: 115 }, { x: 'Wed', y: 105 }] },
      ],
    },
  ],
} as unknown as Node

/** The demo tool's tree, built by code. */
export const demoTree = () => Tree.of(DEMO_ROOT)

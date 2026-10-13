import { Reading, Tree, type Node } from '@intui/core'

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
    { type: 'Stat', label: 'Sample visitors', value: Reading.exact(1204), change: { value: Reading.exact(18), as: 'percent' }, tone: 'positive' },
    // One of each uncertain kind, so the demo shows how a floor, an estimate and an unknown read and draw.
    { type: 'Stat', label: 'Sample logged events', value: Reading.atLeast(216), unit: 'events', change: { value: Reading.estimate(4), as: 'percent' }, tone: 'neutral' },
    { type: 'Stat', label: 'Sample cost', value: Reading.unknown(), tone: 'neutral' },
    {
      type: 'Chart',
      kind: 'line',
      title: 'Sample visitors (demo)',
      unit: 'visitors',
      series: [
        { label: 'This week', role: 'primary', points: [{ x: 'Mon', y: Reading.exact(120) }, { x: 'Tue', y: Reading.estimate(180) }, { x: 'Wed', y: Reading.unknown() }] },
        { label: 'Usual', role: 'baseline', points: [{ x: 'Mon', y: Reading.exact(110) }, { x: 'Tue', y: Reading.exact(115) }, { x: 'Wed', y: Reading.atLeast(105) }] },
      ],
    },
  ],
} as unknown as Node

/** The demo tool's tree, built by code. */
export const demoTree = () => Tree.of(DEMO_ROOT)

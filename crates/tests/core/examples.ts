/**
 * Prints the trees the native window is shown: every catalog kind's own example, then trees that exercise what an
 * example doesn't (floors, estimates and unknowns, a bar chart with markers, a loop in a Flow, a long table). Each
 * comes with the text parts core's `toText` gives, which the window's accessibility tree must carry: `[{ name, json, parts }]`.
 */
import { core, Tree, type Node } from "../../../packages/core/src/index";

const drawn = (root: unknown) => Tree.parse({ v: 1, root }, { author: "code" });
const textOf = (node: unknown) => drawn(node).toText();
const parts = (root: unknown) => {
  const node = root as { type: string; children?: unknown[] };
  return node.type === "Group" && node.children ? node.children.map(textOf) : [textOf(root)];
};

const reading = (kind: string, value?: number) => (value === undefined ? { kind } : { kind, value });

const extras: Record<string, Node> = {
  readings: {
    type: "Group",
    direction: "row",
    children: [
      { type: "Stat", label: "Exact", value: reading("exact", 1204), unit: "visitors", change: { value: reading("exact", -8), as: "percent" }, tone: "critical" },
      { type: "Stat", label: "Floor", value: reading("atLeast", 5000), change: { value: reading("atLeast", 12), as: "amount" }, tone: "positive" },
      { type: "Stat", label: "Estimate", value: reading("estimate", 36.5), unit: "ms", change: { value: reading("estimate", 0), as: "amount" } },
      { type: "Stat", label: "Couldn't read", value: reading("unknown"), change: { value: reading("unknown"), as: "percent" }, tone: "warning" },
    ],
  } as unknown as Node,
  "bar-chart": {
    type: "Chart",
    kind: "bar",
    title: "Signups by week",
    unit: "$",
    series: [
      { label: "This year", role: "primary", points: [{ x: "W1", y: reading("exact", 120) }, { x: "W2", y: reading("atLeast", 180) }, { x: "W3", y: reading("estimate", 150) }, { x: "W4", y: reading("unknown") }] },
      { label: "Last year", role: "baseline", points: [{ x: "W1", y: reading("exact", 90) }, { x: "W2", y: reading("exact", 110) }, { x: "W3", y: reading("exact", 130) }, { x: "W4", y: reading("exact", 100) }] },
    ],
    annotations: [{ at: "W2", label: "Launch" }, { at: "W9", label: "Not on the chart" }],
  } as unknown as Node,
  "chart-with-gap": {
    type: "Chart",
    kind: "line",
    title: "Latency",
    unit: "ms",
    series: [
      { label: "p50", role: "primary", points: [{ x: 1, y: reading("exact", 40) }, { x: 2, y: reading("exact", 44) }, { x: 3, y: reading("unknown") }, { x: 4, y: reading("exact", 38) }, { x: 5, y: reading("atLeast", 60) }] },
      { label: "target", role: "comparison", points: [{ x: 1, y: reading("exact", 50) }, { x: 5, y: reading("exact", 50) }] },
    ],
  } as unknown as Node,
  "flow-with-loop": {
    type: "Flow",
    steps: [
      { id: "a", label: "Draft", detail: "Write it" },
      { id: "b", label: "Review" },
      { id: "c", label: "Ship" },
    ],
    links: [{ from: "a", to: "b" }, { from: "b", to: "c", label: "approved" }, { from: "b", to: "a", label: "changes" }, { from: "a", to: "c", label: "skip" }],
  } as unknown as Node,
  "long-table": {
    type: "Table",
    caption: "Two thousand rows",
    columns: [{ key: "n", label: "N" }, { key: "name", label: "Name" }, { key: "ok", label: "OK" }],
    rows: Array.from({ length: 2000 }, (_, i) => ({ n: i, name: `row ${i}`, ok: i % 3 === 0 })),
  } as unknown as Node,
  markdown: {
    type: "Text",
    markdown: "# Heading\n\nSome **bold**, *italic*, ~~struck~~ and `code` with a [link](https://example.com).\n\n- one\n- two\n  - nested\n\n1. first\n2. second\n\n> quoted\n\n```\nlet long = \"a very long line of code that should scroll sideways and never clip at the edge of the box\";\n```\n\n<script>alert(1)</script>\n\n---\n\n| a | b |\n|---|---|\n| 1 | 2 |",
  } as unknown as Node,
};

const trees = [...core.kinds.map((kind) => [kind.type, kind.example as unknown] as const), ...Object.entries(extras)];
console.log(JSON.stringify(trees.map(([name, root]) => ({ name, json: JSON.stringify(drawn(root).toJSON()), parts: parts(root) }))));

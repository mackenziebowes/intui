/**
 * Trees the parity checks put to core and to Rust. A tree is JSON text, so a value
 * like -0 (which JSON.stringify would lose) reaches both sides as written.
 */
import { core, Reading, Tree, type Node } from "../../../packages/core/src/index";

export type Accepted = { name: string; json: string };
/** `words`: "same" when Rust must say what core says; "paths" when only the places must agree. */
export type Refused = { name: string; json: string; words: "same" | "paths" };

const wire = (root: unknown) => JSON.stringify({ v: 1, root });
const tree = (root: Node) => JSON.stringify(Tree.of(root).toJSON());

const group = (...children: unknown[]) => ({ type: "Group", direction: "column", children });
const stat = (value: unknown, extra: object = {}) => ({ type: "Stat", label: "N", value, ...extra });

// The numbers where JavaScript's three roundings (toFixed on the binary value, Intl on the shortest
// decimal, toPrecision) disagree with each other or with a plain Rust format!.
const NUMBERS = [
  0, 1, -1, 0.5, 1.005, 2.675, 0.125, -0.125, 0.375, 0.005, -0.005, 0.0049999, 0.004, 0.015, 99.995, 999.995, 1.255, 1234.5678,
  -1234.5678, 1e6, 1234567.891, 123456789.123456, 0.1 + 0.2, 1e21, 1.5e21, 1e-7, -0.001, 5e-324, 1e300, 12345678901234567890, 0.30000000000000004, 100, -100.5, 7.999, 8.995,
];

const negativeZero = "__NEGATIVE_ZERO__";
const written = (value: unknown) => JSON.stringify(value, (_, v) => (Object.is(v, -0) ? negativeZero : v)).replaceAll(`"${negativeZero}"`, "-0");

export const accepted: Accepted[] = [
  ...core.kinds.map((kind) => ({ name: `catalog example: ${kind.type}`, json: tree(kind.example) })),
  { name: "catalog: every kind in one Group", json: tree(group(...core.kinds.map((kind) => kind.example)) as Node) },
  // The e2e page's fixtures (packages/web/e2e/page.ts).
  { name: "e2e: choice", json: tree({ type: "Choice", id: "next-step", options: [{ id: "explore", label: "Start exploring", emphasis: "primary" }, { id: "park", label: "Park" }], repeat: "once" } as Node) },
  {
    name: "e2e: odd field ids",
    json: tree({ type: "Form", id: "odd", fields: [{ id: "constructor", label: "Ctor", input: "text", required: true }, { id: "__proto__", label: "Proto", input: "text", required: false }], submitLabel: "Go" } as Node),
  },
  { name: "e2e: hostile markdown is passed through untouched", json: tree({ type: "Text", markdown: '<script>alert(1)</script>\n\n| a | b |\n| --- | --- |\n| `x` | y |\n\n[tab](<java\tscript:x>)' } as Node) },
  {
    name: "e2e: awkward flow, chart and wide table",
    json: tree(
      group(
        { type: "Flow", steps: [{ id: "a", label: "Alpha step with a long label" }, { id: "b", label: "Beta" }, { id: "c", label: "Gamma" }], links: [{ from: "a", to: "a" }, { from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "a", label: "again" }] },
        { type: "Chart", kind: "line", title: "One point", series: [{ label: "Only", points: [{ x: "Mon", y: 3 }] }] },
        { type: "Table", columns: ["one", "two", "three"].map((key) => ({ key, label: `Column ${key}` })), rows: [{ one: "a", two: "b", three: "c" }] },
      ) as Node,
    ),
  },
  {
    name: "e2e: readings of every certainty",
    json: tree(
      group(
        stat(216, { unit: "tokens", change: { value: 18, as: "percent" } }),
        stat(Reading.atLeast(216), { unit: "tokens", change: { value: Reading.atLeast(4), as: "percent" } }),
        stat(Reading.estimate(216), { unit: "tokens", change: { value: Reading.estimate(-3), as: "amount" } }),
        stat(Reading.unknown(), { unit: "tokens", change: { value: Reading.unknown(), as: "percent" } }),
        stat(5, { change: { value: Reading.estimate(0.001), as: "percent" } }),
        stat(7, { change: { value: Reading.unknown(), as: "amount" } }),
        { type: "Chart", kind: "line", title: "Tokens by day", unit: "tokens", series: [{ label: "Mine", points: [{ x: "Mon", y: 10 }, { x: "Tue", y: Reading.unknown() }, { x: "Wed", y: Reading.atLeast(30) }, { x: "Thu", y: Reading.estimate(25) }] }] },
        { type: "Chart", kind: "bar", title: "Every point lost", series: [{ label: "Nothing", points: [{ x: "a", y: Reading.unknown() }, { x: "b", y: Reading.unknown() }] }] },
      ) as Node,
    ),
  },
  { name: "an older tree: bare numbers only", json: wire({ type: "Stat", label: "Visitors", value: 1204, change: { value: 18, as: "percent" }, tone: "positive" }) },
  { name: "reading written as an object: exact", json: wire(stat({ kind: "exact", value: 12 })) },
  { name: "percent change that rounds to zero", json: wire(stat(5, { change: { value: 0.004, as: "percent" } })) },
  { name: "percent change that is negative zero after rounding", json: wire(stat(5, { change: { value: -0.004, as: "percent" } })) },
  { name: "percent change, floor below zero", json: wire(stat(5, { change: { value: { kind: "atLeast", value: -2 }, as: "percent" } })) },
  { name: "unit that is a percent sign on the value", json: wire(stat({ kind: "estimate", value: 95 }, { unit: "%" })) },
  { name: "empty unit is no unit", json: wire(stat(3, { unit: "" })) },
  { name: "the top of a tree may carry extra keys", json: JSON.stringify({ v: 1, root: { type: "Text", markdown: "x" }, note: "ignored" }) },
  { name: "optional strings that are empty read as absent", json: wire(group({ type: "Choice", id: "c", prompt: "", options: [{ id: "a", label: "A" }] }, { type: "Table", caption: "", columns: [{ key: "a", label: "A" }], rows: [] }, { type: "Chart", kind: "bar", title: "", unit: "", series: [{ label: "S", points: [{ x: "a", y: 1 }] }] }, { type: "Flow", steps: [{ id: "a", label: "A", detail: "" }, { id: "b", label: "B" }], links: [{ from: "a", to: "b", label: "" }] })) },
  { name: "table: pipes, newlines, booleans, nulls, missing cells, numbers", json: wire({ type: "Table", caption: "Mixed", columns: [{ key: "a", label: "A|B" }, { key: "b", label: "Line\nbreak" }, { key: "c", label: "C" }], rows: [{ a: "x|y", b: "one\ntwo", c: true }, { a: null, b: 1234.5, c: false }, { b: 0.125 }] }) },
  { name: "table: a column key that is a built-in object property", json: wire({ type: "Table", columns: [{ key: "constructor", label: "C" }, { key: "toString", label: "T" }], rows: [{ constructor: 1, toString: "x" }] }) },
  { name: "table: no rows", json: wire({ type: "Table", columns: [{ key: "a", label: "A" }], rows: [] }) },
  { name: "chart: numeric x, repeated x, two series, roles and markers", json: wire({ type: "Chart", kind: "line", title: "T", unit: "ms", series: [{ label: "A", points: [{ x: 1, y: 1 }, { x: 2.5, y: 2 }, { x: 1, y: 9 }] }, { label: "B", role: "baseline", points: [{ x: "1", y: 3 }, { x: 2.5, y: { kind: "atLeast", value: 4 } }] }, { label: "C|D", role: "comparison", points: [{ x: 3, y: { kind: "unknown" } }] }], annotations: [{ at: 1, label: "one" }, { at: "x", label: "two" }, { at: 1e21, label: "big" }, { at: 0.000001, label: "small" }] }) },
  { name: "chart: numeric x -0 and 0 are one category", json: written({ v: 1, root: { type: "Chart", kind: "bar", series: [{ label: "S", points: [{ x: 0, y: 1 }, { x: -0, y: 2 }] }] } }) },
  { name: "group: row of short children joins with a dot", json: wire({ type: "Group", direction: "row", children: [{ type: "Label", text: "a" }, { type: "Text", markdown: "b" }] }) },
  { name: "group: row with a multi-line child falls back to blocks", json: wire({ type: "Group", direction: "row", children: [{ type: "Label", text: "a" }, { type: "Text", markdown: "b\nc" }] }) },
  { name: "group: nested", json: wire(group(group({ type: "Text", markdown: "deep" }), { type: "Label", text: "x", tone: "critical" })) },
  { name: "flow: no links reads in order", json: wire({ type: "Flow", steps: [{ id: "a", label: "A", detail: "first" }, { id: "b", label: "B" }, { id: "c", label: "C", detail: "last" }] }) },
  { name: "flow: duplicate step ids use the last label", json: wire({ type: "Flow", steps: [{ id: "a", label: "First" }, { id: "a", label: "Second" }], links: [{ from: "a", to: "a", label: "loop" }] }) },
  { name: "flow: cycles, self links, duplicate links", json: wire({ type: "Flow", steps: [{ id: "a", label: "A" }, { id: "b", label: "B" }, { id: "c", label: "C" }], links: [{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "a", label: "again" }, { from: "a", to: "b", label: "dup" }, { from: "b", to: "b" }] }) },
  { name: "form: every input kind, required, options", json: wire({ type: "Form", id: "f", fields: [{ id: "a", label: "A", input: "text", required: true }, { id: "b", label: "B", input: "number" }, { id: "c", label: "C", input: "select", options: ["x", "y"] }, { id: "d", label: "D", input: "checkbox", required: true }] }) },
  { name: "choice: prompt and options", json: wire({ type: "Choice", id: "c", prompt: "Go?", options: [{ id: "y", label: "Yes", emphasis: "primary" }, { id: "n", label: "No" }], repeat: "many" }) },
  { name: "label at the length limit, in letters and in emoji", json: wire(group({ type: "Label", text: "x".repeat(40) }, { type: "Label", text: "😀".repeat(40) })) },
  { name: "text: unicode and a lone newline", json: wire({ type: "Text", markdown: "héllo — 世界\n" }) },
  ...NUMBERS.map((n) => ({
    name: `number ${Object.is(n, -0) ? "-0" : n} on every surface that prints one`,
    json: written({
      v: 1,
      root: group(
        stat(n, { unit: "tokens", change: { value: n, as: "percent" } }),
        stat({ kind: "atLeast", value: n }, { change: { value: { kind: "estimate", value: n }, as: "amount" } }),
        { type: "Table", columns: [{ key: "n", label: "N" }], rows: [{ n }] },
        { type: "Chart", kind: "line", series: [{ label: "S", points: [{ x: n, y: n }] }], annotations: [{ at: n, label: "m" }] },
      ),
    }),
  })),
  { name: "number -0 in a table cell and as an x", json: written({ v: 1, root: group({ type: "Table", columns: [{ key: "n", label: "N" }], rows: [{ n: -0 }] }, { type: "Chart", kind: "line", series: [{ label: "S", points: [{ x: -0, y: -0 }] }] }) }) },
];

const root = (node: unknown) => ({ v: 1, root: node });
const refused = (name: string, input: unknown, words: "same" | "paths" = "same"): Refused => ({ name, json: written(input), words });
const choice = (id: string) => ({ type: "Choice", id, options: [{ id: "a", label: "A" }] });

export const refusals: Refused[] = [
  refused("not an object", 5),
  refused("no root", { v: 1 }),
  refused("no version", { root: { type: "Text", markdown: "x" } }),
  refused("a version this build can't read", { v: 2, root: { type: "Text", markdown: "x" } }),
  refused("a version written as text", { v: "1", root: { type: "Text", markdown: "x" } }),
  refused("a null version", { v: null, root: { type: "Text", markdown: "x" } }),
  refused("a root that is not an object", root("hi")),
  refused("a root that is null", root(null)),
  refused("a node with no type", root({ markdown: "x" })),
  refused("a type that is a number", root({ type: 5 })),
  refused("an unknown prop", root({ type: "Text", markdown: "x", foo: 1 })),
  refused("two unknown props", root({ type: "Label", text: "x", foo: 1, bar: 2 }), "paths"),
  refused("empty markdown", root({ type: "Text", markdown: "" })),
  refused("missing markdown", root({ type: "Text" }), "paths"),
  refused("markdown of the wrong type", root({ type: "Text", markdown: 5 }), "paths"),
  refused("an empty Group", root({ type: "Group", children: [] })),
  refused("a Group with no children prop", root({ type: "Group" }), "paths"),
  refused("a Group whose children is not a list", root({ type: "Group", children: 5 })),
  refused("a child that is null", root({ type: "Group", children: [null] })),
  refused("a bad child among good ones", root({ type: "Group", children: [{ type: "Text", markdown: "a" }, { type: "Label", text: "" }, { type: "Text" }] }), "paths"),
  refused("a Label over 40 characters", root({ type: "Label", text: "x".repeat(41) })),
  refused("a Label over 40 emoji", root({ type: "Label", text: "😀".repeat(41) }), "paths"),
  refused("an empty Label", root({ type: "Label", text: "" }), "paths"),
  refused("a tone that isn't one", root({ type: "Label", text: "a", tone: "red" }), "paths"),
  refused("a chart x that is a boolean", root({ type: "Chart", kind: "line", series: [{ label: "a", points: [{ x: true, y: 1 }] }] }), "paths"),
  refused("a series with no points", root({ type: "Chart", kind: "line", series: [{ label: "a", points: [] }] })),
  refused("a chart with no series", root({ type: "Chart", kind: "line", series: [] })),
  refused("a chart kind that isn't one", root({ type: "Chart", kind: "pie", series: [{ label: "a", points: [{ x: 1, y: 1 }] }] }), "paths"),
  refused("a series role that isn't one", root({ type: "Chart", kind: "line", series: [{ label: "a", role: "main", points: [{ x: 1, y: 1 }] }] }), "paths"),
  refused("a reading object with an extra prop", root(stat({ kind: "exact", value: 1, x: 2 }))),
  refused("a reading object with an extra prop, in a change", root(stat(1, { change: { value: { kind: "estimate", value: 1, x: 2 }, as: "amount" } }))),
  refused("an unknown reading with two extra props", root(stat({ kind: "unknown", a: 1, b: 2 }))),
  refused("a reading that is a string", root(stat("5"))),
  refused("a reading that is a list", root(stat([1]))),
  refused("a reading that is null", root(stat(null))),
  refused("a reading that is true", root(stat(true))),
  refused("a reading with no kind", root(stat({ value: 5 }))),
  refused("a reading kind that isn't one", root(stat({ kind: "maybe", value: 5 }))),
  refused("a reading kind that is a number", root(stat({ kind: 5, value: 5 }))),
  refused("an unknown reading that has a value", root(stat({ kind: "unknown", value: 5 }))),
  refused("a floor with no value", root(stat({ kind: "atLeast" }))),
  refused("a floor whose value is text", root(stat({ kind: "atLeast", value: "5" }))),
  refused("a floor whose value is null", root(stat({ kind: "atLeast", value: null }))),
  refused("a Stat with no value", root({ type: "Stat", label: "x" })),
  refused("a chart point with no y", root({ type: "Chart", kind: "line", series: [{ label: "a", points: [{ x: 1 }] }] })),
  refused("a chart point with a bad y", root({ type: "Chart", kind: "line", series: [{ label: "a", points: [{ x: 1, y: { kind: "exact" } }, { x: 2, y: "no" }] }] })),
  refused("a change with the wrong unit word", root(stat(1, { change: { value: 1, as: "ratio" } })), "paths"),
  refused("a Flow with one step", root({ type: "Flow", steps: [{ id: "a", label: "A" }] })),
  refused("links that point at missing steps", root({ type: "Flow", steps: [{ id: "a", label: "A" }, { id: "b", label: "B" }], links: [{ from: "a", to: "zz" }, { from: "q", to: "b" }] })),
  refused("a link that points at a built-in object property", root({ type: "Flow", steps: [{ id: "a", label: "A" }, { id: "b", label: "B" }], links: [{ from: "a", to: "constructor" }] })),
  refused("a row value that isn't a column", root({ type: "Table", columns: [{ key: "a", label: "A" }], rows: [{ a: 1, b: 2 }] })),
  refused("a row value that is a list", root({ type: "Table", columns: [{ key: "a", label: "A" }], rows: [{ a: [1] }] }), "paths"),
  refused("a row that is a number", root({ type: "Table", columns: [{ key: "a", label: "A" }], rows: [5] }), "paths"),
  refused("a Table with no columns", root({ type: "Table", columns: [], rows: [] })),
  refused("a select with no options", root({ type: "Form", id: "f", fields: [{ id: "a", label: "A", input: "select" }] })),
  refused("a select with an empty options list", root({ type: "Form", id: "f", fields: [{ id: "a", label: "A", input: "select", options: [] }] })),
  refused("an input kind that isn't one", root({ type: "Form", id: "f", fields: [{ id: "a", label: "A", input: "radio" }] }), "paths"),
  refused("a Form with no fields", root({ type: "Form", id: "f", fields: [] })),
  refused("a Choice with no options", root({ type: "Choice", id: "c", options: [] })),
  refused("an emphasis that isn't primary", root({ type: "Choice", id: "c", options: [{ id: "a", label: "A", emphasis: "secondary" }] })),
  refused("an option label over 40 characters", root({ type: "Choice", id: "c", options: [{ id: "a", label: "A".repeat(41) }] })),
  refused("a repeat that isn't one", root({ type: "Choice", id: "c", options: [{ id: "a", label: "A" }], repeat: "twice" }), "paths"),
  refused("the same id on a Choice and a Form", root(group(choice("c"), { type: "Form", id: "c", fields: [{ id: "a", label: "A", input: "text" }] }))),
  refused("the same id twice, deep in a tree", root(group(group(choice("c")), group(group(choice("c")))))),
  refused("an unknown prop on a nested node", root(group({ type: "Text", markdown: "ok" }, { type: "Group", children: [{ type: "Label", text: "a", color: "red" }] }))),
];

/** Trees core refuses only because it has no kind of that name, which Rust must keep drawing around. */
export const newerTrees: { name: string; json: string; kind: string; path: string; neighbour: string }[] = [
  { name: "an unknown kind beside known ones", json: wire(group({ type: "Text", markdown: "kept text" }, { type: "Gauge", value: 3 }, { type: "Label", text: "kept label" })), kind: "Gauge", path: "root.children[1] (Gauge)", neighbour: "kept label" },
  { name: "an unknown kind as the whole tree", json: wire({ type: "Heatmap", cells: [] }), kind: "Heatmap", path: "root (Heatmap)", neighbour: "" },
  { name: "an unknown kind deep in a Group, with props this build never saw", json: wire(group(group({ type: "Text", markdown: "kept text" }, { type: "Sparkline", points: [1, 2, 3], anything: { at: "all" } }))), kind: "Sparkline", path: "root.children[0].children[1] (Sparkline)", neighbour: "kept text" },
];

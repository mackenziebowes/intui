/**
 * Prints `{ cases, answers }`: the layout questions the parity check puts to Rust, and what
 * `packages/layout` answers to each, in the same shape `intui-layout` prints.
 */
import { Tree, type Node } from "../../../packages/core/src/index";
import { analyse, buildModel, changeShape, chartLabel, formatValue, niceDomain, niceStep, parseNumber, placeLabels, READING_MARK, withUnit } from "../../../packages/layout/src/index";

// A fixed pseudo-random sequence, so a failure names the same case on every run.
let seed = 20261014;
const next = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 2 ** 32;
};
const between = (lo: number, hi: number) => lo + next() * (hi - lo);
const whole = (lo: number, hi: number) => Math.floor(between(lo, hi + 1));
const magnitude = () => 10 ** between(-8, 12) * (next() < 0.2 ? -1 : 1);

const edgeNumbers = [0, -0, 1, 2, 5, 10, 0.3, 0.30000000000000004, 0.2, 1e-7, 1e-6, 0.00999, 0.01, 9.995, 99.95, 100, 999.5, 9999, 10000, 12500, 1e5, 999999, 1e6, 1.25e6, 1e9, 2.5e9, 1e12, 0.5, 1.005, 2.675, -1.5, -9.99, -12500, 123456789, 3.14159];

const niceStepCases = [...edgeNumbers, -1, ...Array.from({ length: 800 }, magnitude)];
const formatValueCases = [...edgeNumbers, ...Array.from({ length: 800 }, magnitude)];
const niceDomainCases = [
  [0, 0, "bar"], [0, 0, "line"], [5, 5, "line"], [5, 5, "bar"], [-5, -5, "line"], [3, 7, "bar"], [-3, -1, "bar"], [0, 1, "line"], [99.7, 100.2, "line"], [1200, 1800, "line"], [0.1, 0.3, "line"],
  ...Array.from({ length: 600 }, () => {
    const a = magnitude();
    const b = next() < 0.1 ? a : a + Math.abs(a) * between(0, 3);
    return [a, b, next() < 0.5 ? "bar" : "line"];
  }),
];
const unitCases = [
  ["5", "$"], ["5", "€"], ["5", "%"], ["95", "%"], ["120", "ms"], ["180", "visitors"], ["5", ""], ["5", null], ["5", "°C"], ["5", "$$"], ["5", "2x"], ["5", "٣"], ["5", "é"], ["5", " ms"], ["5", "_x"], ["5", "¥"], ["5", "kr."], ["5", "Ⅷ"],
];
const labelCases = Array.from({ length: 400 }, () => {
  const count = whole(0, 40);
  const total = whole(10, 120);
  const widths = Array.from({ length: count }, () => whole(1, 9));
  const centers = Array.from({ length: count }, (_, i) => (count <= 1 ? total / 2 : (i + 0.5) * (total / count) + (next() < 0.1 ? between(-3, 3) : 0)));
  return { centers, widths, total, gap: next() < 0.5 ? 1 : whole(0, 3) };
});
const numberTexts = ["", "  ", "5", " 5 ", "+5", "-5.25", ".5", "5.", "1e3", "1E-3", "1e", "e3", "1e999", "-1e999", "abc", "5x", "1,5", "0x10", "Infinity", "NaN", "--5", "1 2", " 5 ", "﻿5", "\u00855", "٣", "12345678901234567890", "x".repeat(30), "ééééééééééééééééééééé", "😀".repeat(15), ".", "+", "-.5e+2", "00012"];

const flowCases = (() => {
  const named = (count: number) => Array.from({ length: count }, (_, i) => ({ id: `s${i}`, label: `Step ${i}` }));
  const cases: { steps: { id: string; label: string }[]; links: { from: string; to: string; label?: string }[] }[] = [
    // The e2e page's fixtures: a link that skips a layer and a loop back; a self link, a loop and a long label.
    {
      steps: ["write", "who", "shape", "refused", "drawn", "text"].map((id) => ({ id, label: id })),
      links: [{ from: "write", to: "who" }, { from: "who", to: "shape", label: "yes" }, { from: "who", to: "refused", label: "notYours" }, { from: "shape", to: "drawn", label: "fits" }, { from: "shape", to: "refused", label: "problems" }, { from: "refused", to: "write", label: "retry" }, { from: "refused", to: "text", label: "give up" }],
    },
    { steps: [{ id: "a", label: "A" }, { id: "b", label: "B" }, { id: "c", label: "C" }], links: [{ from: "a", to: "a" }, { from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "a", label: "again" }] },
    { steps: named(4), links: [] },
    { steps: named(2), links: [{ from: "s1", to: "s0" }] },
    { steps: named(3), links: [{ from: "s0", to: "s1", label: "x" }, { from: "s0", to: "s1", label: "y" }, { from: "s0", to: "s1", label: "y" }, { from: "s0", to: "s1" }, { from: "s1", to: "s2" }] },
    { steps: named(3), links: [{ from: "s0", to: "nowhere" }, { from: "s0", to: "s2" }] },
    { steps: [{ id: "a", label: "first" }, { id: "a", label: "second" }, { id: "b", label: "B" }], links: [{ from: "a", to: "b" }, { from: "b", to: "a" }] },
    { steps: named(5), links: [{ from: "s0", to: "s1" }, { from: "s0", to: "s2" }, { from: "s1", to: "s3" }, { from: "s2", to: "s3" }, { from: "s3", to: "s4" }, { from: "s4", to: "s0" }, { from: "s4", to: "s2" }] },
    { steps: [{ id: "constructor", label: "C" }, { id: "__proto__", label: "P" }, { id: "toString", label: "T" }], links: [{ from: "constructor", to: "__proto__" }, { from: "__proto__", to: "toString" }, { from: "toString", to: "constructor" }] },
  ];
  for (let i = 0; i < 300; i++) {
    const count = whole(2, 14);
    const links = Array.from({ length: whole(0, count * 2) }, () => ({
      from: `s${whole(0, count - 1)}`,
      to: next() < 0.05 ? "missing" : `s${whole(0, count - 1)}`,
      ...(next() < 0.3 ? { label: ["a", "b", "c"][whole(0, 2)]! } : {}),
    }));
    cases.push({ steps: named(count), links });
  }
  return cases;
})();

const chartTrees = (() => {
  const chart = (props: object) => Tree.parse({ v: 1, root: { type: "Chart", ...props } }).root;
  const pts = (...ys: unknown[]) => ys.map((y, i) => ({ x: `d${i}`, y }));
  return [
    chart({ kind: "line", title: "Visitors", unit: "visitors", series: [{ label: "This week", points: pts(120, 180, 90) }, { label: "Usual", role: "baseline", points: pts(110, 115, 105) }], annotations: [{ at: "d1", label: "New pricing page" }, { at: "gone", label: "Nowhere" }] }),
    chart({ kind: "line", title: "Tokens", unit: "tokens", series: [{ label: "Mine", points: pts(10, { kind: "unknown" }, { kind: "atLeast", value: 30 }, { kind: "estimate", value: 25 }, 40) }] }),
    chart({ kind: "bar", title: "Every point lost", series: [{ label: "Nothing", points: pts({ kind: "unknown" }, { kind: "unknown" }) }] }),
    chart({ kind: "bar", series: [{ label: "Bars", points: pts(100, { kind: "atLeast", value: 180 }, { kind: "estimate", value: 120 }) }] }),
    chart({ kind: "line", series: [{ label: "Flat", points: pts(7, 7, 7) }] }),
    chart({ kind: "line", series: [{ label: "Zero", points: pts(0, 0) }] }),
    chart({ kind: "bar", series: [{ label: "Negative", points: pts(-3, -8, -1) }] }),
    chart({ kind: "line", unit: "", title: "", series: [{ label: "Sparse", points: [{ x: 1, y: 1 }, { x: 3, y: 2 }] }, { label: "Other", role: "comparison", points: [{ x: 2, y: 5 }, { x: 3, y: 4 }, { x: 1, y: 1 }] }], annotations: [{ at: 3, label: "three" }, { at: 2.5, label: "between" }, { at: 1, label: "one" }, { at: -0, label: "zero" }] }),
    chart({ kind: "line", series: [{ label: "Zeros", points: [{ x: -0, y: 1 }, { x: 0, y: 2 }] }], annotations: [{ at: 0, label: "z" }] }),
    chart({ kind: "line", series: [{ label: "Many", points: Array.from({ length: 12 }, (_, i) => ({ x: `d${i}`, y: i % 3 === 0 ? { kind: "unknown" } : i * 1234.5678 })) }], annotations: Array.from({ length: 11 }, (_, i) => ({ at: `d${i}`, label: `m${i}` })) }),
  ] as Node[];
})();

const changeCases = [
  { value: 18, as: "percent" }, { value: -3, as: "amount" }, { value: 0, as: "amount" }, { value: 0.004, as: "percent" }, { value: -0.004, as: "percent" }, { value: 0.005, as: "percent" }, { value: -0.005, as: "percent" },
  { value: { kind: "atLeast", value: 4 }, as: "percent" }, { value: { kind: "atLeast", value: -4 }, as: "percent" }, { value: { kind: "atLeast", value: 0 }, as: "percent" }, { value: { kind: "atLeast", value: 0.001 }, as: "percent" },
  { value: { kind: "estimate", value: 2.675 }, as: "amount" }, { value: { kind: "estimate", value: -0.001 }, as: "amount" }, { value: { kind: "exact", value: 1.005 }, as: "amount" }, { value: { kind: "unknown" }, as: "amount" },
];

const cases = {
  niceStep: niceStepCases,
  niceDomain: niceDomainCases,
  formatValue: formatValueCases,
  withUnit: unitCases,
  placeLabels: labelCases,
  parseNumber: numberTexts,
  flows: flowCases,
  charts: chartTrees.map((root) => Tree.parse({ v: 1, root }).toJSON().root),
  changes: changeCases,
};

const answers = {
  niceStep: niceStepCases.map(niceStep),
  niceDomain: niceDomainCases.map(([min, max, kind]) => niceDomain(min as number, max as number, kind as "line" | "bar")),
  formatValue: formatValueCases.map(formatValue),
  withUnit: unitCases.map(([value, unit]) => withUnit(value as string, (unit ?? undefined) as string | undefined)),
  placeLabels: labelCases.map((c) => placeLabels(c.centers, c.widths, c.total, c.gap)),
  parseNumber: numberTexts.map(parseNumber),
  flows: flowCases.map((c) => {
    const a = analyse(c.steps, c.links);
    const edge = (e: { from: number; to: number; label?: string }) => ({ from: e.from, to: e.to, label: e.label ?? null });
    return { edges: a.edges.map(edge), back: a.back.map(edge), layers: a.layers, layerOf: a.layerOf };
  }),
  charts: chartTrees.map((root) => {
    const tree = Tree.parse({ v: 1, root });
    const props = tree.root as never as Parameters<typeof buildModel>[0];
    const model = buildModel(props);
    return {
      kind: model.kind,
      unit: model.unit ?? null,
      xs: model.xs,
      series: model.series.map((s) => ({ label: s.label, role: s.role, values: s.values, kinds: s.kinds })),
      domain: model.domain,
      readable: model.readable,
      markers: model.markers.map((m) => ({ n: m.n, at: m.at, label: m.label, index: m.index ?? null })),
      label: chartLabel(model, props.title),
    };
  }),
  changes: changeCases.map((c) => {
    const parsed = Tree.parse({ v: 1, root: { type: "Stat", label: "x", value: 1, change: c } }).root as never as { change: Parameters<typeof changeShape>[0] };
    const shape = changeShape(parsed.change);
    return { way: shape.way ?? null, figure: shape.figure ?? null, kind: shape.kind, mark: READING_MARK[shape.kind] };
  }),
};

console.log(JSON.stringify({ cases, answers }, (_, value) => (value === undefined ? null : value)));

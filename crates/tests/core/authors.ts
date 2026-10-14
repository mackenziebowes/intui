/** Prints core's verdict on each tree for each author: `[{ name, json, verdicts: { model, code, none } }]`, each `{ ok: true } | { ok: false, message }`. */
import { Tree } from "../../../packages/core/src/index";

const stat = { type: "Stat", label: "Visitors", value: 1204 };
const chart = { type: "Chart", kind: "bar", title: "Visits", series: [{ label: "Mine", points: [{ x: "Mon", y: 3 }] }] };
const text = { type: "Text", markdown: "hello" };
const choice = { type: "Choice", id: "c", options: [{ id: "a", label: "A" }] };
const group = (...children: unknown[]) => ({ type: "Group", direction: "column", children });
const wire = (root: unknown) => JSON.stringify({ v: 1, root });

const trees = [
  { name: "only kinds anyone may write", json: wire(group(text, group(choice))) },
  { name: "a Stat nested in a Group", json: wire(group(text, group(stat))) },
  { name: "a Chart at the root", json: wire(chart) },
  { name: "a Stat and a Chart among writable kinds", json: wire(group(stat, text, group(chart, stat))) },
  { name: "a repeated id beside a Stat", json: wire(group(choice, choice, stat)) },
];

const verdict = (json: string, author?: "model" | "code"): { ok: true } | { ok: false; message: string } => {
  try {
    Tree.parse(JSON.parse(json), author ? { author } : {});
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : String(error) };
  }
};

console.log(JSON.stringify(trees.map((tree) => ({ ...tree, verdicts: { model: verdict(tree.json, "model"), code: verdict(tree.json, "code"), none: verdict(tree.json) } }))));

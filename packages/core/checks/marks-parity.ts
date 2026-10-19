/**
 * Marks and Ladder, core against the Rust crates (proposal 005): the text form of each example and the refusal for each
 * bad tree must be byte for byte the same in both. Run after `cargo build -p intui-text`:
 *   bun packages/core/checks/marks-parity.ts
 * Exits 1 on the first difference. It drives the real `intui-text` binary, so it checks what ships.
 */
import { join } from "node:path";
import { Ladder, Marks, Tree } from "../src";

const bin = join(import.meta.dir, "../../../crates/target/debug/intui-text");
const L: any = Ladder.example;
const M: any = Marks.example;
const good = [Marks.example, Ladder.example, { ...L, rungs: [{ id: "a", label: "Free pages", nodes: [{ id: "n", label: "bookkeeping", group: "bookkeeping", unknown: "Kokumi unreadable since 14:00" }, { id: "m", label: "Other pages", group: "bookkeeping", count: "46 a week" }] }], steps: [] }];
const bad = [
  { ...L, rungs: [{ id: "a", label: "A", nodes: [{ id: "n", label: "N", marks: [{ kind: "visit" }], unknown: "gone" }] }], steps: [] },
  { ...M, rows: [{ label: "x", marks: Array.from({ length: 201 }, () => ({ kind: "person" })) }] },
  { ...M, rows: [{ label: "x", marks: [{ kind: "ghost", state: "nope" }] }] },
  { ...L, kinds: [], rungs: [{ id: "a", label: "A", nodes: [{ id: "n", label: "N" }, { id: "n", label: "M", count: "3", unknown: "x" }] }], steps: [{ from: "q", to: "n", label: "l" }] },
  { ...M, rows: [] },
];

function rust(root: unknown): { text: string; refusal: string } {
  const p = Bun.spawnSync([bin, "--author", "code"], { stdin: new TextEncoder().encode(JSON.stringify({ v: 1, root })) });
  return { text: new TextDecoder().decode(p.stdout), refusal: new TextDecoder().decode(p.stderr) };
}

let differences = 0;
const same = (what: string, a: string, b: string) => {
  const ok = a.trim() === b.trim();
  console.log(`${ok ? "SAME" : "DIFF"}  ${what}`);
  if (!ok) {
    differences++;
    console.log(`--- core\n${a}\n--- rust\n${b}`);
  }
};
good.forEach((root, i) => same(`text form ${i + 1}`, Tree.parse({ v: 1, root }, { author: "code" }).toText(), rust(root).text));
bad.forEach((root, i) => {
  let core = "ACCEPTED";
  try {
    Tree.parse({ v: 1, root }, { author: "code" });
  } catch (e: any) {
    core = String(e.message);
  }
  same(`refusal ${i + 1}`, core, rust(root).refusal || "ACCEPTED");
});
console.log(differences === 0 ? "ALL SAME" : `${differences} DIFFERENT`);
process.exit(differences === 0 ? 0 : 1);

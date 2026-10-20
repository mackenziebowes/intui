/**
 * The control machine, core against the Rust crates (hub #1956): each event sequence is replayed
 * through core's `stepControl` and through the `intui-control` binary, and the lines they print
 * must be byte for byte the same. Run after `cargo build -p intui-event` (in crates/):
 *   bun packages/core/checks/control-parity.ts
 * Exits 1 on the first difference. It drives the real binary, so it checks what ships.
 */
import { join } from "node:path";
import { startControl, stepControl, Tree, type Answer, type ControlEvent, type ControlState, type IntuiEvent } from "../src";

const binary = join(import.meta.dir, "../../../crates/target/debug/intui-control");

type WireEvent = { answered: IntuiEvent } | "accepted" | { refused: string };
type Case = { name: string; root: unknown; control: string; canSend: boolean; earlier: IntuiEvent | null; events: WireEvent[] };

const choice = (repeat: "once" | "many") => ({ type: "Choice", id: "c", repeat, options: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }] });
const form = { type: "Form", id: "f", submitLabel: "Send", fields: [{ id: "title", label: "Title", input: "text", required: true }, { id: "points", label: "Points", input: "number" }] };
const press = (value: string, target = "c"): WireEvent => ({ answered: { v: 1, source: "s", target, action: "press", value } });
const submit = (value: Record<string, string | number | boolean>): WireEvent => ({ answered: { v: 1, source: "s", target: "f", action: "submit", value } });

const cases: Case[] = [
  { name: "once: answer, busy, accepted, used up", root: choice("once"), control: "c", canSend: true, earlier: null, events: [press("yes"), press("no"), "accepted", press("yes")] },
  { name: "host refuses, then retry", root: choice("once"), control: "c", canSend: true, earlier: null, events: [press("yes"), { refused: "hub is restarting\nstack trace" }, press("no"), "accepted"] },
  { name: "an option that isn't there", root: choice("once"), control: "c", canSend: true, earlier: null, events: [press("maybe")] },
  { name: "many: answer again after sent", root: choice("many"), control: "c", canSend: true, earlier: null, events: [press("yes"), "accepted", press("no"), "accepted"] },
  { name: "read-only", root: choice("once"), control: "c", canSend: false, earlier: null, events: [press("yes"), "accepted"] },
  { name: "already answered, stray verdicts", root: choice("once"), control: "c", canSend: true, earlier: { v: 1, source: "s", target: "c", action: "press", value: "no" }, events: ["accepted", { refused: "late" }, press("yes")] },
  { name: "form: required left out, wrong type, then fits", root: form, control: "f", canSend: true, earlier: null, events: [submit({ points: 3 }), submit({ title: "Hub", points: "three" }), submit({ title: "Hub", points: 3 }), "accepted"] },
  { name: "form: an unknown field, then a press at a form", root: form, control: "f", canSend: true, earlier: null, events: [submit({ title: "Hub", colour: "red" }), press("yes", "f")] },
];

function answerOf(event: IntuiEvent): Answer {
  return event.action === "press" ? { kind: "press", option: event.value } : { kind: "submit", values: event.value };
}

function coreLines(c: Case): string[] {
  const tree = Tree.of(c.root as never);
  const control = Tree.interactive(tree, c.control)!;
  let state: ControlState = startControl(c.canSend, c.earlier ? answerOf(c.earlier) : undefined);
  return c.events.map((wire) => {
    const event: ControlEvent = wire === "accepted" ? { kind: "accepted" } : "refused" in wire ? { kind: "refused", why: wire.refused } : { kind: "answered", answer: answerOf(wire.answered) };
    const result = stepControl({ source: "s", control }, state, event);
    state = result.state;
    if (result.ignored) return `${state.kind} | ignored: ${result.why}`;
    const effect = result.effects[0];
    if (effect) return `${state.kind} | send ${effect.event.action} ${effect.event.target}`;
    return state.kind === "refused" ? `${state.kind} | why: ${state.why}` : state.kind;
  });
}

function rustLines(c: Case): string[] {
  const input = JSON.stringify({ tree: { v: 1, root: c.root }, source: "s", control: c.control, canSend: c.canSend, earlier: c.earlier, events: c.events });
  const run = Bun.spawnSync([binary], { stdin: new TextEncoder().encode(input) });
  if (run.exitCode !== 0) return [`EXIT ${run.exitCode}: ${run.stderr.toString().trim()}`];
  return run.stdout.toString().trimEnd().split("\n");
}

let differences = 0;
for (const c of cases) {
  const a = coreLines(c).join("\n");
  const b = rustLines(c).join("\n");
  if (a === b) console.log(`SAME  ${c.name}`);
  else {
    differences++;
    console.log(`DIFF  ${c.name}\n--- core\n${a}\n--- rust\n${b}`);
  }
}
console.log(differences === 0 ? "ALL SAME" : `${differences} DIFFERENT`);
process.exit(differences === 0 ? 0 : 1);

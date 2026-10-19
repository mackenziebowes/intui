/**
 * The Marks component (proposal 005): rows of small marks, one per thing counted, for counts small
 * enough to show one by one. A mark has a kind (what it is: a person, a visit; the first kind is
 * drawn filled, the second hollow, the third as a ring) and optionally a state (how far it got).
 * A row can carry a halo, an amount around the row that is not a mark, and can be unknown, said
 * with its reason so it is never drawn as zero. Only code may write it, since it shows numbers.
 * This file also holds the pieces Ladder shares: the mark, the kinds, the states and the counts text.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";
import { tone, type Tone } from "./label";

/** The most marks one row or node may hold; more is a count, and a Chart or a `count` says it better. */
export const MAX_MARKS = 200;

export interface MarkKind {
  id: string;
  /** What the marks are, plural ("people", "visits"). */
  label: string;
  /** The singular, for a count of one ("person"). */
  one?: string;
}

export interface MarkState {
  id: string;
  label: string;
  tone: Tone;
}

export interface Mark {
  kind: string;
  state?: string;
  detail?: string;
}

export const markKindSchema = z.strictObject({ id: z.string().min(1), label: z.string().min(1), one: z.string().min(1).optional() }).meta({ id: "MarkKind" });
export const markStateSchema = z.strictObject({ id: z.string().min(1), label: z.string().min(1), tone: tone.default("neutral") }).meta({ id: "MarkState" });
export const markSchema = z.strictObject({ kind: z.string().min(1), state: z.string().min(1).optional(), detail: z.string().min(1).optional() }).meta({ id: "Mark" });

type Issue = (path: (string | number)[], message: string) => void;

/** Kinds are one to three and unique; states are unique. */
export function checkKindsAndStates(kinds: MarkKind[], states: MarkState[], issue: Issue): void {
  if (kinds.length < 1 || kinds.length > 3) issue(["kinds"], `there are ${kinds.length} kinds; declare one to three (the first is drawn filled, the second hollow, the third as a ring)`);
  const seen = new Set<string>();
  kinds.forEach((kind, i) => {
    if (seen.has(kind.id)) issue(["kinds", i, "id"], `kind "${kind.id}" is declared twice; give each kind its own id`);
    seen.add(kind.id);
  });
  const seenStates = new Set<string>();
  states.forEach((state, i) => {
    if (seenStates.has(state.id)) issue(["states", i, "id"], `state "${state.id}" is declared twice; give each state its own id`);
    seenStates.add(state.id);
  });
}

/** Marks name declared kinds and states, there are at most MAX_MARKS, and a thing that is unknown has none. */
export function checkMarks(path: (string | number)[], marks: Mark[], unknown: string | undefined, kinds: MarkKind[], states: MarkState[], issue: Issue): void {
  if (unknown !== undefined && marks.length > 0) {
    issue([...path, "unknown"], `an unknown row has no marks (this one has ${marks.length} and says "${unknown}"); say why it is unknown or give its marks, never both`);
  }
  if (marks.length > MAX_MARKS) {
    issue([...path, "marks"], `${marks.length} marks is more than ${MAX_MARKS}; a count that large is a number, so use a Chart, or give the count in text (\`count\`, or a \`halo\`)`);
  }
  const kindIds = new Set(kinds.map((kind) => kind.id));
  const stateIds = new Set(states.map((state) => state.id));
  marks.forEach((mark, i) => {
    if (!kindIds.has(mark.kind)) issue([...path, "marks", i, "kind"], `mark kind "${mark.kind}" isn't declared; use one of ${[...kindIds].join(", ")}`);
    if (mark.state !== undefined && !stateIds.has(mark.state)) {
      issue([...path, "marks", i, "state"], `mark state "${mark.state}" isn't declared; use one of ${stateIds.size ? [...stateIds].join(", ") : "none (this component declares no states)"}`);
    }
  });
}

/** "4 visits, 1 person", in the order the kinds were declared; "none" when there are no marks. */
export function kindCounts(marks: Mark[], kinds: MarkKind[]): string {
  const parts = kinds.flatMap((kind) => {
    const n = marks.filter((mark) => mark.kind === kind.id).length;
    return n === 0 ? [] : [`${n} ${n === 1 && kind.one ? kind.one : kind.label}`];
  });
  return parts.length ? parts.join(", ") : "none";
}

/** "4 touched, 1 committed", in the order the states were declared; marks with no state are left out. */
export function stateCounts(marks: Mark[], states: MarkState[]): string {
  return states
    .map((state) => [state, marks.filter((mark) => mark.state === state.id).length] as const)
    .filter(([, n]) => n > 0)
    .map(([state, n]) => `${n} ${state.label}`)
    .join(", ");
}

const SHAPES = ["filled", "hollow", "ring"] as const;

/** "Marks are people (filled) and visits (hollow)." */
export function keyText(kinds: MarkKind[]): string {
  const parts = kinds.map((kind, i) => `${kind.label} (${SHAPES[i] ?? "ring"})`);
  return `Marks are ${parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0]}.`;
}

/** "clicks with reading 1 (3 clicks in all; mail scanners click too)" */
export function haloText(halo: { label: string; n: number; detail?: string }): string {
  return `${halo.label} ${halo.n}${halo.detail ? ` (${halo.detail})` : ""}`;
}

export interface MarksRow {
  label: string;
  note?: string;
  marks: Mark[];
  halo?: { label: string; n: number; detail?: string };
  unknown?: string;
}

export interface MarksProps extends Node {
  type: "Marks";
  kinds: MarkKind[];
  states: MarkState[];
  rows: MarksRow[];
}

export const Marks = defineKind<MarksProps>({
  type: "Marks",
  summary: "Rows of small marks, one per thing counted, each in a state: for counts small enough to show one by one.",
  writer: "code",
  schema: () =>
    z
      .strictObject({
        type: z.literal("Marks"),
        kinds: z.array(markKindSchema),
        states: z.array(markStateSchema).default([]),
        rows: z
          .array(
            z
              .strictObject({
                label: z.string().min(1),
                note: z.string().min(1).optional(),
                marks: z.array(markSchema).default([]),
                halo: z.strictObject({ label: z.string().min(1), n: z.number().int().min(0), detail: z.string().min(1).optional() }).meta({ id: "MarksHalo" }).optional(),
                unknown: z.string().min(1).optional(),
              })
              .meta({ id: "MarksRow" }),
          )
          .min(1, "Marks needs at least one row; use a Text to say there is nothing to show"),
      })
      .superRefine((marks, ctx) => {
        const issue: Issue = (path, message) => ctx.addIssue({ code: "custom", path, message });
        checkKindsAndStates(marks.kinds, marks.states, issue);
        marks.rows.forEach((row, i) => checkMarks(["rows", i], row.marks, row.unknown, marks.kinds, marks.states, issue));
      })
      .meta({ id: "Marks" }),
  toText: (props) => {
    const lines = props.rows.map((row) => {
      const head = `- **${row.label}**${row.note ? ` (${row.note})` : ""}:`;
      if (row.unknown !== undefined) return `${head} unknown, ${row.unknown}`;
      const states = stateCounts(row.marks, props.states);
      const halo = row.halo ? `; ${haloText(row.halo)}` : "";
      return `${head} ${kindCounts(row.marks, props.kinds)}${states ? `: ${states}` : ""}${halo}`;
    });
    return [keyText(props.kinds), ...lines].join("\n");
  },
  example: {
    type: "Marks",
    kinds: [{ id: "person", label: "people", one: "person" }],
    states: [
      { id: "touched", label: "touched", tone: "neutral" },
      { id: "replied", label: "replied", tone: "positive" },
    ],
    rows: [
      {
        label: "Batch 1",
        note: "read their site, name their software",
        marks: [
          { kind: "person", state: "touched" },
          { kind: "person", state: "touched" },
          { kind: "person", state: "replied", detail: "asked about price" },
        ],
        halo: { label: "clicks with reading", n: 1, detail: "3 clicks in all; mail scanners click too" },
      },
    ],
  },
});

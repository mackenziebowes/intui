/**
 * The Ladder component (proposal 005): stages from the bottom up, each holding nodes with marks in
 * them, and counted steps between nodes. A node can say its count in text (when there are too many
 * marks to show one by one) or say it is unknown with the reason, never zero. Only code may write it.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";
import { checkKindsAndStates, checkMarks, kindCounts, keyText, markKindSchema, markSchema, markStateSchema, stateCounts, type Mark, type MarkKind, type MarkState } from "./marks";

/** A kind of mark that can't be counted here, and why. Marks of the other kinds still draw. */
export interface UnknownKind {
  kind: string;
  why: string;
}

export interface LadderNode {
  id: string;
  label: string;
  /** The full name, when `label` is short: the text form says it, a drawing shows it on hover. */
  full?: string;
  /** What the node belongs to (a site); nodes of one group are read together. */
  group?: string;
  marks: Mark[];
  /** The count in words, used instead of counting marks ("46 a week"). */
  count?: string;
  /** Why the node can't be counted at all. Then it has no marks. */
  unknown?: string;
  /** Kinds of mark this node can't count, and why; it has no marks of those kinds. */
  unknownKinds?: UnknownKind[];
}

export interface LadderRung {
  id: string;
  label: string;
  nodes: LadderNode[];
  /** Said when the rung has no nodes ("none yet"). */
  empty?: string;
  /** Kinds of mark no node of this rung can count, and why, said once for the rung. */
  unknownKinds?: UnknownKind[];
}

export interface LadderStep {
  from: string;
  to: string;
  label: string;
  /** How many things went along this step, so a renderer can draw one for each (a spark per visit). The label says it in words. */
  n?: number;
}

export interface LadderProps extends Node {
  type: "Ladder";
  kinds: MarkKind[];
  states: MarkState[];
  /** Listed bottom to top. */
  rungs: LadderRung[];
  steps: LadderStep[];
}

const unknownKindSchema = z.strictObject({ kind: z.string().min(1), why: z.string().min(1) }).meta({ id: "LadderUnknownKind" });

export const Ladder = defineKind<LadderProps>({
  type: "Ladder",
  summary: "Stages from the bottom up with marks in them and counted steps between them: how far things got.",
  writer: "code",
  schema: () =>
    z
      .strictObject({
        type: z.literal("Ladder"),
        kinds: z.array(markKindSchema),
        states: z.array(markStateSchema).default([]),
        rungs: z
          .array(
            z
              .strictObject({
                id: z.string().min(1),
                label: z.string().min(1),
                nodes: z
                  .array(
                    z
                      .strictObject({
                        id: z.string().min(1),
                        label: z.string().min(1),
                        full: z.string().min(1).optional(),
                        group: z.string().min(1).optional(),
                        marks: z.array(markSchema).default([]),
                        count: z.string().min(1).optional(),
                        unknown: z.string().min(1).optional(),
                        unknownKinds: z.array(unknownKindSchema).optional(),
                      })
                      .meta({ id: "LadderNode" }),
                  )
                  .default([]),
                empty: z.string().min(1).optional(),
                unknownKinds: z.array(unknownKindSchema).optional(),
              })
              .meta({ id: "LadderRung" }),
          )
          .min(1, "a Ladder needs at least one rung; use a Text to say there is nothing to show"),
        steps: z
          .array(z.strictObject({ from: z.string().min(1), to: z.string().min(1), label: z.string().min(1), n: z.number().int().min(0).optional() }).meta({ id: "LadderStep" }))
          .default([]),
      })
      .superRefine((ladder, ctx) => {
        const issue = (path: (string | number)[], message: string) => ctx.addIssue({ code: "custom", path, message });
        checkKindsAndStates(ladder.kinds, ladder.states, issue);
        const ids = new Map<string, string>();
        const declared = new Set(ladder.kinds.map((kind) => kind.id));
        const unknownIn = (path: (string | number)[], list: UnknownKind[] | undefined) =>
          (list ?? []).forEach((u, i) => {
            if (!declared.has(u.kind)) issue([...path, "unknownKinds", i, "kind"], `unknown kind "${u.kind}" isn't declared; use one of ${[...declared].join(", ")}`);
          });
        ladder.rungs.forEach((rung, r) => {
          unknownIn(["rungs", r], rung.unknownKinds);
          rung.nodes.forEach((node, n) => {
            unknownIn(["rungs", r, "nodes", n], node.unknownKinds);
            for (const u of [...(rung.unknownKinds ?? []), ...(node.unknownKinds ?? [])]) {
              if (node.marks.some((mark) => mark.kind === u.kind)) {
                issue(["rungs", r, "nodes", n, "marks"], `this node draws ${u.kind} marks but calls ${u.kind} unknown ("${u.why}"); drop the marks, or drop the unknown`);
              }
            }
            const path = ["rungs", r, "nodes", n];
            if (ids.has(node.id)) issue([...path, "id"], `node id "${node.id}" is already used in rung ${ids.get(node.id)}; give each node its own id`);
            ids.set(node.id, rung.id);
            checkMarks(path, node.marks, node.unknown, ladder.kinds, ladder.states, issue);
            if (node.unknown !== undefined && node.count !== undefined) {
              issue([...path, "unknown"], `a node can't be both unknown ("${node.unknown}") and counted ("${node.count}"); keep one`);
            }
          });
        });
        ladder.steps.forEach((step, i) => {
          for (const end of ["from", "to"] as const) {
            if (!ids.has(step[end])) issue(["steps", i, end], `step points at node "${step[end]}", which doesn't exist; use one of ${[...ids.keys()].join(", ") || "none (this ladder has no nodes)"}`);
          }
        });
      })
      .meta({ id: "Ladder" }),
  toText: (props) => {
    const kindLabel = (id: string) => props.kinds.find((kind) => kind.id === id)?.label ?? id;
    const unknownText = (list: UnknownKind[] | undefined) => (list ?? []).map((u) => `${kindLabel(u.kind)} unknown, ${u.why}`).join("; ");
    const nodeText = (node: LadderNode): string => {
      const name = node.full ?? node.label;
      if (node.unknown !== undefined) return `${name}: unknown, ${node.unknown}`;
      const states = stateCounts(node.marks, props.states);
      const own = unknownText(node.unknownKinds);
      return `${name} ${node.count ?? kindCounts(node.marks, props.kinds)}${states && !node.count ? ` (${states})` : ""}${own ? ` (${own})` : ""}`;
    };
    const rungText = (rung: LadderRung): string => {
      const note = unknownText(rung.unknownKinds);
      const tail = note ? ` (${note})` : "";
      if (rung.nodes.length === 0) return `- **${rung.label}:** ${rung.empty ?? "none"}${tail}`;
      const groups = [...new Set(rung.nodes.map((node) => node.group ?? ""))];
      const segments = groups.map((group) => {
        const nodes = rung.nodes.filter((node) => (node.group ?? "") === group).map(nodeText).join("; ");
        return group ? `${group}: ${nodes}` : nodes;
      });
      return `- **${rung.label}:** ${segments.join(". ")}${tail}`;
    };
    const label = new Map(props.rungs.flatMap((rung) => rung.nodes.map((node) => [node.id, node.full ?? node.label] as const)));
    const steps = props.steps.map((step) => `- ${label.get(step.from)} → ${label.get(step.to)}: ${step.label}`);
    return [keyText(props.kinds), ...[...props.rungs].reverse().map(rungText), ...(steps.length ? ["Steps:", ...steps] : [])].join("\n");
  },
  example: {
    type: "Ladder",
    kinds: [{ id: "visit", label: "visits", one: "visit" }],
    states: [],
    rungs: [
      { id: "pages", label: "Free pages", nodes: [{ id: "checklist", label: "Close checklist", group: "bookkeeping", marks: [{ kind: "visit" }, { kind: "visit" }] }] },
      { id: "lists", label: "Waitlists", nodes: [{ id: "kit", label: "Close kit", marks: [{ kind: "visit" }] }] },
      { id: "paid", label: "Paid", nodes: [], empty: "none yet" },
    ],
    steps: [{ from: "checklist", to: "kit", label: "1 visit went on" }],
  },
});

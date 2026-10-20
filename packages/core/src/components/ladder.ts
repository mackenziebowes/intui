/**
 * The Ladder component (proposal 005): stages from the bottom up, each holding nodes with marks in
 * them, and counted steps between nodes. A node can say its count in text (when there are too many
 * marks to show one by one) or say it is unknown with the reason, never zero. Only code may write it.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";
import { checkKindsAndStates, checkMarks, kindCounts, keyText, markKindSchema, markSchema, markStateSchema, stateCounts, type Mark, type MarkKind, type MarkState } from "./marks";

export interface LadderNode {
  id: string;
  label: string;
  /** What the node belongs to (a site); nodes of one group are read together. */
  group?: string;
  marks: Mark[];
  /** The count in words, used instead of counting marks ("46 a week"). */
  count?: string;
  /** Why the node can't be counted. Then it has no marks. */
  unknown?: string;
}

export interface LadderRung {
  id: string;
  label: string;
  nodes: LadderNode[];
  /** Said when the rung has no nodes ("none yet"). */
  empty?: string;
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
                        group: z.string().min(1).optional(),
                        marks: z.array(markSchema).default([]),
                        count: z.string().min(1).optional(),
                        unknown: z.string().min(1).optional(),
                      })
                      .meta({ id: "LadderNode" }),
                  )
                  .default([]),
                empty: z.string().min(1).optional(),
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
        ladder.rungs.forEach((rung, r) => {
          rung.nodes.forEach((node, n) => {
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
    const nodeText = (node: LadderNode): string => {
      if (node.unknown !== undefined) return `${node.label}: unknown, ${node.unknown}`;
      const states = stateCounts(node.marks, props.states);
      return `${node.label} ${node.count ?? kindCounts(node.marks, props.kinds)}${states && !node.count ? ` (${states})` : ""}`;
    };
    const rungText = (rung: LadderRung): string => {
      if (rung.nodes.length === 0) return `- **${rung.label}:** ${rung.empty ?? "none"}`;
      const groups = [...new Set(rung.nodes.map((node) => node.group ?? ""))];
      const segments = groups.map((group) => {
        const nodes = rung.nodes.filter((node) => (node.group ?? "") === group).map(nodeText).join("; ");
        return group ? `${group}: ${nodes}` : nodes;
      });
      return `- **${rung.label}:** ${segments.join(". ")}`;
    };
    const label = new Map(props.rungs.flatMap((rung) => rung.nodes.map((node) => [node.id, node.label] as const)));
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

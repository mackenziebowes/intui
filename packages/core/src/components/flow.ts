import { z } from "zod";
import { defineKind, type Node } from "../component";

export interface FlowStep {
  id: string;
  label: string;
  detail?: string;
}

export interface FlowLink {
  from: string;
  to: string;
  label?: string;
}

export interface FlowProps extends Node {
  type: "Flow";
  steps: FlowStep[];
  /** How steps connect. Empty means each step leads to the next, in order. */
  links: FlowLink[];
}

export const Flow = defineKind<FlowProps>({
  type: "Flow",
  summary: "Steps joined by arrows: a process, a pipeline, how parts of a system connect.",
  writer: "anyone",
  schema: () =>
    z
      .strictObject({
        type: z.literal("Flow"),
        steps: z
          .array(z.strictObject({ id: z.string().min(1), label: z.string().min(1), detail: z.string().optional() }))
          .min(2, "a Flow needs at least two steps; use a Text for one"),
        links: z.array(z.strictObject({ from: z.string(), to: z.string(), label: z.string().optional() })).default([]),
      })
      .superRefine((flow, ctx) => {
        const ids = new Set(flow.steps.map((step) => step.id));
        flow.links.forEach((link, index) => {
          for (const end of ["from", "to"] as const) {
            if (!ids.has(link[end])) {
              ctx.addIssue({
                code: "custom",
                path: ["links", index, end],
                message: `link points at step "${link[end]}", which doesn't exist; use one of ${[...ids].join(", ")}`,
              });
            }
          }
        });
      }),
  toText: (props) => {
    const label = new Map(props.steps.map((step) => [step.id, step.label]));
    const shape =
      props.links.length === 0
        ? props.steps.map((step) => step.label).join(" → ")
        : props.links
            .map((link) => `${label.get(link.from)} → ${label.get(link.to)}${link.label ? ` (${link.label})` : ""}`)
            .join("\n");
    const details = props.steps.filter((step) => step.detail).map((step) => `- **${step.label}:** ${step.detail}`);
    return [shape, ...(details.length ? [details.join("\n")] : [])].join("\n\n");
  },
  example: {
    type: "Flow",
    steps: [
      { id: "model", label: "Model tokens" },
      { id: "tree", label: "Component tree", detail: "Validated against the core schemas" },
      { id: "render", label: "Renderer", detail: "One per surface" },
    ],
    links: [],
  },
});

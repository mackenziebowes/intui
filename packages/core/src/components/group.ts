/**
 * The Group component: other components in a row or a column, nested to any depth. Its
 * text form joins its children's text forms.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";
import type { LabelProps } from "./label";
import type { TextProps } from "./text";

export interface GroupProps extends Node {
  type: "Group";
  /** How children sit: a row wraps to a column on a narrow surface. */
  direction: "row" | "column";
  /** Row only, one entry per child: a width in px, or "rest" to share what is left. Unset: equal parts. */
  widths?: (number | "rest")[];
  /** Row only, one entry per child: the narrowest px a child shrinks to. 0 means no floor. */
  floors?: number[];
  /** A 1 px line in the middle of the gap between children. */
  divider?: boolean;
  /** What the group is as a unit: set apart, someone's own words, or waiting on the reader. Each renderer decides how a box looks. */
  box?: "apart" | "said" | "waiting";
  children: Node[];
}

const heading: TextProps = { type: "Text", markdown: "**Ideas inbox**" };
const count: LabelProps = { type: "Label", text: "3 open", tone: "neutral" };

export const Group = defineKind<GroupProps>({
  type: "Group",
  summary: "Holds other components in a row or a column.",
  writer: "anyone",
  schema: (node) =>
    z.strictObject({
      type: z.literal("Group"),
      direction: z.enum(["row", "column"]).default("column"),
      widths: z.array(z.union([z.int().min(1).max(4000), z.literal("rest")])).optional(),
      floors: z.array(z.int().min(0).max(4000)).optional(),
      divider: z.boolean().default(false),
      box: z.enum(["apart", "said", "waiting"]).optional(),
      children: z.array(node).min(1, "a Group needs at least one child"),
    })
    .superRefine((group, ctx) => {
      for (const key of ["widths", "floors"] as const) {
        const list = group[key];
        if (list === undefined) continue;
        if (group.direction !== "row") ctx.addIssue({ code: "custom", path: [key], message: `${key} is for a row; this Group is a column` });
        else if (list.length !== group.children.length) ctx.addIssue({ code: "custom", path: [key], message: `${key} has ${list.length} entries but the Group has ${group.children.length} children; give one per child` });
      }
    })
    .meta({ id: "Group" }),
  toText: (props, childText) => {
    const parts = props.children.map(childText);
    const allShort = parts.every((part) => !part.includes("\n"));
    const body = props.direction === "row" && allShort ? parts.join(" · ") : parts.join("\n\n");
    return props.box === "waiting" ? `[waiting on you]\n${body}` : body;
  },
  children: (props) => props.children,
  example: { type: "Group", direction: "row", children: [heading, count] },
});

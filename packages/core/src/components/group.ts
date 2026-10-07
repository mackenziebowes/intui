import { z } from "zod";
import { defineKind, type Node } from "../component";
import type { LabelProps } from "./label";
import type { TextProps } from "./text";

export interface GroupProps extends Node {
  type: "Group";
  /** How children sit: a row wraps to a column on a narrow surface. */
  direction: "row" | "column";
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
      children: z.array(node).min(1, "a Group needs at least one child"),
    }),
  toText: (props, childText) => {
    const parts = props.children.map(childText);
    const allShort = parts.every((part) => !part.includes("\n"));
    return props.direction === "row" && allShort ? parts.join(" · ") : parts.join("\n\n");
  },
  children: (props) => props.children,
  example: { type: "Group", direction: "row", children: [heading, count] },
});

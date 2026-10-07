import { z } from "zod";
import { defineKind, type Node } from "../component";

export interface TextProps extends Node {
  type: "Text";
  /** Markdown, as in a chat reply. */
  markdown: string;
}

export const Text = defineKind<TextProps>({
  type: "Text",
  summary: "Markdown text. The default, and what every other component falls back to.",
  writer: "anyone",
  schema: () =>
    z.strictObject({
      type: z.literal("Text"),
      markdown: z.string().min(1, "Text needs some markdown; leave the Text out if there's nothing to say"),
    }),
  toText: (props) => props.markdown,
  example: { type: "Text", markdown: "Traffic was **normal** this week." },
});

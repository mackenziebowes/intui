/**
 * The Text component: Markdown prose. Its text form is the Markdown itself, and it may not
 * be empty.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";
import { tone, type Tone } from "./label";

/** How big a Text draws: small 12 px, body 14 px (the default), heading 19 px, title 24 px at a 1x scale. */
export const SIZES = ["small", "body", "heading", "title"] as const;
export type Size = (typeof SIZES)[number];
export const size = z.enum(SIZES).meta({ id: "Size" });

export interface TextProps extends Node {
  type: "Text";
  /** Markdown, as in a chat reply. */
  markdown: string;
  /** How big it draws; body when left out. */
  size?: Size;
  /** What it means, as on a Label; neutral when left out. */
  tone?: Tone;
}

export const Text = defineKind<TextProps>({
  type: "Text",
  summary: "Markdown text. The default, and what every other component falls back to.",
  writer: "anyone",
  schema: () =>
    z.strictObject({
      type: z.literal("Text"),
      markdown: z.string().min(1, "Text needs some markdown; leave the Text out if there's nothing to say"),
      size: size.default("body"),
      tone: tone.default("neutral"),
    })
    .meta({ id: "Text" }),
  toText: (props) => props.markdown,
  example: { type: "Text", markdown: "Traffic was **normal** this week." },
});

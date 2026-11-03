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
  /** Its spacing and line breaks are part of what it says (a terminal pane, a log line); the markdown is shown as written, not interpreted. */
  verbatim?: boolean;
}

/** A fence long enough that no run of backticks in the text can close it. */
function fenceFor(text: string): string {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map((run) => run.length));
  return "`".repeat(Math.max(3, longest + 1));
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
      verbatim: z.boolean().default(false),
    })
    .meta({ id: "Text" }),
  toText: (props) => {
    if (!props.verbatim) return props.markdown;
    const fence = fenceFor(props.markdown);
    return `${fence}\n${props.markdown}\n${fence}`;
  },
  example: { type: "Text", markdown: "Traffic was **normal** this week." },
});

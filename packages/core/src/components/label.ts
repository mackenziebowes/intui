import { z } from "zod";
import { defineKind, type Node } from "../component";

/** What a value means. Each renderer decides how each tone looks. */
export const TONES = ["neutral", "positive", "warning", "critical", "muted"] as const;
export type Tone = (typeof TONES)[number];
export const tone = z.enum(TONES);

export interface LabelProps extends Node {
  type: "Label";
  text: string;
  tone: Tone;
}

export const Label = defineKind<LabelProps>({
  type: "Label",
  summary: "A short tag with a tone, such as a status.",
  writer: "anyone",
  schema: () =>
    z.strictObject({
      type: z.literal("Label"),
      text: z.string().min(1).max(40, "a Label is a short tag; put longer text in a Text"),
      tone: tone.default("neutral"),
    }),
  toText: (props) => `[${props.text}]`,
  example: { type: "Label", text: "parked", tone: "muted" },
});

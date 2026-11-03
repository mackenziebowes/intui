/**
 * The Label component: a short tag whose tone says what it means (neutral, positive,
 * warning, critical, muted). Each renderer decides how a tone looks; the text form is the
 * text in brackets. Also holds the list of tones, which Stat reuses.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";

/** What a value means. Each renderer decides how each tone looks. */
export const TONES = ["neutral", "positive", "warning", "critical", "muted"] as const;
export type Tone = (typeof TONES)[number];
export const tone = z.enum(TONES).meta({ id: "Tone" });

/** A key naming whose a thing is. Core gives it no meaning; an Areas legend may give it a colour. */
export const whoKey = z.string().min(1).max(24);

export interface LabelProps extends Node {
  type: "Label";
  text: string;
  tone: Tone;
  /** Whose it is, as a key the producer chose ("keel"). An Areas legend may give the key a colour; with none, the tone alone shows. */
  who?: string;
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
      who: whoKey.optional(),
    })
    .meta({ id: "Label" }),
  toText: (props) => (props.who ? `[${props.text}] (${props.who})` : `[${props.text}]`),
  example: { type: "Label", text: "parked", tone: "muted" },
});

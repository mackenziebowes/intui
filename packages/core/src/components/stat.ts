import { z } from "zod";
import { defineKind, type Node } from "../component";
import { Reading, readingSchema, readingText } from "../reading";
import { tone, type Tone } from "./label";

/** A change that says how sure it is. A bare number on the wire is exact. */
export interface ChangeReading {
  value: Reading;
  as: "amount" | "percent";
}

export interface StatProps extends Node {
  type: "Stat";
  label: string;
  value: Reading;
  unit?: string;
  change?: ChangeReading;
  /** Whether the change is good news. Renderers never guess this from the sign. */
  tone: Tone;
}

export const Stat = defineKind<StatProps>({
  type: "Stat",
  summary: "One number with a label, and optionally its change.",
  writer: "code",
  schema: () =>
    z.strictObject({
      type: z.literal("Stat"),
      label: z.string().min(1),
      value: readingSchema(),
      unit: z.string().optional(),
      change: z.strictObject({ value: readingSchema(), as: z.enum(["amount", "percent"]) }).meta({ id: "StatChange" }).optional(),
      tone: tone.default("neutral"),
    })
    .meta({ id: "Stat" }),
  toText: (props) => {
    const value = readingText(props.value, { unit: props.unit });
    return props.change ? `**${props.label}:** ${value} (${changeText(props.change)})` : `**${props.label}:** ${value}`;
  },
  example: {
    type: "Stat",
    label: "Visitors",
    value: Reading.exact(1204),
    change: { value: Reading.exact(18), as: "percent" },
    tone: "positive",
  },
});

function changeText(change: ChangeReading): string {
  return readingText(change.value, { unit: change.as === "percent" ? "%" : undefined, signed: true });
}

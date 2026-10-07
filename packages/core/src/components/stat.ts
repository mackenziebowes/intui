import { z } from "zod";
import { defineKind, type Node } from "../component";
import { formatNumber } from "../text";
import { tone, type Tone } from "./label";

/** A change from a previous value: by an amount, or by a percentage of it. */
export interface Change {
  value: number;
  as: "amount" | "percent";
}

export interface StatProps extends Node {
  type: "Stat";
  label: string;
  value: number;
  unit?: string;
  change?: Change;
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
      value: z.number(),
      unit: z.string().optional(),
      change: z.strictObject({ value: z.number(), as: z.enum(["amount", "percent"]) }).optional(),
      tone: tone.default("neutral"),
    }),
  toText: (props) => {
    const value = formatNumber(props.value, props.unit);
    return props.change ? `**${props.label}:** ${value} (${changeText(props.change)})` : `**${props.label}:** ${value}`;
  },
  example: {
    type: "Stat",
    label: "Visitors",
    value: 1204,
    change: { value: 18, as: "percent" },
    tone: "positive",
  },
});

function changeText(change: Change): string {
  const sign = change.value > 0 ? "+" : "";
  return `${sign}${formatNumber(change.value, change.as === "percent" ? "%" : undefined)}`;
}

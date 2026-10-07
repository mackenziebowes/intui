import { z } from "zod";
import { defineKind, type Node } from "../component";

export interface ChoiceOption {
  id: string;
  label: string;
  /** `primary` marks the main action when there are several. */
  emphasis?: "primary";
}

export interface ChoiceProps extends Node {
  type: "Choice";
  /** Names this choice in the events it sends. Unique within its tree. */
  id: string;
  prompt?: string;
  options: ChoiceOption[];
  /** `once`: the choice is used up after one press, so an old one can't fire again. */
  repeat: "once" | "many";
}

export const Choice = defineKind<ChoiceProps>({
  type: "Choice",
  summary: "Buttons. Pressing one sends an event back to the agent.",
  writer: "anyone",
  schema: () =>
    z.strictObject({
      type: z.literal("Choice"),
      id: z.string().min(1),
      prompt: z.string().optional(),
      options: z
        .array(z.strictObject({ id: z.string().min(1), label: z.string().min(1).max(40), emphasis: z.literal("primary").optional() }))
        .min(1, "a Choice needs at least one option"),
      repeat: z.enum(["once", "many"]).default("once"),
    }),
  toText: (props) => {
    const buttons = props.options.map((option) => `[${option.label}]`).join(" ");
    return props.prompt ? `${props.prompt}\n\n${buttons}` : buttons;
  },
  ids: (props) => [props.id],
  example: {
    type: "Choice",
    id: "next-step",
    prompt: "What next?",
    options: [
      { id: "explore", label: "Start exploring", emphasis: "primary" },
      { id: "park", label: "Park" },
    ],
    repeat: "once",
  },
});

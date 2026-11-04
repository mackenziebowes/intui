/**
 * The Form component: fields (text, number, select, checkbox) the person fills in and
 * submits, with an id the submit event carries back. A select without options is refused,
 * and its text form lists each field and whether it is required.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";

export interface FormField {
  id: string;
  label: string;
  input: "text" | "number" | "select" | "checkbox";
  /** The choices for a `select`. */
  options?: string[];
  /** For a `text` field: how many lines show at once (2 to 8). Without it the field is one line. */
  lines?: number;
  required: boolean;
}

export interface FormProps extends Node {
  type: "Form";
  /** Names this form in the events it sends. Unique within its tree. */
  id: string;
  fields: FormField[];
  submitLabel: string;
  /** Makes the form a message box: the key that sends. `enter` sends on Enter (Shift+Enter is a new line); `ctrl-enter` sends on Ctrl+Enter (Enter is a new line). */
  send?: "enter" | "ctrl-enter";
}

export const Form = defineKind<FormProps>({
  type: "Form",
  summary: "A few inputs and a submit button. Submitting sends the values back to the agent.",
  writer: "anyone",
  schema: () =>
    z.strictObject({
      type: z.literal("Form"),
      id: z.string().min(1),
      fields: z
        .array(
          z
            .strictObject({
              id: z.string().min(1),
              label: z.string().min(1),
              input: z.enum(["text", "number", "select", "checkbox"]),
              options: z.array(z.string().min(1)).optional(),
              lines: z.number().int().min(2).max(8).optional(),
              required: z.boolean().default(false),
            })
            .refine((field) => field.input !== "select" || (field.options?.length ?? 0) > 0, {
              message: "a select field needs options; add an options list or use input: \"text\"",
              path: ["options"],
            })
            .refine((field) => field.lines === undefined || field.input === "text", {
              message: "lines is for a text field; remove it or use input: \"text\"",
              path: ["lines"],
            })
            .meta({ id: "FormField" }),
        )
        .min(1, "a Form needs at least one field"),
      submitLabel: z.string().min(1).max(40).default("Submit"),
      send: z.enum(["enter", "ctrl-enter"]).optional(),
    })
    .meta({ id: "Form" }),
  toText: (props) => {
    const fields = props.fields.map((field) => {
      const choices = field.options ? `: ${field.options.join(", ")}` : "";
      const lines = field.lines ? `, ${field.lines} lines` : "";
      return `- ${field.label} (${field.input}${lines}${field.required ? ", required" : ""}${choices})`;
    });
    const send = props.send === "ctrl-enter" ? " (Ctrl+Enter)" : props.send === "enter" ? " (Enter)" : "";
    return `Form:\n${fields.join("\n")}\n\n[${props.submitLabel}]${send}`;
  },
  ids: (props) => [props.id],
  example: {
    type: "Form",
    id: "new-idea",
    fields: [
      { id: "title", label: "Title", input: "text", required: true },
      { id: "source", label: "Source", input: "select", options: ["self", "client"], required: false },
    ],
    submitLabel: "Add idea",
  },
});

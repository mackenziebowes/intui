import { z } from "zod";
import { defineKind, type Node } from "../component";

export interface FormField {
  id: string;
  label: string;
  input: "text" | "number" | "select" | "checkbox";
  /** The choices for a `select`. */
  options?: string[];
  required: boolean;
}

export interface FormProps extends Node {
  type: "Form";
  /** Names this form in the events it sends. Unique within its tree. */
  id: string;
  fields: FormField[];
  submitLabel: string;
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
              required: z.boolean().default(false),
            })
            .refine((field) => field.input !== "select" || (field.options?.length ?? 0) > 0, {
              message: "a select field needs options; add an options list or use input: \"text\"",
              path: ["options"],
            }),
        )
        .min(1, "a Form needs at least one field"),
      submitLabel: z.string().min(1).max(40).default("Submit"),
    }),
  toText: (props) => {
    const fields = props.fields.map((field) => {
      const choices = field.options ? `: ${field.options.join(", ")}` : "";
      return `- ${field.label} (${field.input}${field.required ? ", required" : ""}${choices})`;
    });
    return `Form:\n${fields.join("\n")}\n\n[${props.submitLabel}]`;
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

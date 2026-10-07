import { z } from "zod";
import type { ChoiceProps } from "./components/choice";
import type { FormField, FormProps } from "./components/form";
import { IntuiError, problemsFrom } from "./problems";

export type FieldValue = string | number | boolean;

export type EventData =
  | { v: 1; source: string; target: string; action: "press"; value: string }
  | { v: 1; source: string; target: string; action: "submit"; value: Record<string, FieldValue> };

const schema = z.discriminatedUnion("action", [
  z.strictObject({ v: z.literal(1), source: z.string().min(1), target: z.string().min(1), action: z.literal("press"), value: z.string().min(1) }),
  z.strictObject({
    v: z.literal(1),
    source: z.string().min(1),
    target: z.string().min(1),
    action: z.literal("submit"),
    value: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  }),
]);

/**
 * What a person did with a component: pressed a `Choice` option, or submitted
 * a `Form`. Sent back to the agent so the conversation continues from it.
 *
 * `source` is the id of whatever drew the tree (a tool call, a reply), so the
 * agent knows which of several trees the person used.
 */
export class IntuiEvent {
  private constructor(private readonly data: EventData) {}

  static press(source: string, choice: string, option: string): IntuiEvent {
    return new IntuiEvent({ v: 1, source, target: choice, action: "press", value: option });
  }

  static submit(source: string, form: string, values: Record<string, FieldValue>): IntuiEvent {
    return new IntuiEvent({ v: 1, source, target: form, action: "submit", value: values });
  }

  static parse(input: unknown): IntuiEvent {
    const parsed = schema.safeParse(input);
    if (!parsed.success) throw new IntuiError("This event doesn't match the IntUI event schema:", problemsFrom(parsed.error.issues, input));
    return new IntuiEvent(parsed.data);
  }

  get source(): string {
    return this.data.source;
  }

  get target(): string {
    return this.data.target;
  }

  toJSON(): EventData {
    return this.data;
  }

  /** Why this event can't come from the component it names, or null if it can. */
  problemWith(component: ChoiceProps | FormProps | undefined): string | null {
    const data = this.data;
    if (!component) return `nothing in it has the id "${data.target}"`;
    if (data.action === "press") {
      if (component.type !== "Choice") return `"${data.target}" is a ${component.type}, which can't be pressed`;
      const ids = component.options.map((option) => option.id);
      return ids.includes(data.value) ? null : `choice "${data.target}" has no option "${data.value}"; its options are ${ids.join(", ")}`;
    }
    if (component.type !== "Form") return `"${data.target}" is a ${component.type}, which can't be submitted`;
    const fields = new Map(component.fields.map((field) => [field.id, field]));
    for (const [id, value] of Object.entries(data.value)) {
      const field = fields.get(id);
      if (!field) return `form "${data.target}" has no field "${id}"`;
      const wrong = valueProblem(field, value);
      if (wrong) return wrong;
    }
    const missing = component.fields.filter((field) => field.required && !(field.id in data.value));
    return missing.length ? `required ${missing.length === 1 ? "field" : "fields"} ${missing.map((f) => `"${f.label}"`).join(", ")} left empty` : null;
  }

  /** One plain sentence for the model, e.g. `Pressed "Park" in next-step (from toolu_1).` */
  describe(component?: ChoiceProps | FormProps): string {
    const data = this.data;
    const from = `(from ${data.source})`;
    if (data.action === "press") {
      const option = component?.type === "Choice" ? component.options.find((o) => o.id === data.value) : undefined;
      return `Pressed "${option?.label ?? data.value}" in ${data.target} ${from}.`;
    }
    const labels = component?.type === "Form" ? new Map(component.fields.map((f) => [f.id, f.label])) : new Map<string, string>();
    const values = Object.entries(data.value).map(([id, value]) => `${labels.get(id) ?? id} = ${JSON.stringify(value)}`);
    return `Submitted ${data.target} ${from}: ${values.length ? values.join(", ") : "no values"}.`;
  }
}

function valueProblem(field: FormField, value: FieldValue): string | null {
  const expected = field.input === "number" ? "number" : field.input === "checkbox" ? "boolean" : "string";
  if (typeof value !== expected) return `field "${field.label}" takes a ${expected}, got ${JSON.stringify(value)}`;
  if (field.input === "select" && !field.options?.includes(value as string)) {
    return `field "${field.label}" has no option ${JSON.stringify(value)}; its options are ${field.options?.join(", ")}`;
  }
  return null;
}

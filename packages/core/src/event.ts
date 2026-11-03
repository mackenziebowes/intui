/**
 * What a person did with a component: pressed a Choice option or submitted a Form, as an
 * `IntuiEvent` the host sends back to the agent. An event names the tree's source and the
 * component's id, and is parsed at the edge like a tree, so one that doesn't fit is
 * refused with every problem listed.
 */
import { z } from "zod";
import type { AreasProps } from "./components/areas";
import type { ChoiceProps } from "./components/choice";
import type { TabsProps } from "./components/tabs";
import type { FormField, FormProps } from "./components/form";
import { parsed, problemsFrom, refusal, type Parsed } from "./problems";

export type FieldValue = string | number | boolean;

export type EventData =
  | { v: 1; source: string; target: string; action: "press"; value: string }
  | { v: 1; source: string; target: string; action: "submit"; value: Record<string, FieldValue> };

const fieldValue = z.union([z.string(), z.number(), z.boolean()]).meta({ id: "FieldValue" });

const schema = z
  .discriminatedUnion("action", [
    z
      .strictObject({ v: z.literal(1), source: z.string().min(1), target: z.string().min(1), action: z.literal("press"), value: z.string().min(1) })
      .meta({ id: "PressEvent" }),
    z
      .strictObject({
        v: z.literal(1),
        source: z.string().min(1),
        target: z.string().min(1),
        action: z.literal("submit"),
        value: z.record(z.string(), fieldValue),
      })
      .meta({ id: "SubmitEvent" }),
  ])
  .meta({ id: "IntuiEvent" });

/**
 * What a person did with a component: pressed a `Choice` option, or submitted a `Form`. Sent
 * back to the agent so the conversation continues from it. The event is its own wire form.
 *
 * `source` is the id of whatever drew the tree (a tool call, a reply), so the agent knows
 * which of several trees the person used.
 */
export type IntuiEvent = EventData;

/** What a press can land on: a Choice, a Tabs bar, or an Areas region. */
export type Pressable = ChoiceProps | TabsProps | AreasProps;

export const IntuiEvent = {
  press(source: string, choice: string, option: string): IntuiEvent {
    return { v: 1, source, target: choice, action: "press", value: option };
  },

  submit(source: string, form: string, values: Record<string, FieldValue>): IntuiEvent {
    return { v: 1, source, target: form, action: "submit", value: values };
  },

  /** JSON Schema for the wire form of an event, from the schema `parse` checks against. */
  jsonSchema(): Record<string, unknown> {
    return z.toJSONSchema(schema, { io: "input" }) as Record<string, unknown>;
  },

  /** An event that crossed a wire, or why it doesn't match the event schema. */
  parse(input: unknown): Parsed<IntuiEvent> {
    const result = schema.safeParse(input);
    return result.success ? parsed(result.data) : refusal("This event doesn't match the IntUI event schema:", problemsFrom(result.error.issues, input));
  },

  /** Why this event can't come from the component it names, or null if it can. */
  problemWith(event: IntuiEvent, component: Pressable | FormProps | undefined): string | null {
    if (!component) return `nothing in it has the id "${event.target}"`;
    if (event.action === "press") {
      if (component.type === "Tabs") {
        const tabs = component.tabs.map((tab) => tab.id);
        return tabs.includes(event.value) ? null : `tabs "${event.target}" has no tab "${event.value}"; its tabs are ${tabs.join(", ")}`;
      }
      if (component.type === "Areas") {
        const picks = component.areas.flatMap((area) => component.kinds.map((kind) => `${area.id}:${kind.id}`));
        return picks.includes(event.value) ? null : `areas "${event.target}" has no pick "${event.value}"; a pick is <area>:<kind>, for example ${picks[0]}`;
      }
      if (component.type !== "Choice") return `"${event.target}" is a ${component.type}, which can't be pressed`;
      const ids = component.options.map((option) => option.id);
      return ids.includes(event.value) ? null : `choice "${event.target}" has no option "${event.value}"; its options are ${ids.join(", ")}`;
    }
    if (component.type !== "Form") return `"${event.target}" is a ${component.type}, which can't be submitted`;
    const fields = new Map(component.fields.map((field) => [field.id, field]));
    for (const [id, value] of Object.entries(event.value)) {
      const field = fields.get(id);
      if (!field) return `form "${event.target}" has no field "${id}"`;
      const wrong = valueProblem(field, value);
      if (wrong) return wrong;
    }
    const missing = component.fields.filter((field) => field.required && !Object.hasOwn(event.value, field.id));
    return missing.length ? `required ${missing.length === 1 ? "field" : "fields"} ${missing.map((f) => `"${f.label}"`).join(", ")} left empty` : null;
  },

  /** One plain sentence for the model, e.g. `Pressed "Park" in next-step (from toolu_1).` */
  describe(event: IntuiEvent, component?: Pressable | FormProps): string {
    const from = `(from ${event.source})`;
    if (event.action === "press") {
      if (component?.type === "Tabs") return `Opened tab "${component.tabs.find((t) => t.id === event.value)?.label ?? event.value}" in ${event.target} ${from}.`;
      if (component?.type === "Areas") return `Switched area ${event.value.split(":")[0]} to ${component.kinds.find((k) => k.id === event.value.split(":")[1])?.label ?? event.value} in ${event.target} ${from}.`;
      const option = component?.type === "Choice" ? component.options.find((o) => o.id === event.value) : undefined;
      return `Pressed "${option?.label ?? event.value}" in ${event.target} ${from}.`;
    }
    const labels = component?.type === "Form" ? new Map(component.fields.map((f) => [f.id, f.label])) : new Map<string, string>();
    const values = Object.entries(event.value).map(([id, value]) => `${labels.get(id) ?? id} = ${JSON.stringify(value)}`);
    return `Submitted ${event.target} ${from}: ${values.length ? values.join(", ") : "no values"}.`;
  },
} as const;

function valueProblem(field: FormField, value: FieldValue): string | null {
  const expected = field.input === "number" ? "number" : field.input === "checkbox" ? "boolean" : "string";
  if (typeof value !== expected) return `field "${field.label}" takes a ${expected}, got ${JSON.stringify(value)}`;
  if (field.input === "select" && !field.options?.includes(value as string)) {
    return `field "${field.label}" has no option ${JSON.stringify(value)}; its options are ${field.options?.join(", ")}`;
  }
  return null;
}

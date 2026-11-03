/**
 * The Areas component: a region cut into areas, each drawn with a header whose menu switches
 * what the area shows. The producer supplies the kinds it can fill (opaque labels, never
 * named by core) and each area's content; a surface owns the arrangement, the open menu and
 * any drag. An area with no content yet reads "waiting for <kind>".
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";
import type { TextProps } from "./text";

const nothingYet: TextProps = { type: "Text", markdown: "Nothing yet." };

/** One thing an area can show. The id is what comes back in an event; core gives it no meaning. */
export interface AreaKind {
  id: string;
  label: string;
  /** A few words on what the kind shows, drawn beside it in the menu. */
  hint?: string;
}

export interface AreaSlot {
  /** Names the area in the layout and in events. Unique within the Areas. */
  id: string;
  /** One of the Areas' kinds, by id. */
  kind: string;
  /** What the area is narrowed to, drawn as a chip beside the kind. */
  filter?: string;
  /** What the area shows. None yet: the area reads "waiting for <kind>". */
  children?: Node[];
}

/** An area's id, or a cut into two parts. `ratio` is the share of the first part. */
export type AreaLayout = string | { split: "row" | "column"; ratio: number; a: AreaLayout; b: AreaLayout };

export interface AreasProps extends Node {
  type: "Areas";
  /** Names this region in the events it sends. Unique within its tree. */
  id: string;
  kinds: AreaKind[];
  areas: AreaSlot[];
  layout: AreaLayout;
}

const layoutSchema: z.ZodType<AreaLayout> = z.lazy(() =>
  z.union([
    z.string().min(1),
    z.strictObject({ split: z.enum(["row", "column"]), ratio: z.number().min(0.1).max(0.9), a: layoutSchema, b: layoutSchema }),
  ]),
);

/** The area ids in a layout, first part before second. */
export function layoutAreas(layout: AreaLayout): string[] {
  return typeof layout === "string" ? [layout] : [...layoutAreas(layout.a), ...layoutAreas(layout.b)];
}

export const Areas = defineKind<AreasProps>({
  type: "Areas",
  summary: "A region cut into areas. Each area's header menu switches what it shows.",
  writer: "anyone",
  schema: (node) =>
    z.strictObject({
      type: z.literal("Areas"),
      id: z.string().min(1),
      kinds: z
        .array(z.strictObject({ id: z.string().min(1), label: z.string().min(1).max(24), hint: z.string().max(40).optional() }).meta({ id: "AreaKind" }))
        .min(1, "Areas needs at least one kind"),
      areas: z
        .array(z.strictObject({ id: z.string().min(1), kind: z.string().min(1), filter: z.string().max(40).optional(), children: z.array(node).optional() }).meta({ id: "AreaSlot" }))
        .min(1, "Areas needs at least one area"),
      layout: layoutSchema,
    })
    .superRefine((areas, ctx) => {
      const kinds = new Set(areas.kinds.map((k) => k.id));
      const ids = areas.areas.map((a) => a.id);
      for (const [i, area] of areas.areas.entries()) {
        if (!kinds.has(area.kind)) ctx.addIssue({ code: "custom", path: ["areas", i, "kind"], message: `area "${area.id}" has kind "${area.kind}", which is not in kinds; use one of: ${areas.kinds.map((k) => k.id).join(", ")}` });
        if (ids.indexOf(area.id) !== i) ctx.addIssue({ code: "custom", path: ["areas", i, "id"], message: `two areas are called "${area.id}"; give each its own id` });
      }
      const placed = layoutAreas(areas.layout);
      for (const id of placed) if (!ids.includes(id)) ctx.addIssue({ code: "custom", path: ["layout"], message: `layout places "${id}", which is not in areas` });
      for (const id of ids) {
        const times = placed.filter((p) => p === id).length;
        if (times !== 1) ctx.addIssue({ code: "custom", path: ["layout"], message: `area "${id}" appears ${times} times in layout; every area appears exactly once` });
      }
    })
    .meta({ id: "Areas" }),
  toText: (props, childText) => {
    const label = (kind: string) => props.kinds.find((k) => k.id === kind)?.label ?? kind;
    return layoutAreas(props.layout)
      .map((id) => props.areas.find((a) => a.id === id))
      .filter((area): area is AreaSlot => area !== undefined)
      .map((area) => {
        const head = `**${label(area.kind)}**${area.filter ? ` · ${area.filter}` : ""}`;
        const body = area.children?.length ? area.children.map(childText).join("\n\n") : `waiting for ${label(area.kind)}`;
        return `${head}\n${body}`;
      })
      .join("\n\n");
  },
  children: (props) => props.areas.flatMap((area) => area.children ?? []),
  ids: (props) => [props.id],
  example: {
    type: "Areas",
    id: "main",
    kinds: [
      { id: "notes", label: "Notes", hint: "what was said" },
      { id: "todo", label: "To do", hint: "what waits" },
    ],
    areas: [
      { id: "left", kind: "todo", filter: "all" },
      { id: "right", kind: "notes", children: [nothingYet] },
    ],
    layout: { split: "row", ratio: 0.4, a: "left", b: "right" },
  },
});

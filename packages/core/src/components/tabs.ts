/**
 * The Tabs component: a bar of named arrangements, one of them open. Pressing a tab sends
 * its id; the surface that owns the arrangements switches to it.
 */
import { z } from "zod";
import { defineKind, type Node } from "../component";

export interface TabsTab {
  id: string;
  label: string;
}

export interface TabsProps extends Node {
  type: "Tabs";
  /** Names this bar in the events it sends. Unique within its tree. */
  id: string;
  tabs: TabsTab[];
  /** The id of the open tab. */
  active: string;
}

export const Tabs = defineKind<TabsProps>({
  type: "Tabs",
  summary: "A bar of named arrangements, one open. Pressing a tab sends its id.",
  writer: "anyone",
  schema: () =>
    z.strictObject({
      type: z.literal("Tabs"),
      id: z.string().min(1),
      tabs: z.array(z.strictObject({ id: z.string().min(1), label: z.string().min(1).max(24) }).meta({ id: "TabsTab" })).min(1, "Tabs needs at least one tab"),
      active: z.string().min(1),
    })
    .superRefine((tabs, ctx) => {
      if (!tabs.tabs.some((t) => t.id === tabs.active)) ctx.addIssue({ code: "custom", path: ["active"], message: `active is "${tabs.active}", which is not a tab; use one of: ${tabs.tabs.map((t) => t.id).join(", ")}` });
    })
    .meta({ id: "Tabs" }),
  toText: (props) => props.tabs.map((tab) => (tab.id === props.active ? `[${tab.label}]` : tab.label)).join(" · "),
  ids: (props) => [props.id],
  example: { type: "Tabs", id: "views", tabs: [{ id: "talk", label: "Talk" }, { id: "watch", label: "Watch" }], active: "talk" },
});

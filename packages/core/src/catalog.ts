/**
 * A Catalog is a set of component kinds and the schemas for trees built from them, as plain
 * data with its functions on `Catalog` (hub #1956); `core` holds every component IntUI defines. It knows who may write each kind (`model` or
 * `code`), so a tree is checked against the author, and it makes the JSON Schema and the
 * one-line descriptions a tool shows a model.
 */
import { z } from "zod";
import type { ComponentKind, Node } from "./component";
import { Chart } from "./components/chart";
import { Areas } from "./components/areas";
import { Choice } from "./components/choice";
import { Flow } from "./components/flow";
import { Form } from "./components/form";
import { Group } from "./components/group";
import { Label } from "./components/label";
import { Ladder } from "./components/ladder";
import { Marks } from "./components/marks";
import { Stat } from "./components/stat";
import { Table } from "./components/table";
import { Tabs } from "./components/tabs";
import { Text } from "./components/text";

/** Who wrote a tree: the model directly, or code from a tool. */
export type Author = "model" | "code";

/** A set of component kinds, and the schemas for trees built from them. Plain data: the functions are on `Catalog`. */
export type Catalog = {
  readonly kinds: readonly ComponentKind[];
  readonly byType: ReadonlyMap<string, ComponentKind>;
  readonly node: z.ZodType<Node>;
};

function make(kinds: readonly ComponentKind[]): Catalog {
  const node: z.ZodType<Node> = z
    .lazy(() =>
      z.discriminatedUnion(
        "type",
        kinds.map((kind) => kind.schema(node)) as unknown as [z.core.$ZodTypeDiscriminable, ...z.core.$ZodTypeDiscriminable[]],
      ),
    )
    .meta({ id: "Node" }) as unknown as z.ZodType<Node>;
  return { kinds, byType: new Map(kinds.map((kind) => [kind.type, kind])), node };
}

export const Catalog = {
  make,

  kindOf(catalog: Catalog, node: Node): ComponentKind {
    const kind = catalog.byType.get(node.type);
    // Trees are parsed before use, so an unknown type here is a bug, not bad input.
    if (!kind) throw new Error(`no component kind "${node.type}" in this catalog`);
    return kind;
  },

  /** The kinds an author may write. The model may not write components that show data. */
  writableBy(catalog: Catalog, author: Author): Catalog {
    return author === "code" ? catalog : make(catalog.kinds.filter((kind) => kind.writer === "anyone"));
  },

  types(catalog: Catalog): string[] {
    return catalog.kinds.map((kind) => kind.type);
  },

  /** JSON Schema for a whole tree, e.g. a tool's input schema. */
  jsonSchema(catalog: Catalog): Record<string, unknown> {
    return z.toJSONSchema(z.strictObject({ v: z.literal(1), root: catalog.node }).meta({ title: "IntuiTree" }), { io: "input" }) as Record<string, unknown>;
  },

  /** One line per kind, for a tool description or docs. */
  describe(catalog: Catalog): string {
    return catalog.kinds.map((kind) => `- ${kind.type}: ${kind.summary}`).join("\n");
  },
} as const;

/** Every component in IntUI core. */
export const core: Catalog = make([Text, Group, Label, Table, Chart, Stat, Flow, Marks, Ladder, Choice, Form, Areas, Tabs]);

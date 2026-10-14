/**
 * A Catalog is a set of component kinds and the schemas for trees built from them; `core`
 * holds every component IntUI defines. It knows who may write each kind (`model` or
 * `code`), so a tree is checked against the author, and it makes the JSON Schema and the
 * one-line descriptions a tool shows a model.
 */
import { z } from "zod";
import type { ComponentKind, Node } from "./component";
import { Chart } from "./components/chart";
import { Choice } from "./components/choice";
import { Flow } from "./components/flow";
import { Form } from "./components/form";
import { Group } from "./components/group";
import { Label } from "./components/label";
import { Stat } from "./components/stat";
import { Table } from "./components/table";
import { Text } from "./components/text";

/** Who wrote a tree: the model directly, or code from a tool. */
export type Author = "model" | "code";

/** A set of component kinds, and the schemas for trees built from them. */
export class Catalog {
  private readonly byType: ReadonlyMap<string, ComponentKind>;
  readonly node: z.ZodType<Node>;

  constructor(readonly kinds: readonly ComponentKind[]) {
    this.byType = new Map(kinds.map((kind) => [kind.type, kind]));
    const node: z.ZodType<Node> = z
      .lazy(() =>
        z.discriminatedUnion(
          "type",
          kinds.map((kind) => kind.schema(node)) as unknown as [z.core.$ZodTypeDiscriminable, ...z.core.$ZodTypeDiscriminable[]],
        ),
      )
      .meta({ id: "Node" }) as unknown as z.ZodType<Node>;
    this.node = node;
  }

  kindOf(node: Node): ComponentKind {
    const kind = this.byType.get(node.type);
    // Trees are parsed before use, so an unknown type here is a bug, not bad input.
    if (!kind) throw new Error(`no component kind "${node.type}" in this catalog`);
    return kind;
  }

  /** The kinds an author may write. The model may not write components that show data. */
  writableBy(author: Author): Catalog {
    return author === "code" ? this : new Catalog(this.kinds.filter((kind) => kind.writer === "anyone"));
  }

  types(): string[] {
    return this.kinds.map((kind) => kind.type);
  }

  /** JSON Schema for a whole tree, e.g. a tool's input schema. */
  jsonSchema(): Record<string, unknown> {
    return z.toJSONSchema(z.strictObject({ v: z.literal(1), root: this.node }).meta({ title: "IntuiTree" }), { io: "input" }) as Record<string, unknown>;
  }

  /** One line per kind, for a tool description or docs. */
  describe(): string {
    return this.kinds.map((kind) => `- ${kind.type}: ${kind.summary}`).join("\n");
  }
}

/** Every component in IntUI core. */
export const core = new Catalog([Text, Group, Label, Table, Chart, Stat, Flow, Choice, Form]);

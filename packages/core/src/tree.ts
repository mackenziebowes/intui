import type { Node } from "./component";
import { core, type Author, type Catalog } from "./catalog";
import type { ChoiceProps } from "./components/choice";
import type { FormProps } from "./components/form";
import type { IntuiEvent } from "./event";
import { IntuiError, problemsFrom, type Problem } from "./problems";

/** The protocol version every tree carries. Changes to the schema are additive only. */
export const VERSION = 1;

export interface TreeData {
  v: typeof VERSION;
  root: Node;
}

export interface ParseOptions {
  /** Who wrote it. `model` refuses components that show data, which must come from code. */
  author?: Author;
  catalog?: Catalog;
}

/**
 * A validated component tree: what an agent shows, on any surface.
 *
 * Build one with `Tree.of(root)` in code, or `Tree.parse(json)` for anything
 * that crossed a wire (a tool call's input, a stored transcript).
 */
export class Tree {
  private constructor(
    readonly root: Node,
    private readonly catalog: Catalog,
  ) {}

  /** A tree that code built, e.g. from a query result. */
  static of(root: Node, catalog: Catalog = core): Tree {
    return Tree.parse({ v: VERSION, root }, { author: "code", catalog });
  }

  static parse(input: unknown, options: ParseOptions = {}): Tree {
    const catalog = options.catalog ?? core;
    const envelope = parseEnvelope(input);
    const parsed = catalog.node.safeParse(envelope.root);
    if (!parsed.success) {
      throw new IntuiError("This tree doesn't match the IntUI schemas:", problemsFrom(parsed.error.issues, envelope.root, ["root"]));
    }
    const tree = new Tree(parsed.data, catalog);
    tree.assertIdsUnique();
    if (options.author) tree.assertWritableBy(options.author);
    return tree;
  }

  /** Every node, depth first, with its path. */
  walk(): { node: Node; path: string }[] {
    const visit = (node: Node, path: string): { node: Node; path: string }[] => [
      { node, path: `${path} (${node.type})` },
      ...this.catalog
        .kindOf(node)
        .children(node)
        .flatMap((child, index) => visit(child, `${path}.children[${index}]`)),
    ];
    return visit(this.root, "root");
  }

  /** Markdown for the whole tree: what the model reads back, and every surface's fallback. */
  toText(): string {
    const text = (node: Node): string => this.catalog.kindOf(node).toText(node, text);
    return text(this.root);
  }

  toJSON(): TreeData {
    return { v: VERSION, root: this.root };
  }

  /** The `Choice` or `Form` with this id. */
  interactive(id: string): ChoiceProps | FormProps | undefined {
    return this.walk()
      .map(({ node }) => node)
      .find((node): node is ChoiceProps | FormProps => (node.type === "Choice" || node.type === "Form") && (node as ChoiceProps).id === id);
  }

  /** Checks that an event answers something in this tree, with values that fit it. */
  verify(event: IntuiEvent): void {
    const problem = event.problemWith(this.interactive(event.target));
    if (problem) throw new IntuiError(`This event doesn't fit the tree it came from: ${problem}`);
  }

  /** How the event reads to the model, with labels looked up in this tree. */
  describe(event: IntuiEvent): string {
    return event.describe(this.interactive(event.target));
  }

  private assertWritableBy(author: Author): void {
    const allowed = new Set(this.catalog.writableBy(author).types());
    const problems: Problem[] = this.walk()
      .filter(({ node }) => !allowed.has(node.type))
      .map(({ path }) => ({
        path,
        message: "this component shows numbers, which must come from code: call a tool that returns it, or show the figures in a Text or Table you can vouch for",
      }));
    if (problems.length > 0) throw new IntuiError("The model can't write this tree directly:", problems);
  }

  private assertIdsUnique(): void {
    const seen = new Map<string, string>();
    const problems: Problem[] = [];
    for (const { node, path } of this.walk()) {
      for (const id of this.catalog.kindOf(node).ids(node)) {
        const first = seen.get(id);
        if (first) problems.push({ path, message: `id "${id}" is already used at ${first}; give each Choice and Form its own id` });
        else seen.set(id, path);
      }
    }
    if (problems.length > 0) throw new IntuiError("This tree has duplicate ids:", problems);
  }
}

function parseEnvelope(input: unknown): { root: unknown } {
  if (typeof input !== "object" || input === null || !("root" in input)) {
    throw new IntuiError(`A tree is an object like { "v": ${VERSION}, "root": { "type": "Text", ... } }; this one has no "root"`);
  }
  const v = (input as { v?: unknown }).v;
  if (v !== VERSION) {
    throw new IntuiError(
      v === undefined
        ? `A tree needs a version: add "v": ${VERSION} next to "root"`
        : `This tree is version ${JSON.stringify(v)}, and this copy of IntUI reads version ${VERSION}; update @intui/core to draw it`,
    );
  }
  return input as { root: unknown };
}

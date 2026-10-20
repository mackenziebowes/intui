/**
 * A Tree is a validated component tree, the thing an agent shows on any surface, as plain
 * data with its functions on `Tree` (hub #1956).
 * `Tree.parse` takes whatever crossed a wire and returns the tree or a refusal listing every problem,
 * checking who wrote it; `Tree.of` takes one code built. It also renders the text form,
 * finds the interactive components by id, and checks that an event answers something in
 * this tree.
 */
import type { Node } from "./component";
import { Catalog, core, type Author } from "./catalog";
import type { ChoiceProps } from "./components/choice";
import type { FormProps } from "./components/form";
import { IntuiEvent } from "./event";
import { parsed, problemsFrom, refusal, type Parsed, type Problem, type Refusal } from "./problems";
import { toWire } from "./reading";

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

declare const validated: unique symbol;

/**
 * A validated component tree: what an agent shows, on any surface. Plain data with its
 * functions on `Tree` (hub #1956). The brand exists only for the compiler, so a tree can
 * only come from `Tree.of` (code built it) or `Tree.parse` (it crossed a wire).
 */
export type Tree = { readonly v: typeof VERSION; readonly root: Node; readonly [validated]: true };

type Walked = { node: Node; path: string }[];

function walk(tree: Tree, catalog: Catalog = core): Walked {
  const visit = (node: Node, path: string): Walked => [
    { node, path: `${path} (${node.type})` },
    ...Catalog.kindOf(catalog, node)
      .children(node)
      .flatMap((child, index) => visit(child, `${path}.children[${index}]`)),
  ];
  return visit(tree.root, "root");
}

function textOf(node: Node, catalog: Catalog = core): string {
  const text = (child: Node): string => Catalog.kindOf(catalog, child).toText(child, text);
  return text(node);
}

function interactive(tree: Tree, id: string, catalog: Catalog = core): ChoiceProps | FormProps | undefined {
  return walk(tree, catalog)
    .map(({ node }) => node)
    .find((node): node is ChoiceProps | FormProps => (node.type === "Choice" || node.type === "Form") && (node as ChoiceProps).id === id);
}

function parse(input: unknown, options: ParseOptions = {}): Parsed<Tree> {
  const catalog = options.catalog ?? core;
  const envelope = parseEnvelope(input);
  if (envelope.kind === "refused") return envelope;
  const result = catalog.node.safeParse(envelope.value.root);
  if (!result.success) return refusal("This tree doesn't match the IntUI schemas:", problemsFrom(result.error.issues, envelope.value.root, ["root"]));
  const tree = { v: VERSION, root: result.data } as Tree;
  return duplicateIds(tree, catalog) ?? (options.author ? notWritableBy(tree, options.author, catalog) : undefined) ?? parsed(tree);
}

export const Tree = {
  /**
   * A tree that code built, e.g. from a query result. A tree code built wrong is a bug in that
   * code, not input to handle, so this throws with the refusal's message.
   */
  of(root: Node, catalog: Catalog = core): Tree {
    const result = parse({ v: VERSION, root }, { author: "code", catalog });
    if (result.kind === "refused") throw new Error(result.message);
    return result.value;
  },
  /** Anything that crossed a wire (a tool call's input, a stored transcript): the tree, or a refusal listing every problem. */
  parse,
  /** Every node, depth first, with its path. */
  walk,
  /** Markdown for the whole tree: what the model reads back, and every surface's fallback. */
  toText: (tree: Tree, catalog: Catalog = core): string => textOf(tree.root, catalog),
  /** Markdown for one node. */
  textOf,
  /** The wire form: exact readings become bare numbers again. */
  toJSON: (tree: Tree): TreeData => ({ v: VERSION, root: toWire(tree.root) as Node }),
  /** The `Choice` or `Form` with this id. */
  interactive,
  /** Why an event doesn't answer anything in this tree with values that fit, or null when it does. */
  problemWith(tree: Tree, event: IntuiEvent, catalog: Catalog = core): string | null {
    const problem = IntuiEvent.problemWith(event, interactive(tree, event.target, catalog));
    return problem === null ? null : `This event doesn't fit the tree it came from: ${problem}`;
  },
  /** How the event reads to the model, with labels looked up in this tree. */
  describe: (tree: Tree, event: IntuiEvent, catalog: Catalog = core): string => IntuiEvent.describe(event, interactive(tree, event.target, catalog)),
} as const;

function notWritableBy(tree: Tree, author: Author, catalog: Catalog): Refusal | undefined {
  const allowed = new Set(Catalog.types(Catalog.writableBy(catalog, author)));
  const problems: Problem[] = walk(tree, catalog)
    .filter(({ node }) => !allowed.has(node.type))
    .map(({ path }) => ({
      path,
      message: "this component shows numbers, which must come from code: call a tool that returns it, or show the figures in a Text or Table you can vouch for",
    }));
  return problems.length > 0 ? refusal("The model can't write this tree directly:", problems) : undefined;
}

function duplicateIds(tree: Tree, catalog: Catalog): Refusal | undefined {
  const seen = new Map<string, string>();
  const problems: Problem[] = [];
  for (const { node, path } of walk(tree, catalog)) {
    for (const id of Catalog.kindOf(catalog, node).ids(node)) {
      const first = seen.get(id);
      if (first) problems.push({ path, message: `id "${id}" is already used at ${first}; give each Choice and Form its own id` });
      else seen.set(id, path);
    }
  }
  return problems.length > 0 ? refusal("This tree has duplicate ids:", problems) : undefined;
}

function parseEnvelope(input: unknown): Parsed<{ root: unknown }> {
  if (typeof input !== "object" || input === null || !("root" in input)) {
    return refusal(`A tree is an object like { "v": ${VERSION}, "root": { "type": "Text", ... } }; this one has no "root"`);
  }
  const v = (input as { v?: unknown }).v;
  if (v !== VERSION) {
    return refusal(
      v === undefined
        ? `A tree needs a version: add "v": ${VERSION} next to "root"`
        : `This tree is version ${JSON.stringify(v)}, and this copy of IntUI reads version ${VERSION}; update @intui/core to draw it`,
    );
  }
  return parsed(input as { root: unknown });
}

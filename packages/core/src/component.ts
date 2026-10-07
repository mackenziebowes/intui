import type { z } from "zod";

/** Any component in a tree. Each component kind narrows it with its own props. */
export interface Node {
  type: string;
}

/**
 * Who may write a component into a tree.
 *
 * - `anyone`: the model may write it directly, e.g. through a `show` tool.
 * - `code`: it shows numbers, so only code may build it, from the result of a
 *   deterministic query. The model calls a tool that returns it instead.
 */
export type Writer = "anyone" | "code";

/** Draws a child node as text. Passed to `toText` so containers can recurse. */
export type ChildText = (child: Node) => string;

/**
 * One kind of component: its schema, who may write it, and its text form.
 *
 * Every component has a text form. It is what the model reads back after showing
 * the component, and the fallback on any surface that can't draw it.
 */
export interface ComponentKind<P extends Node = Node> {
  readonly type: P["type"];
  /** One line on what the component is for, read by models and people. */
  readonly summary: string;
  readonly writer: Writer;
  /** The props schema, given the schema for any node so containers can nest. */
  schema(node: z.ZodType<Node>): z.ZodType<P>;
  toText(props: P, childText: ChildText): string;
  /** The nodes directly inside this one. */
  children(props: P): readonly Node[];
  /** Ids this component answers events for (a `Choice`, a `Form`). */
  ids(props: P): readonly string[];
  /** A small valid example, used by the docs and tests. */
  readonly example: P;
}

/** Builds a kind, filling in the defaults most kinds share. */
export function defineKind<P extends Node>(
  kind: Omit<ComponentKind<P>, "children" | "ids"> &
    Partial<Pick<ComponentKind<P>, "children" | "ids">>,
): ComponentKind<P> {
  return { children: () => [], ids: () => [], ...kind };
}

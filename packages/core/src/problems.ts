import type { z } from "zod";

/** One thing wrong with a tree or an event, at a path inside it. */
export interface Problem {
  /** Where, e.g. `root.children[1] (Chart).series`. */
  path: string;
  message: string;
}

/**
 * Bad input: a tree or event that doesn't match the schemas.
 *
 * The message lists every problem with its path, so a model whose tool call
 * failed can fix all of them in one retry.
 */
export class IntuiError extends Error {
  constructor(
    readonly summary: string,
    readonly problems: readonly Problem[] = [],
  ) {
    super(problems.length === 0 ? summary : `${summary}\n${problems.map((p) => `- ${p.path}: ${p.message}`).join("\n")}`);
    this.name = "IntuiError";
  }
}

/** Turns zod issues into problems a model or a person can act on. */
export function problemsFrom(issues: readonly z.core.$ZodIssue[], input: unknown, prefix: PropertyKey[] = []): Problem[] {
  return issues.map((issue) => {
    const path = [...prefix, ...issue.path];
    return { path: describePath(path, input, prefix.length), message: messageFor(issue, input, path, prefix.length) };
  });
}

function messageFor(issue: z.core.$ZodIssue, input: unknown, path: PropertyKey[], skip: number): string {
  if (issue.code === "invalid_union" && "discriminator" in issue && issue.discriminator === "type") {
    // The issue sits on the node's "type" key; look at the node itself.
    const at = path.slice(skip);
    const node = valueAt(input, at.at(-1) === "type" ? at.slice(0, -1) : at);
    const type = isRecord(node) ? node.type : undefined;
    const known = (issue as { options?: unknown[] }).options;
    const list = Array.isArray(known) && known.length > 0 ? `; use one of ${known.join(", ")}` : "";
    return type === undefined
      ? `a component needs a "type"${list}`
      : `"${String(type)}" isn't a component${list}`;
  }
  if (issue.code === "unrecognized_keys") {
    const keys = issue.keys.map((key) => `"${key}"`).join(", ");
    return `${keys} ${issue.keys.length === 1 ? "isn't a known prop" : "aren't known props"} here; check the spelling or remove ${issue.keys.length === 1 ? "it" : "them"}`;
  }
  if (issue.code === "invalid_type" && valueAt(input, path.slice(skip)) === undefined) {
    return `this is required; add "${String(path.at(-1))}" (${issue.expected})`;
  }
  return issue.message;
}

/** `root.children[1] (Chart).series[0]`: array indexes in brackets, component types in parentheses. */
function describePath(path: PropertyKey[], input: unknown, skip: number): string {
  let text = "";
  let value: unknown = input;
  path.forEach((key, index) => {
    if (index >= skip) value = isRecord(value) || Array.isArray(value) ? (value as Record<PropertyKey, unknown>)[key] : undefined;
    text += typeof key === "number" ? `[${key}]` : `${text ? "." : ""}${String(key)}`;
    if (index >= skip && isRecord(value) && typeof value.type === "string") text += ` (${value.type})`;
  });
  return text || "(top level)";
}

function valueAt(input: unknown, path: PropertyKey[]): unknown {
  return path.reduce<unknown>(
    (value, key) => (isRecord(value) || Array.isArray(value) ? (value as Record<PropertyKey, unknown>)[key] : undefined),
    input,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

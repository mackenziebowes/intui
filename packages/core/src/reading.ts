import { z } from "zod";
import { formatNumber } from "./text";

/**
 * A number and how sure it is. Code that read a source knows whether it saw all of
 * it, part of it, or none; the tree carries that to the screen and back to the model.
 *
 * On the wire a bare number means `exact`, so every older tree keeps its meaning.
 * Each kind carries only its own fields: an `unknown` can't hold a number, so it can
 * never pass for 0.
 */
export type Reading =
  | { readonly kind: "exact"; readonly value: number }
  | { readonly kind: "atLeast"; readonly value: number }
  | { readonly kind: "estimate"; readonly value: number }
  | { readonly kind: "unknown" };

export type ReadingKind = Reading["kind"];

/** Every kind, in the order refusals list them. */
export const READING_KINDS = ["exact", "atLeast", "estimate", "unknown"] as const satisfies readonly ReadingKind[];

// Every reading this module made, so `toWire` can tell one from a plain object that merely looks like it.
const made_ = new WeakSet<object>();

function made<R extends Reading>(reading: R): R {
  made_.add(reading);
  return Object.freeze(reading);
}

/**
 * A copy of a tree's root ready for the wire: an exact reading becomes a bare number, so a copy
 * of core that predates readings (its schemas are strict) still parses a tree that never used
 * one. Only readings made here are replaced, so a table row that happens to hold
 * `{kind:"exact", value:1}` is left alone.
 */
export function toWire(value: unknown): unknown {
  if (typeof value !== "object" || value === null) return value;
  if (made_.has(value)) {
    const reading = value as Reading;
    return reading.kind === "exact" ? reading.value : { ...reading };
  }
  if (Array.isArray(value)) return value.map(toWire);
  return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, toWire(inner)]));
}

function finite(name: string, value: number): number {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Reading.${name}(${value}): a reading needs a finite number; if the source couldn't be read, use Reading.unknown()`);
  }
  return value;
}

export const Reading = {
  /** Counted in full. A bare number on the wire means this. */
  exact: (value: number): Reading => made({ kind: "exact", value: finite("exact", value) }),
  /** A floor: the real value may be higher. */
  atLeast: (value: number): Reading => made({ kind: "atLeast", value: finite("atLeast", value) }),
  /** Inferred, not counted. */
  estimate: (value: number): Reading => made({ kind: "estimate", value: finite("estimate", value) }),
  /** Couldn't be read. Has no number. */
  unknown: (): Reading => made({ kind: "unknown" }),
} as const;

/** The number inside a reading, or undefined for an unknown. */
export function readingValue(reading: Reading): number | undefined {
  return reading.kind === "unknown" ? undefined : reading.value;
}

/**
 * A reading in words: "216 tokens", "at least 216 tokens", "about 216 tokens",
 * "unknown". `signed` writes a plus sign before a positive number, for changes.
 */
export function readingText(reading: Reading, options: { unit?: string; signed?: boolean } = {}): string {
  switch (reading.kind) {
    case "exact":
      return numberText(reading.value, options);
    case "atLeast":
      return `at least ${numberText(reading.value, options)}`;
    case "estimate":
      return `about ${numberText(reading.value, options)}`;
    case "unknown":
      return "unknown";
    default:
      return never(reading);
  }
}

/** A number as it is shown: rounded the way `formatNumber` rounds it, so sign and direction follow what a reader sees. */
export const shownNumber = (value: number): number => Number(value.toFixed(2)) + 0;

function numberText(value: number, options: { unit?: string; signed?: boolean }): string {
  const shown = shownNumber(value);
  return `${options.signed && shown > 0 ? "+" : ""}${formatNumber(shown, options.unit)}`;
}

/** For the `default` of a `switch` on `kind`: the compiler fails here when a kind is added and not handled. */
export function never(value: never): never {
  throw new Error(`unhandled reading ${JSON.stringify(value)}`);
}

const KIND_LIST = READING_KINDS.map((kind) => `"${kind}"`).join(", ");

type Parsed = { ok: true; reading: Reading } | { ok: false; message: string };

/** Reads a wire value: a number, or one object per kind. Says what to fix when it can't. */
export function parseReading(input: unknown): Parsed {
  const fail = (message: string): Parsed => ({ ok: false, message });
  if (typeof input === "number") {
    return Number.isFinite(input)
      ? { ok: true, reading: Reading.exact(input) }
      : fail(`${String(input)} isn't a finite number; give a finite number, or {"kind":"unknown"} if the source couldn't be read`);
  }
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return fail(`expected a number or a reading object like {"kind":"atLeast","value":216}; got ${describe(input)}`);
  }
  const object = input as Record<string, unknown>;
  const kind = object.kind;
  if (kind === undefined) return fail(`a reading object needs a "kind"; add "kind" (one of ${KIND_LIST}) or write a bare number for an exact one`);
  if (typeof kind !== "string" || !(READING_KINDS as readonly string[]).includes(kind)) {
    return fail(`kind ${typeof kind === "string" ? `"${kind}"` : describe(kind)} isn't a reading; use one of ${KIND_LIST}`);
  }
  if (kind === "unknown") {
    if ("value" in object) {
      return fail(`kind "unknown" has no value; remove value, or use kind "atLeast" or "estimate" if you have a number`);
    }
    return extras(object, ["kind"]) ?? { ok: true, reading: Reading.unknown() };
  }
  if (!("value" in object)) {
    return fail(`kind "${kind}" needs a value; add "value" (a number), or use kind "unknown" if the source couldn't be read`);
  }
  const value = object.value;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fail(`kind "${kind}" needs "value" to be a finite number, got ${describe(value)}; fix it, or use kind "unknown" if the source couldn't be read`);
  }
  const bad = extras(object, ["kind", "value"]);
  if (bad) return bad;
  return { ok: true, reading: Reading[kind as "exact" | "atLeast" | "estimate"](value) };
}

function extras(object: Record<string, unknown>, allowed: string[]): Parsed | undefined {
  const keys = Object.keys(object).filter((key) => !allowed.includes(key));
  if (keys.length === 0) return undefined;
  return {
    ok: false,
    message: `${keys.map((key) => `"${key}"`).join(", ")} ${keys.length === 1 ? "isn't a known prop" : "aren't known props"} of kind "${String(object.kind)}"; remove ${keys.length === 1 ? "it" : "them"}`,
  };
}

function describe(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "a list";
  if (typeof value === "string") return `the string "${value.slice(0, 20)}"`;
  if (typeof value === "number") return String(value);
  return typeof value === "object" ? "an object" : typeof value;
}

/**
 * The wire schema for a reading: a bare finite number, or one strict object per kind.
 * Parses to a `Reading`. The JSON Schema it emits lists the same shapes.
 */
export const readingSchema = (): z.ZodType<Reading, unknown> =>
  z
    .unknown()
    .meta({
      description: "A number, or an object saying how sure it is.",
      anyOf: [
        { type: "number" },
        { type: "object", properties: { kind: { const: "exact" }, value: { type: "number" } }, required: ["kind", "value"], additionalProperties: false },
        { type: "object", properties: { kind: { const: "atLeast" }, value: { type: "number" } }, required: ["kind", "value"], additionalProperties: false },
        { type: "object", properties: { kind: { const: "estimate" }, value: { type: "number" } }, required: ["kind", "value"], additionalProperties: false },
        { type: "object", properties: { kind: { const: "unknown" } }, required: ["kind"], additionalProperties: false },
      ],
    })
    .transform((input, ctx): Reading => {
      const parsed = parseReading(input);
      if (parsed.ok) return parsed.reading;
      ctx.issues.push({ code: "custom", message: parsed.message, input });
      return z.NEVER;
    });

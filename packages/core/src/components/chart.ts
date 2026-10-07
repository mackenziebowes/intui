import { z } from "zod";
import { defineKind, type Node } from "../component";
import { cell, markdownTable } from "../text";

/**
 * What a series means. Renderers decide the look: a baseline is usually dashed,
 * a comparison usually lighter.
 */
export const SERIES_ROLES = ["primary", "baseline", "comparison"] as const;
export type SeriesRole = (typeof SERIES_ROLES)[number];

export interface Point {
  /** A category, or an ISO date for time series. */
  x: string | number;
  y: number;
}

export interface Series {
  label: string;
  role: SeriesRole;
  points: Point[];
}

/** A marker at one x position, such as a deploy. */
export interface Annotation {
  at: string | number;
  label: string;
}

export interface ChartProps extends Node {
  type: "Chart";
  kind: "line" | "bar";
  title?: string;
  /** The unit of every y value, e.g. "visitors" or "%". */
  unit?: string;
  series: Series[];
  annotations: Annotation[];
}

export const Chart = defineKind<ChartProps>({
  type: "Chart",
  summary: "A line or bar chart of one or more series, with optional markers.",
  writer: "code",
  schema: () =>
    z.strictObject({
      type: z.literal("Chart"),
      kind: z.enum(["line", "bar"]),
      title: z.string().optional(),
      unit: z.string().optional(),
      series: z
        .array(
          z.strictObject({
            label: z.string().min(1),
            role: z.enum(SERIES_ROLES).default("primary"),
            points: z
              .array(z.strictObject({ x: z.union([z.string(), z.number()]), y: z.number() }))
              .min(1, "a series needs at least one point"),
          }),
        )
        .min(1, "a Chart needs at least one series"),
      annotations: z
        .array(z.strictObject({ at: z.union([z.string(), z.number()]), label: z.string().min(1) }))
        .default([]),
    }),
  toText: (props) => {
    const xs = [...new Set(props.series.flatMap((series) => series.points.map((point) => point.x)))];
    const headers = ["", ...props.series.map(headerOf)];
    const rows = xs.map((x) => [
      cell(x),
      ...props.series.map((series) => cell(series.points.find((point) => point.x === x)?.y)),
    ]);
    const about = [`${props.kind} chart`, props.unit].filter(Boolean).join(", ");
    const parts = [props.title ? `**${props.title}** (${about})` : `(${about})`, markdownTable(headers, rows)];
    if (props.annotations.length > 0) {
      parts.push(`Markers: ${props.annotations.map((a) => `${a.at}: ${a.label}`).join("; ")}`);
    }
    return parts.join("\n\n");
  },
  example: {
    type: "Chart",
    kind: "line",
    title: "Visitors",
    unit: "visitors",
    series: [
      { label: "This week", role: "primary", points: [{ x: "Mon", y: 120 }, { x: "Tue", y: 180 }, { x: "Wed", y: 90 }] },
      { label: "Usual", role: "baseline", points: [{ x: "Mon", y: 110 }, { x: "Tue", y: 115 }, { x: "Wed", y: 105 }] },
    ],
    annotations: [{ at: "Tue", label: "New pricing page" }],
  },
});

function headerOf(series: Series): string {
  return cell(series.role === "primary" ? series.label : `${series.label} (${series.role})`);
}

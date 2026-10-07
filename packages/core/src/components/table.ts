import { z } from "zod";
import { defineKind, type Node } from "../component";
import { cell, markdownTable } from "../text";

export type CellValue = string | number | boolean | null;

export interface TableColumn {
  key: string;
  label: string;
  align?: "start" | "end";
}

export interface TableProps extends Node {
  type: "Table";
  columns: TableColumn[];
  rows: Record<string, CellValue>[];
  caption?: string;
}

export const Table = defineKind<TableProps>({
  type: "Table",
  summary: "Rows and columns of short values. For comparisons and lists of records.",
  // A table of words (a comparison, a list of files) is fine for the model to write.
  // A table of measured numbers should come from a tool, like any data.
  writer: "anyone",
  schema: () =>
    z
      .strictObject({
        type: z.literal("Table"),
        columns: z
          .array(
            z.strictObject({
              key: z.string().min(1),
              label: z.string().min(1),
              align: z.enum(["start", "end"]).optional(),
            }),
          )
          .min(1, "a Table needs at least one column"),
        rows: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
        caption: z.string().optional(),
      })
      .superRefine((table, ctx) => {
        const keys = new Set(table.columns.map((column) => column.key));
        table.rows.forEach((row, index) => {
          for (const key of Object.keys(row)) {
            if (!keys.has(key)) {
              ctx.addIssue({
                code: "custom",
                path: ["rows", index, key],
                message: `row has a value for "${key}", which isn't a column; add a column with key "${key}" or remove the value`,
              });
            }
          }
        });
      }),
  toText: (props) => {
    const table = markdownTable(
      props.columns.map((column) => cell(column.label)),
      props.rows.map((row) => props.columns.map((column) => cell(row[column.key]))),
    );
    return props.caption ? `${props.caption}\n\n${table}` : table;
  },
  example: {
    type: "Table",
    columns: [
      { key: "option", label: "Option" },
      { key: "streams", label: "Streams?" },
    ],
    rows: [
      { option: "Tool calls", streams: "No" },
      { option: "Markup in text", streams: "Yes" },
    ],
  },
});

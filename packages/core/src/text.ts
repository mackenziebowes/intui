/** Small helpers for the Markdown text forms. */

const numbers = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

export function formatNumber(value: number, unit?: string): string {
  const formatted = numbers.format(value);
  if (!unit) return formatted;
  return unit === "%" ? `${formatted}%` : `${formatted} ${unit}`;
}

/** Escapes a value for a Markdown table cell. */
export function cell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const text = typeof value === "number" ? numbers.format(value) : String(value);
  return text.replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function markdownTable(headers: readonly string[], rows: readonly (readonly string[])[]): string {
  const line = (cells: readonly string[]) => `| ${cells.join(" | ")} |`;
  return [line(headers), line(headers.map(() => "---")), ...rows.map(line)].join("\n");
}

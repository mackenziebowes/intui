/** Small helpers for the Markdown text forms. */

const numbers = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

export function formatNumber(value: number, unit?: string): string {
  const formatted = numbers.format(value);
  if (!unit) return formatted;
  return unit === "%" ? `${formatted}%` : `${formatted} ${unit}`;
}

/** A cell value as plain text: numbers formatted, empty for null, newlines as spaces. */
export function cellText(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  return (typeof value === "number" ? numbers.format(value) : String(value)).replaceAll("\n", " ");
}

/** A cell value escaped for a Markdown table. */
export function cell(value: string | number | boolean | null | undefined): string {
  return cellText(value).replaceAll("|", "\\|");
}

export function markdownTable(headers: readonly string[], rows: readonly (readonly string[])[]): string {
  const line = (cells: readonly string[]) => `| ${cells.join(" | ")} |`;
  return [line(headers), line(headers.map(() => "---")), ...rows.map(line)].join("\n");
}

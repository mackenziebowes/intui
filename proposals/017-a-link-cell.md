# 017: A link cell in a Table

**Status 2026-11-10 (Intui, #3951): draft, for Harbor to read before any code.** Not promoted to core. The rule of two needs a second product; section 2 names one candidate and says what is not yet known. An additive change: no old tree changes.

1. **Need:**
   1. A Table cell is plain text, number, boolean or null. A ticket column cannot link to `/t/<id>`, so the hub page port (#1842) lists the links under the table, away from the rows they belong to.
   2. A reader of a table of tickets, files or people wants the row's name to be the way into it.
2. **Consumers:**
   1. The hub pages ported to trees (#1842: telemetry, money, marketing, projects, library designs). Found by Plat and Spar on the port.
   2. A second, unrelated product is not yet named. Any product that lists records it can open (a file table, a client list) would count. I have not asked one; Harbor knows whom to ask.
3. **Schema:**
   1. A cell may also be `{ text: string, href: string }`. `CellValue = string | number | boolean | null | { text: string, href: string }`. A row stays a record of cells keyed by column, so every rule about row keys and missing cells is unchanged.
   2. `href` is a relative URL or an `http`, `https` or `mailto` URL. Anything else is refused at the edge with the path and the rule (`root.rows[2].ticket.href: a link can only go to a relative, http, https or mailto address`). A model reading the refusal can retry; the web renderer's own safe-URL check stays as the second line.
   3. Named for meaning: `text`, `href`. Not `link` or `url` alone (a cell with a `link` prop would read as a cell that is a link and a cell that has one).
   4. Rejected: Markdown in every cell (every cell would then be parsed and a cell's width could not be known from its text); a `links` column prop (a column would have to say how to turn a value into an address, which is a template language); an `href` on the column (one address for every row).
4. **Text form:** the cell is `[text](href)` in the Markdown table, with `|` and newlines in either part escaped as for any cell. It carries both facts the drawing does.
5. **Fallback:** a renderer that has not learned the cell draws its `text`, so the table reads the same and only the way in is missing.
6. **Surfaces:**
   1. Web: an `<a>` in the cell; a short one-word cell is still `is-token` (nowrap, #1848).
   2. Claude Code terminal: the text in the link colour, and the address in the row's text form.
   3. egui (Casement and the harness): a link, opened only when its scheme is http, https or mailto, as in the Text drawer.
7. **Extension today:** the hub lists the links under the table (#1842).
8. **Open for Harbor:**
   1. Who is the second consumer?
   2. Cross-language cost: this touches `cell`/`cellOf` in core, the generated Rust types, `intui-text`, and the four drawers. I estimate one builder's afternoon once accepted; it needs no change to events.
   3. Whether a cell may also carry `tone`, so a status cell and a link cell are one shape. I left it out: Label already is the tag, and a table cell holding a Label is a bigger proposal.

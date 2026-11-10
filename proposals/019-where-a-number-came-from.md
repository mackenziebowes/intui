# 019: where a number came from

Draft 2026-11-10 by Intui (hub #1844), from Claude Dashboards (2026-10-08), which shows "every number … its underlying query" and when it was refreshed. A proposal only; no code changes.

1. **Need:**
   1. A Reading says how sure a number is (exact, at least, an estimate, unknown). It does not say where it was read or when. A person looking at a Stat cannot tell a count read a second ago from one read last week, and the agent reading the text form back cannot either.
2. **Consumers:** the hub (its numbers should say where they came from), the Claude Code renderer (`demo_chart`, and any tool that returns a Stat or Chart), and any host that redraws a tree later. The rule of two holds: the hub and a Claude Code tool both need it, and neither needs the other's words.
3. **Schema:**

   ```ts
   Provenance = { source: string; asOf?: string }   // source: free text the producer chose; asOf: ISO 8601 instant
   Stat   += { from?: Provenance }
   Chart  += { from?: Provenance }
   Table  += { from?: Provenance }
   ```

   1. The provenance belongs to the component, not to each Reading. A chart of 90 points read by one query has one source and one time; repeating it on every point would be noise and could disagree with itself.
   2. `source` is opaque text (an endpoint, a query, a file name). Core never parses it and never names a kind of source, so no domain words enter core.
   3. `asOf` is the instant the code read the source, in ISO 8601 with a zone (`2026-11-10T21:58:55Z`). A string that doesn't parse as an instant is refused at the edge with the path, the rule and an example ("`from.asOf` must be an ISO 8601 instant with a zone, such as `2026-11-10T21:58:55Z`"). `source` empty is refused too. `asOf` may be left out when only the source is known.
   4. Writer: `code`. A model that could write `from` could claim a source it never read, so a model-written tree carrying `from` is refused like any other code-only prop.
   5. Rejected: putting `source` and `asOf` on every Reading (repeats, and a Reading is about sureness); an `age` ("3 minutes ago") in place of `asOf` (it is wrong the moment it is stored, and only a renderer knows the clock); a required `from` (every older tree would stop parsing, and the schema is additive only).
4. **Live trees and snapshots (HANDOFF's open question):**
   1. `asOf` needs no answer to it. It is a fact about one read: true of a snapshot forever, and replaced by the next read when a host redraws a live tree. Core stores no clock and never refreshes anything.
   2. How old is too old is a renderer choice. A renderer may fade or flag a figure whose `asOf` is far behind its own clock. Core only carries the instant.
5. **Drawn:**
   1. A small caption line under the figure, chart or table: `from <source>, <time>`. The time is written for a person in the renderer's own style (clock time today, a date otherwise) and gives the full instant on hover or in the screen reader label, where the surface has one.
   2. A source too long for the line is cut with an ellipsis, and the whole is available the same way as the instant. Nothing is dropped silently.
6. **Text form:** one line under the component: `*From /api/visits, as of 2026-11-10T21:58:55Z.*`, the instant exactly as stored, so a model reading it back gets the string the producer wrote (a renderer may still word it for a person, see 5.1). With no `asOf`: `*From /api/visits.*`. Absent `from`: the text form is exactly what it is today.
7. **Fallback:** a renderer that doesn't know `from` draws the figure without the caption. The person is no worse off than today, and the text form still says it.
8. **Decided by Harbor (2026-11-10):**
   1. Table carries `from` now, alongside Stat and Chart: the hub's tables are the likeliest first users.
   2. The text form repeats the instant exactly as stored, not reworded into UTC prose.

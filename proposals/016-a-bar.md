# 016: Bar, a level or progress with a Reading

**Status 2026-11-10 (Intui, #2609): waiting for a second consumer.** Not promoted to core. IntUI's rule of two holds: Casement is one consumer, and it draws its own Bar today. The ask to the products that might be the second is in section 8. A new node; no old tree changes.

1. **Need:**
   1. Show how full something is: a spend against its cap, a context window, a build's progress, a quota. `Stat` carries one figure and its change; it cannot show a figure against a limit, so a reader sees "$412" and does not see that the cap is $500.
   2. The thing shown is a fraction of a whole, and the producer often does not know it all: a lower bound (`atLeast`), an estimate, or nothing. A bar that is 0% wide for "not measured" lies, so the unknown case needs its own drawing.
2. **Consumers:**
   1. Casement already draws a Bar for its own node tree (`casement/src/ui.rs` `Node::Bar { tone, reading }`; `paint.rs`): a muted track, a filled part for the reading clamped to 0 to 1, and a striped track for an unknown reading.
   2. A second, unrelated product is not yet named. Candidates, each of which needs an owner's yes before it counts: `purse` (the month's spend against each cap, `purse-*/src/report.rs` holds the used and cap figures); the hub's money and telemetry pages (spend, token use against a limit); any product that shows a long job's progress. Section 8 asks them.
3. **Schema:**
   1. `Bar = { type: 'Bar', label: string, value: Reading, of?: number, unit?: string, tone: Tone, note?: string }`
   2. `value` is a Reading, like `Stat.value`. `of` is the whole the value is part of; absent means the value is already a fraction from 0 to 1. A value over `of` fills the bar and says so in the text form (an over-cap spend is the point of the bar).
   3. `tone` and `note` mean what they mean on `Stat`: a tone is never colour alone (proposal 006), and a `note` gives the reason in words.
   4. Named for meaning: `value`, `of`. Not `percent`, `width` or `fill`.
   5. Rejected: a `Stat` with an optional `of` (a Stat would then have two shapes, one a number and one a level, and every renderer of it would branch); a `percent` prop (it loses the unit and cannot say "412 of 500 dollars").
4. **Text form:**
   1. One line: `**Spend:** $412 of $500 (82%)`. An `atLeast` reads `at least $412 of $500`, an estimate `about $412 of $500`, an unknown `unknown of $500`. A value over the whole reads `$560 of $500 (over by $60)`. It carries every fact the drawing does, in the same order as `Stat`'s.
5. **Fallback:**
   1. A surface with no renderer draws a `Stat` with the value and the whole in its note, so nothing is lost.
6. **Surfaces:**
   1. Casement: the drawing it already has, now fed by a core node. The unknown reading stays a striped track.
   2. Web: a `<div role="meter">` with `aria-valuenow`, `aria-valuemax` and `aria-valuetext` carrying the text form's words; the fill is a width, the unknown reading a striped track by CSS, and nothing animates.
7. **Extension today:** Casement's own `Node::Bar`. A product that needs a bar before promotion draws a `Stat` and puts the whole in its note.
8. **Open for Harbor:**
   1. Which product is the second consumer? I did not ask `purse` or the hub's owners; Harbor knows who to ask. Until one says it needs a Bar, this stays here.
   2. Whether `of` belongs on a Bar or a Bar always takes a fraction and the producer divides. I chose `of` so the text form can say "$412 of $500"; a fraction-only Bar would say "82%" and lose the figures.

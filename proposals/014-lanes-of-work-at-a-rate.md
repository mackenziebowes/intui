# 014: Lanes, work flowing at a rate

**Status 2026-11-03 (Harbor, #3158): waiting for a second consumer.** Not promoted to core. IntUI's rule of two holds: an unbuilt hub view is not a second consumer. `Lanes` is built as Casement's own extension with this schema unchanged, so promoting it later changes no field. It comes back here when a second real consumer exists. Shares carry `who` only; the role split stays in the lane's note. Limit: only Casement draws it and writes its text form, because the parser keeps an unknown node's kind and path but not its fields. Core's text form, the web renderer and the Table fallback below come with promotion.

Draft 2026-11-03 by Gunwale (hub #3158, under #3061, for Harbor to read before any code), from Pennant's notes on #3156 (Watch's Tokens area, sketch approved by Mackenzie). A new node. No old tree changes.

1. **Need:**
   1. Watch's Tokens area shows, for each ticket being worked, how fast tokens are being spent on it, by whom, and whether it has just finished. Core can say the numbers (a Stat per lane, a Table), but not "this is a lane, work flows through it at this rate, these agents are spending it, it has landed". Pennant's sketch draws that as a tinted band, dots with short trails moving left to right at the lane's rate, and a white flash and drain when the ticket lands.
   2. The meaning is the rate and who spends it. Dots, trails, tint and flash are how a surface shows it, so none of them is in the schema.
2. **Consumers:** the Watch Tokens area (Keel's producer, #3156), and a second view that has the same shape: hub cost per ticket by agent (cost acts already carry agent, ticket and amount). The second consumer is a candidate, not a built thing. If Harbor holds that two real ones are needed first, this stays an extension in Casement and comes back when the hub view exists.
3. **Schema:**

   ```ts
   Lanes = {
     type: 'Lanes'
     lanes: Lane[]            // in the order given; the producer sorts
   }
   Lane = {
     label: string            // "#3092 IntUI box"
     note?: string            // the second line, "casement" (muted)
     rate: Reading            // units a second; unknown is allowed and means "not measured"
     unit: string             // "t/s out"
     shares: { who: string, amount: number }[]   // who spends the rate, by the legend (amounts are relative, summed by the surface)
     landed?: boolean         // the work has finished; absent means still going
   }
   ```

   1. Named for meaning: `rate`, `shares`, `landed`. Not `dots`, `trail`, `flash`, `band`.
   2. `shares` uses the same `who` names as the Areas legend (proposals 010 and 013). A `who` the legend gives no colour draws neutral. The lane's main colour is the colour of its largest share.
   3. `landed` is true until the producer stops sending the lane. How long a landed lane stays and drains is a surface's business.
   4. Rejected: a `Group` per lane with a Stat inside (cannot say "flowing"); a per-dot list (the producer would send a dot per token; the surface chooses the density); `flash: boolean` and `speed` (name the look and the animation, not the thing).
4. **Text form:**
   1. One line per lane, in the order given: `#3092 IntUI box (casement): 312 t/s out, builder 268, design 44` and, when landed, `, landed`. An unknown rate reads `rate unknown`. It carries every fact the drawing does, in order.
5. **Fallback:**
   1. A surface with no renderer draws a Table of four columns (lane, rate, shares, landed), so nothing is lost.
6. **Surfaces:**
   1. Casement: a band per lane tinted at about 10% in the main colour (the same mix as proposal 011's tile tint); dots in the share colours, their number and speed from the rate, each with a short trail, moving left to right; a landed lane flashes white and drains. In a `--still` no frame moves, so the still draws the dots at fixed positions and the landed flash at its first frame. The label, note and rate are ordinary text beside the band.
   2. Web: the same by CSS animation, stopped when the reader asks for reduced motion (then the dots are fixed and a landed lane is marked by its text).
7. **Extension today:** Keel sends a Stat row and Text per lane (the stand-in on #3156). The renderer is built in Casement only after Harbor accepts this.
8. **Open for Harbor:**
   1. Whether the second consumer is real enough, or this waits as an extension.
   2. Whether `shares` amounts are enough, or Pennant wants a role (builder, design) on each share too; the role split under a lane is the label's second line today, and `who` is an agent, not a role.

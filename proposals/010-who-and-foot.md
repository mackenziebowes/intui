# 010: whose it is, and what sits at the foot

Draft 2026-11-03 by Gunwale (hub #3096, under #3061), at Harbor's request for Keel's Watch producer (#3131) and Pennant's review of slice A. Three additive optional props. No old tree uses them, so no old tree changes.

1. **Need:**
   1. Watch draws each tile and feed name in its agent's window colour. Core had only tones.
   2. A Chat area keeps its reply box at the foot while an Asks area reads from the top. A rule for every area would drop the last ask to the bottom, so the producer must say which child sits at the foot.
2. **Consumers:** the Casement Watch and Talk trees (Keel's producer), and the web render of the same trees.
3. **Schema:**

   ```ts
   Label  += { who?: string }                     // a key the producer chose, 1 to 24 characters
   Group  += { who?: string; foot?: boolean }     // foot defaults to false
   Areas  += { legend?: { who: string; colour: string }[] }   // colour is #rrggbb
   ```

   1. `who` names whose a thing is. Core gives the key no meaning (rule: no domain words).
   2. `legend` is given once, on the `Areas` that holds the tiles. Its colour is the real colour of that agent's window (the hex from `window.toml`, or the name hash), so it is data about who, not a style choice in the tree.
   3. A `who` with no legend entry draws in its normal tone. A legend colour that is not `#rrggbb` is refused with the path and the fix, in both the TypeScript and the Rust edge.
   4. `foot: true` on a Group says: with room to spare in its area, sit below the rest. Only the last child of an area can sit at the foot; to pin a Form, wrap it in a Group with `foot`.
4. **Text form:** a Label with a `who` reads `[text] (who)`. `foot` and the legend change nothing in the text form.
5. **Surfaces:**
   1. Web: a Label with a coloured `who` wears the colour as its text; a Group wears a 3 px line down its left edge. `foot` is `margin-top: auto` in the area body.
   2. Casement: the same, with a stripe panel for the Group. The tab bar's open tab got a fill and a bright underline (slice B).
6. **Not in this proposal:** corner drag, saved workspaces (slice C of #3096).

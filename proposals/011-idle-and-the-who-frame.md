# 011: idle, and the frame a `who` wears

Draft 2026-11-03 by Gunwale (hub #3134, under #3061), from Pennant's review of Keel's Watch tiles against frame 5 (Mackenzie approved). One additive optional prop and a change to how an existing prop draws. No old tree uses `idle`, so no old tree changes.

1. **Need:**
   1. Watch draws one tile per neighbour. Frame 5 frames each tile in its agent's colour with a faint tint, and fades the frame of an idle neighbour to a trace of the hue. Core had `who` (a stripe) and nothing that says "its owner is doing nothing now".
2. **Consumers:** the Casement Watch tiles (Keel's producer) and the web render of the same tree. The Talk chat's per-agent cards can use the same pair.
3. **Schema:**

   ```ts
   Group += { idle?: boolean }     // defaults to false
   ```

   1. `idle` is named for what it means: its owner (`who`) is doing nothing now. Absent means acting, so the common state costs no key.
   2. Without `who`, or with a `who` the legend gives no colour, `idle` changes nothing.
   3. Rejected: `acting` (the common state would need a key), `dim` (names the look, not the meaning), a `state` enum (core would own a list of states it cannot know).
4. **How a boxed Group with a coloured `who` draws:**
   1. A 2 px rounded frame in the legend colour and a tint of that colour at about 10% over the area. This replaces the stripe; an unboxed Group keeps the stripe.
   2. When `idle`, the frame is about 25% of the hue and the tint about 4%.
5. **Text form:** unchanged. `idle` and the frame are how it looks, not what it says.
6. **Surfaces:**
   1. Web: `intui-group--idle`; a boxed Group with a coloured `who` gets the border and tint through `color-mix`.
   2. Casement: the same two mixes, taken against the surface colour, with a rounded frame panel.
7. **Also in #3134, no schema change:** a row stretches every child to the row's height; a thread Group shows its last children when its room is short (the part of #3095 that was deferred).
8. **Not in this proposal:** a tone ramp by age (to be asked for only if a still shows muted and neutral are too few steps to cool a feed); the driver tag on a tile's frame.

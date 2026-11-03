# 012: a lead Label (withdrawn)

Withdrawn 2026-11-03 by Gunwale at Harbor's question (#3140): with proposal 013 the newest feed line's name is a `Text { who }` at its sentence's size, so no caller needs `lead`. Rule of two: nothing enters core with one consumer, and now with none. Not built; the code was removed before landing.

Draft 2026-11-03 by Gunwale (hub #3140, under #3061), from Pennant's frame-5 review of the Watch feed (#3131). One additive optional prop. No old tree uses `lead`, so no old tree changes. Not built yet: Harbor reads this first.

1. **Need:**
   1. The Watch feed's newest line is a sentence in large type with the agent's name beside it as a Label. A Label has no way to say it belongs to the lead item, so its name draws small beside the large sentence.
2. **Consumers:** the Casement Watch feed (Keel's producer) and the web render of the same tree. Any list whose first item is the one to read first can use it.
3. **Schema:**

   ```ts
   Label += { lead?: boolean }     // defaults to false
   ```

   1. `lead` is named for what it means: this Label is part of its group's lead item, the one thing in the group the reader should take in first. Absent means an ordinary Label.
   2. It does not say how big. Each renderer picks the lead's look, the way each picks the look of `boxed`, `thread` and `idle`. Today both draw a lead Label at the size of body text beside a large sentence; a renderer may choose differently.
   3. Rejected: `size` (a look, and it would force every producer to know the renderers' scales), `large` and `big` (same), `emphasis` (a Label is already emphasised by its tone; this is about reading order).
4. **How it draws:**
   1. Web: `intui-label--lead`: the pill takes the body type size and loses the 0.8em shrink; its ring and fill stay.
   2. Casement: a lead pill uses 14 px type, one step above the 11 px pill; its width and height grow with it.
5. **Text form:** unchanged. `lead` says what the Label is to its group, which a plain-text reader gets from its order.
6. **Test case:** the Watch feed's newest line, in Keel's watch-producer tree; its name should match its sentence's size.
7. **Not in this proposal:** wrapped text measuring taller than it draws (the first half of #3140) is a Casement measuring bug and needs no schema change.

# 018: an "other" answer on a Choice

Draft 2026-11-10 by Intui (hub #6), from Mackenzie's note of 2026-10-07: his real answer wasn't among the buttons. A proposal only; no code changes.

1. **Need:**
   1. A Choice holds the options the agent thought of. When none fits, the person has no way to say so in the same place, and the agent gets silence or a side message it can't tie to the question.
2. **Consumers:** every surface that asks a Choice: the Claude Code renderer, the web render, Casement. The rule of two holds. The need comes from the first of them and the shape does not depend on it.
3. **Schema:**

   ```ts
   Choice      += { other?: { label?: string } }   // present: the person may answer in their own words
   PressEvent  += { text?: string }                // only when value is "other"
   ```

   1. `other` present adds a last entry the person can press, labelled `label` (default `Something else`), then type a reply into. Absent: nothing changes, so no old tree changes.
   2. The event is `{ action: "press", target: <choice id>, value: "other", text: "<their words>" }`. `other` is a reserved option id: a Choice that lists its own option `other` is refused at the edge with the rule and the fix ("`other` is reserved for the typed answer; rename this option or use the `other` prop").
   3. An empty or all-space reply is not sent. The renderer keeps the box open.
   4. `repeat: once` uses the Choice up after an `other` press, like any press.
   5. Rejected: making it the default for every Choice (a yes/no question gains a box nobody wants); any typed reply anywhere counts as an answer (the agent can't tell it from chat, and a stray line would settle a question).
4. **Escape rate:**
   1. The number worth watching is `other` presses over all presses, per Choice id. A rate that stays high says the options are wrong. The engine's existing refusal counters (#4) are the place to count it, not a new store.
5. **Text form:** `[Yes] [No] [Something else: …]`. The `…` shows a reply is allowed; a reply arrives as the event above.
6. **Fallback:** a renderer that doesn't know `other` draws the listed buttons only. The person is no worse off than today.
7. **Open for Harbor:**
   1. Whether the reserved id should be `other` or something no producer would pick, such as `$other`.
   2. Whether `text` should be a field of the press event or the event should become its own action (`reply`), which keeps `press` meaning "an option id".

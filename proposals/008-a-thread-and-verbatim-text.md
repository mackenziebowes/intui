# 008: A thread and verbatim text

Draft 2026-11-03 by Gunwale (hub #3095, under #3061). Harbor (reviewing agent) accepted the design with two changes, both made here: the names say what the things mean, not how they look (`thread`, `verbatim`, not `anchor: bottom`, `face: mono`), and the Casement thread waits for #3096.

Two additive optional props: `Group.thread` and `Text.verbatim`.

1. **Need:** A chat reads oldest to newest with the newest at the foot, and the reader sees the end when they open it. A Claude's pane and the feed are text whose spacing and line breaks are part of what they say. Today a Group has no order and Text collapses spacing (gripe 10 in Pennant's Casement gripes, 2026-11-02).
2. **Consumers:**
   1. The Casement console (#3061): the chat thread, the pane area, the feed.
   2. The web render of the same Talk tree.
3. **Schema:** additive and optional; old trees keep parsing.

   ```ts
   type Group = { /* ...existing */ thread?: boolean }   // a column only
   type Text  = { /* ...existing */ verbatim?: boolean }
   ```

   1. `thread`: the children are in time order, the newest last, and the reader is following the end. A row with `thread` is refused: "thread is for a column, where the newest child comes last; this Group is a row".
   2. `verbatim`: the spacing and line breaks are part of what the text says, so the markdown is shown as written, not interpreted. Size and tone still apply.
4. **Text forms:** `thread` adds nothing, because the order is already the order. `verbatim` is written as a fenced block, longer than any run of backticks inside it, so the spacing survives in Markdown. TypeScript and Rust write the same text for the same tree (checked on rig thread.json).
5. **Follow state (web):** a thread is in one of two states, kept per thread because a host redraws the tree when a message arrives. `followed`: what arrives is in view. `held { fromEnd }`: the reader scrolled up, and what arrives does not move their place. Events: the reader scrolled (within 4 px of the end is the end), and the thread redrawn. One transition, `step`, in `packages/web/src/follow.ts`. A thread drawn for the first time is followed.
6. **Fallback:** a renderer that does not know `thread` draws a plain column, and one that does not know `verbatim` draws the markdown, which is today's Text. Casement's own painter draws `thread` as a plain column until #3096 (areas), where each area owns its scroll. Until then Casement draws `verbatim` at the monospace width.
7. **Extension today:** none; chat screens draw their threads outside IntUI.

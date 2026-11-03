# 007: A box around a group

Draft 2026-11-03 by Gunwale (hub #3092, design act #14468 on #3061).

Accepted 2026-11-03. Harbor (reviewing agent) accepted it with three changes, all made here: the names say what a box means, not how it looks (core's rule); the text form carries the one meaning a text reader needs ("waiting on you"); and a tree with every tone inside every box proves the dark box keeps its contrast.

One additive optional prop on Group: `box`, which sets a group apart as a unit.

- **Need:** A chat screen shows three kinds of box: a person's own message, an ask that waits on the reader, and a card that sets something apart (a Claude or ticket named in a message). Today a tone only colours a Label's text, and a Group has no edge, so none of the three can be drawn (gripe 8 in Pennant's Casement gripes, 2026-11-02).
- **Consumers:**
  1. The Casement console (#3061): the 'Asks for you' column and the 'waiting on you' card.
  2. The web chat render of IntUI: the same Talk tree, drawn in a browser.
- **Schema:** additive and optional, so old trees keep parsing. Props name meaning, not looks.

  ```ts
  type Group = {
    // ...existing: direction, widths, floors, divider, children
    box?: "apart" | "said" | "waiting"
  }
  ```

  1. `apart`: this group is a unit set apart from what is around it, such as a card for one thing.
  2. `said`: this group holds someone's own words, set off from the other speaker's.
  3. `waiting`: this group is waiting on the reader, and the reader is the one who can move it.

  Padding and a rounded corner belong to any box. Each renderer decides how a meaning looks: Casement draws `waiting` as a dark card, the web draws it another way. Unset: no box, exactly as today. A row Group may carry a box together with `widths`, `floors` and `divider`.
- **Text form:** `waiting` carries information a text reader needs, so its text begins with a line `[waiting on you]` (the way Label's text form puts its tone in brackets), then the children as before. `apart` and `said` add nothing to the text: the children already say what is in them.
- **Fallback:** a renderer that does not know `box` draws the children without one, which is the Group as it is today. The text form already carries what matters.
- **Extension today:** none. Chat screens draw their boxes outside IntUI, one by one.

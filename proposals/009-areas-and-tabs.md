# 009: Areas and Tabs

Draft 2026-11-03 by Gunwale (hub #3096, under #3061). Harbor (reviewing agent) accepted the design with one change, made here: core names no product words. An area's kind is an opaque label the producer supplies, together with the list of kinds it can fill; Chat, Asks and the rest stay in the producer.

Two additive component kinds: `Areas` and `Tabs`. No old tree contains either, so no old tree changes.

1. **Need:** A console is one region cut into areas, each with a header whose menu switches what it shows, and a bar of saved arrangements (Pennant's frames 2 to 4, `areas.html`). Group and Choice can place the content and the buttons, but not a header menu, a cut that a person moves, or a tab bar.
2. **Consumers:**
   1. The Casement console (#3061): the Talk, Answer, Watch and Panes arrangements.
   2. The web render of the same trees.
3. **Who holds what:**
   1. The tree (producer): the kinds it can fill, each area's kind and filter, and each area's content. An area with no content yet reads "waiting for <kind>".
   2. The surface (Casement, web): the arrangement as the person changes it, the open menu and any drag. None of that is in the tree.
   3. A surface tells the producer, with a `press` event, when the person switches an area or a tab. The producer answers with a new tree.
4. **Schema:**

   ```ts
   type AreaKind = { id: string; label: string; hint?: string }
   type AreaSlot = { id: string; kind: string; filter?: string; children?: Node[] }
   type AreaLayout = string | { split: "row" | "column"; ratio: number; a: AreaLayout; b: AreaLayout }
   type Areas = { type: "Areas"; id: string; kinds: AreaKind[]; areas: AreaSlot[]; layout: AreaLayout }
   type Tabs  = { type: "Tabs"; id: string; tabs: { id: string; label: string }[]; active: string }
   ```

   1. `layout` places every area exactly once; `ratio` is the first part's share, 0.1 to 0.9. An area whose kind is not in `kinds`, a repeated id, or a layout that misses or repeats an area is refused with the id and the fix.
   2. Events: pressing a tab is `press` on the Tabs id with the tab's id; switching an area is `press` on the Areas id with `<area>:<kind>`.
   3. A seat that lets the person split or join areas (Casement does, by dragging a corner or from the type menu) tells the producer with the same `press`: a split is `<new area>:<kind>`, the new area being a second one of the kind of the area it was cut from; a join is `<removed area>:` with no kind. The producer answers with a tree that fills the new area, or drops the removed one. The seat keeps the cut and its ratios itself; the producer never sees them.
5. **Text form:** each area in layout order: `**<kind label>** · <filter>`, then its content, or `waiting for <kind label>`. Tabs: the open one in brackets, `[Talk] · Watch`. TypeScript and Rust write the same text for the same tree.
6. **Fallback:** a renderer that does not know `Areas` or `Tabs` draws their text form. Moving a cut (drag) is the seat's own; the web render in this ticket draws the areas and tabs and takes menu and tab presses, and does not move cuts.
7. **Extension today:** none; Casement's talk.json is plain columns.

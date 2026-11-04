# 015: a message box, on a Form

Draft 2026-11-04 by Gunwale (hub #3093, under #3255 Andon Talk and #3061), from Pennant's chat-f1 and gripe 9. Two additive optional props. No old tree uses them, so no old tree changes. Built on the branch `gunwale/3093-composer` for Harbor to read.

1. **Need:**
   1. A person writing to an agent writes more than a line, and sends with a key. A Form gives a one-line input and a wide button below it (gripe 9).
2. **Consumers:** Casement's Talk view (Mackenzie typing to agents in Andon) and the web render. Any host that lets a person write a message to an agent can use it.
3. **Schema:**

   ```ts
   FormField += { lines?: number }                 // a text field only; 2 to 8 lines show at once
   Form      += { send?: "enter" | "ctrl-enter" }  // the key that sends; its presence makes the form a message box
   ```

   1. `lines` makes a text field several lines. A field of another input kind with `lines` is refused with the rule and the fix.
   2. `send: "enter"`: Enter sends, Shift+Enter is a new line. `send: "ctrl-enter"`: Ctrl+Enter sends, Enter is a new line (for a message that goes to several).
   3. A form with `send` is a message box: the field's label is its placeholder, and the submit button is small, inside the box, beside the key's name.
   4. Rejected: a new `Composer` component (a second thing for a producer to learn, for a Form with a key); `placeholder` and `compact` props (looks, not meaning).
4. **How it draws:**
   1. Web: a textarea in a box; the foot holds the key hint and a small button. Enter and Shift+Enter as above; IME composing is respected.
   2. Casement: the same box; text wraps to the box, Up and Down move the caret between lines, a blank message sends nothing, and the box empties once it has sent.
5. **Text form:** a field with lines reads `(text, 4 lines)`; a form with `send` ends `[Send] (Enter)` or `[Send] (Ctrl+Enter)`.
6. **Test case:** `casement/rig/trees/talk-composer.json` (Pennant's Talk tree with `send: "enter"`); the web demo's "A message box" case.

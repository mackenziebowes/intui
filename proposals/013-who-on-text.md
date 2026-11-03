# 013: whose it is, on a Text

Draft 2026-11-03 by Gunwale (hub #3146, under #3061), from Pennant's #3144 review. One additive optional prop. No old tree uses it, so no old tree changes. Not built yet: Harbor reads this first. It rides on the same branch as 012 (#3140), so the two are one IntUI change.

1. **Need:**
   1. Since #3129 a Label draws as a pill, the way the web draws a status. A name inside a sentence (a Watch tile's agent, a feed line's agent) is not a status, but it is the only way to give a name its `who` colour.
2. **Consumers:** the Casement Watch feed and tiles (Keel's producer), and the web render of the same trees. Any sentence that names a person or agent in their colour can use it.
3. **Schema:**

   ```ts
   Text += { who?: string }     // a key the producer chose, 1 to 24 characters; same meaning as Label.who
   ```

   1. `who` names whose the words are. Core gives the key no meaning, as for Label.
   2. A `who` with no legend entry draws in the Text's own tone. A coloured `who` makes the whole Text wear the colour, so a name is its own Text (or a Text run), not a word buried in a longer one.
   3. Rejected: a new `Name` component (a second thing for a producer to learn, for what `who` already says); markdown colour spans (a look in the words, and not in the schema).
4. **How it draws:**
   1. Web: the same as a Label's `who` (its colour as the text colour), with no pill.
   2. Casement: the Text's words in the legend colour, at the Text's own size, no ring and no fill.
5. **Text form:** a Text with a `who` reads `text (who)`, as a Label does. Plain text readers keep the name.
6. **Test case:** `watch-producer --who`: tile names and feed names draw as agent-coloured words, times as muted Text, matching Pennant's approved frame 5.
7. **Producer side:** Keel sends names as `Text { who }` and times as `Text { tone: muted }` (named in #3146).

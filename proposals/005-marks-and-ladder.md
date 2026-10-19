# 005: Marks and Ladder

- **Need:** show a small set of countable things one by one, so that a count of 7 looks like 7 and not like a bar. Two shapes: a row of marks (each mark is one thing, in one state), and a set of stages bottom to top with marks in them and counted steps between them. Chart gives bars and lines, which imply a precision a count of 7 doesn't have. Flow joins steps but can't hold marks or counts. Table can list the things but can't show their states at a glance. Mackenzie wants the pages that answer "is anyone moving, and where do they stop?" to show every one of the small numbers as itself.
- **Consumers:**
  1. The command hub's Marketing page (visits and people at stages) and /outreach (a batch of n people sent to, each in the furthest state reached).
  2. Eval-Telemetry: a batch of n eval trials is a row of n marks, passed or failed, with k of n beside it.

  Both are small-n views where "k of n" is the honest number. Plat accepted the second consumer on 2026-10-19.
- **Schema:** props name meaning, never looks. Both are `writer: "code"` (they show numbers).

  ```ts
  type Kind = { id: string; label: string }            // 1 to 3 per component; what a mark is ("a person", "a visit")
  type State = { id: string; label: string; tone: Tone } // what a mark has reached; the tone says how it matters
  type Mark = { kind: string; state?: string; detail?: string }

  type Marks = {
    type: "Marks"
    kinds: Kind[]
    states: State[]
    rows: {
      label: string
      note?: string
      marks: Mark[]                  // at most 200: more is refused with "use a Chart"
      halo?: { label: string; n: number }   // an amount around the row that is not a mark
    }[]
  }

  type Ladder = {
    type: "Ladder"
    kinds: Kind[]
    states: State[]
    rungs: {                         // listed bottom to top
      id: string
      label: string
      nodes: { id: string; label: string; group?: string; marks: Mark[]; count?: string }[]
      empty?: string                 // said when the rung has no nodes, e.g. "none yet"
    }[]
    steps: { from: string; to: string; label: string }[]   // from and to name nodes; the label is written by code
  }
  ```

  Rules, each with the formula-style error (what failed, which rule, what to do): a `kind` or `state` on a mark must be declared; a step's ends must name nodes; a row or node over 200 marks is refused ("use a Chart, or give the count in `count`/`halo`"). **Above 30 marks** a renderer draws a count in text and a band instead of one glyph per mark, so points are only used for small n; the text form is the same either way. The first declared kind is drawn filled, the second hollow, the third as a ring.
- **Text form:** carries the same information as the drawing.
  - `Marks`: one line per row: `Batch 1 (note): 10 marks. 4 touched, 3 conversing, 1 committed, 1 suppressed; halo label n.` The first line says what each kind means: `Marks are people (filled) and visits (hollow).`
  - `Ladder`: a list of rungs from the top, each with its nodes and counts, then the steps as `from → to: label`: `Paid: none yet` / `Waitlists: Close kit 3 visits, 1 person` / `Steps: Close checklist → Close kit: 4 visits went on`.
- **Fallback:** a surface without a renderer for either draws the text form (the Markdown above), which is a complete reading. The web renderer, the Rust renderer's text crate, and the egui harness each draw it or fall back to the text form before the next release.
- **Extension today:** none. The hub's Marketing and /outreach pages are Tables and Stats, and are the stand-in that these replace.

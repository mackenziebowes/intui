# IntUI

Interactive answers from agents, drawn on any surface.

IntUI lets an agent answer with components (charts, tables, flows, buttons, forms) instead of only text. The agent produces a **component tree**; a **renderer** for each surface draws it: a terminal, a web page, an email, later native apps. Every tree also has a Markdown form, so the model can read back what it showed and every surface has a fallback.

Docs: [intui.mackenziebowes.com](https://intui.mackenziebowes.com)

## Status

Early. The core, the layout math, the web renderer and the Claude Code plugin are built. A Rust port for native apps is in the repo but not packaged. The email renderer is planned.

| Package | What it is | Status |
|---|---|---|
| `@intui/core` | Component schemas and meaning. No rendering, no product words. | Built |
| `@intui/layout` | Renderer-neutral data math: chart scales, flow layering and small helpers every renderer needs. | Built |
| `@intui/web` | HTML and CSS renderer for modern browsers. | Built |
| `@intui/claude-code` | A Claude Code plugin: a `show` tool that draws trees in the transcript. | Built: [install it](#draw-trees-in-claude-code) |
| `crates/` | Rust: tree types, layout, text form and an egui renderer, for native apps. | In the repo, not packaged |
| `@intui/email` | Static renderer for email. | Planned |

## Draw trees in Claude Code

Tested on Claude Code 2.1.316. At the prompt of a terminal session:

```
/plugin install intui --marketplace mackenziebowes/intui
```

Answer `y` to add the marketplace, then press Enter to install for your user. From a shell, the same install is `claude plugin install intui --marketplace mackenziebowes/intui`. The plugin is already built in `packages/claude-code/plugin`, so there is nothing to clone or compile.

To see it work, start a new session and ask: "Use the show tool to show me a table of three fruits and their colours." Claude calls `show`, and the table is drawn in the transcript. The same tree is also what the model reads back, as Markdown.

If you change `packages/claude-code/src`, run `bun run build` in `packages/claude-code` and commit the rebuilt `plugin/` folder, because that folder is what people install.

## A tree

```json
{
  "v": 1,
  "root": {
    "type": "Group",
    "children": [
      { "type": "Text", "markdown": "**Ideas inbox**" },
      { "type": "Choice", "id": "next", "options": [{ "id": "explore", "label": "Start exploring" }, { "id": "park", "label": "Park" }] }
    ]
  }
}
```

```ts
import { Tree, IntuiEvent } from "@intui/core";

const tree = Tree.parse(input, { author: "model" }); // throws IntuiError with every problem and its path
tree.toText();                                        // Markdown: what the model reads back
tree.describe(IntuiEvent.press("toolu_1", "next", "park")); // 'Pressed "Park" in next (from toolu_1).'
```

## Two rules worth knowing

- **Numbers come from code.** `Chart` and `Stat` can only be built by code (`Tree.of(...)`), never written by the model directly. The model calls a tool that runs a query and returns the chart.
- **Core stays general.** Product-specific components live in the product, built from core pieces. See [CLAUDE.md](CLAUDE.md) and [proposals/](proposals/).

## Develop

```bash
bun install
bun run typecheck
bun run site        # builds the docs site into site/dist
```

MIT licensed.

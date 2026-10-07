# IntUI

Interactive answers from agents, drawn on any surface.

IntUI lets an agent answer with components (charts, tables, flows, buttons, forms) instead of only text. The agent produces a **component tree**; a **renderer** for each surface draws it: a terminal, a web page, an email, later native apps. Every tree also has a Markdown form, so the model can read back what it showed and every surface has a fallback.

Docs: [intui.mackenziebowes.com](https://intui.mackenziebowes.com)

## Status

Early. `@intui/core` (schemas, text forms, events) is built. Renderers are next: Claude Code first, then the web.

| Package | What it is | Status |
|---|---|---|
| `@intui/core` | Component schemas and meaning. No rendering, no product words. | Built |
| `@intui/claude-code` | A Claude Code plugin: a `show` tool that draws trees in the transcript. | Next |
| `@intui/web` | HTML and CSS renderer for modern browsers. | Planned |
| `@intui/email` | Static renderer for email. | Planned |

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
bun test
bun run typecheck
bun run site        # builds the docs site into site/dist
```

MIT licensed.

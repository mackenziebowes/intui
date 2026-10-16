# CLAUDE.md

IntUI: a component protocol so agents can answer with interactive UI on any surface. `packages/core` is the protocol; each renderer is its own package, and `packages/layout` holds the data math they share (chart scales, flow layering), so renderers never copy from each other.

## Commands

```bash
bun install
bun run typecheck    # tsc --noEmit
bun run site         # build the docs site into site/dist
```

## Layout

- `packages/core/src/components/`: one file per component kind. Each kind owns its schema, who may write it, its text form and an example.
- `packages/core/src/catalog.ts`: the set of kinds, and the schemas built from them (including the JSON Schema for a model's tool input).
- `packages/core/src/tree.ts`: `Tree`, a validated tree. `Tree.parse` for anything from a wire, `Tree.of` for trees code builds.
- `packages/core/src/event.ts`: `IntuiEvent`, what a person did with a `Choice` or `Form`.
- `packages/core/src/problems.ts`: `IntuiError`. Its messages are read by models retrying a tool call, so every problem names its path, the rule that failed and what to do.
- `crates/`: a Cargo workspace, the Rust renderer's foundation. `intui-types` is generated from `packages/core/schema/*.schema.json` by typify in `build.rs`, with the hand-written edge that parses a tree (unknown kinds become `Drawn::Unknown`). `intui-layout` ports `packages/layout`. `intui-text` is the text form and the `intui-text` binary the checks drive. Change core's schema, run `bun run schema`, and the Rust types follow.
- `site/`: the docs site, generated from the catalog so it can't drift from the code.

## Tests and evals

No tests here (Mackenzie, 2026-10-15: every test was deleted). Show a change working by running the program, in the hand-back.


Evals (`evals/`) are trends we read, never gates (the `eval-design` skill). They run headless Claude, so ask Mackenzie before running them.

## Rules for core

Agents will add to this package while working on a specific product. These rules keep core general. Read them before changing anything in `packages/core`.

- **Don't add a component or prop to core for one product.** Build it in the product instead, out of core pieces (an "extension"). Write a proposal in `proposals/` if you think core needs it.
- **Rule of two.** Something enters core only when two unrelated products need it.
- **No domain words.** `series`, `tone`, `unit` and `annotation` are fine. `pageviews`, `idea`, `client` and `deal` are not.
- **Props describe meaning, not looks.** `tone: "warning"`, `role: "baseline"`, never `color` or `dashed`. Each renderer decides the look.
- **Every component has a text form** (`toText`), and it must carry the same information as the drawn component. It's what the model reads back and every surface's fallback.
- **Components that show numbers are `writer: "code"`.** The model can't write them directly.
- **The schema is a protocol.** Trees carry `v`. Changes are additive only: new optional props, new components. Never rename, remove or tighten an existing prop; old trees in transcripts and emails must keep parsing.
- **Errors follow the formula:** what failed, which rule, what to do next. A model reads them and retries.

## Adding a component (after its proposal is accepted)

1. Add `packages/core/src/components/<name>.ts` with `defineKind`, following the existing ones.
2. Register it in `core` in `catalog.ts` and export it from `index.ts`.
3. Draw it on every surface (the demo page, the plugin, the Rust harness) and look.
4. Every renderer must draw it, or fall back to its text form, before the next release.
@modules.md

# Rust GUI toolkit for IntUI's native renderer

Research, 2026-10-14. No code in the repo came out of this. The probes mentioned below were built and run in a scratch directory on this machine (Hyprland 0.56.2, RTX 5070 Ti, NVIDIA 615.71.09, at-spi2-core 2.60.7). Anything marked **uncertain** could not be confirmed from a primary source or a local run.

## Recommendation

**Build the native renderer on egui/eframe (0.36.x).** Runner-up: **gtk4-rs (plain, without relm4)**.

Why egui:

1. **It suits a tree that arrives as data.** egui is immediate mode: each frame calls one `render(ui, &Node)` that walks whatever tree is held now. There is no retained widget tree to diff when the hub sends a new tree. When a poll or SSE update arrives, the fetch thread swaps the tree and calls `ctx.request_repaint()`, and the loop sleeps otherwise. Widget ids come from node ids (`ui.push_id`), so focus and scroll survive a redraw.
2. **It can be driven from outside, and that was checked on this machine.** A probe eframe 0.36.2 app with an "Approve" button was driven by separate processes in two ways:
   - **AT-SPI.** A Python process using `gi.repository.Atspi` (system Python, no extra packages) read the tree (`application > frame > label "presses: 0", button "Approve"`). It called the button's `click` action, and the app counted the press.
   - **egui's inspection port.** With `EGUI_INSPECTION=1`, a separate Rust client on `127.0.0.1:5719` read the full AccessKit tree, sent a click and got a PNG screenshot back. The round trip took 70 ms.
   - **grim** captured the window from `hyprctl clients -j` geometry.

   No other toolkit here has a working route like this that was tried on this machine.
3. **One theme value can restyle everything.** `Style` and `Visuals` are a single struct set on the context. The renderer would draw IntUI kinds mostly with its own `Painter` code plus a few stock widgets (button, text edit, scroll area), so a per-product theme becomes one Rust struct built from intui's theme tokens. egui's default look is already dense, grey and square-ish.
4. **Custom drawing is first class.** `Painter` draws paths, beziers, meshes and text, which covers the Flow box-and-arrow layout and the charts (the maths stays in `packages/layout`, as now). `ScrollArea::show_rows` virtualises a list of a few hundred rows (well-known API; I didn't fetch its docs).
5. **Licence and upkeep.** It is MIT/Apache-2.0, has a minor release every 1–2 months (0.34 in March, 0.35 in June, 0.36 in August, 0.36.2 on 2026-09-08), and is funded by Rerun.
6. **Size and startup on this machine.** The stripped wgpu build is 19–20 MB. The first frame landed 490 ms after launch on the very first run and 220–230 ms on later runs.

**Biggest risk: a long-lived wgpu window on NVIDIA + Wayland.**

- egui has an open "timeout while acquiring the next frame" freeze on Wayland (egui #8416), and winit has an open 100 % CPU spin on Wayland (winit #4668).
- iced has the same class of bug, so it isn't unique to egui.
- Related, and seen first-hand: a Wayland window that gets no frame callbacks (hidden, or on an output nothing displays) **stops painting, so it also stops handling input and accessibility actions** until it is shown again. The data stays current, so the window catches up when it's raised, but the e2e harness has to keep the window rendering (see *Driving it from outside*).
- Mitigation: keep eframe's `glow` (OpenGL) backend as a feature-flag fallback, and soak-test a window left open for a day before calling it done.

Smaller egui costs:

- **Text.** Shaping moved to harfrust in 0.35 (kerning, ligatures), but bidi and complex scripts are **uncertain**. That's fine for this UI, which is English and monospace-heavy.
- **Layout.** It is single-pass and cursor-based, with no flexbox. The dense, square layout we want doesn't need flexbox.
- **Stock-widget styling.** Class-based styling of built-in widgets is not there yet (0.35 notes: "the next step will be a styling system").
- **Accessibility versions.** egui 0.36 still pins `accesskit_unix` 0.21.1. AccessKit fixed two Unix bugs (#818, #820) on 2026-10-11 in the 0.24 line.

**Why gtk4-rs is runner-up and not first:**

- Its strengths are real: the best text (Pango/HarfBuzz), CSS theming (one provider swap restyles everything), mature AT-SPI, and virtualised `ListView`/`ColumnView`.
- But GTK is retained, so the renderer has to diff incoming trees against live widgets.
- The default Adwaita look works against "dense, grey, square" and needs a lot of CSS.
- GTK is LGPL. That is fine when dynamically linked, but it is a system dependency.
- There is an open SIGSEGV in the default Vulkan renderer on an RTX 5070 with Wayland (GTK #8364), so we would ship `GSK_RENDERER=ngl`.

**Worth watching: Blitz (Dioxus native).** It renders HTML/CSS natively with Stylo, Taffy, Parley and Vello. It could reuse the web renderer's markup and CSS custom properties for themes. But it is beta, its AccessKit support is feature-gated and of unknown depth, and its SVG support is unconfirmed.

## Driving it from outside (end-to-end tests on Wayland)

What was run on this machine:

- **The AT-SPI bus is up and enabled** (`org.a11y.Status IsEnabled = true`, `at-spi-bus-launcher` running). A separate process lists apps with system Python plus `gi.repository.Atspi`. No pip install is needed; run it with `/usr/bin/python3 -I`.
- **AccessKit's tree appears on that bus** for an eframe app. Roles and names match the UI. Use names, roles and `do_action`, not coordinates: AT-SPI has no global coordinates on Wayland (`accesskit_unix` docs: window position "only makes sense under X11").
- **egui inspection protocol** (eframe feature `inspection`, then `EGUI_INSPECTION=1`, or `host:port`):
  - It speaks TCP. The app sends the magic `eins` and a big-endian version; after that each message is a 4-byte big-endian length followed by a MessagePack body.
  - Requests are `GetTree`, `ApplyEvents`, `GetScreenshot`, `Resize` and `Settle`.
  - `ApplyEvents` replies only after a frame has applied the events, so the next `GetTree` sees the effect. That makes waits deterministic, with no sleeps.
  - The easy client is a small Rust test binary that depends on the `egui_inspection` crate for the types. A Bun/TypeScript client would have to hand-encode serde's MessagePack shapes of `egui::Event` and AccessKit types, which is brittle across egui versions.
  - The port is unauthenticated, so a feature flag keeps it out of release builds.
- **Screenshots:** `grim -g "x,y WxH"`, with geometry from `hyprctl clients -j`. The inspection `GetScreenshot` also works and needs no compositor tool.
- **Isolation:** `hyprctl output create headless NAME` adds a virtual output inside the live session, and launching with a `[workspace N silent]` rule puts the window on it without taking Mackenzie's focus.
  - On 0.56, dispatch is Lua: `hyprctl dispatch 'hl.dsp.exec_cmd("[workspace 2 silent] …")'`.
  - **Gotcha, seen first-hand:** a window on a headless output, or on a hidden special workspace, gets no frame callbacks. The egui app then stops painting, and AT-SPI clicks and inspection requests time out ("the app is not painting; bring its window to the foreground").
  - Running `grim -o NAME` in a loop during the test made the output produce frames, and both drivers then worked. A harness needs that, or something like it (a screencopy client attached to the output).
  - Remove the output afterwards with `hyprctl output remove NAME`.
  - Neither sway, cage nor weston is installed for a fully separate compositor.
- **Input injection:**
  - `wtype` is installed but keyboard-only, and it types into the focused window, so it is useless for an unfocused test window.
  - `ydotool` is not installed (AGPL, needs `ydotoold`). `/dev/uinput` is `crw-rw-rw-` here, so it would run without root.
  - Prefer AT-SPI actions or inspection `ApplyEvents`; both target a node, not a pixel.

## Toolkits

### egui / eframe

- **Release and licence:** 0.36.2 (2026-09-08). Releases since March: 0.34.0 (03-26), 0.35.0 (06-25), 0.36.0 (08-05). MIT/Apache-2.0. Led by Emil Ernerfeldt and sponsored by Rerun.
- **Dynamic tree:** excellent (immediate mode, see above).
- **Theming:** `Style`/`Visuals` are global, with per-widget style since 0.34. `Ui` classes since 0.35 work only for custom widgets so far.
- **Text:** skrifa + vello_cpu rasterising since 0.34, harfrust shaping since 0.35. Bidi and complex scripts **uncertain** (issue #3378 for cosmic-text is still open).
- **Layout:** immediate, cursor-based; `Grid`, `egui_extras` `TableBuilder`/`StripBuilder`.
- **Custom drawing:** `Painter`. Ecosystem: egui_plot 0.37, egui_graphs 0.32, egui-snarl 0.12.
- **Long lists:** `ScrollArea::show_rows`; `TableBuilder` virtualises rows.
- **Wayland and NVIDIA:**
  - wgpu has been the default since 0.34, with glow available.
  - Open: #8416 (frame-acquire timeout freeze on Wayland), #7561 (hybrid graphics freeze), and #3962 (SIGSEGV at exit on Hyprland + NVIDIA, filed on 0.29; its last comment says wgpu is fine).
  - Closed: #8134 (Wayland redraw scheduling, fixed in 0.34).
  - Probe on this machine: ran fine, 220–490 ms to first frame.
- **Accessibility:** AccessKit on by default. It reached AT-SPI here and a click action worked (see above). 0.34 exposed scroll bars and splitters; 0.35 exposed the pressed state.
- **Outside driving:**
  - AT-SPI, the `inspection` port, and `egui_mcp` (an MCP server on the same protocol, in `rerun-io/kittest_inspector`).
  - `egui_kittest` is in-process, so it doesn't count here.
- **Size and startup:** 19–20 MB stripped (wgpu + accesskit + inspection); first frame 220–490 ms (both measured locally).

### iced (and libcosmic)

- **Release and licence:** 0.14.0 (2025-12-07), after 0.13 in Sept 2024, so about one release a year. `master` is 0.15-dev and active. MIT. Led by Héctor Ramón (funding **uncertain**).
- **Dynamic tree:** good. Elm-style `view()` rebuilds `Element`s every update; 0.14 added reactive rendering.
- **Theming:** `Theme` + `Palette` + per-widget `Catalog`/`Style` closures. Swapping the `Theme` restyles the built-in widgets.
- **Text:** cosmic-text shaping.
- **Layout:** row/column/grid/wrap, plus `table` in 0.14.
- **Custom drawing:** `canvas`.
- **Long lists:** no built-in virtual list (only culling in row/column), **uncertain** at a few hundred rows.
- **Wayland and NVIDIA:** open #3496, a window frozen on Wayland after minimise (2026-10-09, next frame scheduled minutes ahead via `wp_commit_timer_v1`). That bug is bad for a dashboard left open.
- **Accessibility: none upstream.** #552 open; draft AccessKit PR #3111 covers Button and Text only and was tested on macOS. So **AT-SPI cannot drive an iced window today**, and `iced_test` is in-process. That fails our testing rule on its own.
- **libcosmic:**
  - MPL-2.0. It vendors its own iced fork, isn't on crates.io (git only) and is Wayland-first.
  - It has an `a11y` feature, but text inputs emit no a11y nodes (libcosmic #1429).
  - Theming is tied to COSMIC config, a poor fit for per-product themes.

### Slint

- **Release:** 1.18.1 (2026-09-21), a minor every 2–3 months. Maintained by SixtyFPS GmbH.
- **Licence is the cost:**
  - It is a choice of GPLv3, Royalty-free 2.0 or commercial.
  - Royalty-free requires attribution (an `AboutSlint` widget or a "Made with Slint" badge). It allows use only "as part of" an application and **does not allow distributing it standalone or in an application that exposes Slint's APIs**.
  - So a reusable intui-native *library* on Slint would have to be GPLv3. That is a real cost for a library.
- **Dynamic tree:** poor fit.
  - `.slint` is statically typed. A runtime tree means either generating `.slint` source and recompiling with `slint-interpreter` (state lost on each recompile, compile cost **uncertain**), or fixed components fed from a flat model with `for`/`if`.
- **Theming:** a custom `global Theme` gives live restyling. Std-widget styles are fixed at compile time.
- **Text:** parley + swash + rustybuzz, good shaping.
- **Layout:** declarative layouts, `FlexboxLayout` since 1.18.
- **Custom drawing:** `Path` element; no charts.
- **Long lists:** `ListView` instantiates only visible rows. Open #11931: laggy ScrollView with wrapped text on winit.
- **Wayland and NVIDIA:** old NVIDIA/Wayland bugs are closed (#4828, #1724, #5188); open #10912 (TextInput lag on Wayland).
- **Accessibility:** AccessKit through `accesskit_unix`.
- **Outside driving: the best of the lot.**
  - 1.17 added an embedded MCP server (`--features slint/mcp`, `SLINT_EMIT_DEBUG_INFO=1`, `SLINT_MCP_PORT`): JSON-RPC over HTTP, so plain `curl` works.
  - It can list windows, find elements by accessible label, click, drag, type, scroll and take screenshots.
  - Not run locally.
- **Size and startup:** no figures. The interpreter ships the compiler (**uncertain** size).

### gpui (Zed) + gpui-component

- **Release and licence:**
  - The `gpui` crate is Apache-2.0 (the Zed repo as a whole mixes GPL/AGPL, so depend on the crate only).
  - crates.io 0.2.2 dates from 2025-10-22, a year behind Zed main.
  - Main split Linux into `gpui_linux`/`gpui_wgpu`/`gpui_platform`.
  - gpui-component pins third-party `gpui-pre` snapshots (=0.3.9) because newer snapshots broke it.
  - Pre-1.0 with frequent breaking changes.
- **Dynamic tree:** fine (entities plus `render`).
- **Lists:** `uniform_list` virtualises.
- **Layout:** Taffy (**uncertain**).
- **Text:** Zed's editor text stack.
- **Theming:** none in gpui itself; gpui-component has `Theme`/`ThemeColor` (depth **uncertain**).
- **Wayland and NVIDIA:** past NVIDIA freezes and crashes are closed (#39097, #35758); wgpu has replaced blade on Linux.
- **Accessibility:**
  - On Zed main: an AccessKit annotation API (PR #54398, April 2026) through `accesskit_unix`, with an `a11y` example. Only annotated elements are exposed.
  - **Uncertain** whether any published crate has it.
- **Size:** gpui-component's own shell is 78–106 MB on Linux. Too heavy, too unstable.

### Xilem / Masonry (Linebender)

- **Release and licence:** 0.4.0 (2025-10-29), with no release since (about 11 months). Its own notes say "alpha-quality software"; the README says "experimental". Apache-2.0.
- **Stack:** Vello, Parley and AccessKit, all good.
- **Widgets:** tables, charts and virtual lists would all be ours to build.
- **Size and startup:** **uncertain**.
- **Verdict:** not ready.

### Freya

- **Release and licence:** stable 0.4.3 (2026-08-30); 0.5.0-rc.10 (2026-10-11), and the README points at the rc. MIT, single maintainer.
- **Stack:** Skia rendering, its own `torin` layout.
- **Widgets:** a virtual scroll view, a plotters backend, a path element, per-component theme structs (one-swap depth **uncertain**).
- **Accessibility:** AccessKit on by default. AT-SPI on Wayland is **uncertain**; `freya-testing` is in-process.
- **NVIDIA and Wayland:** closed issues #2302 (segfault closing secondary windows on Wayland + Vulkan) and #2393 (wrong Vulkan GPU picked).
- **Verdict:** promising, but in an rc phase with a bus factor of one.

### Dioxus native / Blitz

- **Release and licence:** blitz-dom 0.3.0-beta.3 (2026-10-12); dioxus-native 0.8.0-alpha.1. The README says "beta". MIT/Apache-2.0.
- **Stack and CSS:** Stylo CSS, Taffy (flex, grid, partial table), Parley, Vello. CSS variables are listed as supported (**uncertain** in practice).
- **Accessibility:** AccessKit optional in blitz-shell (depth **uncertain**).
- **Fit:** attractive, because IntUI kinds map to HTML/CSS and themes would be CSS custom properties shared with the web renderer. Too young today.

### gtk4-rs (+ relm4)

- **Release and licence:** gtk4-rs 0.11.5 (2026-09-20, MIT) on GTK 4.24.1 (2026-10-01, LGPL-2.1+; dynamic linking leaves our code free). relm4 0.11.0 (Apache-2.0).
- **Dynamic tree:**
  - It is retained: build widgets imperatively from JSON and reconcile on change.
  - relm4's macros suit static UIs, so plain gtk4-rs is the better base here.
- **Theming:** CSS providers with `@define-color`, the deepest of the lot.
- **Text:** Pango/HarfBuzz, the best.
- **Lists:** `ListView`/`ColumnView` virtualise.
- **Custom drawing:** `DrawingArea` (Cairo) or `Snapshot`.
- **Wayland and NVIDIA:**
  - Open #8364: the Vulkan renderer segfaults in `libnvidia-glcore` on an RTX 5070, Wayland, driver 610 (2 of 3 runs). Also open: #8395 (glyph top rows clipped), #8208 (tearing), #8056 (EGL crash).
  - Workaround: `GSK_RENDERER=ngl`.
- **Accessibility:**
  - Native AT-SPI, the most mature here. `GTK_A11Y=accesskit` is available since 4.19.
  - AT-SPI pointer support on Wayland is still open (at-spi2-core #239), so drive it with actions, not pointer moves.

### Others considered

- **Vizia** 0.4.0 (2026-04-23, MIT): Skia rendering, CSS-like stylesheets, AccessKit. A good theming and a11y story; runtime-tree ergonomics **uncertain**. The best of the rest if egui disappoints.
- **Makepad** 1.0.0 (2025-05-13): no accessibility.
- **Floem** 0.2.0 (2024-11-14): stale, no accessibility.

## Getting core's types into Rust without drift

**Core already emits JSON Schema.**

- `Catalog.jsonSchema()` in `packages/core/src/catalog.ts` calls Zod 4's `z.toJSONSchema` (draft 2020-12, `io: "input"`).
- `site/build.ts` uses `core.writableBy("model").jsonSchema()` for the tool input schema.
- The native renderer must use the **full** `core.jsonSchema()`, which includes the code-only kinds (Stat, Chart, Flow, Table).
- `IntuiEvent` (what the window sends back on a button press) has a Zod schema in `event.ts` but no JSON Schema export yet, so it needs one too.

**Generators, tried on the real schema:**

- **typify 0.8.0** (Oxide, Apache-2.0, released 2026-09-09; regular releases since 2025-10). This is the one to use.
  - The node union came out right: `#[serde(tag = "type", deny_unknown_fields)] enum` with one variant per kind and only that kind's fields. It handled recursion (`Group.children: Vec<Node>`) and turned Zod defaults into `#[serde(default = …)]`. Constrained strings (`minLength`, `maxLength`) became validating newtypes, so wire data is parsed at the boundary into types that can't be invalid.
  - Two problems in core's current output:
    1. **Names.** Zod names the recursive node `__schema0` and nothing has an id, so every type is called `Schema0…`. Fix: give the node, Reading and the shared shapes ids (`.meta({ id: "Node" })` / a registry); Zod extracts anything with an id into `$defs` under that name.
    2. **Reading is generated wrong, silently.** Reading's JSON Schema is hand-written in `reading.ts` as an `anyOf` of a number and four objects whose `kind` has `const` but no `"type": "string"`. typify turned that into an **untagged enum of four look-alike variants with `kind: serde_json::Value`**. So `{"kind":"atLeast","value":3}` deserialises as the first variant, and the drift happens without an error. It was also duplicated three times (Stat value, Stat change, chart y).
    - Restating the same accepted set as `anyOf: [{type: number}, {$ref: ReadingObject}]`, where `ReadingObject` is a `oneOf` of objects with `"kind": {"type":"string","const":…}`, made typify produce exactly the union-per-state shape IntUI wants:
      ```rust
      enum Reading { Number(f64), ReadingObject(ReadingObject) }
      #[serde(tag = "kind", content = "value")]
      enum ReadingObject { Exact(f64), AtLeast(f64), Estimate(f64), Unknown }
      ```
    - This changes the emitted schema's form, not which trees parse, so the additive-only rule still holds. The model's tool schema changes shape, though, so the plugin conformance run should cover it.
  - Known typify limits (its README): `anyOf` modelling is "imprecise", `allOf` can duplicate fields, and numeric bounds aren't enforced. IntUI's schema uses `oneOf`, `const` and a single `anyOf`, all of which now work.
- **quicktype 23.2.6**: rejected.
  - It crashed on the full schema (`s.codePointAt is not a function` under `bunx`; whether that's a Bun incompatibility is **uncertain**).
  - On Reading it merged the variants into `struct { kind: Kind, value: Option<f64> }`, exactly the optional-field shape IntUI forbids.
- **schemafy**: rejected. Last release 0.6.0 was on 2021-10-06, from the draft-04 era.
- **Rust-first generators** (ts-rs, specta, typeshare, schemars) go the wrong way: core's TypeScript is the source of truth.

**Answer:**

1. Core gets a `bun` script that writes `core.jsonSchema()` plus the event schema to a committed file (e.g. `packages/core/schema/intui.schema.json`), with ids on the shared shapes and typed `const` discriminators.
2. The Rust crate runs typify from `build.rs` (or `import_types!`) on that file, so the Rust types are regenerated on every build and can't fall behind the committed schema.
3. To catch drift between the TypeScript and the committed file, the end-to-end check runs the real native binary on every catalog kind's `example` and on old-tree fixtures, and it fails if the schema file is stale against `core`. That keeps to "drive the real program from outside" and catches the Reading kind of bug, which no type checker would.

## Sources

Local evidence (2026-10-14, this machine): the eframe 0.36.2 probe driven over AT-SPI (`gi.repository.Atspi`) and the `egui_inspection` protocol; `cargo typify` 0.8.0 and `bunx quicktype@23.2.6` on `core.jsonSchema()` output; the eframe and `egui_inspection` 0.36.2 sources in `~/.cargo/registry`.

- https://github.com/emilk/egui/releases
- https://github.com/emilk/egui/releases/tag/0.35.0
- https://github.com/emilk/egui/blob/main/CHANGELOG.md
- https://raw.githubusercontent.com/emilk/egui/main/crates/egui_inspection/README.md
- https://raw.githubusercontent.com/emilk/egui/main/crates/egui_inspection/src/protocol.rs
- https://github.com/emilk/egui/blob/main/crates/egui_kittest/README.md
- https://github.com/rerun-io/kittest_inspector
- https://github.com/emilk/egui/issues/8416
- https://github.com/emilk/egui/issues/7561
- https://github.com/emilk/egui/issues/3962
- https://github.com/emilk/egui/issues/8134
- https://github.com/emilk/egui/issues/7761
- https://github.com/emilk/egui/issues/3378
- https://github.com/rust-windowing/winit/issues/4668
- https://crates.io/crates/egui_plot
- https://github.com/iced-rs/iced/blob/master/CHANGELOG.md
- https://github.com/iced-rs/iced/issues/552
- https://github.com/iced-rs/iced/pull/3111
- https://github.com/iced-rs/iced/issues/3496
- https://github.com/pop-os/libcosmic
- https://github.com/pop-os/libcosmic/issues/1429
- https://github.com/slint-ui/slint/releases
- https://github.com/slint-ui/slint/blob/master/LICENSE.md
- https://github.com/slint-ui/slint/blob/master/LICENSES/LicenseRef-Slint-Royalty-free-2.0.md
- https://docs.rs/slint-interpreter/latest/slint_interpreter/
- https://raw.githubusercontent.com/slint-ui/slint/master/internal/backends/testing/README.md
- https://github.com/slint-ui/slint/blob/master/internal/backends/winit/Cargo.toml
- https://docs.slint.dev/latest/docs/slint/reference/std-widgets/views/listview/
- https://github.com/slint-ui/slint/issues/11931
- https://github.com/slint-ui/slint/issues/10912
- https://github.com/slint-ui/slint/issues/4828
- https://github.com/zed-industries/zed/blob/main/crates/gpui/README.md
- https://github.com/zed-industries/zed/blob/main/crates/gpui_linux/Cargo.toml
- https://github.com/zed-industries/zed/pull/54398
- https://github.com/zed-industries/zed/issues/39097
- https://github.com/longbridge/gpui-component/blob/main/Cargo.toml
- https://crates.io/crates/gpui
- https://github.com/linebender/xilem
- https://github.com/linebender/xilem/releases
- https://github.com/marc2332/freya
- https://github.com/marc2332/freya/issues/2302
- https://github.com/marc2332/freya/blob/main/crates/freya-testing/src/lib.rs
- https://github.com/DioxusLabs/blitz
- https://blitz.is/status/css
- https://crates.io/api/v1/crates/blitz-dom
- https://github.com/vizia/vizia
- https://github.com/makepad/makepad
- https://github.com/lapce/floem
- https://github.com/gtk-rs/gtk4-rs/releases
- https://gitlab.gnome.org/GNOME/gtk/-/raw/main/NEWS
- https://gitlab.gnome.org/GNOME/gtk/-/issues/8364
- https://docs.gtk.org/gtk4/running.html
- https://gitlab.gnome.org/GNOME/at-spi2-core/-/work_items/239
- https://github.com/Relm4/Relm4
- https://github.com/AccessKit/accesskit
- https://github.com/AccessKit/accesskit/issues/633
- https://docs.rs/accesskit_unix/0.24.0/accesskit_unix/struct.Adapter.html
- https://wiki.hypr.land/0.56.0/Configuring/Advanced-and-Cool/Using-hyprctl/
- https://github.com/emersion/grim
- https://github.com/ReimuNotMoe/ydotool
- https://github.com/atx/wtype
- https://github.com/oxidecomputer/typify
- https://github.com/oxidecomputer/typify/blob/main/CHANGELOG.adoc
- https://crates.io/api/v1/crates/schemafy
- https://zod.dev/json-schema

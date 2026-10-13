# IntUI: hand-off

## ▶ Resume here (2026-10-13, 16:15)
The session ended because the usage gate is the real budget. Mackenzie (16:13): "it means i'm spinning too many plates. I think my weekly pace budget is legitimately 2 agents with subagents, sadly." Check `python3 ~/GameDevAssets/command-hub/usage_gate.py` before every launch, and follow it as it prints.

1. **Waiting on Mackenzie:** proposals 002 (visible time, `docs/design/002-time.html`, hub #1449) and 003 (refusals a model can act on, `docs/design/003-refusals.html`, #1451). Each has assumptions at the bottom for them to accept or reject. Build only after their review; each is one `intui-builder` lane.
2. **In review, lead-built, never reviewed:** #8 (eval runner records replies; not run, because running it calls headless Claude and needs Mackenzie's yes), #1452 (Flow skip-layer links), #1450 (code blocks), #1442 (`page.css` shell). When the gate says LAUNCH, send one `intui-qa` per ticket, one at a time, then close.
3. command-hub will message when the Act/Work recording and `hub task context` land. Use them from then on.

## How lanes run here
- Role agents `intui-builder` and `intui-qa` (`.claude/agents/`, linked into `~/.claude/agents/`) hold the fixed half of every brief. A brief carries only the ticket's specifics: the behaviour, the files, the code to reuse, one riskiest assumption to check first, and the named e2e checks.
- Before a launch, seal a prediction: `hub predict seal agent-run ticket:<id> <claim.json> --as intui`, with sealed files in `~/.local/share/command-hub/sealed/`. Record runs with `session=agent-<id>` so the hub prices them. Sharpen predictions from what was misjudged; never widen ranges to score a hit (Mackenzie's rule). The log is in `docs/agents/experiments.md`.
- The lead looks at a render before closing anything visual. A screenshot caught the floor-bar bug that every check had missed.
- Design pages: one self-contained HTML file in `docs/design/`, drawn with IntUI and `page.css`, opened with `xdg-open`.

## What exists (new today)
- Tests are end-to-end only: `bun run test` runs the browser suite (`packages/web/e2e`, 26 checks) and Claude Code's engine (`packages/claude-code/conformance`, 59 checks).
- `Reading` (proposal 001, `proposals/001-certainty/`): Stat values, changes and chart points can be exact, atLeast, estimate or unknown. A bare number is exact, and exact values are written back out as bare numbers.
- `@intui/web/page.css`: a shell for pages made only of trees.

## Decisions (Mackenzie, verbatim, 2026-10-13)
- 14:57, on readings: "Oh, yea, this is a no brainer - especially seeing it in the text form that you read. You need exactly that feature."
- 15:03: "Classic production code - everything may be missing." Use union types, one variant per state. 15:13: one-key objects can't grow ("what if they want to indicate a standard deviation? A p-value?"). 15:17: "Yea, I like this model, send it".
- Live trees versus snapshots is still undecided. Don't build Query or `$state` into core.

## Open (hub)
#2, #4–#7, and #9 (round Flow corners; probably paint, so check another terminal first), #10, plus #11 and #13 (parked on Mackenzie). From research-chat: a Claim kind (prediction or assumption with a resolver; may pass the rule of two), cross-session read-back, being found from other repos, product extensions as adapter plus registry, and keeping `Choice` from becoming the pick-one menu Mackenzie has banned. Notes: `~/dev/claude/notes/2026-10-13-intui-agent-ux.md`.

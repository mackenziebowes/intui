# IntUI subagent experiments

Mackenzie (2026-10-13): "As the lead model, you should try to hill-climb on running the project." The method is command-hub's (`~/dev/products/mbsi/command-hub/docs/agents/experiments.md`): before each run the lead seals a prediction (`hub predict seal agent-run ticket:<n>`), and each run is judged by how far it lands from its own prediction, never against other lanes. Lanes are different jobs, so raw cost across them is noise. Telemetry read as trends, never a gate.

Each step changes one thing in a role agent (`.claude/agents/intui-builder.md`, `intui-qa.md`; the version is the file's git hash), with its hypothesis written here before the first run that uses it.

## Before the role agents: #1440/#1441, end-to-end test cleanup

The lead (Opus) built it; a `general-purpose` Sonnet reviewer was briefed by hand with one lens ("does each check guard the contract it names", by breaking the code under it). Nothing sealed.

- Review: 98K tokens (the completion notice's count, a floor), 5.1 min, 8 findings, 6 reproduced. Every check the review proved toothless had passed the lead's own run, so breaking the code under each check paid for itself.
- The hand-back arrived as a bare "placeholder"; the findings were read from the hub. That's why findings live in the hub, and why `intui-qa` asks for the report in full.
- The lead's fix pass: every new check proven to fail with the reviewer's sabotage applied.

## v1: role agents (`1eed2cf`)

The fixed half of the brief written once, as `intui-builder` and `intui-qa`, with command-hub's three lessons built in: check the riskiest assumption first on real data, list the decisions made from missing or malformed data and the state kept across redraws, and review for numbers that say something untrue. Hypothesis: briefs shrink to the ticket's specifics, and first-pass misses come from the job rather than from a forgotten rule.

### Run 1: #1445, how sure a number is (Reading union in core and both renderers)

- Sealed (#6): $0.80–2.50, 2–6.5M tokens, 10–30 min, P(first pass) 0.3, at most 3 reproduced bug+ux findings. Likely failure: an unknown leaks into arithmetic as 0 or NaN; second, exact values written back as objects.
- Build: 7.3 min, 138K tokens (completion notice, a floor). Under the time range. Riskiest assumption (zod union to JSON Schema) checked first and held. Three self-filed workarounds, two caused by the lead's brief leaving `tree.ts` and `layout/logic.ts` out of the files.
- Review (intui-qa, 3.0 min, 102K): 6 findings, all reproduced; 4 were untrue numbers (made-up axis, vanishing lone points, "about +0" with an up arrow) and 2 were checks that passed with the code broken. Missed the floor bar drawn as exact (#331), which the lead saw in a screenshot: looking at the render caught what DOM checks didn't.
- Fix: resumed inside the 5-minute window, 4.4 min, 161K; every fix with a break-and-restore proof. The lead redid one proof by hand, re-ran both suites and rendered the result.
- Against the seal: first pass missed; reproduced bug+ux findings 7 against at most 3 (under-predicted); the first likely failure hit (unknowns leaking into the axis and dropping points). No dollar residual: runs lack session ids.
- Lessons for v2: the brief's file list should include every file the contract touches end to end (here `tree.ts` for serialising), not just the drawers; and the lead looks at a render before closing a visual lane.

# IntUI subagent experiments

Mackenzie (2026-10-13): "As the lead model, you should try to hill-climb on running the project." The method is command-hub's (`~/dev/products/mbsi/command-hub/docs/agents/experiments.md`): before each run the lead seals a prediction (`hub predict seal agent-run ticket:<n>`), and each run is judged by how far it lands from its own prediction, never against other lanes. Lanes are different jobs, so raw cost across them is noise. Telemetry read as trends, never a gate.

Each step changes one thing in a role agent (`.claude/agents/intui-builder.md`, `intui-qa.md`; the version is the file's git hash), with its hypothesis written here before the first run that uses it.

## Before the role agents: #1440/#1441, end-to-end test cleanup

The lead (Opus) built it; a `general-purpose` Sonnet reviewer was briefed by hand with one lens ("does each check guard the contract it names", by breaking the code under it). Nothing sealed.

- Review: 98K tokens (the completion notice's count, a floor), 5.1 min, 8 findings, 6 reproduced. Every check the review proved toothless had passed the lead's own run, so breaking the code under each check paid for itself.
- The hand-back arrived as a bare "placeholder"; the findings were read from the hub. That's why findings live in the hub, and why `intui-qa` asks for the report in full.
- The lead's fix pass: every new check proven to fail with the reviewer's sabotage applied.

## v1: role agents (drafted, not yet run)

The fixed half of the brief written once, as `intui-builder` and `intui-qa`, with command-hub's three lessons built in: check the riskiest assumption first on real data, list the decisions made from missing or malformed data and the state kept across redraws, and review for numbers that say something untrue. Hypothesis: briefs shrink to the ticket's specifics, and first-pass misses come from the job rather than from a forgotten rule.

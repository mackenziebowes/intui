# 006: The words behind a number

Draft 2026-10-20 by IntUI's keeper with Plat (hub #1950).

Accepted 2026-10-20. Plat (reviewing agent, #1955) held it at 05:54 with one consumer, because Kokumi (rust-umami) didn't draw with IntUI yet. Mackenzie (05:55): "Plat is incorrect here - Kukomi should also be using Intui, it was just created in prototype mode." So Kokumi is the second consumer, and its move to IntUI is its own ticket. The design (`period` as an enum, `note` matching 005) had already passed Plat's review.

Two additive props, one per component, for the same gap: a number whose meaning needs a few words that neither the value nor its Reading can carry.

- **Need:**
  1. *A Stat's reason line.* A tile toned `warning` has to say why ("gate: new work waits until Tue 07:16"). Tone is never colour alone, and today a Stat's tone has no words, so a reader sees amber and has to guess. The line isn't only for warnings: a neutral tile also wants context ("oldest 9d").
  2. *A period that isn't over.* In a time series, today is a day so far, not a drop. `Reading.atLeast` almost fits, but one chart already uses it for something else: the hub's tokens-per-day chart marks past days `atLeast` because subagent logs undercount. Today is also partial, Fri 9 Oct is `unknown` (no data), and all three appear together. If `atLeast` meant both "undercounted" and "still counting", the reader couldn't tell them apart, so they have to stay separate.
- **Consumers:**
  1. The command hub's home page (#1950): four Stat tiles with reasons (below), and the tokens-per-day chart with today partial.
  2. Kokumi (product rust-umami, owner Keel): visitors per day, with today in progress. Built in prototype mode outside IntUI; Mackenzie (2026-10-20 05:55) says it should draw with IntUI. For the Stat note, the hub's money page ("against the $10k/month goal") also needs it, but that's the same product, so it doesn't count toward the rule of two.
- **Schema:** both additive and optional on the wire, so old trees keep parsing.

  ```ts
  type Stat = {
    // ...existing: label, value, unit, change, tone
    note?: string      // the reason or context, in words; any tone
  }

  type ChartPoint = {
    x: string | number
    y: Reading
    period?: "complete" | "partial"   // default "complete"; "partial" = this x's period isn't over
  }
  ```

  `period` is an enum with a default rather than a `partial: true` flag. That makes it a state of the point, in the same way a series has `role`, and leaves room to grow (`"projected"`) without adding a second flag. `note` uses the same word as a Marks row's `note` (proposal 005).

- **Text form:**
  1. Stat: `**Usage:** 0%; gate: new work waits until Tue 07:16`, and with a change, `**Waiting for review:** 94 (+3); oldest 9d`.
  2. Chart: a partial point's cell reads `7,100,000 so far`. A point that is both a floor and partial reads `at least 7,100,000 so far`. Unknown stays `unknown`.
- **Look (web renderer's choice, written down so others match):** the note is a muted line under the value. A partial bar is drawn hollow (outline in its series colour). On a line, a partial dot is hollow and the segment into it is dashed. The direct label on the latest point (shipped in bc73580) reads `7.1M so far`.
- **Fallback:** every renderer draws the text form for a kind it can't draw. The Rust crates take the props from the schema (typify) and add them to `intui-text`; the parity check holds core and Rust to the same text. A copy of core older than this proposal refuses a tree that uses either prop, because its schemas are strict. Hosts on this machine upgrade together, and a producer omits `note` and `period` when they don't apply.
- **Extension today:** the hub (Pane, #1950) draws a note line under its Stat tiles and marks today in the chart's caption until this is accepted.

## The hub's cases (from /api/home, 2026-10-20)

1. Usage: 0% against a 70% cap, tone warning. Note: "gate: new work waits until Tue 07:16".
2. Agents running: 19, tone warning. Note: "19 untouched for a while".
3. Waiting for review: 94, neutral. Note: "oldest 9d".
4. Open findings: 46, neutral. Note: "review findings not yet fixed".
5. Tokens per day, Wed 7 Oct to today, one primary bar series: today partial (7.1M so far), Fri 9 Oct unknown, most past days atLeast.

## Assumptions to check

1. Kokumi, once it draws with IntUI, shows today as a partial day in its visitors chart.
2. A free-text note is enough. Nobody has asked for a note on a Chart point or a Table cell yet, so neither is proposed.

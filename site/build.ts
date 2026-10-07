/**
 * Builds the docs site into site/dist. The component reference comes from the
 * core catalog, so it always matches the code.
 */
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { core, Tree, VERSION, type ComponentKind } from "../packages/core/src";

const DIST = join(import.meta.dir, "dist");
const DOMAIN = "intui.mackenziebowes.com";
const REPO = "https://github.com/mackenziebowes/intui";

const escape = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function component(kind: ComponentKind): string {
  const tree = Tree.of(kind.example);
  const writer =
    kind.writer === "code"
      ? `<span class="tag code" title="Shows numbers, so only code may build it">built by code</span>`
      : `<span class="tag anyone" title="The model may write it directly">model or code</span>`;
  return `
  <article class="component" id="${kind.type.toLowerCase()}">
    <header><h3>${kind.type}</h3>${writer}</header>
    <p>${escape(kind.summary)}</p>
    <div class="pair">
      <figure><figcaption>Tree</figcaption><pre><code>${escape(JSON.stringify(kind.example, null, 2))}</code></pre></figure>
      <figure><figcaption>Text form</figcaption><pre class="text"><code>${escape(tree.toText())}</code></pre></figure>
    </div>
  </article>`;
}

const toc = core.kinds.map((kind) => `<a href="#${kind.type.toLowerCase()}">${kind.type}</a>`).join("");

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>IntUI</title>
<meta name="description" content="Interactive answers from agents, drawn on any surface.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%23161a1f'/><path d='M9 22V10m7 12V14m7 8v-5' stroke='%2345d0a0' stroke-width='3' stroke-linecap='round'/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;550;700&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <section class="hero">
    <p class="eyebrow">@intui/core · protocol v${VERSION}</p>
    <h1>IntUI</h1>
    <p class="lede">Interactive answers from agents, drawn on any surface.</p>
    <p>An agent answers with a <strong>component tree</strong> (charts, tables, flows, buttons, forms) instead of only text. A renderer for each surface draws it: a terminal, a web page, an email, later native apps. Every tree also has a Markdown <strong>text form</strong>, so the model can read back what it showed, and every surface has a fallback.</p>
    <p class="links"><a href="${REPO}">GitHub</a><a href="#components">Components</a><a href="#rules">Rules for core</a></p>
  </section>

  <section>
    <h2>How it fits together</h2>
    <pre class="diagram"><code>tool call ──► Tree.parse ──► component tree ──► renderer: Claude Code
 or code       (validate,     (Chart, Table,     ├─► renderer: web
 Tree.of        check who      Flow, Choice…)    ├─► renderer: email
                wrote it)            │           └─► later: Swift, Kotlin
                                     └──► toText(): what the model reads back</code></pre>
    <ul class="points">
      <li><strong>Numbers come from code.</strong> <code>Chart</code> and <code>Stat</code> are built by code from a query, never typed by the model. The model calls a tool that returns them.</li>
      <li><strong>Interaction loops back.</strong> Pressing a <code>Choice</code> or submitting a <code>Form</code> sends an <code>IntuiEvent</code> to the agent, naming the tree it came from.</li>
      <li><strong>Errors are written for the model.</strong> A bad tree is refused with every problem, its path and what to do, so one retry can fix them all.</li>
      <li><strong>Trees are versioned.</strong> Every tree carries <code>"v": ${VERSION}</code>. Changes are additive, so trees in old transcripts and emails keep working.</li>
    </ul>
  </section>

  <section>
    <h2>Use it</h2>
    <pre><code>import { Tree, IntuiEvent, core } from "@intui/core";

// A tool's input schema: only what the model may write.
const inputSchema = core.writableBy("model").jsonSchema();

// Validate what the model sent. Throws IntuiError listing every problem.
const tree = Tree.parse(input, { author: "model" });

tree.toText();   // Markdown, returned as the tool result

// When the person presses a button:
const event = IntuiEvent.press(toolUseId, "next", "park");
tree.verify(event);
tree.describe(event);   // 'Pressed "Park" in next (from toolu_1).'</code></pre>
    <p class="note">Not on npm yet. For now, clone <a href="${REPO}">the repo</a>.</p>
  </section>

  <section id="components">
    <h2>Components</h2>
    <nav class="toc">${toc}</nav>
    ${core.kinds.map(component).join("\n")}
  </section>

  <section id="rules">
    <h2>Rules for core</h2>
    <p>Agents add to IntUI while working on specific products. These rules keep core general.</p>
    <ul class="points">
      <li><strong>Rule of two.</strong> A component or prop enters core only when two unrelated products need it. Until then it lives in the product, built from core pieces.</li>
      <li><strong>No domain words.</strong> <code>series</code>, <code>tone</code>, <code>annotation</code>: yes. <code>pageviews</code>, <code>client</code>, <code>deal</code>: no.</li>
      <li><strong>Meaning, not looks.</strong> <code>tone: "warning"</code> and <code>role: "baseline"</code>, never colors or dash styles. Each renderer decides the look.</li>
      <li><strong>Every component has a text form</strong> carrying the same information.</li>
      <li><strong>Changes go through a proposal</strong> in <a href="${REPO}/tree/main/proposals"><code>proposals/</code></a>.</li>
    </ul>
  </section>

  <section>
    <h2>Roadmap</h2>
    <ol class="roadmap">
      <li class="done">Core: schemas, text forms, events.</li>
      <li>Claude Code plugin: a <code>show</code> tool that draws trees in the transcript.</li>
      <li>Web renderer, responsive from phone to desktop.</li>
      <li>The same tree drawn in Claude Code and on the web, with working buttons.</li>
      <li>Email renderer.</li>
    </ol>
  </section>
</main>
<footer><a href="${REPO}">GitHub</a> · MIT · by <a href="https://mackenziebowes.com">Mackenzie Bowes</a></footer>
</body>
</html>
`;

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await Bun.write(join(DIST, "index.html"), page);
await Bun.write(join(DIST, "style.css"), Bun.file(join(import.meta.dir, "style.css")));
await Bun.write(join(DIST, "CNAME"), `${DOMAIN}\n`);
console.log(`built ${DIST}`);

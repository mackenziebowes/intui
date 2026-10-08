# Returning a tree from a tool

The model may not write a Chart or Stat into `show`: numbers come from code. A tool that ran a query returns them instead, and this plugin draws what comes back. Any tool can do it: another plugin's, or an MCP server's (a future `hub mcp`).

## The envelope

The result carries `{ "intui": { "v": 1, "root": <component> } }`, the same tree `show` takes. The plugin finds it in any of these places, first match wins:

1. the result object itself (a plugin tool's `result`)
2. `structuredContent` (an MCP result)
3. a `content` text block, or the whole result, holding that object as JSON text

It is parsed as code's (`author: "code"`), so Chart and Stat are allowed. A result with no `intui` key, a wrong `v`, or any invalid node is not drawn by IntUI: the engine draws the tool's own result as it would anyway. The row shows the tool's result only; the model's own `show` input is never read this way.

## Two paths

**An MCP server's tool** (real MCP, e.g. a future `hub mcp`) returns an MCP result. The model reads the text block; IntUI draws `structuredContent`:

```ts
const tree = Tree.of(root)            // @intui/core; Tree.of builds a code-written tree
return {
  content: [{ type: 'text', text: tree.toText() }],       // the model reads this
  structuredContent: { intui: tree.toJSON() },            // IntUI draws this
}
```

If the server can't set `structuredContent`, return the envelope as the JSON text of one content block; the model then reads the JSON, which is correct but wordier. `mcpResult(root)` in `src/envelope.ts` builds the first form.

**A plugin tool** (`$.tool.register`) may only answer with a string, an array of content blocks or undefined; the engine refuses an object ("does not match its output shape"). So it returns `tree.toText()` as the string, which is what the model reads, and keeps the tree in plugin state under the call's `tool_use_id` (`trees` in `types/index.d.ts`, capped at 50). The `ToolResult` hook draws from that state first and falls back to reading `output` for the MCP path. See the `tool.call` hook and `demo_chart` in `src/register.tsx`.

## Checking it

- `mcp__intui__demo_chart` is a demo tool that returns a Chart and a Stat from fixed sample data. Ask for it to see the path work end to end.
- Code-written trees are logged (component shapes and the tool name, never content) marked `author: "code"`; `/intui` reports them apart from `show` calls.

## Engine facts this relies on

- `ui.render` matchers take string literals, so the hook matches `{ component: 'ToolResult' }` for every tool and checks `props.output` inside; `next(e)` hands anything else to the engine.
- `ToolResult.output` is the tool's own result object, "the same one `ToolUse.output` carries"; the types don't fix its shape for plugin or MCP tools, hence the several places searched above. Conformance mounts one tree holding every component from a tool result on each surface; the envelope shapes are unit tests in `test/envelope.test.ts`.
- Known gap: the plugin test kit does not check a tool result's shape against the engine's output schema (an object result passed the kit and failed live). Conformance asserts the allowed shapes itself for the demo tool, but a new plugin tool needs the same assertion.

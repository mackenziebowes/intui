/**
 * How a tree travels in a tool result: finds the `{ intui: { v, root } }` envelope in
 * whatever shape the result arrived in, and builds the MCP result that carries one. The
 * tree is parsed as code's, because it comes from a tool; a model-written `show` call
 * never passes through here. A result with no envelope or an invalid one yields no tree.
 */
import { Tree, type Node } from '@intui/core'

/** Trees kept in plugin state for plugin tools, newest last. */
export const MAX_TREES = 50

/** The key a tool result carries a tree under: `{ "intui": { "v": 1, "root": ... } }`. See TOOLS.md. */
export const ENVELOPE_KEY = 'intui'

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)

/** Parses text as JSON, or undefined when it is not. */
function json(text: string): unknown {
  const trimmed = text.trim()
  if (!trimmed.startsWith('{')) return undefined
  try {
    return JSON.parse(trimmed)
  } catch {
    return undefined
  }
}

/**
 * Where an envelope can sit in a result, in the order tried. A plugin tool's
 * result is whatever its hook returned; an MCP tool's is `{ content, structuredContent }`.
 * Both may be a JSON string, and a content block's text may be one too.
 */
function candidates(output: unknown): unknown[] {
  if (typeof output === 'string') return [json(output)]
  if (Array.isArray(output)) return output.flatMap(candidates)
  if (!isRecord(output)) return []
  if (output.type === 'text' && typeof output.text === 'string') return [json(output.text)]
  const blocks = Array.isArray(output.content) ? output.content : []
  return [output, output.structuredContent, ...blocks.flatMap(candidates)]
}

/**
 * The tree a tool result carries, or undefined when it carries none or the
 * tree is invalid. Parsed as code's (`author: "code"`), so Chart and Stat are allowed.
 * This trusts the tool, never the model: a model-written `show` call never comes through here.
 */
export function treeFromOutput(output: unknown): Tree | undefined {
  for (const candidate of candidates(output)) {
    if (!isRecord(candidate) || !(ENVELOPE_KEY in candidate)) continue
    try {
      return Tree.parse(candidate[ENVELOPE_KEY], { author: 'code' })
    } catch {
      return undefined
    }
  }
  return undefined
}

/**
 * What an MCP server returns for a tree: the model reads `content` (the tree's
 * text form), IntUI draws `structuredContent`. A plugin tool can't: its result
 * must be a string, so it returns `tree.toText()` and keeps the tree in state.
 */
export function mcpResult(root: Node) {
  const tree = Tree.of(root)
  return { content: [{ type: 'text' as const, text: tree.toText() }], structuredContent: { [ENVELOPE_KEY]: tree.toJSON() }, isError: false }
}

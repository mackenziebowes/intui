/**
 * Asks core whether an event line a window printed is one it accepts, and whether it fits the tree that was shown.
 * Reads `{ tree, event }` (both JSON text) on stdin and prints `ok`, or core's own refusal on stderr and exits 1.
 */
import { IntuiEvent, Tree } from "../../../packages/core/src/index";

const { tree, event }: { tree: string; event: string } = JSON.parse(await Bun.stdin.text());
try {
  const parsed = IntuiEvent.parse(JSON.parse(event));
  Tree.parse(JSON.parse(tree), { author: "code" }).verify(parsed);
  console.log("ok");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

/** Prints core's verdict on every tree: `{ accepted: [...names], refused: [{ name, json, words, message }] }`. */
import { Tree } from "../../../packages/core/src/index";
import { accepted, refusals } from "./trees";

const verdict = (json: string): { ok: true } | { ok: false; message: string } => {
  try {
    Tree.parse(JSON.parse(json));
    return { ok: true };
  } catch (error) {
    return { ok: false, message: (error as Error).message };
  }
};

console.log(
  JSON.stringify({
    accepted: accepted.map(({ name, json }) => ({ name, json, verdict: verdict(json) })),
    refused: refusals.map((tree) => ({ ...tree, verdict: verdict(tree.json) })),
  }),
);

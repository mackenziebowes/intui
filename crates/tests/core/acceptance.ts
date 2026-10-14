/** Prints core's verdict on every tree: `{ accepted: [{ name, json, symptom?, verdict }], refused: [{ name, json, words, symptom?, verdict }] }`. */
import { Tree } from "../../../packages/core/src/index";
import { accepted, refusals } from "./trees";

const verdict = (json: string): { ok: true } | { ok: false; message: string } => {
  try {
    Tree.parse(JSON.parse(json));
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : String(error) };
  }
};

console.log(
  JSON.stringify({
    accepted: accepted.map((tree) => ({ ...tree, verdict: verdict(tree.json) })),
    refused: refusals.map((tree) => ({ ...tree, verdict: verdict(tree.json) })),
  }),
);

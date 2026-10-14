/** Prints core's text form of every accepted tree: `[{ name, json, text }]`. */
import { Tree } from "../../../packages/core/src/index";
import { accepted } from "./trees";

console.log(JSON.stringify(accepted.map(({ name, json }) => ({ name, json, text: Tree.parse(JSON.parse(json)).toText() }))));

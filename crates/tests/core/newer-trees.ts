/** Prints the trees that hold a kind core has no component for, and whether core takes them (it must not). */
import { Tree } from "../../../packages/core/src/index";
import { newerTrees } from "./trees";

const accepts = (json: string) => {
  try {
    Tree.parse(JSON.parse(json));
    return true;
  } catch {
    return false;
  }
};

console.log(JSON.stringify(newerTrees.map((tree) => ({ ...tree, coreAccepts: accepts(tree.json) }))));

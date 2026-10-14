/**
 * Writes core's JSON Schemas to `packages/core/schema/`, the files other languages generate
 * their types from, so the TypeScript here stays the one definition. `--check` writes
 * nothing and exits 1, naming the file and the command to run, when a committed copy no
 * longer matches core. The committed schema gives the shape; `Tree.parse` gives the verdict,
 * including the cross-field rules a schema can't express.
 */
import { join } from "node:path";
import { core, IntuiEvent } from "./src";

const dir = join(import.meta.dir, "schema");
const command = "bun run schema";

const files = [
  { name: "intui.tree.schema.json", schema: core.jsonSchema() },
  { name: "intui.event.schema.json", schema: IntuiEvent.jsonSchema() },
].map(({ name, schema }) => ({ path: join(dir, name), name, text: `${JSON.stringify(schema, null, 2)}\n` }));

if (process.argv.includes("--check")) {
  let drifted = 0;
  for (const file of files) {
    const committed = (await Bun.file(file.path).exists()) ? await Bun.file(file.path).text() : null;
    if (committed === file.text) continue;
    drifted += 1;
    console.error(
      committed === null
        ? `packages/core/schema/${file.name} is missing. Core's schema has to be committed for other languages to generate types from; run \`${command}\` and commit the file.`
        : `packages/core/schema/${file.name} no longer matches core's schemas. Core changed and the file didn't follow, so generated types would drift; run \`${command}\` and commit the result.`,
    );
  }
  process.exit(drifted ? 1 : 0);
}

for (const file of files) {
  await Bun.write(file.path, file.text);
  console.log(`wrote packages/core/schema/${file.name}`);
}

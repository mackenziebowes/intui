//! Generates Rust types from core's committed JSON Schemas with typify, so the
//! protocol is defined once, in TypeScript. Formatted with prettyplease, so a
//! clean `cargo build` needs no rustfmt on the machine.

use std::path::{Path, PathBuf};
use std::{env, fs};

const SCHEMAS: [(&str, &str); 2] = [
    ("intui.tree.schema.json", "tree.rs"),
    ("intui.event.schema.json", "event.rs"),
];

fn main() {
    let schema_dir = Path::new(&env::var("CARGO_MANIFEST_DIR").unwrap()).join("../../packages/core/schema");
    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());
    for (schema_file, out_file) in SCHEMAS {
        let path = schema_dir.join(schema_file);
        println!("cargo:rerun-if-changed={}", path.display());
        let text = fs::read_to_string(&path).unwrap_or_else(|e| panic!("can't read {}: {e}; run `bun run schema` at the repo root", path.display()));
        let schema: schemars::schema::RootSchema =
            serde_json::from_str(&text).unwrap_or_else(|e| panic!("{} is not a JSON Schema typify can read: {e}", path.display()));
        let mut space = typify::TypeSpace::new(typify::TypeSpaceSettings::default().with_struct_builder(false));
        space.add_root_schema(schema).unwrap_or_else(|e| panic!("typify can't generate types from {}: {e}", path.display()));
        let file = syn::parse2::<syn::File>(space.to_stream()).expect("typify output is Rust");
        fs::write(out_dir.join(out_file), prettyplease::unparse(&file)).unwrap();
    }
}

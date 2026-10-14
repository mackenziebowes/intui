//! The native renderer, end to end: the real `intui-harness` binary in a real window on a headless Hyprland output made
//! for the test, driven from outside through egui's inspection port (the accessibility tree, clicks, typing,
//! screenshots). Core's own code says what an event line must be and what a text form reads.
//!
//! The window is opened with the glow renderer: the wgpu one never paints on a headless output, so it never answers.

#[path = "common/headless.rs"]
mod headless;
#[path = "common/inspector.rs"]
mod inspector;
#[path = "common/mod.rs"]
mod common;

use inspector::Inspector;
use serde_json::{json, Value};
use std::io::Cursor;
use std::path::PathBuf;
use std::time::Duration;

const HARNESS: &str = env!("CARGO_BIN_EXE_intui-harness");

struct Shown {
    window: headless::Window,
    inspector: Inspector,
    file: PathBuf,
}

fn scratch(name: &str) -> PathBuf {
    let dir = PathBuf::from(env!("CARGO_TARGET_TMPDIR")).join(name);
    std::fs::create_dir_all(&dir).expect("a scratch directory");
    dir
}

fn shots() -> PathBuf {
    let dir = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../tests/shots");
    std::fs::create_dir_all(&dir).expect("the shots directory");
    dir
}

/// Opens the harness on one tree, with `extra` flags before the path.
fn show(name: &str, tree_json: &str, extra: &[&str]) -> Shown {
    let file = scratch(name).join("tree.json");
    std::fs::write(&file, tree_json).expect("the tree can be written");
    let path = file.display().to_string();
    let mut arguments = vec!["--renderer", "glow"];
    arguments.extend_from_slice(extra);
    arguments.push(&path);
    let window = headless::Window::open(name, HARNESS, &arguments);
    let inspector = Inspector::connect(&window.address, Duration::from_secs(30));
    Shown { window, inspector, file }
}

fn example(name: &str) -> (String, Vec<String>) {
    let core = common::core_answers("examples.ts");
    let found = core.as_array().expect("a list of examples").iter().find(|example| example["name"] == name).unwrap_or_else(|| panic!("core has no example \"{name}\""));
    (found["json"].as_str().expect("the tree").to_string(), found["parts"].as_array().expect("the text parts").iter().map(|part| part.as_str().expect("text").to_string()).collect())
}

/// Core's verdict on an event line a window printed.
fn core_accepts(tree: &str, event: &str) {
    let answer = common::run_bun("event.ts", &json!({ "tree": tree, "event": event }).to_string());
    assert!(answer.status.success(), "core refused the event the window printed.\n  event: {event}\n  core said: {}", String::from_utf8_lossy(&answer.stderr));
}

fn pixel(png_bytes: &[u8], x: u32, y: u32) -> [u8; 3] {
    let mut reader = png::Decoder::new(Cursor::new(png_bytes)).read_info().expect("the screenshot is a PNG");
    let mut data = vec![0; reader.output_buffer_size().expect("a size")];
    let info = reader.next_frame(&mut data).expect("the screenshot decodes");
    let channels = info.color_type.samples();
    let at = (y as usize * info.width as usize + x as usize) * channels;
    [data[at], data[at + 1], data[at + 2]]
}

fn rgb(color: egui::Color32) -> [u8; 3] {
    [color.r(), color.g(), color.b()]
}

#[test]
fn every_catalog_example_draws_and_its_text_is_in_the_accessibility_tree() {
    let core = common::core_answers("examples.ts");
    for example in core.as_array().expect("a list of examples") {
        let name = example["name"].as_str().expect("a name");
        let parts: Vec<&str> = example["parts"].as_array().expect("parts").iter().map(|part| part.as_str().expect("text")).collect();
        let mut shown = show(&format!("example-{name}"), example["json"].as_str().expect("the tree"), &[]);
        let snapshot = shown.inspector.wait_for(&format!("the {name} example's text ({} part(s))", parts.len()), |snapshot| parts.iter().all(|part| snapshot.says(part)));
        let _ = snapshot;
        let png = shown.inspector.screenshot();
        std::fs::write(shots().join(format!("{name}.png")), &png.bytes).expect("the screenshot can be saved");
    }
}

#[test]
fn a_press_prints_exactly_the_event_core_expects() {
    let (tree, _) = example("Choice");
    let mut shown = show("press", &tree, &[]);
    let snapshot = shown.inspector.wait_for("the choice", |snapshot| snapshot.says("What next?\n\n[Start exploring] [Park]"));
    shown.inspector.press(snapshot.button("Start exploring"));
    let lines = shown.window.wait_for_lines(1);
    let event: Value = serde_json::from_str(&lines[0]).expect("the line is JSON");
    let keys: Vec<&str> = event.as_object().expect("an object").keys().map(String::as_str).collect();
    assert_eq!(keys, ["v", "source", "target", "action", "value"], "an event has exactly these keys, in this order; the harness printed {}", lines[0]);
    assert_eq!((&event["v"], &event["target"], &event["action"], &event["value"]), (&json!(1), &json!("next-step"), &json!("press"), &json!("explore")));
    assert!(event["source"].as_str().is_some_and(|source| source.starts_with("tree@")), "the source names the tree shown: {}", lines[0]);
    core_accepts(&tree, &lines[0]);
}

#[test]
fn a_once_choice_cannot_fire_twice() {
    let (tree, _) = example("Choice");
    let mut shown = show("once", &tree, &[]);
    let snapshot = shown.inspector.wait_for("the choice", |snapshot| snapshot.says("What next?\n\n[Start exploring] [Park]"));
    let (explore, park) = (snapshot.button("Start exploring"), snapshot.button("Park"));
    shown.inspector.press(explore);
    shown.window.wait_for_lines(1);
    let used = shown.inspector.wait_for("the used-up choice", |snapshot| snapshot.says("Answered: Start exploring"));
    assert!(used.is_disabled(explore) && used.is_disabled(park), "a used-up once choice disables every option:\n{}", used.dump());
    shown.inspector.press(explore);
    shown.inspector.press(park);
    std::thread::sleep(Duration::from_millis(400));
    assert_eq!(shown.window.printed().len(), 1, "a once choice fired again: {:?}", shown.window.printed());
}

#[test]
fn a_refused_press_shows_the_refusals_words_and_the_choice_is_usable_again() {
    let (tree, _) = example("Choice");
    let mut shown = show("refused", &tree, &["--refuse", "next-step=Not allowed right now."]);
    let snapshot = shown.inspector.wait_for("the choice", |snapshot| snapshot.says("What next?\n\n[Start exploring] [Park]"));
    let (explore, park) = (snapshot.button("Start exploring"), snapshot.button("Park"));
    shown.inspector.press(explore);
    shown.window.wait_for_lines(1);
    let refused = shown.inspector.wait_for("the refusal by the control", |snapshot| snapshot.says("Couldn't send “Start exploring”: Not allowed right now. Try again."));
    assert!(!refused.is_disabled(explore) && !refused.is_disabled(park), "a refused choice is usable again:\n{}", refused.dump());
    shown.inspector.press(explore);
    let lines = shown.window.wait_for_lines(2);
    assert_eq!(lines[0], lines[1], "the retry sends the same event");
    shown.inspector.wait_for("the accepted retry", |snapshot| snapshot.says("Answered: Start exploring"));
}

#[test]
fn a_form_with_a_required_field_empty_sends_nothing_and_says_why() {
    let (tree, _) = example("Form");
    let mut shown = show("form-required", &tree, &[]);
    let snapshot = shown.inspector.wait_for("the form", |snapshot| snapshot.says("Form:\n- Title (text, required)\n- Source (select: self, client)\n\n[Add idea]"));
    shown.inspector.press(snapshot.button("Add idea"));
    shown.inspector.wait_for("the reason by the field and the summary", |snapshot| {
        snapshot.says("Fill in Title to send this.") && snapshot.says("One field needs fixing before this can be sent.")
    });
    assert!(shown.window.printed().is_empty(), "the form sent something with a required field empty: {:?}", shown.window.printed());
    let filled = shown.inspector.snapshot();
    shown.inspector.type_into(filled.input("Title"), "Hello");
    shown.inspector.press(filled.button("Add idea"));
    let lines = shown.window.wait_for_lines(1);
    let event: Value = serde_json::from_str(&lines[0]).expect("the line is JSON");
    assert_eq!((&event["action"], &event["target"], &event["value"]), (&json!("submit"), &json!("new-idea"), &json!({ "title": "Hello" })), "an empty optional field is left out: {}", lines[0]);
    core_accepts(&tree, &lines[0]);
    let sent = shown.inspector.wait_for("the used-up form", |snapshot| snapshot.says("Sent"));
    assert!(sent.is_disabled(sent.button("Sent")), "a sent form can't be sent again");
}

#[test]
fn a_number_field_holding_something_that_is_not_a_number_sends_nothing_and_names_it() {
    let tree = json!({ "v": 1, "root": { "type": "Form", "id": "count", "fields": [{ "id": "n", "label": "How many", "input": "number" }], "submitLabel": "Go" } }).to_string();
    let mut shown = show("form-number", &tree, &[]);
    let snapshot = shown.inspector.wait_for("the form", |snapshot| snapshot.says("Form:\n- How many (number)\n\n[Go]"));
    shown.inspector.type_into(snapshot.input("How many"), "12abc");
    shown.inspector.press(snapshot.button("Go"));
    shown.inspector.wait_for("the reason", |snapshot| snapshot.says("\"12abc\" is not a number. Use digits, like 42 or 3.5."));
    assert!(shown.window.printed().is_empty(), "a number field with text in it sent something: {:?}", shown.window.printed());
}

#[test]
fn a_field_called_constructor_is_an_ordinary_field() {
    let tree = json!({ "v": 1, "root": { "type": "Form", "id": "odd", "fields": [
        { "id": "constructor", "label": "Count", "input": "number" },
        { "id": "__proto__", "label": "Note", "input": "text" },
        { "id": "toString", "label": "Agree", "input": "checkbox" }
    ], "submitLabel": "Go" } })
    .to_string();
    let mut shown = show("form-odd-ids", &tree, &[]);
    let snapshot = shown.inspector.wait_for("the form", |snapshot| snapshot.says("Form:\n- Count (number)\n- Note (text)\n- Agree (checkbox)\n\n[Go]"));
    shown.inspector.type_into(snapshot.input("Count"), "42");
    shown.inspector.press(snapshot.button("Go"));
    let lines = shown.window.wait_for_lines(1);
    let event: Value = serde_json::from_str(&lines[0]).expect("the line is JSON");
    assert_eq!(event["value"], json!({ "constructor": 42, "toString": false }), "the odd ids are sent as fields and an empty optional one is left out: {}", lines[0]);
    core_accepts(&tree, &lines[0]);
}

#[test]
fn a_tree_with_an_unknown_kind_draws_the_rest_and_the_notice() {
    let tree = json!({ "v": 1, "root": { "type": "Group", "direction": "column", "children": [
        { "type": "Text", "markdown": "Still here" },
        { "type": "Gauge", "level": 3 },
        { "type": "Label", "text": "and me", "tone": "muted" }
    ] } })
    .to_string();
    let parsed = intui_types::parse(&tree, intui_types::Author::Unchecked).expect("a newer tree parses with its unknown kind");
    let text = intui_text::to_text(&parsed);
    let notice = text.split("\n\n").find(|part| part.contains("Gauge")).expect("the text form names the unknown kind").to_string();
    let mut shown = show("unknown-kind", &tree, &[]);
    shown.inspector.wait_for("the rest of the tree and the notice", |snapshot| snapshot.says("Still here") && snapshot.says("[and me]") && snapshot.says(&notice));
}

#[test]
fn two_style_files_give_two_screenshots_and_no_style_file_gives_the_fallback_look() {
    let (tree, _) = example("Choice");
    let first = r##"{"accent": "#cc3322", "bg": "#101820", "on-accent": "#ffffff"}"##;
    let second = r##"{"accent": "#2255cc", "bg": "#f0e8d8", "on-accent": "#ffffff"}"##;
    let look = |name: &str, extra: &[&str]| -> (Vec<u8>, [u8; 3], [u8; 3]) {
        let mut shown = show(name, &tree, extra);
        let snapshot = shown.inspector.wait_for("the choice", |snapshot| snapshot.says("What next?\n\n[Start exploring] [Park]"));
        let (left, top, _, bottom) = snapshot.bounds(snapshot.button("Start exploring"));
        let png = shown.inspector.screenshot();
        std::fs::write(shots().join(format!("{name}.png")), &png.bytes).expect("the screenshot can be saved");
        let button = pixel(&png.bytes, left as u32 + 3, ((top + bottom) / 2.0) as u32);
        let background = pixel(&png.bytes, 4, 4);
        (png.bytes, button, background)
    };
    let dir = scratch("styles");
    let (path_one, path_two) = (dir.join("first.json"), dir.join("second.json"));
    std::fs::write(&path_one, first).expect("a style file");
    std::fs::write(&path_two, second).expect("a style file");
    let (one, one_button, one_background) = look("style-first", &["--style", &path_one.display().to_string()]);
    let (two, two_button, two_background) = look("style-second", &["--style", &path_two.display().to_string()]);
    assert_ne!(one, two, "two different style files gave the same screenshot");
    assert_eq!((one_button, one_background), ([0xcc, 0x33, 0x22], [0x10, 0x18, 0x20]), "the first style's accent and background should win");
    assert_eq!((two_button, two_background), ([0x22, 0x55, 0xcc], [0xf0, 0xe8, 0xd8]), "the second style's accent and background should win");
    for (name, visuals, expected) in [("style-none-dark", "dark", egui::Visuals::dark()), ("style-none-light", "light", egui::Visuals::light())] {
        let (_, button, background) = look(name, &["--visuals", visuals]);
        assert_eq!(background, rgb(expected.panel_fill), "with no style file the {visuals} look is the app's egui Visuals: background");
        assert_eq!(button, rgb(expected.selection.bg_fill), "with no style file the {visuals} look is the app's egui Visuals: primary button");
    }
}

#[test]
fn a_new_tree_starts_with_every_control_ready() {
    let (tree, _) = example("Choice");
    let mut shown = show("fresh-source", &tree, &[]);
    let snapshot = shown.inspector.wait_for("the choice", |snapshot| snapshot.says("What next?\n\n[Start exploring] [Park]"));
    shown.inspector.press(snapshot.button("Start exploring"));
    shown.inspector.wait_for("the used-up choice", |snapshot| snapshot.says("Answered: Start exploring"));
    std::thread::sleep(Duration::from_millis(50));
    std::fs::write(&shown.file, tree.replace("What next?", "What next, again?")).expect("the tree can be rewritten");
    let fresh = shown.inspector.wait_for("the new tree", |snapshot| snapshot.says("What next, again?\n\n[Start exploring] [Park]"));
    assert!(!fresh.says("Answered: Start exploring"), "the old answer is still shown on the new tree:\n{}", fresh.dump());
    assert!(!fresh.is_disabled(fresh.button("Start exploring")), "a control on a new tree starts Ready");
}

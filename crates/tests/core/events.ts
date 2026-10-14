/** Prints core's answer to every event: `[{ name, tree, event, answer }]`, where `answer` is "ok" or the message core refuses with. */
import { IntuiEvent, Tree } from "../../../packages/core/src/index";

type Case = { name: string; tree?: string; event: string; symptom?: string };

const field = (id: string, input: string, extra: object = {}) => ({ id, label: `Label of ${id}`, input, ...extra });

const TREE = JSON.stringify({
  v: 1,
  root: {
    type: "Group",
    direction: "column",
    children: [
      { type: "Text", markdown: "hello" },
      { type: "Choice", id: "next", options: [{ id: "park", label: "Park" }, { id: "ship", label: "Ship" }] },
      { type: "Group", direction: "row", children: [
        { type: "Form", id: "signup", submitLabel: "Go", fields: [
          field("name", "text", { required: true }),
          field("age", "number"),
          field("agree", "checkbox", { required: true }),
          field("size", "select", { options: ["s", "m", "l"] }),
          field("note", "text"),
        ] },
      ] },
      { type: "Choice", id: "constructor", options: [{ id: "__proto__", label: "Proto" }, { id: "toString", label: "String" }] },
      { type: "Form", id: "__proto__", submitLabel: "Go", fields: [field("constructor", "text", { required: true }), field("hasOwnProperty", "number"), field("type", "text")] },
      { type: "Form", id: "two", submitLabel: "Go", fields: [field("a", "text", { required: true }), field("b", "number", { required: true }), field("c", "checkbox", { required: true })] },
      { type: "Form", id: "doubled", submitLabel: "Go", fields: [field("x", "number"), field("x", "text")] },
      { type: "Form", id: "protofield", submitLabel: "Go", fields: [field("__proto__", "text", { required: true })] },
      { type: "Form", id: "selects", submitLabel: "Go", fields: [field("pick", "select", { options: ["__proto__", "a b", "quote\"d"] })] },
    ],
  },
});

const event = (extra: object, base: object = { v: 1, source: "toolu_1", target: "next", action: "press", value: "park" }) => JSON.stringify({ ...base, ...extra });
const press = (target: string, value: string) => event({ target, value });
const submit = (target: string, value: unknown) => event({ target, action: "submit", value });

const cases: Case[] = [
  { name: "a press on an option that exists is ok", event: event({}) },
  { name: "a submit with every field right is ok", event: submit("signup", { name: "Ada", age: 36, agree: true, size: "m", note: "" }) },
  { name: "a submit leaving out an optional field is ok", event: submit("signup", { name: "Ada", agree: false }) },
  { name: "an empty text value for a required field counts as given", event: submit("signup", { name: "", agree: true }) },
  { name: "no component has the id", event: press("nowhere", "park") },
  { name: "no component has the id of a text", event: press("hello", "park") },
  { name: "a press on a Form", event: press("signup", "park") },
  { name: "a submit on a Choice", event: submit("next", { park: true }) },
  { name: "no such option", event: press("next", "launch") },
  { name: "no such option, in another case", event: press("next", "PARK") },
  { name: "no such field", event: submit("signup", { name: "Ada", agree: true, shoe: "9" }) },
  { name: "wrong value type, number for a text", event: submit("signup", { name: 5, agree: true }) },
  { name: "wrong value type, text for a number", event: submit("signup", { name: "Ada", agree: true, age: "36" }) },
  { name: "wrong value type, text for a checkbox", event: submit("signup", { name: "Ada", agree: "yes" }) },
  { name: "wrong value type, flag for a select", event: submit("signup", { name: "Ada", agree: true, size: false }) },
  { name: "wrong value type quotes the text with its escapes", event: submit("signup", { name: "Ada", agree: true, age: "line\nbreak \"q\" \\ \u0001 é ☃" }) },
  { name: "wrong value type, a negative zero reads as 0", event: '{"v":1,"source":"s","target":"signup","action":"submit","value":{"name":-0,"agree":true}}' },
  { name: "wrong value type, a decimal", event: submit("signup", { name: 0.1, agree: true }) },
  { name: "a select value not among its options", event: submit("signup", { name: "Ada", agree: true, size: "xl" }) },
  { name: "a select value not among its options, empty", event: submit("signup", { name: "Ada", agree: true, size: "" }) },
  { name: "one required field left out", event: submit("signup", { agree: true }) },
  { name: "required fields left out, plural", event: submit("two", {}) },
  { name: "two of three required fields left out", event: submit("two", { b: 1 }) },
  { name: "all required fields left out of a form with one", event: submit("__proto__", {}) },
  { name: "a field is wrong before a required one is missing", event: submit("two", { z: 1 }) },
  { name: "the first wrong field wins", event: '{"v":1,"source":"s","target":"signup","action":"submit","value":{"note":1,"age":"x","name":"Ada","agree":true}}' },
  { name: "whole-number field ids are checked first, as JavaScript lists them", event: '{"v":1,"source":"s","target":"signup","action":"submit","value":{"zeta":1,"10":1,"2":1,"name":"Ada","agree":true}}' },
  { name: "odd id constructor as a Choice", event: press("constructor", "__proto__") },
  { name: "odd id constructor, option toString", event: press("constructor", "toString") },
  { name: "odd id constructor, option not there", event: press("constructor", "valueOf") },
  { name: "odd id __proto__ as a Form, submitted right", event: submit("__proto__", { constructor: "x", hasOwnProperty: 3 }) },
  { name: "odd id __proto__ as a Form, pressed", event: press("__proto__", "x") },
  { name: "odd field id hasOwnProperty with the wrong type", event: submit("__proto__", { constructor: "x", hasOwnProperty: "3" }) },
  { name: "odd field id toString is no field", event: submit("__proto__", { constructor: "x", toString: "3" }) },
  { name: "a field named __proto__ is skipped like core skips it", event: '{"v":1,"source":"s","target":"__proto__","action":"submit","value":{"constructor":"x","__proto__":"y"}}' },
  { name: "a required field named __proto__ is never seen, as core never sees it", event: '{"v":1,"source":"s","target":"protofield","action":"submit","value":{"__proto__":"y"}}' },
  { name: "a __proto__ field with a value no field takes is skipped unchecked", event: '{"v":1,"source":"s","target":"signup","action":"submit","value":{"name":"Ada","agree":true,"__proto__":null}}' },
  { name: "a field named type changes how a path reads", event: '{"v":1,"source":"s","target":"signup","action":"submit","value":{"type":"Text","other":[1]}}' },
  { name: "a field id that appears twice means the last one", event: submit("doubled", { x: "text" }) },
  { name: "a field id that appears twice, wrong for the last", event: submit("doubled", { x: 5 }) },
  { name: "a select option with quotes and spaces", event: submit("selects", { pick: "nope" }) },
  { name: "a select option named __proto__ is fine", event: submit("selects", { pick: "__proto__" }) },
  { name: "a repeated key keeps its last value", event: '{"v":1,"source":"s","target":"next","action":"press","value":"x","value":"park"}' },
  { name: "a repeated action keeps its last", event: '{"v":1,"source":"s","target":"next","action":"press","action":"submit","value":{}}' },
  { name: "an event from an unrelated tree", tree: JSON.stringify({ v: 1, root: { type: "Text", markdown: "x" } }), event: press("next", "park") },

  { name: "malformed: not an object, null", event: "null" },
  { name: "malformed: not an object, a list", event: "[]" },
  { name: "malformed: not an object, a string", event: '"press"' },
  { name: "malformed: not an object, a number", event: "5" },
  { name: "malformed: not an object, a flag", event: "true" },
  { name: "malformed: empty object", event: "{}" },
  { name: "malformed: unknown action", event: event({ action: "tap" }) },
  { name: "malformed: action of the wrong type", event: event({ action: 1 }) },
  { name: "malformed: action missing", event: '{"v":1,"source":"s","target":"next","value":"park"}' },
  { name: "malformed: a bad action hides every other problem", event: '{"v":2,"source":"","action":"x","extra":1}' },
  { name: "malformed: version 2", event: event({ v: 2 }) },
  { name: "malformed: version as text", event: event({ v: "1" }) },
  { name: "malformed: version missing", event: '{"source":"s","target":"next","action":"press","value":"park"}' },
  { name: "malformed: version 1.0 is fine", event: '{"v":1.0,"source":"s","target":"next","action":"press","value":"park"}' },
  { name: "malformed: source missing", event: '{"v":1,"target":"next","action":"press","value":"park"}' },
  { name: "malformed: source empty", event: event({ source: "" }) },
  { name: "malformed: source a number", event: event({ source: 7 }) },
  { name: "malformed: target missing", event: '{"v":1,"source":"s","action":"press","value":"park"}' },
  { name: "malformed: target null", event: event({ target: null }) },
  { name: "malformed: press value missing", event: '{"v":1,"source":"s","target":"next","action":"press"}' },
  { name: "malformed: press value empty", event: event({ value: "" }) },
  { name: "malformed: press value a number", event: event({ value: 3 }) },
  { name: "malformed: press value a list", event: event({ value: ["park"] }) },
  { name: "malformed: press value an object", event: event({ value: { a: 1 } }) },
  { name: "malformed: submit value missing", event: '{"v":1,"source":"s","target":"signup","action":"submit"}' },
  { name: "malformed: submit value a string", event: submit("signup", "Ada") },
  { name: "malformed: submit value a list", event: submit("signup", []) },
  { name: "malformed: submit value null", event: submit("signup", null) },
  { name: "malformed: a submitted value of null", event: submit("signup", { name: null }) },
  { name: "malformed: a submitted value that is a list", event: submit("signup", { name: ["a"], age: [] }) },
  { name: "malformed: a submitted value that is an object", event: submit("signup", { name: {} }) },
  { name: "malformed: a submitted object with a type reads as a component", event: submit("signup", { name: { type: "Chart" } }) },
  { name: "malformed: a submitted number too big for a double", event: '{"v":1,"source":"s","target":"signup","action":"submit","value":{"age":1e400}}' },
  { name: "malformed: several bad submitted values, in key order", event: '{"v":1,"source":"s","target":"signup","action":"submit","value":{"b":null,"a":null,"3":null,"1":null}}' },
  { name: "malformed: unknown props", event: event({ extra: 1, more: 2 }) },
  { name: "malformed: one unknown prop", event: event({ extra: 1 }) },
  { name: "malformed: unknown props listed whole numbers first", event: '{"v":1,"source":"s","target":"next","action":"press","value":"park","b":1,"2":1,"a":1,"1":1}' },
  { name: "malformed: unknown props come after the others", event: '{"extra":1,"v":2,"source":"","target":5,"action":"press","value":null}' },
  { name: "malformed: every prop wrong on a submit", event: '{"v":null,"source":null,"target":null,"action":"submit","value":null}' },
  { name: "malformed: an unknown prop named toString", event: event({ toString: 1 }) },
];

const answer = (tree: Tree, raw: string): string => {
  try {
    const parsed = IntuiEvent.parse(JSON.parse(raw));
    tree.verify(parsed);
    return "ok";
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

const trees = new Map<string, Tree>();
console.log(
  JSON.stringify(
    cases.map((one) => {
      const text = one.tree ?? TREE;
      if (!trees.has(text)) trees.set(text, Tree.parse(JSON.parse(text)));
      return { name: one.name, tree: text, event: one.event, symptom: one.symptom, answer: answer(trees.get(text)!, one.event) };
    }),
  ),
);

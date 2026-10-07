import { describe, expect, test } from "bun:test";
import { IntuiError, IntuiEvent, Tree } from "../src";

const tree = Tree.parse({
  v: 1,
  root: {
    type: "Group",
    children: [
      { type: "Choice", id: "next", options: [{ id: "explore", label: "Start exploring" }, { id: "park", label: "Park" }] },
      {
        type: "Form",
        id: "new-idea",
        fields: [
          { id: "title", label: "Title", input: "text", required: true },
          { id: "source", label: "Source", input: "select", options: ["self", "client"] },
        ],
      },
    ],
  },
});

function refusal(event: IntuiEvent): string {
  try {
    tree.verify(event);
  } catch (error) {
    if (error instanceof IntuiError) return error.message;
    throw error;
  }
  throw new Error("expected the event to be refused");
}

describe("events", () => {
  test("a press reads as a sentence with the option's label", () => {
    const event = IntuiEvent.press("toolu_1", "next", "park");
    tree.verify(event);
    expect(tree.describe(event)).toBe('Pressed "Park" in next (from toolu_1).');
  });

  test("a submit lists values by field label", () => {
    const event = IntuiEvent.submit("toolu_1", "new-idea", { title: "IntUI docs", source: "self" });
    tree.verify(event);
    expect(tree.describe(event)).toBe('Submitted new-idea (from toolu_1): Title = "IntUI docs", Source = "self".');
  });

  test("refuses events that don't fit the tree, saying why", () => {
    expect(refusal(IntuiEvent.press("t", "gone", "park"))).toContain('nothing in it has the id "gone"');
    expect(refusal(IntuiEvent.press("t", "next", "delete"))).toContain('has no option "delete"; its options are explore, park');
    expect(refusal(IntuiEvent.press("t", "new-idea", "x"))).toContain("is a Form, which can't be pressed");
    expect(refusal(IntuiEvent.submit("t", "new-idea", {}))).toContain('required field "Title" left empty');
    expect(refusal(IntuiEvent.submit("t", "new-idea", { title: "x", source: "aliens" }))).toContain('has no option "aliens"');
    expect(refusal(IntuiEvent.submit("t", "new-idea", { title: 4 }))).toContain('field "Title" takes a string, got 4');
  });

  test("parses from JSON and back", () => {
    const event = IntuiEvent.press("toolu_1", "next", "park");
    expect(IntuiEvent.parse(JSON.parse(JSON.stringify(event))).toJSON()).toEqual(event.toJSON());
  });

  test("names the bad field when an event doesn't parse", () => {
    expect(() => IntuiEvent.parse({ v: 1, source: "t", target: "next", action: "press" })).toThrow('value: this is required; add "value"');
  });
});

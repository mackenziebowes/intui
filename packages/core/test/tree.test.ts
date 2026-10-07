import { describe, expect, test } from "bun:test";
import { core, IntuiError, Tree, type ChartProps, type GroupProps } from "../src";

function problemsOf(run: () => unknown): string {
  try {
    run();
  } catch (error) {
    if (error instanceof IntuiError) return error.message;
    throw error;
  }
  throw new Error("expected an IntuiError");
}

describe("every core component", () => {
  for (const kind of core.kinds) {
    test(`${kind.type}: its example parses and has a text form`, () => {
      const tree = Tree.of(kind.example);
      expect(tree.toText().trim().length).toBeGreaterThan(0);
    });

    test(`${kind.type}: survives a round trip through JSON`, () => {
      const tree = Tree.of(kind.example);
      const again = Tree.parse(JSON.parse(JSON.stringify(tree)));
      expect(again.toJSON()).toEqual(tree.toJSON());
    });
  }
});

describe("parsing", () => {
  test("fills in defaults", () => {
    const tree = Tree.parse({ v: 1, root: { type: "Group", children: [{ type: "Label", text: "new" }] } });
    expect(tree.toJSON().root as unknown).toEqual({ type: "Group", direction: "column", children: [{ type: "Label", text: "new", tone: "neutral" }] });
  });

  test("names an unknown component and lists the real ones", () => {
    const message = problemsOf(() => Tree.parse({ v: 1, root: { type: "Charts" } }));
    expect(message).toContain('root.type: "Charts" isn\'t a component; use one of Text, Group');
  });

  test("points at the exact nested prop, with component types in the path", () => {
    const message = problemsOf(() =>
      Tree.parse({ v: 1, root: { type: "Group", children: [{ type: "Text", markdwn: "hi" }] } }),
    );
    expect(message).toContain('root.children[0] (Text).markdown: this is required; add "markdown"');
    expect(message).toContain('root.children[0] (Text): "markdwn" isn\'t a known prop here');
  });

  test("asks for a version when it's missing, and refuses unknown versions", () => {
    expect(problemsOf(() => Tree.parse({ root: { type: "Text", markdown: "x" } }))).toContain('add "v": 1');
    expect(problemsOf(() => Tree.parse({ v: 2, root: { type: "Text", markdown: "x" } }))).toContain("update @intui/core");
  });

  test("refuses duplicate Choice and Form ids", () => {
    const choice = { type: "Choice", id: "next", options: [{ id: "a", label: "A" }] };
    const message = problemsOf(() => Tree.parse({ v: 1, root: { type: "Group", children: [choice, choice] } }));
    expect(message).toContain('id "next" is already used at root.children[0] (Choice)');
  });

  test("checks Flow links point at real steps", () => {
    const flow = { type: "Flow", steps: [{ id: "a", label: "A" }, { id: "b", label: "B" }], links: [{ from: "a", to: "c" }] };
    expect(problemsOf(() => Tree.parse({ v: 1, root: flow }))).toContain('link points at step "c", which doesn\'t exist');
  });
});

describe("who may write a tree", () => {
  const chart: ChartProps = {
    type: "Chart",
    kind: "bar",
    series: [{ label: "Ideas", role: "primary", points: [{ x: "open", y: 3 }] }],
    annotations: [],
  };

  test("the model can't write components that show numbers", () => {
    const tree = { v: 1, root: { type: "Group", children: [{ type: "Text", markdown: "Here:" }, chart] } };
    const message = problemsOf(() => Tree.parse(tree, { author: "model" }));
    expect(message).toContain("root.children[1] (Chart): this component shows numbers, which must come from code");
  });

  test("code can", () => {
    const root: GroupProps = { type: "Group", direction: "column", children: [chart] };
    expect(Tree.of(root).toText()).toContain("| open | 3 |");
  });

  test("the model's tool schema leaves out code-only components", () => {
    const schema = JSON.stringify(core.writableBy("model").jsonSchema());
    expect(schema).toContain('"const":"Flow"');
    expect(schema).not.toContain('"const":"Chart"');
    expect(schema).not.toContain('"const":"Stat"');
  });
});

describe("text forms", () => {
  test("a row of short parts stays on one line", () => {
    const tree = Tree.parse({
      v: 1,
      root: { type: "Group", direction: "row", children: [{ type: "Text", markdown: "**Ideas**" }, { type: "Label", text: "3 open" }] },
    });
    expect(tree.toText()).toBe("**Ideas** · [3 open]");
  });

  test("a chart becomes a table with roles and markers", () => {
    const text = Tree.of(core.kinds.find((kind) => kind.type === "Chart")!.example).toText();
    expect(text).toContain("| Usual (baseline) |");
    expect(text).toContain("Markers: Tue: New pricing page");
  });

  test("table cells escape pipes", () => {
    const tree = Tree.parse({ v: 1, root: { type: "Table", columns: [{ key: "a", label: "A" }], rows: [{ a: "x | y" }] } });
    expect(tree.toText()).toContain("x \\| y");
  });
});

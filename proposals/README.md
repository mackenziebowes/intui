# Proposals

How core grows. Agents don't add components or props to `@intui/core` directly; they propose them here, and build what they need as an extension in their product meanwhile, so the work isn't blocked.

A proposal is one file, `NNN-short-name.md`:

```markdown
# NNN: <component or prop>

- **Need:** what you were trying to show, and why core pieces couldn't do it.
- **Consumers:** the two unrelated products that need it (the rule of two). If there's only one, keep it as an extension and come back when there's a second.
- **Schema:** the props, named for meaning, not looks.
- **Text form:** what `toText` produces. It must carry the same information.
- **Fallback:** what each surface draws if its renderer doesn't support it yet.
- **Extension today:** where the stand-in lives, so it can be replaced.
```

Mackenzie, or a reviewing agent, accepts or declines it. Accepted proposals stay here as the record of why core looks the way it does.

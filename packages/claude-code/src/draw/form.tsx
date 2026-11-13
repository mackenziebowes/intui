/**
 * The Form drawer for Claude Code: a field per input kind, a submit button that stays
 * blocked, with a sentence saying why, until required fields are filled and numbers parse,
 * and, once submitted, the values it was sent with. Whether it is sent, sending or refused
 * comes from core's control machine; nothing a field handler throws reaches the engine, it becomes a note.
 */
import type { FieldValue, FormField, FormProps } from '@intui/core'
import type { ElementTable } from 'claude-code'
import { parseNumber } from '@intui/layout'
import { defineDrawer, type DrawContext } from './drawer'
import { whyOf } from '@intui/core'
import { blockedNote, checkboxLabel, fieldLabel, missingRequired, summarize } from './form-logic'

type Fields = ElementTable<'terminal'>
const fieldElements = (ctx: DrawContext) => (ctx.surface === 'mobile' ? undefined : (ctx.el as unknown as Fields))

/** Runs a handler so nothing it throws reaches the engine; the message is left as a note on `noteKey`. */
async function guarded(ctx: DrawContext, noteKey: string, run: () => Promise<void>) {
  try {
    await ctx.setNote(noteKey, undefined)
    await run()
  } catch (error) {
    await ctx.setNote(noteKey, whyOf(error))
  }
}

export const form = defineDrawer<FormProps>({
  type: 'Form',
  draw: (props, ctx) => {
    const { el, key } = ctx
    const valueOf = (fieldId: string) => ctx.field(props.id, fieldId)

    const state = ctx.control(props.id)
    if (state.kind === 'sent') {
      return (
        <el.Box flexDirection="column">
          <el.Text dimColor>✓ Sent</el.Text>
          {summarize(props.fields, valueOf).map((line, i) => <el.Text key={key('sent', String(i))} dimColor>{line}</el.Text>)}
        </el.Box>
      )
    }

    const inputs = fieldElements(ctx)
    if (!inputs) {
      ctx.fellBack(props)
      return (
        <el.Box flexDirection="column">
          <el.Markdown text={ctx.text(props)} />
          <el.Text dimColor>This form can be filled in on the terminal or desktop.</el.Text>
        </el.Box>
      )
    }

    const numberKey = (field: FormField) => key('field', field.id, 'number')
    const effective = (field: FormField) => (ctx.note(numberKey(field)) !== undefined ? undefined : valueOf(field.id))
    const invalid = props.fields.filter(f => f.input === 'number' && ctx.note(numberKey(f)) !== undefined).map(f => `${f.label} ${ctx.note(numberKey(f))}`)
    const missing = missingRequired(props.fields, fieldId => effective(props.fields.find(f => f.id === fieldId)!))
    const blocked = blockedNote(missing, invalid)
    const fieldFailure = (field: FormField) => ctx.note(key('field', field.id))
    const submitFailure = state.kind === 'refused' ? state.why : undefined

    const save = (fieldId: string, value: FieldValue) => ctx.setField(props.id, fieldId, value)

    const control = (field: FormField) => {
      const fieldKey = key('field', field.id)
      const label = fieldLabel(field)
      if (field.input === 'checkbox') {
        const checked = valueOf(field.id) === true
        return <el.Button key={fieldKey} label={checkboxLabel(field, checked)} onPress={() => guarded(ctx, fieldKey, () => save(field.id, !checked))} />
      }
      if (field.input === 'select') {
        const current = valueOf(field.id)
        return (
          <inputs.Select
            key={fieldKey}
            label={label}
            options={(field.options ?? []).map(value => ({ value }))}
            value={typeof current === 'string' ? current : undefined}
            onSelect={value => guarded(ctx, fieldKey, () => save(field.id, value))}
          />
        )
      }
      if (field.input === 'number') {
        const stored = valueOf(field.id)
        const commit = (raw: string) =>
          guarded(ctx, fieldKey, async () => {
            const parsed = parseNumber(raw)
            if (parsed.kind === 'value') {
              await ctx.setNote(numberKey(field), undefined)
              return save(field.id, parsed.value)
            }
            // A stale number may already be stored and cannot be removed, so block the submit until the text is a number again.
            if (parsed.kind === 'invalid') await ctx.setNote(numberKey(field), parsed.note)
            else await ctx.setNote(numberKey(field), stored !== undefined ? 'needs a number' : undefined)
          })
        return (
          <inputs.Input
            key={fieldKey}
            label={label}
            placeholder="number"
            value={ctx.note(numberKey(field)) !== undefined || stored === undefined ? undefined : String(stored)}
            onInput={commit}
            onSubmit={commit}
          />
        )
      }
      const commit = (value: string) => guarded(ctx, fieldKey, () => save(field.id, value))
      const stored = valueOf(field.id)
      return <inputs.Input key={fieldKey} label={label} value={typeof stored === 'string' ? stored : undefined} onInput={commit} onSubmit={commit} />
    }

    return (
      <el.Box flexDirection="column">
        {props.fields.map(field => (
          <el.Box key={key('row', field.id)} flexDirection="column">
            {control(field)}
            {fieldFailure(field) ? <el.Text color="red">{fieldFailure(field)}</el.Text> : null}
            {field.input === 'number' && ctx.note(numberKey(field)) !== undefined ? <el.Text color="yellow">{ctx.note(numberKey(field))}</el.Text> : null}
          </el.Box>
        ))}
        <el.Button
          key={key('submit')}
          label={props.submitLabel}
          variant="primary"
          onPress={async () => {
            if (blocked) return
            const values = Object.fromEntries(props.fields.flatMap(f => (valueOf(f.id) === undefined ? [] : [[f.id, valueOf(f.id)!] as const])))
            await ctx.answer(props.id, { kind: 'submit', values })
          }}
        />
        {blocked ? <el.Text color="yellow">{blocked}</el.Text> : null}
        {submitFailure ? <el.Text color="red">{`Could not send: ${submitFailure}`}</el.Text> : null}
      </el.Box>
    )
  },
})

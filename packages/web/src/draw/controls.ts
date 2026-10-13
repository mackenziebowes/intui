import { IntuiEvent, type ChoiceProps, type FieldValue, type FormField, type FormProps } from '@intui/core'
import type { DrawContext, Drawer } from '../dom'
import { readForm, type RawValue } from '../form-values'
import { markdownToHtml } from '../markdown'

/** A short, one-line reason from anything a handler threw. */
const reason = (error: unknown) => (error instanceof Error ? error.message : String(error)).split('\n')[0]!.slice(0, 160)

const READ_ONLY = 'This view is read-only: there is nowhere to send an answer.'

function check({ dom }: DrawContext) {
  return dom.svg(
    'svg',
    { class: 'intui-icon', viewBox: '0 0 16 16', width: 16, height: 16, 'aria-hidden': 'true' },
    dom.svg('path', { d: 'M3 8.5 6.5 12 13 4.5' }),
  )
}

/**
 * Sends an event built from the tree's own ids, after checking it fits the tree.
 * Throws whatever the host's handler throws, so the control can say it failed.
 */
async function sendChecked(ctx: DrawContext, event: IntuiEvent): Promise<void> {
  ctx.tree.verify(event)
  await ctx.send!(event)
}

export const choice: Drawer<ChoiceProps> = (props, ctx) => {
  const { dom } = ctx
  const promptId = ctx.uid('prompt')
  const root = dom.el('div', { class: 'intui-choice', role: 'group', 'aria-labelledby': props.prompt ? promptId : undefined })
  if (props.prompt) root.append(dom.html('div', { class: 'intui-text intui-choice-prompt', id: promptId }, markdownToHtml(props.prompt)))
  const status = dom.el('p', { class: 'intui-status', role: 'status' })
  let chosen = ctx.pressed(props.id)
  let busy: string | undefined

  const buttons = props.options.map(option => {
    const button = dom.el('button', { type: 'button', class: option.emphasis === 'primary' ? 'intui-button intui-button--primary' : 'intui-button' })
    button.addEventListener('click', async () => {
      if (busy || !ctx.send) return
      busy = option.id
      paint()
      try {
        await sendChecked(ctx, IntuiEvent.press(ctx.source, props.id, option.id))
        chosen = option.id
        busy = undefined
        paint(props.repeat === 'many' ? `Sent “${option.label}”.` : undefined)
      } catch (error) {
        busy = undefined
        paint(`Couldn't send “${option.label}”: ${reason(error)}. Try again.`, true)
      }
    })
    return button
  })

  function paint(message?: string, failed = false) {
    const used = props.repeat === 'once' && chosen !== undefined
    root.classList.toggle('is-used', used)
    root.setAttribute('aria-busy', String(busy !== undefined))
    props.options.forEach((option, i) => {
      const button = buttons[i]!
      const isChosen = used && chosen === option.id
      button.disabled = used || busy !== undefined || !ctx.send
      button.classList.toggle('is-chosen', isChosen)
      if (used) button.setAttribute('aria-pressed', String(isChosen))
      button.title = !ctx.send && !used ? READ_ONLY : ''
      button.replaceChildren(...(isChosen ? [check(ctx)] : []), busy === option.id ? 'Sending…' : option.label)
    })
    status.classList.toggle('is-error', failed)
    status.textContent = message ?? (used ? `Answered: ${props.options.find(o => o.id === chosen)?.label ?? chosen}` : '')
  }

  paint()
  root.append(dom.el('div', { class: 'intui-choice-options' }, ...buttons), status)
  return root
}

export const form: Drawer<FormProps> = (props, ctx) => {
  const { dom } = ctx
  const element = dom.el('form', { class: 'intui-form', novalidate: true })
  const controls = new Map<string, HTMLInputElement | HTMLSelectElement>()
  const errors = new Map<string, HTMLElement>()
  const status = dom.el('p', { class: 'intui-status', role: 'status' })
  const submit = dom.el('button', { type: 'submit', class: 'intui-button intui-button--primary' }, props.submitLabel)
  let sent = ctx.submitted(props.id)

  for (const field of props.fields) element.append(fieldRow(field, ctx, controls, errors))
  element.append(dom.el('div', { class: 'intui-form-actions' }, submit, status))

  const raw = (id: string): RawValue | undefined => {
    const control = controls.get(id)
    if (!control) return undefined
    return control.type === 'checkbox' ? (control as HTMLInputElement).checked : control.value
  }

  function showErrors(found: Record<string, string>) {
    for (const field of props.fields) {
      const message = found[field.id]
      const control = controls.get(field.id)!
      errors.get(field.id)!.textContent = message ?? ''
      if (message) control.setAttribute('aria-invalid', 'true')
      else control.removeAttribute('aria-invalid')
    }
  }

  function paint(message?: string, failed = false, busy = false) {
    const used = sent !== undefined
    element.classList.toggle('is-used', used)
    element.setAttribute('aria-busy', String(busy))
    for (const control of controls.values()) control.disabled = used || busy
    submit.disabled = used || busy || !ctx.send
    submit.title = !ctx.send && !used ? READ_ONLY : ''
    submit.replaceChildren(...(used ? [check(ctx), 'Sent'] : [busy ? 'Sending…' : props.submitLabel]))
    status.classList.toggle('is-error', failed)
    status.textContent = message ?? ''
  }

  // A used-up form shows what it was sent with, in place.
  if (sent) fill(props.fields, controls, sent)

  element.addEventListener('submit', async event => {
    event.preventDefault()
    if (sent || !ctx.send) return
    const reading = readForm(props.fields, raw)
    showErrors(reading.errors)
    const wrong = props.fields.filter(field => reading.errors[field.id])
    if (wrong.length > 0) {
      paint(wrong.length === 1 ? 'One field needs fixing before this can be sent.' : `${wrong.length} fields need fixing before this can be sent.`, true)
      controls.get(wrong[0]!.id)!.focus()
      return
    }
    paint(undefined, false, true)
    try {
      await sendChecked(ctx, IntuiEvent.submit(ctx.source, props.id, reading.values))
      sent = reading.values
      paint()
    } catch (error) {
      paint(`Couldn't send this: ${reason(error)}. Your answers are still here; try again.`, true)
    }
  })

  paint()
  return element
}

function fieldRow(
  field: FormField,
  ctx: DrawContext,
  controls: Map<string, HTMLInputElement | HTMLSelectElement>,
  errors: Map<string, HTMLElement>,
): HTMLElement {
  const { dom } = ctx
  const id = ctx.uid(`field-${field.id}`)
  const errorId = `${id}-error`
  const error = dom.el('p', { class: 'intui-field-error', id: errorId })
  errors.set(field.id, error)
  const common = { id, name: field.id, required: field.required, 'aria-describedby': errorId }
  const required = field.required ? dom.el('span', { class: 'intui-required' }, 'required') : null

  if (field.input === 'checkbox') {
    const input = dom.el('input', { ...common, type: 'checkbox' })
    controls.set(field.id, input)
    return dom.el('div', { class: 'intui-field intui-field--checkbox' }, dom.el('label', { for: id }, input, dom.el('span', {}, field.label), required), error)
  }
  let control: HTMLInputElement | HTMLSelectElement
  if (field.input === 'select') {
    control = dom.el(
      'select',
      common,
      dom.el('option', { value: '' }, field.required ? 'Choose…' : 'None'),
      ...(field.options ?? []).map(option => dom.el('option', { value: option }, option)),
    )
  } else {
    // Numbers are typed as text and read by parseNumber, so a typo gets a message instead of silently becoming empty.
    control = dom.el('input', { ...common, type: 'text', inputmode: field.input === 'number' ? 'decimal' : undefined, autocomplete: 'off' })
  }
  controls.set(field.id, control)
  return dom.el('div', { class: 'intui-field' }, dom.el('label', { for: id }, field.label, required), control, error)
}

function fill(fields: readonly FormField[], controls: Map<string, HTMLInputElement | HTMLSelectElement>, values: Record<string, FieldValue>) {
  for (const field of fields) {
    const control = controls.get(field.id)!
    // `values` comes from the host and may be a plain object: only its own keys count.
    if (!Object.hasOwn(values, field.id)) continue
    const value = values[field.id]!
    if (control.type === 'checkbox') (control as HTMLInputElement).checked = value === true
    else control.value = String(value)
  }
}

/**
 * The browser drawers for the controls, Choice and Form. Each is a surface on core's control
 * machine (`stepControl`, hub #1956): a press or submit goes in as an event, the host's verdict
 * goes in as accepted or refused, and `paint` draws whatever state comes out. The machine decides
 * when a control is used up, busy or read-only; nothing here does.
 */
import { canAnswer, startControl, stepControl, whyOf, type Answer, type ControlAt, type ControlEvent, type ControlState, type FieldValue, type FormField, type FormProps, type ChoiceProps } from '@intui/core'
import type { DrawContext, Drawer } from '../dom'
import { readForm, type RawValue } from '../form-values'
import { markdownToHtml } from '../markdown'

const READ_ONLY = 'This view is read-only: there is nowhere to send an answer.'

/** The host's words without a closing full stop, so the control's own sentence ends them once. */
const sentence = (why: string) => why.trimEnd().replace(/\.+$/, '')

function check({ dom }: DrawContext) {
  return dom.svg(
    'svg',
    { class: 'intui-icon', viewBox: '0 0 16 16', width: 16, height: 16, 'aria-hidden': 'true' },
    dom.svg('path', { d: 'M3 8.5 6.5 12 13 4.5' }),
  )
}

/**
 * Runs one control's machine: holds its current state, sends each event through `stepControl`,
 * carries out the `send` effect through the host and feeds the verdict back in, and calls `paint`
 * after every step that moved.
 */
function drive(ctx: DrawContext, at: ControlAt, start: ControlState, paint: (state: ControlState) => void): (event: ControlEvent) => void {
  let state = start
  const dispatch = (event: ControlEvent) => {
    const step = stepControl(at, state, event)
    if (step.ignored) return
    state = step.state
    paint(state)
    for (const effect of step.effects) {
      ctx.send!(effect.event).then(
        () => dispatch({ kind: 'accepted' }),
        error => dispatch({ kind: 'refused', why: whyOf(error) }),
      )
    }
  }
  paint(state)
  return dispatch
}

export const choice: Drawer<ChoiceProps> = (props, ctx) => {
  const { dom } = ctx
  const at: ControlAt = { source: ctx.source, control: props }
  const promptId = ctx.uid('prompt')
  const root = dom.el('div', { class: 'intui-choice', role: 'group', 'aria-labelledby': props.prompt ? promptId : undefined })
  if (props.prompt) root.append(dom.html('div', { class: 'intui-text intui-choice-prompt', id: promptId }, markdownToHtml(props.prompt)))
  const status = dom.el('p', { class: 'intui-status', role: 'status' })
  const labelOf = (answer: Answer) => (answer.kind === 'press' ? props.options.find(o => o.id === answer.option)?.label ?? answer.option : '')
  const earlier = ctx.pressed(props.id)
  const buttons = props.options.map(option =>
    dom.el('button', { type: 'button', class: option.emphasis === 'primary' ? 'intui-button intui-button--primary' : 'intui-button' }),
  )

  function paint(state: ControlState) {
    const used = state.kind === 'sent' && props.repeat === 'once'
    const busy = state.kind === 'sending' ? state.answer : undefined
    const open = canAnswer(at, state)
    root.classList.toggle('is-used', used)
    root.setAttribute('aria-busy', String(busy !== undefined))
    props.options.forEach((option, i) => {
      const button = buttons[i]!
      const isChosen = used && state.answer.kind === 'press' && state.answer.option === option.id
      button.disabled = !open
      button.classList.toggle('is-chosen', isChosen)
      if (used) button.setAttribute('aria-pressed', String(isChosen))
      button.title = state.kind === 'readOnly' ? READ_ONLY : ''
      button.replaceChildren(...(isChosen ? [check(ctx)] : []), busy?.kind === 'press' && busy.option === option.id ? 'Sending…' : option.label)
    })
    status.classList.toggle('is-error', state.kind === 'refused')
    status.textContent =
      state.kind === 'refused' ? `Couldn't send “${labelOf(state.answer)}”: ${sentence(state.why)}. Try again.`
      : state.kind === 'sent' ? (used ? `Answered: ${labelOf(state.answer)}` : `Sent “${labelOf(state.answer)}”.`)
      : ''
  }

  const dispatch = drive(ctx, at, startControl(ctx.send !== undefined, earlier === undefined ? undefined : { kind: 'press', option: earlier }), paint)
  props.options.forEach((option, i) => buttons[i]!.addEventListener('click', () => dispatch({ kind: 'answered', answer: { kind: 'press', option: option.id } })))
  root.append(dom.el('div', { class: 'intui-choice-options' }, ...buttons), status)
  return root
}

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export const form: Drawer<FormProps> = (props, ctx) => {
  const { dom } = ctx
  const at: ControlAt = { source: ctx.source, control: props }
  const element = dom.el('form', { class: 'intui-form', novalidate: true })
  const controls = new Map<string, Control>()
  const errors = new Map<string, HTMLElement>()
  const status = dom.el('p', { class: 'intui-status', role: 'status' })
  const submit = dom.el('button', { type: 'submit', class: 'intui-button intui-button--primary' }, props.submitLabel)
  const earlier = ctx.submitted(props.id)

  const composer = props.send !== undefined
  for (const field of props.fields) element.append(fieldRow(field, ctx, controls, errors, composer))
  if (composer) {
    // A message box: the send button sits inside the box's foot, beside the key that sends.
    const hint = dom.el('span', { class: 'intui-composer-hint' }, props.send === 'ctrl-enter' ? 'Ctrl+Enter' : 'Enter')
    const box = element.querySelector('.intui-composer')!
    box.append(dom.el('div', { class: 'intui-composer-foot' }, hint, submit))
    element.append(status)
    element.classList.add('intui-form--composer')
    element.addEventListener('keydown', event => {
      if (event.key !== 'Enter' || event.isComposing || !(event.target instanceof HTMLTextAreaElement)) return
      const sends = props.send === 'ctrl-enter' ? event.ctrlKey || event.metaKey : !event.shiftKey && !event.ctrlKey && !event.altKey
      if (!sends) return
      event.preventDefault()
      element.requestSubmit()
    })
  } else {
    element.append(dom.el('div', { class: 'intui-form-actions' }, submit, status))
  }

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

  /** What the person typed that can't be read yet (a field to fix) is said here, before there is an answer. */
  function sayUnsent(message: string) {
    status.classList.add('is-error')
    status.textContent = message
  }

  function paint(state: ControlState) {
    const used = state.kind === 'sent'
    const busy = state.kind === 'sending'
    element.classList.toggle('is-used', used)
    element.setAttribute('aria-busy', String(busy))
    for (const control of controls.values()) control.disabled = used || busy
    submit.disabled = !canAnswer(at, state)
    submit.title = state.kind === 'readOnly' ? READ_ONLY : ''
    submit.replaceChildren(...(used ? [check(ctx), 'Sent'] : [busy ? 'Sending…' : props.submitLabel]))
    status.classList.toggle('is-error', state.kind === 'refused')
    status.textContent = state.kind === 'refused' ? `Couldn't send this: ${sentence(state.why)}. Your answers are still here; try again.` : ''
  }

  // A used-up form shows what it was sent with, in place.
  if (earlier) fill(props.fields, controls, earlier)
  const dispatch = drive(ctx, at, startControl(ctx.send !== undefined, earlier === undefined ? undefined : { kind: 'submit', values: earlier }), paint)

  element.addEventListener('submit', event => {
    event.preventDefault()
    const reading = readForm(props.fields, raw)
    showErrors(reading.errors)
    const wrong = props.fields.filter(field => reading.errors[field.id])
    if (wrong.length > 0) {
      sayUnsent(wrong.length === 1 ? 'One field needs fixing before this can be sent.' : `${wrong.length} fields need fixing before this can be sent.`)
      controls.get(wrong[0]!.id)!.focus()
      return
    }
    dispatch({ kind: 'answered', answer: { kind: 'submit', values: reading.values } })
  })

  return element
}

function fieldRow(
  field: FormField,
  ctx: DrawContext,
  controls: Map<string, Control>,
  errors: Map<string, HTMLElement>,
  composer = false,
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
  let control: Control
  if (field.input === 'select') {
    control = dom.el(
      'select',
      common,
      dom.el('option', { value: '' }, field.required ? 'Choose…' : 'None'),
      ...(field.options ?? []).map(option => dom.el('option', { value: option }, option)),
    )
  } else if (field.input === 'text' && (field.lines !== undefined || composer)) {
    const area = dom.el('textarea', { ...common, rows: String(field.lines ?? 2), placeholder: composer ? field.label : undefined, 'aria-label': composer ? field.label : undefined })
    controls.set(field.id, area)
    // In a message box the label is the placeholder and the send button sits in the box's foot.
    if (composer) return dom.el('div', { class: 'intui-field' }, dom.el('div', { class: 'intui-composer' }, area), error)
    return dom.el('div', { class: 'intui-field' }, dom.el('label', { for: id }, field.label, required), area, error)
  } else {
    // Numbers are typed as text and read by parseNumber, so a typo gets a message instead of silently becoming empty.
    control = dom.el('input', { ...common, type: 'text', inputmode: field.input === 'number' ? 'decimal' : undefined, autocomplete: 'off' })
  }
  controls.set(field.id, control)
  return dom.el('div', { class: 'intui-field' }, dom.el('label', { for: id }, field.label, required), control, error)
}

function fill(fields: readonly FormField[], controls: Map<string, Control>, values: Record<string, FieldValue>) {
  for (const field of fields) {
    const control = controls.get(field.id)!
    // `values` comes from the host and may be a plain object: only its own keys count.
    if (!Object.hasOwn(values, field.id)) continue
    const value = values[field.id]!
    if (control.type === 'checkbox') (control as HTMLInputElement).checked = value === true
    else control.value = String(value)
  }
}

/**
 * A Choice or Form being answered, as one state machine every renderer shares (hub #1956): read-only,
 * ready, sending, sent or refused. `stepControl` is the only transition: a surface sends the person's
 * answer and the host's verdict in as events, runs the effects it returns, and paints the state. An
 * answer that doesn't fit the control is refused here with core's words, and an event a state can't
 * take comes back ignored with the reason, so no surface checks or decides anything itself.
 */
import type { ChoiceProps } from "./components/choice";
import type { FormProps } from "./components/form";
import { IntuiEvent, type EventData, type FieldValue } from "./event";

/** What the person gave a control. */
export type Answer =
  | { readonly kind: "press"; readonly option: string }
  | { readonly kind: "submit"; readonly values: Readonly<Record<string, FieldValue>> };

/** One Choice or Form, as far as the person has got with it. */
export type ControlState =
  | { readonly kind: "readOnly" }
  | { readonly kind: "ready" }
  | { readonly kind: "sending"; readonly answer: Answer }
  /** A `once` control is used up; a `many` one can be answered again. */
  | { readonly kind: "sent"; readonly answer: Answer }
  /** The control is usable again and says why the answer didn't go. */
  | { readonly kind: "refused"; readonly answer: Answer; readonly why: string };

export type ControlEvent =
  | { readonly kind: "answered"; readonly answer: Answer }
  | { readonly kind: "accepted" }
  | { readonly kind: "refused"; readonly why: string };

/** The event is already checked against the control; the surface only hands it to its host. */
export type ControlEffect = { readonly kind: "send"; readonly event: EventData };

export type Step =
  | { readonly ignored: false; readonly state: ControlState; readonly effects: readonly ControlEffect[] }
  | { readonly ignored: true; readonly state: ControlState; readonly effects: readonly []; readonly why: string };

/** Which control, in which drawn tree. */
export interface ControlAt {
  readonly source: string;
  readonly control: ChoiceProps | FormProps;
}

/** The most a reason may say, on one line. */
export const WHY_LENGTH = 160;

/** One line of at most WHY_LENGTH characters, from anything a host threw or said. */
export function whyOf(error: unknown): string {
  return (error instanceof Error ? error.message : String(error)).split("\n")[0]!.slice(0, WHY_LENGTH);
}

/** Where a control starts: used up or sent from the host's record of an earlier answer, else ready, or read-only with no host. */
export function startControl(canSend: boolean, earlier: Answer | undefined): ControlState {
  if (earlier) return { kind: "sent", answer: earlier };
  return canSend ? { kind: "ready" } : { kind: "readOnly" };
}

/** Whether the control can take an answer now: the one question every surface asks before enabling its buttons. */
export function canAnswer(at: ControlAt, state: ControlState): boolean {
  switch (state.kind) {
    case "ready":
    case "refused":
      return true;
    case "sent":
      return repeats(at.control);
    case "readOnly":
    case "sending":
      return false;
    default:
      return never(state);
  }
}

/** The transition function. Pure: the same state and event always give the same step. */
export function stepControl(at: ControlAt, state: ControlState, event: ControlEvent): Step {
  switch (event.kind) {
    case "answered": {
      if (state.kind === "readOnly") return ignore(state, "this view is read-only: there is nowhere to send an answer");
      if (state.kind === "sending") return ignore(state, "an answer is already being sent; wait for it to be accepted or refused");
      if (state.kind === "sent" && !repeats(at.control)) return ignore(state, "this control was used once already and takes one answer");
      const sent = eventOf(at, event.answer);
      const problem = sent.problemWith(at.control);
      if (problem !== null) return go({ kind: "refused", answer: event.answer, why: problem.slice(0, WHY_LENGTH) });
      return go({ kind: "sending", answer: event.answer }, [{ kind: "send", event: sent.toJSON() }]);
    }
    case "accepted":
      if (state.kind !== "sending") return ignore(state, `nothing is being sent (the control is ${state.kind})`);
      return go({ kind: "sent", answer: state.answer });
    case "refused":
      if (state.kind !== "sending") return ignore(state, `nothing is being sent (the control is ${state.kind})`);
      return go({ kind: "refused", answer: state.answer, why: event.why.split("\n")[0]!.slice(0, WHY_LENGTH) });
    default:
      return never(event);
  }
}

function repeats(control: ChoiceProps | FormProps): boolean {
  return control.type === "Choice" && control.repeat === "many";
}

function eventOf(at: ControlAt, answer: Answer): IntuiEvent {
  return answer.kind === "press" ? IntuiEvent.press(at.source, at.control.id, answer.option) : IntuiEvent.submit(at.source, at.control.id, { ...answer.values });
}

function go(state: ControlState, effects: readonly ControlEffect[] = []): Step {
  return { ignored: false, state, effects };
}

function ignore(state: ControlState, why: string): Step {
  return { ignored: true, state, effects: [], why };
}

function never(value: never): never {
  throw new Error(`unhandled control case ${JSON.stringify(value)}`);
}

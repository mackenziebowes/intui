/**
 * The public face of `@intui/core`: the tree, the catalog and every component, readings,
 * events and refusals, and the text helpers. Everything a renderer or a host imports comes
 * from here.
 */
export { core, Catalog, type Author } from "./catalog";
export { defineKind, type ComponentKind, type Node, type Writer } from "./component";
export { IntuiEvent, type EventData, type FieldValue } from "./event";
export { canAnswer, startControl, stepControl, whyOf, WHY_LENGTH, type Answer, type ControlAt, type ControlEffect, type ControlEvent, type ControlState, type Step } from "./control";
export { never, parseReading, Reading, READING_KINDS, readingSchema, readingText, readingValue, shownNumber, toWire, type ReadingKind } from "./reading";
export { parsed, refusal, type Parsed, type Problem, type Refusal } from "./problems";
export { cell, cellText, formatNumber, markdownTable } from "./text";
export { Tree, VERSION, type ParseOptions, type TreeData } from "./tree";

export { Chart, SERIES_ROLES, type Annotation, type ChartProps, type Point, type Series, type SeriesRole } from "./components/chart";
export { Choice, type ChoiceOption, type ChoiceProps } from "./components/choice";
export { Flow, type FlowLink, type FlowProps, type FlowStep } from "./components/flow";
export { Form, type FormField, type FormProps } from "./components/form";
export { Group, type GroupProps } from "./components/group";
export { Label, TONES, type LabelProps, type Tone } from "./components/label";
export { Ladder, type LadderNode, type LadderProps, type LadderRung, type LadderStep, type UnknownKind } from "./components/ladder";
export { Marks, MAX_MARKS, haloText, keyText, kindCounts, stateCounts, type Mark, type MarkKind, type MarksProps, type MarksRow, type MarkState } from "./components/marks";
export { Stat, type ChangeReading, type StatProps } from "./components/stat";
export { Table, cellOf, type CellValue, type TableColumn, type TableProps } from "./components/table";
export { Text, type TextProps } from "./components/text";

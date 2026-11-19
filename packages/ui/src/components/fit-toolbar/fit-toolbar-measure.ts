import { laidOutChildren } from "../../lib/laid-out-children";

import type { FitStep } from "./fit-toolbar-context";

export type Applied = {
  /** The steps taken by each item, by its id. */
  items: ReadonlyMap<string, ReadonlySet<FitStep>>;
  /** The items in More, in their order. */
  more: readonly string[];
  /** A group has moved to a line of its own. */
  wrapping: boolean;
};

export const NONE: Applied = { items: new Map(), more: [], wrapping: false };

export const STEPS: readonly FitStep[] = ["label", "more", "collapse", "wrap", "plus"];

/** The most a search's measured least width may be, in px. */
export const FIT_SEARCH_MAX_LEAST = 120;

const ID = "data-fit-id";
const DECLARED = "data-fit-steps";
const MORE_TRIGGER = "data-fit-more-trigger";
const SHOWN = "data-fit-shown";
const WRAPPING = "data-fit-wrapping";
const ROW = "data-fit-row";
const NO_WRAP = "data-fit-first-line";
const WRAP_LINE = "data-fit-wrap-line";
export const BREAK = "data-fit-break";
const NEEDS_ICON = "data-fit-needs-icon";
const PINNED_END = "[data-slot=fit-toolbar-group-end]";

const stepAttribute = (step: FitStep) => `data-fit-${step}`;

const hasIcon = (item: Element) => item.querySelector("svg, img") !== null;

/** The group has a `wrap` step it may take: the toolbar wraps and the page lets it. */
function canWrap(group: HTMLElement, allowWrap: boolean) {
  return (
    allowWrap &&
    !group.hasAttribute(NO_WRAP) &&
    / wrap:/.test(` ${group.getAttribute(DECLARED) ?? ""}`)
  );
}

/**
 * Nothing pokes out of the toolbar or out of any of its rows, and no line has
 * broken by itself: while groups wrap, each line (one `order`) stays one line.
 */
export function fits(root: HTMLElement, allowWrap: boolean) {
  const rows = [root, ...root.querySelectorAll<HTMLElement>(`[${ROW}]`)];
  const inside = rows.every((row) => {
    if (row.getClientRects().length === 0) return true;
    const style = getComputedStyle(row);
    const end =
      row.getBoundingClientRect().right -
      parseFloat(style.borderRightWidth) -
      parseFloat(style.paddingRight);
    return laidOutChildren(row).every((box) => box.getBoundingClientRect().right <= end + 0.5);
  });
  if (!inside) return false;
  // A scrolling group gives way by scrolling, but shows one item whole at least.
  // Scrolling is its last state: while it can still wrap and hasn't, its
  // content must fit whole, so the labels and the wrap come first and only a
  // group on a line of its own scrolls (sindresorhus, 780px, 2026-11-10).
  for (const group of root.querySelectorAll<HTMLElement>("[data-fit-scroll]")) {
    if (group.getClientRects().length === 0) continue;
    const content = group.querySelector("[data-slot=scroll-area-content]") ?? group;
    const scroller = group.querySelector<HTMLElement>("[data-fit-scroller]") ?? group;
    const [first] = laidOutChildren(content);
    if (first && scroller.clientWidth + 0.5 < first.getBoundingClientRect().width) return false;
    if (canWrap(group, allowWrap) && !group.hasAttribute(stepAttribute("wrap"))) {
      if (scroller.scrollWidth > scroller.clientWidth + 0.5) return false;
    }
  }
  if (!root.hasAttribute(WRAPPING)) return true;
  // Items of different heights centered on one line start at different tops:
  // a line has broken only where an item sits wholly below or above its first.
  const lines = new Map<string, DOMRect>();
  for (const child of laidOutChildren(root)) {
    if (child.hasAttribute(BREAK)) continue;
    const line = getComputedStyle(child).order;
    const rect = child.getBoundingClientRect();
    const first = lines.get(line);
    if (first === undefined) lines.set(line, rect);
    else if (rect.top >= first.bottom - 0.5 || rect.bottom <= first.top + 0.5) return false;
  }
  return true;
}

/**
 * Takes the steps one at a time, in their order, until the toolbar fits its
 * region; writes each on the DOM as it goes and returns them. It starts from
 * nothing taken every time, so the outcome depends on the width alone.
 */
export function measure(root: HTMLElement, allowWrap: boolean): Applied {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(`[${ID}]`));
  // Taking the steps from nothing squeezes a scrolling group back to nothing:
  // keep where the person had scrolled it.
  const scrolled = Array.from(
    root.querySelectorAll<HTMLElement>("[data-fit-scroller]"),
    (scroller) => [scroller, scroller.scrollLeft] as const,
  );
  const triggers = Array.from(root.querySelectorAll<HTMLElement>(`[${MORE_TRIGGER}]`));
  for (const element of elements) {
    for (const step of STEPS) element.removeAttribute(stepAttribute(step));
    element.style.removeProperty("order");
  }
  for (const trigger of triggers) trigger.removeAttribute(SHOWN);
  root.removeAttribute(WRAPPING);
  for (const line of Array.from(root.querySelectorAll(`:scope > [${BREAK}]`))) line.remove();
  root.style.setProperty("--fit-gap", getComputedStyle(root).columnGap);

  const queue = elements.flatMap((element, index) =>
    (element.getAttribute(DECLARED) ?? "")
      .split(" ")
      .filter(Boolean)
      .map((entry) => {
        const [step, order] = entry.split(":") as [FitStep, string];
        return { element, step, order: Number(order), index };
      })
      .filter(({ step, element: item }) => {
        if (step === "more") return triggers.length > 0;
        if (step === "wrap") return canWrap(item, allowWrap);
        // An item with no icon to show refuses its `label` step: a SegmentedControl
        // of text alone (Mine and All) keeps its labels and counts.
        if (step === "label") return !item.hasAttribute(NEEDS_ICON) || hasIcon(item);
        return true;
      }),
  );
  queue.sort((a, b) => a.order - b.order || b.index - a.index);

  // Items of the same kind in one group change form at the same time: the
  // same form step (`label`, `plus`) at the same number in the same group
  // takes all of them, so a row of labels never ends up half text, half
  // icons (Jasper, 2026-11-10).
  const batches: { members: HTMLElement[]; step: FitStep }[] = [];
  const byKind = new Map<string, { members: HTMLElement[]; step: FitStep }>();
  for (const { element, step, order } of queue) {
    const group =
      step === "label" || step === "plus"
        ? element.parentElement?.closest<HTMLElement>("[data-slot=fit-toolbar-group]")
        : null;
    const kind = group ? `${group.getAttribute(ID)}|${step}|${order}` : undefined;
    const existing = kind === undefined ? undefined : byKind.get(kind);
    if (existing) {
      existing.members.push(element);
      continue;
    }
    const batch = { members: [element], step };
    if (kind !== undefined) byKind.set(kind, batch);
    batches.push(batch);
  }

  const taken = new Map<HTMLElement, Set<FitStep>>();
  const history: { members: HTMLElement[]; step: FitStep }[] = [];
  const showMore = () => {
    const shown = Array.from(taken.values()).some((steps) => steps.has("more"));
    for (const trigger of triggers) trigger.toggleAttribute(SHOWN, shown);
  };
  const take = (element: HTMLElement, step: FitStep) => {
    const steps = taken.get(element) ?? new Set<FitStep>();
    steps.add(step);
    taken.set(element, steps);
    element.setAttribute(stepAttribute(step), "");
    if (step === "more") showMore();
    if (step === "wrap") layOutLines(root, elements);
  };
  const undo = (element: HTMLElement, step: FitStep) => {
    taken.get(element)?.delete(step);
    element.removeAttribute(stepAttribute(step));
    if (step === "more") showMore();
  };

  for (const { members, step } of batches) {
    if (fits(root, allowWrap)) break;
    // An item in More, or in a group in More, has nothing left to give.
    const giving = members.filter(
      (element) =>
        !taken.get(element)?.has("more") &&
        element.parentElement?.closest(`[${stepAttribute("more")}]`) == null,
    );
    if (giving.length === 0) continue;
    for (const element of giving) take(element, step);
    history.push({ members: giving, step });
  }

  // A group that wrapped has room again on its new line: give back, last
  // first, what its items gave before it wrapped, wherever the toolbar still
  // fits without it. Taken from nothing on every measure, so a width always
  // gives the same result, narrowing or widening.
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const { members, step } = history[index]!;
    if (step === "wrap") continue;
    const group = members[0]!.closest<HTMLElement>(`[${stepAttribute("wrap")}]`);
    if (!group || !root.contains(group)) continue;
    const wrappedAt = history.findIndex(
      (entry) => entry.members.includes(group) && entry.step === "wrap",
    );
    if (wrappedAt < index) continue;
    // What is pinned at a scrolling group's end keeps the form it took: Clear
    // all stays × on the filters' line while the filters get their labels back.
    const back = members.filter((element) => element.closest(PINNED_END) === null);
    if (back.length === 0) continue;
    for (const element of back) undo(element, step);
    if (!fits(root, allowWrap)) for (const element of back) take(element, step);
  }

  const items = new Map<string, ReadonlySet<FitStep>>();
  const more: string[] = [];
  let wrapping = false;
  for (const element of elements) {
    const steps = taken.get(element);
    if (!steps || steps.size === 0) continue;
    const id = element.getAttribute(ID)!;
    items.set(id, steps);
    if (steps.has("more")) more.push(id);
    if (steps.has("wrap")) wrapping = true;
  }
  for (const [scroller, left] of scrolled) scroller.scrollLeft = left;
  return { items, more, wrapping };
}

/**
 * Puts the wrapped groups on the lines after the first: groups with the same
 * `wrapLine` share a line, in their order; any other takes one of its own.
 * A zero-height break before each line ends the one before it.
 */
export function layOutLines(root: HTMLElement, elements: readonly HTMLElement[]) {
  root.setAttribute(WRAPPING, "");
  for (const line of Array.from(root.querySelectorAll(`:scope > [${BREAK}]`))) line.remove();
  const lines: string[] = [];
  for (const group of elements) {
    if (!group.hasAttribute(stepAttribute("wrap"))) continue;
    const line = group.getAttribute(WRAP_LINE) ?? `#${group.getAttribute(ID)}`;
    let number = lines.indexOf(line);
    if (number < 0) {
      number = lines.push(line) - 1;
      const lineBreak = document.createElement("span");
      lineBreak.setAttribute(BREAK, "");
      lineBreak.setAttribute("aria-hidden", "true");
      lineBreak.style.cssText = `flex-basis: 100%; height: 0; order: ${2 * number + 1}`;
      root.append(lineBreak);
    }
    group.style.order = String(2 * number + 2);
  }
}

export const keyOf = (applied: Applied) =>
  `${applied.wrapping}|${Array.from(applied.items, ([id, steps]) => `${id}:${[...steps].join(",")}`).join(";")}`;

/** What the arrow keys stop on: every control a person can reach, a segment each. */
const STOP = [
  "button",
  "a[href]",
  "input",
  "select",
  "textarea",
  "[role=button]",
  "[role=radio]",
  "[role=checkbox]",
  "[role=switch]",
  "[role=combobox]",
].join(", ");

/** The line an element is on: the CSS `order` of the toolbar's flex item that holds it. */
function lineOf(element: HTMLElement, root: HTMLElement) {
  const chain: HTMLElement[] = [];
  for (let node: HTMLElement | null = element; node && node !== root; node = node.parentElement) {
    chain.unshift(node);
  }
  const item = chain.find((node) => getComputedStyle(node).display !== "contents") ?? element;
  return Number(getComputedStyle(item).order) || 0;
}

/**
 * The toolbar's controls in reading order: line by line as they show, in the
 * order of the DOM on each line. Wrapped groups move with CSS `order`, which
 * neither the browser's focus order nor the toolbar's own list follows
 * (WCAG 2.4.3). Leaves out what isn't shown (in More, a collapsed group's
 * items), what is disabled natively, hidden from assistive technology or
 * `inert` (the first line under an open search), or a popup's focus guard.
 */
export function readingOrder(root: HTMLElement): HTMLElement[] {
  const controls = Array.from(root.querySelectorAll<HTMLElement>(STOP)).filter(
    (control) =>
      !control.matches(":disabled") &&
      control.closest("[aria-hidden=true], [inert]") === null &&
      !control.hasAttribute("data-base-ui-focus-guard") &&
      control.getClientRects().length > 0,
  );
  const lines = new Map(controls.map((control) => [control, lineOf(control, root)]));
  return controls.sort((a, b) => lines.get(a)! - lines.get(b)!);
}

/**
 * A text field keeps the arrow keys while its caret has somewhere to go, as
 * in a composite toolbar: only at its start or end does an arrow leave it.
 */
export function keepsArrow(target: HTMLElement, forward: boolean) {
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return false;
  let start: number | null;
  try {
    start = target.selectionStart;
  } catch {
    return false;
  }
  if (start === null) return false;
  if (start !== target.selectionEnd) return true;
  return forward ? start < target.value.length : start > 0;
}

const ELLIPSIS = "\u2026";
const NO_SPACES = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u;

function placeholderCuts(text: string) {
  const words = new Set<number>();
  const chars: number[] = [];
  const Segmenter = typeof Intl === "undefined" ? undefined : Intl.Segmenter;
  if (Segmenter) {
    const parts = Array.from(new Segmenter(undefined, { granularity: "word" }).segment(text));
    parts.forEach((part, i) => {
      const next = parts[i + 1];
      if (part.isWordLike && next && !next.isWordLike) words.add(next.index);
    });
  } else {
    for (const space of text.matchAll(/\S\s/g)) words.add(space.index + 1);
  }
  const graphemes = Segmenter
    ? Array.from(new Segmenter(undefined, { granularity: "grapheme" }).segment(text), (g) => ({
        index: g.index,
        text: g.segment,
      }))
    : Array.from(text).reduce<{ index: number; text: string }[]>((all, ch) => {
        const last = all.at(-1);
        all.push({ index: last ? last.index + last.text.length : 0, text: ch });
        return all;
      }, []);
  graphemes.forEach((g, i) => {
    if (i === 0) return;
    const before = graphemes[i - 1]!.text;
    if (NO_SPACES.test(before) && NO_SPACES.test(g.text)) words.add(g.index);
    chars.push(g.index);
  });
  return { words: [...words].sort((a, b) => a - b), chars };
}

/**
 * A placeholder the field can show whole: cut at a word, then a character,
 * and only then an ellipsis. Never cuts a grapheme cluster in half, and
 * treats a run of CJK text as words at every character.
 */
export function fitPlaceholder(
  text: string,
  room: number,
  width: (text: string) => number,
): string {
  if (width(text) <= room) return text;
  const { words, chars } = placeholderCuts(text);
  const fit = (cuts: number[]) => {
    let low = 0;
    let high = cuts.length - 1;
    let found: string | undefined;
    while (low <= high) {
      const mid = (low + high) >> 1;
      const shown = text.slice(0, cuts[mid]).trimEnd();
      if (shown !== "" && width(shown + ELLIPSIS) <= room) {
        found = shown + ELLIPSIS;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return found;
  };
  return fit(words) ?? fit(chars) ?? (width(ELLIPSIS) <= room ? ELLIPSIS : "");
}

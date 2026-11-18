/**
 * Whether a text is cut off, and when to look again.
 *
 * Ported from raft-design's `lib/truncation.ts`. React's `flushSync` is not
 * needed in Vue: `commit` writes a ref and Vue batches updates itself.
 */

/** `undefined`: not known yet, or the element has no box (hidden, not laid out). */
export type Truncation = boolean | undefined;

export interface TruncationTarget {
  observe: () => Array<Element | null | undefined>;
  watch: () => Node | null | undefined;
  isolate?: () => () => void;
  read: () => Truncation;
  commit: (truncated: Truncation) => void;
}

export const TOLERANCE = 0.5;

interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function contentBox(element: Element): Box | undefined {
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return undefined;
  const view = element.ownerDocument.defaultView;
  const style = view?.getComputedStyle(element);
  const px = (value: string | undefined) => Number.parseFloat(value ?? "") || 0;
  return {
    left: rect.left + px(style?.borderLeftWidth) + px(style?.paddingLeft),
    right: rect.right - px(style?.borderRightWidth) - px(style?.paddingRight),
    top: rect.top + px(style?.borderTopWidth) + px(style?.paddingTop),
    bottom: rect.bottom - px(style?.borderBottomWidth) - px(style?.paddingBottom),
  };
}

function overflows(rects: ArrayLike<DOMRect>, box: Box) {
  for (const rect of Array.from(rects)) {
    if (rect.width === 0 && rect.height === 0) continue;
    if (rect.right > box.right + TOLERANCE || rect.left < box.left - TOLERANCE) return true;
    if (rect.top + rect.height / 2 > box.bottom + TOLERANCE) return true;
  }
  return false;
}

export function measureElement(element: Element): Truncation {
  if (!element.isConnected) return undefined;
  const box = contentBox(element);
  if (!box) return undefined;
  const range = element.ownerDocument.createRange();
  range.selectNodeContents(element);
  return overflows(range.getClientRects(), box);
}

export function measureContent(text: Element, content: Element): Truncation {
  if (!text.isConnected) return undefined;
  const box = contentBox(text);
  if (!box) return undefined;
  return overflows(content.getClientRects(), box);
}

export function readNow(target: TruncationTarget): Truncation {
  const restore = target.isolate?.();
  try {
    return target.read();
  } finally {
    restore?.();
  }
}

const targets = new Set<TruncationTarget>();
const byElement = new WeakMap<Node, TruncationTarget>();
const pending = new Set<TruncationTarget>();
let frame = 0;
let resizeObserver: ResizeObserver | undefined;
let mutationObserver: MutationObserver | undefined;
let fontsListening = false;

function flush() {
  frame = 0;
  const batch = Array.from(pending).filter((target) => targets.has(target));
  pending.clear();
  const restores = batch.map((target) => target.isolate?.());
  const results = batch.map((target) => target.read());
  for (const restore of restores) restore?.();
  batch.forEach((target, index) => {
    if (targets.has(target)) target.commit(results[index]);
  });
}

export function scheduleMeasure(target: TruncationTarget) {
  if (!targets.has(target)) return;
  pending.add(target);
  if (frame === 0 && typeof requestAnimationFrame === "function") {
    frame = requestAnimationFrame(flush);
  }
}

function scheduleAll() {
  for (const target of targets) scheduleMeasure(target);
}

function ownerOf(node: Node | null): TruncationTarget | undefined {
  for (let current = node; current; current = current.parentNode) {
    const target = byElement.get(current);
    if (target) return target;
  }
  return undefined;
}

function observers(view: Window & typeof globalThis) {
  if (!resizeObserver && "ResizeObserver" in view) {
    resizeObserver = new view.ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = byElement.get(entry.target);
        if (target) scheduleMeasure(target);
      }
    });
  }
  if (!mutationObserver && "MutationObserver" in view) {
    mutationObserver = new view.MutationObserver((records) => {
      for (const record of records) {
        const target = ownerOf(record.target);
        if (target) scheduleMeasure(target);
      }
    });
  }
  const fonts = (view.document as Document & { fonts?: FontFaceSet }).fonts;
  if (!fontsListening && fonts && typeof fonts.addEventListener === "function") {
    fonts.addEventListener("loadingdone", scheduleAll);
    fontsListening = true;
  }
}

export function observeTruncation(target: TruncationTarget) {
  const observed = target.observe().filter((element): element is Element => element != null);
  const first = observed[0];
  const view = first?.ownerDocument.defaultView;
  if (!first || !view) return () => undefined;
  observers(view);
  targets.add(target);
  for (const element of observed) {
    byElement.set(element, target);
    resizeObserver?.observe(element);
  }
  const watched = target.watch();
  if (watched) {
    byElement.set(watched, target);
    mutationObserver?.observe(watched, { childList: true, characterData: true, subtree: true });
  }
  scheduleMeasure(target);

  return () => {
    targets.delete(target);
    pending.delete(target);
    for (const element of observed) {
      if (byElement.get(element) === target) byElement.delete(element);
      resizeObserver?.unobserve(element);
    }
    if (watched && byElement.get(watched) === target) byElement.delete(watched);
    if (targets.size === 0) {
      mutationObserver?.disconnect();
      mutationObserver = undefined;
    }
  };
}

const TRAILING_GAP_PX = 8;
const BODY_SELECTOR = '[data-slot="message-item-body"]';
const TEXT_BLOCKS = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN"]);
const BLOCKS = new Set([
  ...TEXT_BLOCKS,
  "UL",
  "OL",
  "BLOCKQUOTE",
  "PRE",
  "TABLE",
  "DIV",
  "FIGURE",
  "IMG",
]);

const slotOfBody = new WeakMap<Element, Element>();
const pendingWidths = new Map<HTMLElement, number>();
const pendingStamps = new Map<HTMLElement, Element>();
let frame = 0;
let sharedObserver: ResizeObserver | null = null;

function flush() {
  frame = 0;
  for (const [body, width] of pendingWidths) {
    body.style.setProperty("--message-trailing-width", `${Math.ceil(width) + TRAILING_GAP_PX}px`);
  }
  for (const [body, slot] of pendingStamps) {
    if (body.contains(slot)) {
      stampLastLine(body, slot);
    }
  }
  pendingWidths.clear();
  pendingStamps.clear();
}

function trailingObserver(): ResizeObserver | null {
  if (typeof ResizeObserver === "undefined") {
    return null;
  }
  sharedObserver ??= new ResizeObserver((entries) => {
    for (const entry of entries) {
      const target = entry.target as HTMLElement;
      const slot = slotOfBody.get(target);
      if (slot) {
        pendingStamps.set(target, slot);
        continue;
      }
      const body = target.closest<HTMLElement>(BODY_SELECTOR);
      if (!body) {
        continue;
      }
      const box = entry.borderBoxSize?.[0];
      pendingWidths.set(body, box ? box.inlineSize : entry.contentRect.width);
    }
    if (!frame) {
      frame = requestAnimationFrame(flush);
    }
  });
  return sharedObserver;
}

function lastBlock(body: Element, slot: Element): Element | null {
  let el: Element | null = slot.previousElementSibling;
  while (el && !BLOCKS.has(el.tagName)) {
    el = el.previousElementSibling;
  }
  while (
    el &&
    el.tagName === "DIV" &&
    !el.hasAttribute("data-slot") &&
    el.lastElementChild &&
    BLOCKS.has(el.lastElementChild.tagName)
  ) {
    el = el.lastElementChild;
  }
  return el && body.contains(el) ? el : null;
}

function lastLine(block: Element): Element | null {
  if (TEXT_BLOCKS.has(block.tagName)) {
    return block;
  }
  if (block.tagName === "UL" || block.tagName === "OL") {
    const item = block.lastElementChild;
    if (item?.tagName !== "LI") {
      return null;
    }
    const inner = item.lastElementChild;
    if (inner && inner.tagName === "P") {
      return inner;
    }
    return inner && BLOCKS.has(inner.tagName) ? null : item;
  }
  if (block.tagName === "BLOCKQUOTE") {
    const inner = block.lastElementChild;
    return inner && inner.tagName === "P" ? inner : null;
  }
  return null;
}

function stampLastLine(body: HTMLElement, slot: Element) {
  const block = lastBlock(body, slot);
  const line = block ? lastLine(block) : null;
  const previous = body.querySelector("[data-trailing-line]");
  if (previous && previous !== line) {
    previous.removeAttribute("data-trailing-line");
  }
  if (line && !line.hasAttribute("data-trailing-line")) {
    line.setAttribute("data-trailing-line", "");
  }
  const ending = line ? "line" : "block";
  if (body.dataset.trailing !== ending) {
    body.dataset.trailing = ending;
  }
}

export function observeTrailing(slot: HTMLElement) {
  const body = slot.closest<HTMLElement>(BODY_SELECTOR);
  if (body) {
    stampLastLine(body, slot);
  }
  const observer = trailingObserver();
  if (!observer) {
    return () => undefined;
  }
  observer.observe(slot);
  if (body) {
    slotOfBody.set(body, slot);
    observer.observe(body);
  }
  return () => {
    observer.unobserve(slot);
    if (!body) {
      return;
    }
    observer.unobserve(body);
    slotOfBody.delete(body);
    pendingWidths.delete(body);
    pendingStamps.delete(body);
    body.querySelector("[data-trailing-line]")?.removeAttribute("data-trailing-line");
    delete body.dataset.trailing;
    body.style.removeProperty("--message-trailing-width");
  };
}

export function stampTrailingSlot(slot: HTMLElement) {
  const body = slot.closest<HTMLElement>(BODY_SELECTOR);
  if (body) {
    stampLastLine(body, slot);
  }
}

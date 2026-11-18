/**
 * Reka states every primitive with `data-state="…"`; the upstream recipes are
 * written for Base UI's discrete attributes (`data-checked`, `data-popup-open`,
 * `data-panel-open`, …). This mirrors one onto the other for the whole
 * document, so the recipe strings can stay 1:1 without touching every part.
 *
 * Only `data-state` is observed, and the mirrored attributes are never read
 * back, so this can't loop.
 */
const MIRRORED: Record<string, readonly string[]> = {
  checked: ["data-checked"],
  unchecked: ["data-unchecked"],
  indeterminate: ["data-indeterminate"],
  on: ["data-checked", "data-pressed"],
  off: ["data-unchecked"],
  open: ["data-open", "data-popup-open"],
  selected: ["data-selected"],
  active: ["data-active"],
  complete: ["data-complete"],
};

const MANAGED = new Set(Object.values(MIRRORED).flat());

/**
 * The attributes this module added to each element. Only those are removed
 * again: an element may own a same-named attribute for its own reasons, and
 * this must not take it away.
 */
const injected = new WeakMap<Element, Set<string>>();

/** Reflect one element's `data-state` onto its Base UI attribute names. */
export function syncStateAttributes(element: Element | null | undefined): void {
  if (!element) return;
  const state = element.getAttribute("data-state");
  const wanted = (state && MIRRORED[state]) || [];
  let owned = injected.get(element);
  if (!owned) {
    owned = new Set();
    injected.set(element, owned);
  }
  for (const name of MANAGED) {
    if (wanted.includes(name)) {
      if (!element.hasAttribute(name)) {
        element.setAttribute(name, "");
        owned.add(name);
      }
    } else if (owned.has(name)) {
      element.removeAttribute(name);
      owned.delete(name);
    }
  }
}

const installed = new WeakSet<Document>();

/**
 * Mirror `data-state` for every element in `doc`, now and as it changes.
 * Called once when raft-ui loads; also returned so an app can install it on a
 * second document (an iframe) explicitly.
 */
export function installStateAttributes(doc?: Document): (() => void) | undefined {
  const target = doc ?? (typeof document === "undefined" ? undefined : document);
  if (!target || installed.has(target)) return undefined;
  installed.add(target);
  const mirrorAll = (node: Node) => {
    if (node.nodeType !== 1) return;
    const element = node as Element;
    syncStateAttributes(element);
    for (const child of Array.from(element.querySelectorAll("[data-state]"))) {
      syncStateAttributes(child);
    }
  };
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") {
        syncStateAttributes(record.target as Element);
      } else {
        for (const node of Array.from(record.addedNodes)) mirrorAll(node);
      }
    }
  });
  for (const element of Array.from(target.querySelectorAll("[data-state]"))) {
    syncStateAttributes(element);
  }
  observer.observe(target.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["data-state"],
  });
  return () => {
    observer.disconnect();
    installed.delete(target);
  };
}

installStateAttributes();

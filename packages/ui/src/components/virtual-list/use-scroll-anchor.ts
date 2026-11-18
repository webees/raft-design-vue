/*
 * The scroll anchor VirtualList keeps across switching virtualization off.
 * Ported from raft-design `components/virtual-list/hooks/use-scroll-anchor.ts`.
 */
import type { Ref } from "vue";

interface AnchorSnapshot {
  element: Element;
  top: number;
}

function snapshotAnchor(scroller: HTMLDivElement, container: Element): AnchorSnapshot | null {
  const children = Array.from(container.children);
  const scrollerTop = scroller.getBoundingClientRect().top;
  let lo = 0;
  let hi = children.length - 1;
  let found = -1;
  let foundTop = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const rect = children[mid]!.getBoundingClientRect();
    if (rect.top <= scrollerTop && rect.bottom > scrollerTop) {
      found = mid;
      hi = mid - 1;
      foundTop = rect.top;
    } else {
      lo = mid + 1;
    }
  }
  const element = found < 0 ? undefined : children[found];
  return element ? { element, top: foundTop } : null;
}

/**
 * `snapshot()` remembers the item at the top of the list; `restore()` scrolls by how far it moved
 * since; `clear()` forgets it.
 */
export function useScrollAnchor(
  listEl: Readonly<Ref<HTMLDivElement | null>>,
  getVisibleItemsEl: () => Element | null,
) {
  let anchor: AnchorSnapshot | null = null;

  return {
    snapshot() {
      const scroller = listEl.value;
      const container = getVisibleItemsEl();
      if (scroller && container) anchor = snapshotAnchor(scroller, container);
    },
    restore() {
      if (!anchor) return;
      const moved = anchor.element.getBoundingClientRect().top - anchor.top;
      listEl.value?.scrollBy(0, moved);
    },
    clear() {
      anchor = null;
    },
  };
}

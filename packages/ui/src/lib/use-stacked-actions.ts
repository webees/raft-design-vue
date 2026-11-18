import { onBeforeUnmount, ref, watch, type Ref, type ShallowRef } from "vue";

import { laidOutChildren } from "./laid-out-children";

/**
 * The commit button goes on top of the stack, Cancel under it. The markup
 * stays Cancel then commit, so Tab and a screen reader keep reading in
 * markup order (see upstream `lib/stacked-actions.ts`).
 */
const COMMIT_ON_TOP = true;

export const stackedActions = [
  COMMIT_ON_TOP ? "data-stacked:flex-col-reverse" : "data-stacked:flex-col",
  "data-stacked:items-stretch",
  "data-stacked:*:data-[slot=button]:w-full data-stacked:[&>*>[data-slot=button]:only-child]:w-full",
  "not-data-measured:**:data-[slot=button]:transition-none",
];

function contentWidth(element: Element) {
  const style = getComputedStyle(element);
  return (
    element.getBoundingClientRect().width -
    (Number.parseFloat(style.paddingLeft) || 0) -
    (Number.parseFloat(style.paddingRight) || 0) -
    (Number.parseFloat(style.borderLeftWidth) || 0) -
    (Number.parseFloat(style.borderRightWidth) || 0)
  );
}

/**
 * Measure the row as a row (`data-stacked` off for the measure and put back
 * inside the same frame), so nothing is painted in between. `undefined` while
 * the frame is hidden, which is how a sheet's hidden footer is skipped.
 */
function rowOverflows(row: HTMLElement, frame: HTMLElement) {
  if (!(frame.getBoundingClientRect().width > 0)) return undefined;
  const wasStacked = row.hasAttribute("data-stacked");
  if (wasStacked) row.removeAttribute("data-stacked");
  const available = contentWidth(frame);
  let start = Number.POSITIVE_INFINITY;
  let end = Number.NEGATIVE_INFINITY;
  for (const child of laidOutChildren(row)) {
    const box = child.getBoundingClientRect();
    const style = getComputedStyle(child);
    start = Math.min(start, box.left - (Number.parseFloat(style.marginLeft) || 0));
    end = Math.max(end, box.right + (Number.parseFloat(style.marginRight) || 0));
  }
  if (wasStacked) row.setAttribute("data-stacked", "");
  return end - start > available + 0.5;
}

/**
 * Sets `data-stacked` on a footer's row of buttons when it does not fit on
 * one line. With `inParent`, the frame is the row's parent (the group of
 * buttons beside a note).
 */
export function useStackedActions<T extends HTMLElement>(
  options: { inParent?: boolean } = {},
): { row: ShallowRef<T | null>; rowRef: (element: unknown) => void; stacked: Ref<boolean> } {
  const { inParent = false } = options;
  const row = ref(null) as ShallowRef<T | null>;
  const rowRef = (element: unknown) => {
    row.value = (element ?? null) as T | null;
  };
  const stacked = ref(false);
  let stop: (() => void) | undefined;

  const cleanup = () => stop?.();

  watch(
    row,
    (current) => {
      cleanup();
      const frame = inParent ? current?.parentElement : current;
      if (!current || !frame || typeof ResizeObserver === "undefined") return;

      let raf = 0;
      let settle = 0;
      const measure = () => {
        const overflows = rowOverflows(current, frame);
        if (overflows === undefined) return;
        stacked.value = overflows;
        if (!settle && !current.hasAttribute("data-measured")) {
          settle = requestAnimationFrame(() => {
            settle = requestAnimationFrame(() => current.setAttribute("data-measured", ""));
          });
        }
      };
      const schedule = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(measure);
      };

      measure();
      const resize = new ResizeObserver(schedule);
      resize.observe(frame);
      resize.observe(current);
      for (const child of current.children) resize.observe(child);
      const mutation = new MutationObserver(schedule);
      mutation.observe(current, { childList: true, characterData: true, subtree: true });

      const fonts = typeof document === "undefined" ? undefined : document.fonts;
      let live = true;
      void fonts?.ready.then(() => {
        if (live) schedule();
      });
      fonts?.addEventListener("loadingdone", schedule);

      stop = () => {
        live = false;
        cancelAnimationFrame(raf);
        cancelAnimationFrame(settle);
        resize.disconnect();
        mutation.disconnect();
        fonts?.removeEventListener("loadingdone", schedule);
      };
    },
    { flush: "post" },
  );

  onBeforeUnmount(cleanup);

  return { row, rowRef, stacked };
}

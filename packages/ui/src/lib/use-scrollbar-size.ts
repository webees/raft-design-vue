/**
 * Publishes a scroller's classic scrollbar width as `--scrollbar-size` on the
 * scroller, for the list cells inside it (lib/list-cell.ts): a cell gives that
 * much of its 8px end inset back, so its fill sits 8px from both outer edges of
 * the list whether the scrollbar takes room or not. CSS alone can't tell the
 * two apart.
 *
 * Returns a template ref callback for the scroller.
 */
export function useScrollbarSize<E extends HTMLElement>(): (element: E | null) => void {
  let cleanup: (() => void) | null = null;
  return (element: E | null) => {
    cleanup?.();
    cleanup = null;
    if (!element || typeof ResizeObserver === "undefined") return;
    const update = () => {
      const style = getComputedStyle(element);
      const size =
        element.offsetWidth -
        element.clientWidth -
        parseFloat(style.borderLeftWidth || "0") -
        parseFloat(style.borderRightWidth || "0");
      element.style.setProperty("--scrollbar-size", `${Math.max(0, Math.round(size))}px`);
    };
    const resize = new ResizeObserver(update);
    const observeChildren = () => {
      for (const child of Array.from(element.children)) resize.observe(child);
    };
    resize.observe(element);
    observeChildren();
    const mutation = new MutationObserver(() => {
      observeChildren();
      update();
    });
    mutation.observe(element, { childList: true });
    update();
    cleanup = () => {
      resize.disconnect();
      mutation.disconnect();
    };
  };
}

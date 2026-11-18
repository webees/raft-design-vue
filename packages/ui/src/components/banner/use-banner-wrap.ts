import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import { laidOutChildren } from "../../lib/laid-out-children";

function lineCount(element: Element) {
  const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
  if (!(lineHeight > 0)) return 1;
  return Math.round(element.getBoundingClientRect().height / lineHeight);
}

function contentWidth(element: Element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  return range.getBoundingClientRect().width;
}

function actionsWidth(action: Element) {
  const items = laidOutChildren(action);
  if (items.length === 0) return contentWidth(action);
  let start = Number.POSITIVE_INFINITY;
  let end = Number.NEGATIVE_INFINITY;
  for (const item of items) {
    const box = item.getBoundingClientRect();
    start = Math.min(start, box.left);
    end = Math.max(end, box.right);
  }
  return end - start;
}

/**
 * The actions sit at the end of the last line of text only while that text
 * still fits beside them. When the text would wrap, `data-wrap` moves the
 * actions onto their own line.
 */
export function useBannerWrap(action: Ref<HTMLElement | null>) {
  const wraps = ref(false);
  let resizeObserver: ResizeObserver | undefined;
  let mutationObserver: MutationObserver | undefined;
  let frame = 0;
  let live = true;
  const fonts = typeof document === "undefined" ? undefined : document.fonts;

  function measure() {
    const element = action.value;
    const root = element?.parentElement;
    if (!element || !root) return;

    const text =
      root.querySelector(':scope > [data-slot="banner-description"]') ??
      root.querySelector(':scope > [data-slot="banner-title"]');
    if (!text) {
      wraps.value = false;
      return;
    }
    if (root.querySelector(':scope > [data-banner-close]')) {
      wraps.value = true;
      return;
    }
    const lines = lineCount(text);
    if (!element.hasAttribute("data-wrap")) {
      if (lines > 1) wraps.value = true;
      return;
    }
    if (lines > 1) return;
    const gap = Number.parseFloat(getComputedStyle(root).columnGap) || 0;
    if (
      contentWidth(text) + actionsWidth(element) + gap + 1 <=
      text.getBoundingClientRect().width
    ) {
      wraps.value = false;
    }
  }

  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(measure);
  }

  onMounted(() => {
    const element = action.value;
    const root = element?.parentElement;
    if (!element || !root) return;
    measure();
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(root);
      for (const child of root.children) resizeObserver.observe(child);
    }
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(schedule);
      mutationObserver.observe(root, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    void fonts?.ready.then(() => {
      if (live) schedule();
    });
    fonts?.addEventListener("loadingdone", schedule);
  });

  onBeforeUnmount(() => {
    live = false;
    cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    mutationObserver?.disconnect();
    fonts?.removeEventListener("loadingdone", schedule);
  });

  return wraps;
}

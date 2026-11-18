import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * Keeps `data-overflowing` truthful for the horizontal scroller. Overflow is
 * measured after layout and re-measured when the pre or its content resizes.
 */
export function useCodeBlockOverflow(pre: Ref<HTMLElement | null>) {
  const overflowing = ref(false);
  let resizeObserver: ResizeObserver | undefined;
  let mutationObserver: MutationObserver | undefined;

  function measure() {
    const element = pre.value;
    if (!element) return;
    overflowing.value = element.scrollWidth > element.clientWidth + 1;
  }

  onMounted(() => {
    measure();
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(measure);
      if (pre.value) resizeObserver.observe(pre.value);
    }
    if (typeof MutationObserver !== "undefined" && pre.value) {
      mutationObserver = new MutationObserver(measure);
      mutationObserver.observe(pre.value, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    mutationObserver?.disconnect();
  });

  return overflowing;
}

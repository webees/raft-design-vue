import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

import { toElement } from "../../lib/dom";

const EDGE = 1;

const resolveElement = toElement;

export function useTabsRowOverflow(
  listRef: Ref<unknown>,
  activeValue: Ref<unknown>,
  enabled: MaybeRefOrGetter<boolean> = true,
) {
  const overflowStart = ref(false);
  const overflowEnd = ref(false);
  let observer: ResizeObserver | undefined;
  let mutations: MutationObserver | undefined;

  const isEnabled = () => toValue(enabled);

  function measure() {
    const list = resolveElement(listRef.value);
    if (!list) return;
    const max = list.scrollWidth - list.clientWidth;
    overflowStart.value = list.scrollLeft > EDGE;
    overflowEnd.value = max > EDGE && list.scrollLeft < max - EDGE;
  }

  function revealActive() {
    const list = resolveElement(listRef.value);
    if (!list) return;
    if (list.scrollWidth <= list.clientWidth) return;
    const active = list.querySelector<HTMLElement>("[data-slot='tabs-tab'][data-active]");
    if (!active) return;
    const inset = parseFloat(getComputedStyle(list).paddingLeft) || 0;
    const left = active.offsetLeft - inset;
    const right = active.offsetLeft + active.offsetWidth + inset - list.clientWidth;
    if (left < list.scrollLeft) list.scrollLeft = left;
    else if (right > list.scrollLeft) list.scrollLeft = right;
  }

  function onWheel(event: WheelEvent) {
    const list = resolveElement(listRef.value);
    if (!list) return;
    if (list.scrollWidth <= list.clientWidth + EDGE) return;
    if (event.deltaX !== 0) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    list.scrollLeft += event.deltaY;
    event.preventDefault();
    measure();
  }

  onMounted(() => {
    if (!isEnabled()) return;
    revealActive();
    measure();
    const list = resolveElement(listRef.value);
    if (!list) return;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(list);
    }
    if (typeof MutationObserver !== "undefined") {
      mutations = new MutationObserver(() => {
        revealActive();
        measure();
      });
      mutations.observe(list, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-active"],
      });
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    mutations?.disconnect();
  });

  watch(
    () => activeValue.value,
    () => {
      if (!isEnabled()) return;
      nextTick(() => {
        revealActive();
        measure();
      });
    },
    { flush: "post" },
  );

  return {
    overflowStart,
    overflowEnd,
    measure,
    onWheel,
  };
}

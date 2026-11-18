import { onBeforeUnmount, ref, watch, type Ref } from "vue";

import { measureElement, observeTruncation, readNow, type Truncation } from "./truncation";

export function useTruncated(element: Ref<Element | null | undefined>) {
  const truncated = ref<Truncation>(undefined);
  let cleanup: (() => void) | undefined;

  watch(
    element,
    (node) => {
      cleanup?.();
      cleanup = undefined;
      truncated.value = undefined;
      if (!node) return;

      const target = {
        observe: () => [node],
        watch: () => node,
        read: () => measureElement(node),
        commit: (value: Truncation) => {
          truncated.value = value;
        },
      };
      truncated.value = readNow(target);
      cleanup = observeTruncation(target);
    },
    { immediate: true, flush: "post" },
  );

  onBeforeUnmount(() => cleanup?.());

  return truncated;
}

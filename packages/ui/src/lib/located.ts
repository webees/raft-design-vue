import { ref, watch, type Ref } from "vue";

/**
 * How long the located highlight lasts: `info-soft` at once, held 1.2s, faded
 * out by 2s (design/foundations/states.md#located). styles.css runs the
 * animation; `useLocated` drops `data-located` after this long.
 */
export const LOCATED_MS = 2000;

export type LocatedRequest = string | number | null | undefined;

/**
 * Whether an item shows the located highlight: pass it to MessageItem's
 * `located`, or set `data-located` while it is true.
 *
 * `request` names one jump to this item: a counter or token that changes on
 * every jump, `null` or `undefined` for none. Not the item's own id: a second
 * jump to the same item would pass the same value and show nothing. Each new
 * request turns the highlight off, back on two frames later and off after
 * `LOCATED_MS`.
 */
export function useLocated(request: Ref<LocatedRequest>, duration = LOCATED_MS): Ref<boolean> {
  const active = ref(false);
  let frame = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  watch(
    request,
    (value) => {
      cancelAnimationFrame(frame);
      if (timer !== undefined) clearTimeout(timer);
      active.value = false;
      if (value == null) return;
      let current = requestAnimationFrame(() => {
        current = requestAnimationFrame(() => {
          active.value = true;
          timer = setTimeout(() => {
            active.value = false;
          }, duration);
        });
      });
      frame = current;
    },
    { immediate: true, flush: "post" },
  );

  return active;
}

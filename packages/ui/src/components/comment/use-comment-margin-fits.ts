import { onBeforeUnmount, ref, watch, type Ref } from "vue";

import { DESKTOP_MEDIA_QUERY } from "../../lib/desktop-media";

export type UseCommentMarginFitsOptions = {
  minWidth?: number;
};

export function useCommentMarginFits(
  element: Ref<Element | null>,
  { minWidth = 784 }: UseCommentMarginFitsOptions = {},
) {
  const fits = ref(false);

  let media: MediaQueryList | null = null;
  let observer: ResizeObserver | null = null;

  const canMatchMedia = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function";

  const measure = () => {
    const desktop = canMatchMedia() ? window.matchMedia(DESKTOP_MEDIA_QUERY).matches : false;
    const width = element.value?.getBoundingClientRect().width ?? 0;
    fits.value = desktop && element.value !== null && width >= minWidth;
  };

  const onMediaChange = () => measure();

  watch(
    element,
    (next) => {
      if (typeof window === "undefined") return;
      if (canMatchMedia() && !media) {
        media = window.matchMedia(DESKTOP_MEDIA_QUERY);
        media.addEventListener("change", onMediaChange);
      }
      observer?.disconnect();
      observer = null;
      if (next && typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(measure);
        observer.observe(next);
      }
      measure();
    },
    { immediate: true, flush: "post" },
  );

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
    media?.removeEventListener("change", onMediaChange);
    media = null;
  });

  return fits;
}

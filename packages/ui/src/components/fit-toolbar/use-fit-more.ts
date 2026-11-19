import { useFitToolbar } from "./fit-toolbar-context";

export { useInFitToolbar } from "./fit-toolbar-context";

/**
 * Makes an element the toolbar's More: spread `props` on it. It shows only
 * while an item is in More (`data-fit-shown`); hide it otherwise.
 */
export function useFitMore() {
  const context = useFitToolbar();
  const shown = computed(() => context.moreShown());
  return {
    shown,
    props: computed(() => ({
      "data-fit-more-trigger": "",
      "data-fit-shown": shown.value ? "" : undefined,
    })),
  };
}

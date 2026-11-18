import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  useId,
  watch,
  type MaybeRefOrGetter,
  type VNode,
} from "vue";

import { useFitToolbar, type FitStep, type FitSteps } from "./fit-toolbar-context";

export type FitItemOptions = FitSteps & {
  /** What the item is in More's menu while it is there. */
  moreItem?: MaybeRefOrGetter<VNode | undefined>;
};

export function useFitItem({ moreItem: moreItemSource, ...steps }: FitItemOptions = {}) {
  const context = useFitToolbar();
  const id = `fit-${useId()}`;
  const element = ref<HTMLElement | null>(null);
  const moreItem = () => toValue(moreItemSource);
  const registry = { id, steps, moreItem: moreItem(), element: element.value };

  onMounted(() => {
    registry.element = element.value;
    context.register(registry);
  });
  onBeforeUnmount(() => context.unregister(id));
  watch(element, (node) => {
    registry.element = node;
    context.requestMeasure();
  });
  watch(moreItem, (item) => {
    registry.moreItem = item;
    context.touch(id);
  });

  const declared = computed(() =>
    Object.entries(steps)
      .filter(([, order]) => order !== undefined)
      .map(([step, order]) => `${step}:${order}`)
      .join(" "),
  );

  return {
    id,
    ref: element,
    props: computed(() => ({
      "data-fit-id": id,
      "data-fit-steps": declared.value || undefined,
    })),
    taken: (step: FitStep) => context.taken(id, step),
  };
}

<script setup lang="ts">
import { TabsList, injectTabsRootContext } from "reka-ui";
import { tabs } from "./tabs.variants";
import { tabsUiContextKey } from "./tabs-context";
import { useTabsRowOverflow } from "./use-tabs-row-overflow";

defineOptions({ name: "RaftTabsList", inheritAttrs: false });

defineProps<{
  ariaLabel?: string;
  as?: string;
  asChild?: boolean;
}>();

const attrs = useAttrs();
const ui = inject(tabsUiContextKey, {
  placement: "top" as const,
  variant: "default" as const,
});
const root = injectTabsRootContext();
const listRef = ref<unknown>(null);
const { overflowStart, overflowEnd, measure, onWheel } = useTabsRowOverflow(
  listRef,
  root.modelValue,
  () => ui.placement === "top" || ui.placement === "bottom",
);

const listClass = computed(() =>
  tabs({ variant: ui.variant, placement: ui.placement }).list({
    className: attrs.class as string,
  }),
);
</script>

<template>
  <TabsList
    ref="listRef"
    v-bind="{ ...attrs, class: undefined }"
    :aria-label="ariaLabel"
    :as="as"
    :as-child="asChild"
    data-slot="tabs-list"
    :data-variant="ui.variant"
    :data-placement="ui.placement"
    :data-overflow="
      overflowStart && overflowEnd
        ? 'both'
        : overflowStart
          ? 'start'
          : overflowEnd
            ? 'end'
            : undefined
    "
    :class="listClass"
    @scroll="measure"
    @wheel="onWheel"
  >
    <slot />
  </TabsList>
</template>

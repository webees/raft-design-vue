<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { TabsTrigger, injectTabsRootContext } from "reka-ui";
import { useTapActivation } from "../../lib/tap-activation";
import { tabs } from "./tabs.variants";
import { tabsUiContextKey } from "./tabs-context";
import DropPlaceholder from "../drag/DropPlaceholder.vue";

defineOptions({ name: "RaftTabsTab", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: string | number;
    disabled?: boolean;
    as?: string;
    asChild?: boolean;
    /** Draw the dashed place instead of the content, while the tab is lifted. */
    dropPlace?: boolean;
  }>(),
  { disabled: false, asChild: false, dropPlace: false },
);

const attrs = useAttrs();
const tapRef = useTapActivation();
const ui = inject(tabsUiContextKey, {
  placement: "top" as const,
  variant: "default" as const,
});
const root = injectTabsRootContext();
const active = computed(() => root.modelValue.value === props.value);
const tabClass = computed(() =>
  tabs({ variant: ui.variant, placement: ui.placement }).tab({
    className: attrs.class as string,
  }),
);
const contentClass = computed(() =>
  tabs({ variant: ui.variant, placement: ui.placement }).content({
    className: props.dropPlace ? "invisible" : undefined,
  }),
);
</script>

<template>
  <TabsTrigger
    :ref="tapRef"
    v-bind="{ ...attrs, class: undefined }"
    :value="value"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    data-slot="tabs-tab"
    :data-active="active ? '' : undefined"
    :class="tabClass"
  >
    <span data-slot="tabs-tab-content" :class="contentClass"><slot /></span>
    <DropPlaceholder v-if="dropPlace" class="absolute inset-0 z-raised rounded-control" />
  </TabsTrigger>
</template>

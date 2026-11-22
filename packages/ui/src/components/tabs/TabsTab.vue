<script setup lang="ts">
import { TabsTrigger, injectTabsRootContext } from "reka-ui";
import type { ItemProps } from "../../lib/item-props";
import { useItemBindings } from "../../lib/item-bindings";
import { tabs } from "./tabs.variants";
import { useTabsUi } from "./tabs-context";
import DropPlaceholder from "../drag/DropPlaceholder.vue";

defineOptions({ name: "RaftTabsTab", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    ItemProps & {
      /** Draw the dashed place instead of the content, while the tab is lifted. */
      dropPlace?: boolean;
    }
  >(),
  { disabled: false, asChild: false, dropPlace: false },
);

const ui = useTabsUi();
const root = injectTabsRootContext();
const active = computed(() => root.modelValue.value === props.value);
const { tapRef, rootAttrs } = useItemBindings(props, (className) =>
  tabs({ variant: ui.variant, placement: ui.placement }).tab({ className }),
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
    v-bind="rootAttrs"
    data-slot="tabs-tab"
    :data-active="active ? '' : undefined"
  >
    <span data-slot="tabs-tab-content" :class="contentClass"><slot /></span>
    <DropPlaceholder v-if="dropPlace" class="absolute inset-0 z-raised rounded-control" />
  </TabsTrigger>
</template>

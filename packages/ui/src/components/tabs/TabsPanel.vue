<script setup lang="ts">
import { TabsContent } from "reka-ui";
import { tabs } from "./tabs.variants";
import { tabsUiContextKey } from "./tabs-context";

defineOptions({ name: "RaftTabsPanel", inheritAttrs: false });

defineProps<{
  value: string | number;
  forceMount?: boolean;
  as?: string;
  asChild?: boolean;
}>();

const attrs = useAttrs();
const ui = inject(tabsUiContextKey, {
  placement: "top" as const,
  variant: "default" as const,
});
const panelClass = computed(() =>
  tabs({ variant: ui.variant, placement: ui.placement }).panel({
    className: attrs.class as string,
  }),
);
</script>

<template>
  <TabsContent
    v-bind="{ ...attrs, class: undefined }"
    :value="value"
    :force-mount="forceMount"
    :as="as"
    :as-child="asChild"
    data-slot="tabs-panel"
    :class="panelClass"
  >
    <slot />
  </TabsContent>
</template>

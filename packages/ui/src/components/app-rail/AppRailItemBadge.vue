<script setup lang="ts">
import { Primitive } from "reka-ui";
import { appRail } from "./app-rail.variants";

defineOptions({ name: "RaftAppRailItemBadge", inheritAttrs: false });
const props = withDefaults(defineProps<{ as?: string; asChild?: boolean; class?: string }>(), {
  as: "span",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => appRail().itemBadge({ class: props.class }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="app-rail-item-badge"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

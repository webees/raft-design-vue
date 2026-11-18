<script setup lang="ts">
import { Primitive } from "reka-ui";
import { appRail } from "./app-rail.variants";

defineOptions({ name: "RaftAppRailItemLabel", inheritAttrs: false });
const props = withDefaults(defineProps<{ as?: string; asChild?: boolean; class?: string }>(), {
  as: "span",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => appRail().itemLabel({ class: props.class }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="app-rail-item-label"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

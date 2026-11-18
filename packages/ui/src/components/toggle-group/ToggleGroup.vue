<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToggleGroupRoot } from "reka-ui";
import { toggleGroup } from "./toggle-group.variants";

defineOptions({ name: "RaftToggleGroup", inheritAttrs: false });

withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
  }>(),
  { orientation: "horizontal" },
);

const attrs = useAttrs();
const rootClass = computed(() =>
  toggleGroup().root({ className: attrs.class as string }),
);
</script>

<template>
  <ToggleGroupRoot
    v-bind="{ ...attrs, class: undefined }"
    :orientation="orientation"
    data-slot="toggle-group"
    :data-orientation="orientation"
    :class="rootClass"
  >
    <slot />
  </ToggleGroupRoot>
</template>

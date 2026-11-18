<script setup lang="ts">
import { ToolbarRoot } from "reka-ui";
import { textSelectionToolbar } from "./text-selection-toolbar.variants";

defineOptions({ name: "RaftTextSelectionToolbar", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  textSelectionToolbar().toolbar({ className: attrs.class as string }),
);
</script>

<template>
  <ToolbarRoot
    v-bind="{ ...attrs, class: undefined }"
    data-slot="text-selection-toolbar"
    :class="rootClass"
  >
    <slot />
  </ToolbarRoot>
</template>

<script setup lang="ts">
import { ToolbarButton } from "reka-ui";
import { textSelectionToolbar } from "./text-selection-toolbar.variants";

defineOptions({ name: "RaftTextSelectionToolbarButton", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  textSelectionToolbar().button({ className: attrs.class as string }),
);
</script>

<template>
  <ToolbarButton
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="text-selection-toolbar-button"
    :class="rootClass"
  >
    <slot />
  </ToolbarButton>
</template>

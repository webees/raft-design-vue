<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToolbarSeparator } from "reka-ui";
import { textSelectionToolbar } from "./text-selection-toolbar.variants";

defineOptions({ name: "RaftTextSelectionToolbarSeparator", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  textSelectionToolbar().separator({ className: attrs.class as string }),
);
</script>

<template>
  <ToolbarSeparator
    v-bind="{ ...attrs, class: undefined }"
    data-slot="text-selection-toolbar-separator"
    :class="rootClass"
  />
</template>

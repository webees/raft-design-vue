<script setup lang="ts">
import { selectionToolbar } from "./selection-toolbar.recipe";

defineOptions({ name: "RaftSelectionToolbarDock", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  selectionToolbar().dock({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="selection-toolbar-dock"
    :class="rootClass"
  >
    <slot />
  </div>
</template>

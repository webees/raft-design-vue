<script setup lang="ts">
import { computed, useAttrs } from "vue";

import FitToolbar from "../fit-toolbar/FitToolbar.vue";
import { selectionToolbar } from "./selection-toolbar.recipe";

defineOptions({ name: "RaftSelectionToolbar", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  selectionToolbar().root({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <FitToolbar
    v-bind="{ ...attrs, class: undefined }"
    data-slot="selection-toolbar"
    role="toolbar"
    :class="rootClass"
  >
    <slot />
  </FitToolbar>
</template>

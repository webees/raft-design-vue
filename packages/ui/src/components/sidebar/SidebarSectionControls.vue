<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionControls", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionControls({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="sidebar-section-controls"
    :class="rootClass"
  >
    <slot />
  </div>
</template>

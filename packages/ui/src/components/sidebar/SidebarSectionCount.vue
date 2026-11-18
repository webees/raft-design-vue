<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionCount", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionCount({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-section-count" :class="rootClass"
    ><slot
  /></span>
</template>

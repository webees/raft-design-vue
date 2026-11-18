<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionTitle", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionTitle({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-section-title" :class="rootClass"
    ><slot
  /></span>
</template>

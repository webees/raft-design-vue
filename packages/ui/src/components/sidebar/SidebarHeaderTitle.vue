<script setup lang="ts">
import { sidebarRecipe } from "./sidebar.recipe";

defineOptions({ name: "RaftSidebarHeaderTitle", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarRecipe().sidebarHeaderTitle({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-header-title" :class="rootClass">
    <slot />
  </div>
</template>

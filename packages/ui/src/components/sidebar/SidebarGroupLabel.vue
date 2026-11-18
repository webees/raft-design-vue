<script setup lang="ts">
import { sidebarRecipe } from "./sidebar.recipe";

defineOptions({ name: "RaftSidebarGroupLabel", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarRecipe().sidebarGroupLabel({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-group-label" :class="rootClass">
    <slot />
  </div>
</template>

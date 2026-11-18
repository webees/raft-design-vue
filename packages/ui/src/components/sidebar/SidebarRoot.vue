<script setup lang="ts">
import { sidebarRecipe } from "./sidebar.recipe";

defineOptions({ name: "RaftSidebarRoot", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarRecipe().sidebarRoot({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-root" :class="rootClass">
    <slot />
  </div>
</template>

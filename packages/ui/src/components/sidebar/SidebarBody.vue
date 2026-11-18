<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { sidebarRecipe } from "./sidebar.recipe";

defineOptions({ name: "RaftSidebarBody", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarRecipe().sidebarBody({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-body" :class="rootClass"><slot /></div>
</template>

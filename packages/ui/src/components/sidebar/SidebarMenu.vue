<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { sidebarMenuRecipe } from "./sidebar-menu.recipe";

defineOptions({ name: "RaftSidebarMenu", inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
  cn(sidebarMenuRecipe().sidebarMenu({ class: attrs.class as string | undefined })),
);
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="sidebar-menu"
    :class="classes"
  >
    <slot />
  </button>
</template>

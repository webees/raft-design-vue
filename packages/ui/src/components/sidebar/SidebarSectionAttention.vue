<script setup lang="ts">
import { computed, useAttrs } from "vue";

import Status from "../status/Status.vue";
import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionAttention", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "default" | "primary" | "information" | "muted" | "accent" | "success" | "warning" | "danger";
  }>(),
  { size: "md", variant: "accent" },
);

const attrs = useAttrs();
const rootClass = computed(() => sidebarSectionRecipe().sidebarSectionAttention());
const statusClass = computed(() => attrs.class as string | undefined);
</script>

<template>
  <span aria-hidden data-slot="sidebar-section-attention" :class="rootClass">
    <Status
      v-bind="{ ...attrs, class: undefined }"
      :size="props.size"
      :variant="props.variant"
      :class="statusClass"
    />
  </span>
</template>

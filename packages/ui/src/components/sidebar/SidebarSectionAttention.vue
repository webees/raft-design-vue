<script setup lang="ts">
import Status from "../status/Status.vue";
import type { StatusStyleProps } from "../../lib/status-props";
import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionAttention", inheritAttrs: false });

const props = withDefaults(defineProps<StatusStyleProps>(), { size: "md", variant: "accent" });

const attrs = useAttrs();
const rootClass = sidebarSectionRecipe().sidebarSectionAttention();
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

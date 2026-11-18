<script setup lang="ts">
import { computed, useAttrs } from "vue";

import Button from "../button/Button.vue";
import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionControl", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: "icon-md" | "icon-sm" | "icon-xs";
    variant?: "default" | "ghost" | "outline" | "danger";
    loading?: boolean;
    loadingLabel?: string;
    disabled?: boolean;
  }>(),
  { size: "icon-md", variant: "ghost", loading: false, loadingLabel: "Loading" },
);

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionControl({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    data-slot="sidebar-section-control"
    :size="props.size"
    :variant="props.variant"
    :loading="props.loading"
    :loading-label="props.loadingLabel"
    :disabled="props.disabled"
    :class="rootClass"
  >
    <slot />
  </Button>
</template>

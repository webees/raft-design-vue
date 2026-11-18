<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionHeader", inheritAttrs: false });

const props = withDefaults(defineProps<{ chevronAtEnd?: boolean }>(), { chevronAtEnd: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionHeader({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="sidebar-section-header"
    :data-chevron-at-end="props.chevronAtEnd ? '' : undefined"
    :class="rootClass"
  >
    <slot />
  </div>
</template>

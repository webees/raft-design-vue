<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleContent } from "reka-ui";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionEmpty", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionEmpty({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <CollapsibleContent v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-section-empty" :class="rootClass">
    <slot />
  </CollapsibleContent>
</template>

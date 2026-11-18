<script setup lang="ts">
import { CollapsibleContent } from "reka-ui";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarList", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarList({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <CollapsibleContent
    v-bind="{ ...attrs, class: undefined }"
    data-slot="sidebar-list"
    :class="rootClass"
  >
    <slot />
  </CollapsibleContent>
</template>

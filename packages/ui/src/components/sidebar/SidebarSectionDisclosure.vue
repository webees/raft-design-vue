<script setup lang="ts">
import { CollapsibleTrigger } from "reka-ui";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionDisclosure", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionDisclosure({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <CollapsibleTrigger
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="sidebar-section-disclosure"
    :class="rootClass"
  >
    <slot />
  </CollapsibleTrigger>
</template>

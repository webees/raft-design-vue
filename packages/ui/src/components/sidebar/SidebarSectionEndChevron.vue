<script setup lang="ts">
import { CollapsibleTrigger } from "reka-ui";
import { ChevronRight } from "lucide-vue-next";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";
import SidebarSectionControl from "./SidebarSectionControl.vue";

defineOptions({ name: "RaftSidebarSectionEndChevron", inheritAttrs: false });

const attrs = useAttrs();
const endChevronClass = computed(() =>
  sidebarSectionRecipe().sidebarSectionEndChevron({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <CollapsibleTrigger as-child>
    <SidebarSectionControl
      v-bind="{ ...attrs, class: undefined }"
      data-end-chevron=""
      :tabindex="-1"
      aria-hidden="true"
      :class="endChevronClass"
      @mousedown.prevent
    >
      <ChevronRight />
    </SidebarSectionControl>
  </CollapsibleTrigger>
</template>

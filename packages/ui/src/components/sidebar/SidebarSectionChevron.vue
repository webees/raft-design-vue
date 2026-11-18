<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSectionChevron" });

const styles = sidebarSectionRecipe();
</script>

<template>
  <span :class="styles.sidebarSectionChevronSlot()" aria-hidden="true">
    <ChevronRight data-slot="sidebar-section-chevron" class="size-3" />
  </span>
</template>

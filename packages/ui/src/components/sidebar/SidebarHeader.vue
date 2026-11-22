<script setup lang="ts">
import { sidebarRecipe } from "./sidebar.recipe";

defineOptions({ name: "RaftSidebarHeader", inheritAttrs: false });

const attrs = useAttrs();
const styles = sidebarRecipe();
const rootClass = computed(() =>
  styles.sidebarHeader({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="sidebar-header" :class="rootClass">
    <div aria-hidden data-slot="sidebar-header-mask" :class="styles.sidebarHeaderMask()">
      <div
        data-slot="sidebar-header-mask-layer"
        data-layer="solid"
        :class="styles.sidebarHeaderMaskLayer()"
      />
      <div
        data-slot="sidebar-header-mask-layer"
        data-layer="soft"
        :class="styles.sidebarHeaderMaskLayer()"
      />
      <div
        data-slot="sidebar-header-mask-layer"
        data-layer="blur"
        :class="styles.sidebarHeaderMaskLayer()"
      />
    </div>
    <slot />
  </div>
</template>

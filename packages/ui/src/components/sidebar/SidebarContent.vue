<script setup lang="ts">
import { computed, useAttrs } from "vue";

import ScrollArea from "../scroll-area/ScrollArea.vue";
import { useMobileViewport } from "../../lib/use-mobile-viewport";
import { sidebarRecipe } from "./sidebar.recipe";

defineOptions({ name: "RaftSidebarContent", inheritAttrs: false });

const attrs = useAttrs();
const isMobile = useMobileViewport();
const styles = computed(() => sidebarRecipe());
const rootClass = computed(() =>
  styles.value.sidebarContent({ class: attrs.class as string | undefined }),
);
const innerClass = computed(() =>
  styles.value.sidebarContentInner({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-if="isMobile" data-slot="sidebar-native-scroll-area" :class="rootClass">
    <div data-slot="sidebar-content" :class="styles.sidebarViewport()">
      <div :class="innerClass" style="min-width: 0; width: 100%"><slot /></div>
    </div>
  </div>
  <div v-else data-slot="sidebar-scroll-area" :class="rootClass">
    <ScrollArea
      v-bind="{ ...attrs, class: undefined }"
      data-slot="sidebar-content"
      trigger="scroll"
      overscroll="contain"
      :class="styles.sidebarViewport()"
      :content-class="innerClass"
      :content-style="{ minWidth: 0, width: '100%' }"
    >
      <slot />
    </ScrollArea>
  </div>
</template>

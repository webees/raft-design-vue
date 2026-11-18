<script setup lang="ts">
import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuFooter", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().footer({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="context-menu-footer" :class="rootClass">
    <slot />
  </div>
</template>

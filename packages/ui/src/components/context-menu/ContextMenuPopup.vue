<script setup lang="ts">
import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuPopup", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().content({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="context-menu-content" :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuShortcut", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().shortcut({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="context-menu-shortcut"
    :class="rootClass"
  >
    <slot />
  </span>
</template>

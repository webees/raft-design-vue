<script setup lang="ts">
import { ContextMenuRoot } from "reka-ui";

defineOptions({ name: "RaftContextMenu", inheritAttrs: false });

withDefaults(
  defineProps<{
    modal?: boolean;
    dir?: "ltr" | "rtl";
  }>(),
  {
    modal: true,
    dir: undefined,
  },
);
</script>

<template>
  <ContextMenuRoot v-bind="$attrs" :modal="modal" :dir="dir" data-slot="context-menu">
    <slot />
  </ContextMenuRoot>
</template>

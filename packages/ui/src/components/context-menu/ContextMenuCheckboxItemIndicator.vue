<script setup lang="ts">
import { ContextMenuItemIndicator } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuCheckboxItemIndicator", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().indicator({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <ContextMenuItemIndicator
    v-bind="{ ...attrs, class: undefined }"
    data-slot="context-menu-checkbox-item-indicator"
    :class="rootClass"
  >
    <slot>✓</slot>
  </ContextMenuItemIndicator>
</template>

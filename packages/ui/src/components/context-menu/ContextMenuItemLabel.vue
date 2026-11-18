<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuItemLabel", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().itemLabel({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="context-menu-item-label"
    :class="rootClass"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ContextMenuSeparator } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuSeparator", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().separator({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <ContextMenuSeparator
    v-bind="{ ...attrs, class: undefined }"
    data-slot="context-menu-separator"
    :class="rootClass"
  />
</template>

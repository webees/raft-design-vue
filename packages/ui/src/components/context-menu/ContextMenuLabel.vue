<script setup lang="ts">
import { ContextMenuLabel } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuLabel", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() => contextMenu().label({ class: attrs.class as string | undefined }));
</script>

<template>
  <ContextMenuLabel
    v-bind="{ ...attrs, class: undefined }"
    data-slot="context-menu-label"
    :class="rootClass"
  >
    <slot />
  </ContextMenuLabel>
</template>

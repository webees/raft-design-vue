<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ContextMenuSubContent } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuSubContent", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().content({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <ContextMenuSubContent
    v-bind="{ ...attrs, class: undefined }"
    data-slot="context-menu-content"
    :class="rootClass"
  >
    <slot />
  </ContextMenuSubContent>
</template>

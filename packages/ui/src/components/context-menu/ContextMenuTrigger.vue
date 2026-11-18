<script setup lang="ts">
import { ContextMenuTrigger } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuTrigger", inheritAttrs: false });

withDefaults(defineProps<{ disabled?: boolean; as?: string; asChild?: boolean }>(), {
  disabled: false,
  as: undefined,
  asChild: false,
});

const attrs = useAttrs();
const triggerClass = computed(() =>
  contextMenu().trigger({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <ContextMenuTrigger
    v-bind="{ ...attrs, class: undefined }"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    data-slot="context-menu-trigger"
    :class="triggerClass"
  >
    <slot />
  </ContextMenuTrigger>
</template>

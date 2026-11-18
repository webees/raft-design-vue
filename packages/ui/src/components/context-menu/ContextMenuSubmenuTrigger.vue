<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ContextMenuSubTrigger } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuSubmenuTrigger", inheritAttrs: false });

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().submenuTrigger({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="{ ...attrs, class: undefined }"
    :disabled="disabled"
    data-slot="context-menu-submenu-trigger"
    :class="rootClass"
  >
    <slot />
    <span
      aria-hidden
      data-slot="context-menu-submenu-trigger-indicator"
      :class="contextMenu().indicator()"
    >
      <svg viewBox="0 0 12 12" fill="none" class="size-3 shrink-0">
        <path
          d="m4.5 2.5 3.5 3.5-3.5 3.5"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </ContextMenuSubTrigger>
</template>

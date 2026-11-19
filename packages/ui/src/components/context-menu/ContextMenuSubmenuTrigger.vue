<script setup lang="ts">
import { ContextMenuSubTrigger } from "reka-ui";

import MenuIndicator from "./MenuIndicator.vue";
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
    <MenuIndicator
      data-slot="context-menu-submenu-trigger-indicator"
      :class="contextMenu().indicator()"
    />
  </ContextMenuSubTrigger>
</template>

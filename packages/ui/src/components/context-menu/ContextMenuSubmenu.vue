<script setup lang="ts">
import { ContextMenuSub } from "reka-ui";

defineOptions({ name: "RaftContextMenuSubmenu", inheritAttrs: false });
</script>

<template>
  <ContextMenuSub v-bind="$attrs" data-slot="context-menu-submenu">
    <slot />
  </ContextMenuSub>
</template>

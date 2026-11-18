<script setup lang="ts">
import { DropdownMenuTrigger } from "reka-ui";

defineOptions({ name: "RaftDropdownMenuTrigger", inheritAttrs: false });

withDefaults(
  defineProps<{
    asChild?: boolean;
  }>(),
  {
    asChild: false,
  },
);
</script>

<template>
  <DropdownMenuTrigger v-bind="$attrs" :as-child="asChild" data-slot="dropdown-menu-trigger">
    <slot />
  </DropdownMenuTrigger>
</template>

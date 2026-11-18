<script setup lang="ts">
import { DropdownMenuSub } from "reka-ui";

defineOptions({ name: "RaftDropdownMenuSub", inheritAttrs: false });

withDefaults(
  defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
  }>(),
  {
    defaultOpen: undefined,
    open: undefined,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();
</script>

<template>
  <DropdownMenuSub
    v-bind="$attrs"
    data-slot="dropdown-menu-submenu"
    :default-open="defaultOpen"
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DropdownMenuSub>
</template>

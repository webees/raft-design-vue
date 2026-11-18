<script setup lang="ts">
import { DropdownMenuRoot } from "reka-ui";

defineOptions({ name: "RaftDropdownMenu", inheritAttrs: false });

withDefaults(
  defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
    modal?: boolean;
  }>(),
  {
    defaultOpen: undefined,
    open: undefined,
    modal: true,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();
</script>

<template>
  <DropdownMenuRoot
    v-bind="$attrs"
    data-slot="dropdown-menu"
    :default-open="defaultOpen"
    :open="open"
    :modal="modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DropdownMenuRoot>
</template>

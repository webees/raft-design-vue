<script setup lang="ts">
import { PopoverRoot } from "reka-ui";

defineOptions({ name: "RaftPopover", inheritAttrs: false });

withDefaults(
  defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
    modal?: boolean;
  }>(),
  {
    defaultOpen: undefined,
    open: undefined,
    modal: false,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();
</script>

<template>
  <PopoverRoot
    v-bind="$attrs"
    :default-open="defaultOpen"
    :open="open"
    :modal="modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </PopoverRoot>
</template>

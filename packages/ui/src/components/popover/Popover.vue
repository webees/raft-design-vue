<script setup lang="ts">
import { PopoverRoot } from "reka-ui";
import type { DisclosureProps } from "../../lib/disclosure-props";

defineOptions({ name: "RaftPopover", inheritAttrs: false });

withDefaults(defineProps<DisclosureProps & { modal?: boolean }>(), {
  defaultOpen: undefined,
  open: undefined,
  modal: false,
});

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

<script setup lang="ts">
import { TooltipRoot } from "reka-ui";

defineOptions({ name: "RaftTooltip", inheritAttrs: false });

withDefaults(
  defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
    /** Keeps the trigger mounted but suppresses the tooltip. */
    disabled?: boolean;
    delayDuration?: number;
    disableHoverableContent?: boolean;
  }>(),
  {
    defaultOpen: undefined,
    open: undefined,
    delayDuration: undefined,
    disableHoverableContent: undefined,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();
</script>

<template>
  <TooltipRoot
    v-bind="$attrs"
    :disabled="disabled"
    :default-open="defaultOpen"
    :open="open"
    :delay-duration="delayDuration"
    :disable-hoverable-content="disableHoverableContent"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </TooltipRoot>
</template>

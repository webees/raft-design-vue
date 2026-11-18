<script setup lang="ts">
import { AlertDialogRoot } from "reka-ui";
import { OverlayLayer } from "../../lib/overlay-depth";

defineOptions({ name: "RaftAlertDialog", inheritAttrs: false });

withDefaults(
  defineProps<{ open?: boolean; defaultOpen?: boolean }>(),
  { open: undefined, defaultOpen: false },
);

const emit = defineEmits<{ "update:open": [open: boolean] }>();
</script>

<template>
  <AlertDialogRoot
    :open="open"
    :default-open="defaultOpen"
    v-bind="$attrs"
    data-slot="alert-dialog"
    @update:open="emit('update:open', $event)"
  >
    <OverlayLayer kind="dialog" :modal="true">
      <slot />
    </OverlayLayer>
  </AlertDialogRoot>
</template>

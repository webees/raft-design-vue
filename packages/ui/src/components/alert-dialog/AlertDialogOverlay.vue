<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogOverlay } from "reka-ui";
import { useParentOverlayKind } from "../../lib/overlay-depth";
import { alertDialog } from "./alert-dialog.variants";

defineOptions({ name: "RaftAlertDialogOverlay", inheritAttrs: false });

const props = withDefaults(defineProps<{ nested?: boolean }>(), { nested: false });
const attrs = useAttrs();
const nested = computed(() => props.nested || useParentOverlayKind() !== null);
const overlayClass = computed(() =>
  alertDialog({ nested: nested.value }).overlay({ className: attrs.class as string }),
);
</script>

<template>
  <AlertDialogOverlay
    v-bind="{ ...attrs, class: undefined }"
    :class="overlayClass"
    :data-nested="nested ? '' : undefined"
    data-slot="alert-dialog-overlay"
    data-raft-ui-overlay=""
  >
    <slot />
  </AlertDialogOverlay>
</template>

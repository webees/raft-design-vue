<script setup lang="ts">
import { alertDialog } from "./alert-dialog.variants";
import { useStackedActions } from "../../lib/use-stacked-actions";

defineOptions({ name: "RaftAlertDialogFooter", inheritAttrs: false });

const attrs = useAttrs();
const footerClass = computed(() => alertDialog().footer({ className: attrs.class as string }));
const { rowRef, stacked } = useStackedActions<HTMLElement>();
</script>

<template>
  <div
    :ref="rowRef"
    v-bind="{ ...attrs, class: undefined }"
    :class="footerClass"
    :data-stacked="stacked ? '' : undefined"
    data-slot="alert-dialog-footer"
  >
    <slot />
  </div>
</template>

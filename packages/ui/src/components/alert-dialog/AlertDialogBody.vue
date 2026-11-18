<script setup lang="ts">
import { alertDialog } from "./alert-dialog.variants";

defineOptions({ name: "RaftAlertDialogBody", inheritAttrs: false });

const attrs = useAttrs();
const bodyClass = computed(() => alertDialog().body({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="bodyClass" data-slot="alert-dialog-body">
    <slot />
  </div>
</template>

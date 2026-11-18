<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { alertDialog } from "./alert-dialog.variants";

defineOptions({ name: "RaftAlertDialogHeader", inheritAttrs: false });

const attrs = useAttrs();
const headerClass = computed(() => alertDialog().header({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="headerClass"
    data-slot="alert-dialog-header"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComboboxPortal } from "reka-ui";
defineOptions({ name: "RaftComboboxPortal", inheritAttrs: false });
defineProps<{
  to?: string | HTMLElement;
  disabled?: boolean;
  forceMount?: boolean;
}>();
</script>

<template>
  <ComboboxPortal :to="to" :disabled="disabled" :force-mount="forceMount">
    <div
      v-bind="$attrs"
      data-slot="combobox-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </ComboboxPortal>
</template>

<script setup lang="ts">
import { ComboboxPortal } from "reka-ui";
defineOptions({ name: "RaftComboboxPortal" });
defineProps<{
  to?: string | HTMLElement;
  disabled?: boolean;
  forceMount?: boolean;
}>();
</script>

<template>
  <ComboboxPortal
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
    data-slot="combobox-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </ComboboxPortal>
</template>

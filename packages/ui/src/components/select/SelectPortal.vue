<script setup lang="ts">
import { SelectPortal } from "reka-ui";

defineOptions({ name: "RaftSelectPortal" });
defineProps<{ to?: string | HTMLElement; disabled?: boolean; forceMount?: boolean }>();
</script>

<template>
  <SelectPortal
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
    data-slot="select-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </SelectPortal>
</template>

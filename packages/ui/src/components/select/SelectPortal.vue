<script setup lang="ts">
import { SelectPortal } from "reka-ui";

defineOptions({ name: "RaftSelectPortal", inheritAttrs: false });
defineProps<{ to?: string | HTMLElement; disabled?: boolean; forceMount?: boolean }>();
</script>

<template>
  <SelectPortal
    v-bind="$attrs"
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
    data-slot="select-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </SelectPortal>
</template>

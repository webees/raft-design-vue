<script setup lang="ts">
import { SelectPortal } from "reka-ui";

defineOptions({ name: "RaftSelectPortal", inheritAttrs: false });
defineProps<{ to?: string | HTMLElement; disabled?: boolean; forceMount?: boolean }>();
</script>

<template>
  <SelectPortal :to="to" :disabled="disabled" :force-mount="forceMount">
    <div
      v-bind="$attrs"
      data-slot="select-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </SelectPortal>
</template>

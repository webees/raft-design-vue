<script setup lang="ts">
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftKbdGroup", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() => cn("inline-flex items-center gap-1", attrs.class as string));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="kbd-group" :class="rootClass">
    <slot />
  </span>
</template>

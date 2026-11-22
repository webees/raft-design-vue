<script setup lang="ts">
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowBottom", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const lineClass = computed(() => cn(styles.line(), props.class));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="list-row-bottom" :class="lineClass">
    <slot />
  </span>
</template>

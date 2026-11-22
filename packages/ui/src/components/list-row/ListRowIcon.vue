<script setup lang="ts">
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowIcon", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const iconClass = computed(() => cn(styles.icon(), props.class));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="list-row-icon" :class="iconClass">
    <slot />
  </span>
</template>

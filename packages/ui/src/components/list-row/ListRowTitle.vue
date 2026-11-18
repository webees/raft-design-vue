<script setup lang="ts">
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowTitle", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const titleClass = computed(() => cn(styles.title(), props.class, attrs.class as string));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="list-row-title" :class="titleClass">
    <slot />
  </span>
</template>

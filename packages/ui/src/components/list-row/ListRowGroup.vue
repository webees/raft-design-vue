<script setup lang="ts">
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowGroup", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const groupClass = computed(() => cn(styles.group(), props.class, attrs.class as string));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="list-row-group" :class="groupClass">
    <slot />
  </div>
</template>

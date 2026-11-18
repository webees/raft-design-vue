<script setup lang="ts">
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowMeta", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const metaClass = computed(() => cn(styles.meta(), props.class, attrs.class as string));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="list-row-meta" :class="metaClass">
    <slot />
  </span>
</template>

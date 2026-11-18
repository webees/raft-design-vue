<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowChevron", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const chevronClass = computed(() => cn(styles.chevron(), props.class, attrs.class as string));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="list-row-chevron" :class="chevronClass">
    <slot><ChevronRight aria-hidden="true" /></slot>
  </span>
</template>

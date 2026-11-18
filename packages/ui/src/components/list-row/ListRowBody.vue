<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowBody", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const bodyClass = computed(() => cn(styles.body(), props.class, attrs.class as string));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="list-row-body" :class="bodyClass">
    <slot />
  </span>
</template>

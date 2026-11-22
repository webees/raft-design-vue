<script setup lang="ts">
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowDescription", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const descriptionClass = computed(() => cn(styles.description(), props.class));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="list-row-description"
    :class="descriptionClass"
  >
    <slot />
  </span>
</template>

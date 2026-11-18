<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { listRow } from "./list-row.variants";

defineOptions({ name: "RaftListRowSubtitle", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const styles = listRow();
const subtitleClass = computed(() => cn(styles.subtitle(), props.class, attrs.class as string));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="list-row-subtitle"
    :class="subtitleClass"
  >
    <slot />
  </span>
</template>

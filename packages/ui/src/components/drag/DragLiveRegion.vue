<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { useDragEngine } from "./drag-context";

defineOptions({ name: "RaftDragLiveRegion", inheritAttrs: false });
const attrs = useAttrs();

const props = defineProps<{ message?: string }>();
const engine = useDragEngine();
const text = computed(() => props.message ?? engine?.message.value ?? "");
</script>

<template>
  <span
    aria-atomic="true"
    aria-live="polite"
    data-slot="drag-live-region"
    role="status"
    :class="cn('sr-only', attrs.class as string | undefined)"
    v-bind="{ ...attrs, class: undefined }"
  >
    {{ text }}
  </span>
</template>

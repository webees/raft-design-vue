<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { emptyState } from "./empty-state.variants";

defineOptions({ name: "RaftEmptyStateTitle", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { title } = emptyState();
const rootClass = computed(() => cn(title(), attrs.class as string));
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="empty-state-title"
  >
    <slot />
  </Primitive>
</template>

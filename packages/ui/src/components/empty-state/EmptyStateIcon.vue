<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { emptyState } from "./empty-state.variants";

defineOptions({ name: "RaftEmptyStateIcon", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { icon } = emptyState();
const rootClass = computed(() => cn(icon(), attrs.class as string));
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    aria-hidden="true"
    data-slot="empty-state-icon"
  >
    <slot />
  </Primitive>
</template>

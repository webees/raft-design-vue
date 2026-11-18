<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { emptyState } from "./empty-state.variants";

defineOptions({ name: "RaftEmptyStateDescription", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { description } = emptyState();
const rootClass = computed(() => cn(description(), attrs.class as string));
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="empty-state-description"
  >
    <slot />
  </Primitive>
</template>

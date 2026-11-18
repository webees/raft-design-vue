<script setup lang="ts">
import { cn } from "../../lib/cn";
import DropPlaceholder from "./DropPlaceholder.vue";

defineOptions({ name: "RaftDraggedSlot" });

const props = withDefaults(
  defineProps<{
    /** This item is the one being dragged. Render the slot around every item. */
    dragging?: boolean;
    /** The dragged item still stands at its own place. */
    home?: boolean;
    /** The item's radius class, for the place: `rounded-control` by default. */
    radius?: string;
    /** Classes for the place, after `radius`. */
    class?: string;
  }>(),
  { dragging: false, home: false },
);

const place = computed(() => props.dragging && !props.home);
</script>

<template>
  <div data-slot="drag-slot" class="relative">
    <div
      :data-drag-origin="dragging && home ? '' : undefined"
      :class="place ? 'invisible' : undefined"
    >
      <slot />
    </div>
    <DropPlaceholder v-if="place" :class="cn('absolute inset-0', radius, props.class)" />
  </div>
</template>

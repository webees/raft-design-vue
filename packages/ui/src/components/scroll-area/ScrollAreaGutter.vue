<script setup lang="ts">
import type { Ref } from "vue";
import { cn } from "../../lib/cn";
import type { ScrollAxis } from "./scroll-geometry";
import { useRailPointer } from "./use-rail-pointer";

const props = defineProps<{
  axis: ScrollAxis;
  containerRef: Ref<HTMLElement | null>;
  shortened: boolean;
  setThumbRef: (element: HTMLElement | null) => void;
  onDraggingChange: (dragging: boolean) => void;
}>();

const { dragging, railHandlers, thumbHandlers } = useRailPointer({
  axis: props.axis,
  containerRef: props.containerRef,
  onDraggingChange: props.onDraggingChange,
});

const vertical = computed(() => props.axis === "y");
</script>

<template>
  <div
    v-bind="railHandlers"
    data-slot="scroll-area-scrollbar"
    :data-orientation="vertical ? 'vertical' : 'horizontal'"
    :class="
      cn(
        'r-scroll-area__gutter',
        vertical ? 'r-scroll-area__gutter--vertical' : 'r-scroll-area__gutter--horizontal',
        dragging && 'r-scroll-area__gutter--dragging',
        shortened && 'r-scroll-area__gutter--shortened',
      )
    "
  >
    <div
      v-bind="thumbHandlers"
      :ref="(element) => setThumbRef(element as HTMLElement | null)"
      data-slot="scroll-area-thumb"
      class="r-scroll-area__thumb"
    />
  </div>
</template>

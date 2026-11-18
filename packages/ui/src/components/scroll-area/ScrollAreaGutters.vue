<script setup lang="ts">
import type { Ref } from "vue";
import type { CSSProperties } from "vue";

import { cn } from "../../lib/cn";
import ScrollAreaGutter from "./ScrollAreaGutter.vue";

export type ScrollAreaGuttersBinding = {
  containerRef: Ref<HTMLElement | null>;
  rails: { xRail: boolean; yRail: boolean };
  setDragging: (dragging: boolean) => void;
  setGuttersRef: (element: HTMLElement | null) => void;
  setXThumbRef: (element: HTMLElement | null) => void;
  setYThumbRef: (element: HTMLElement | null) => void;
};

const props = defineProps<{
  binding: ScrollAreaGuttersBinding;
  class?: string;
  style?: CSSProperties;
}>();
</script>

<template>
  <div
    :ref="(element) => props.binding.setGuttersRef(element as HTMLElement | null)"
    data-slot="scroll-area-gutters"
    :class="cn('r-scroll-area__gutters', props.class)"
    :style="props.style"
  >
    <ScrollAreaGutter
      v-if="props.binding.rails.yRail"
      axis="y"
      :container-ref="props.binding.containerRef"
      :shortened="props.binding.rails.xRail"
      :set-thumb-ref="props.binding.setYThumbRef"
      :on-dragging-change="props.binding.setDragging"
    />
    <ScrollAreaGutter
      v-if="props.binding.rails.xRail"
      axis="x"
      :container-ref="props.binding.containerRef"
      :shortened="props.binding.rails.yRail"
      :set-thumb-ref="props.binding.setXThumbRef"
      :on-dragging-change="props.binding.setDragging"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, useAttrs, type CSSProperties } from "vue";

import { cn } from "../../lib/cn";
import ScrollAreaGutters from "./ScrollAreaGutters.vue";
import type {
  ScrollAreaEdges,
  ScrollAreaOverscroll,
  ScrollAreaSize,
  ScrollAreaTrigger,
} from "./types";
import { useScrollAreaContainer } from "./use-scroll-area-container";

defineOptions({ name: "RaftScrollAreaTextarea", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    hideDelay?: number;
    onEdgeChange?: (edges: ScrollAreaEdges) => void;
    overscroll?: ScrollAreaOverscroll;
    size?: ScrollAreaSize;
    trigger?: ScrollAreaTrigger;
    wrapperClass?: string;
    wrapperStyle?: CSSProperties;
  }>(),
  {
    hideDelay: 600,
    overscroll: "none",
    size: "medium",
    trigger: "hover",
  },
);

const attrs = useAttrs();

const area = useScrollAreaContainer({
  fade: false,
  guttersPosition: "absolute",
  hideDelay: props.hideDelay,
  onEdgeChange: props.onEdgeChange,
  overscroll: props.overscroll,
  size: props.size,
  trigger: props.trigger,
});

const textarea = ref<HTMLTextAreaElement | null>(null);

const setFrame = (element: unknown) => {
  area.frameRef.value = (element as HTMLElement | null) ?? null;
};
const setTextarea = (element: unknown) => {
  textarea.value = (element as HTMLTextAreaElement | null) ?? null;
  area.containerRef.value = textarea.value;
  area.contentRef.value = textarea.value;
};

const frameClass = computed(() =>
  cn(area.blockClassName.value, "r-scroll-area--textarea", props.wrapperClass),
);

const frameStyle = computed(() => [props.wrapperStyle, area.blockStyle.value]);

const binding = computed(() => ({
  containerRef: area.containerRef,
  rails: area.rails,
  setDragging: area.setDragging,
  setGuttersRef: area.setGuttersRef,
  setXThumbRef: area.setXThumbRef,
  setYThumbRef: area.setYThumbRef,
}));

const handleInput = () => {
  area.measure();
};

onMounted(() => area.measure());
onUpdated(() => area.measure());
</script>

<template>
  <div :ref="setFrame" data-slot="scroll-area-textarea" :class="frameClass" :style="frameStyle">
    <textarea
      :ref="setTextarea"
      v-bind="attrs"
      :class="cn(area.scroller.value, 'r-scroll-area__textarea', props.class)"
      @input="handleInput"
    />
    <ScrollAreaGutters :binding="binding" />
  </div>
</template>

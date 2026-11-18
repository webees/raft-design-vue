<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, type Ref, type StyleValue } from "vue";

import { cn } from "../../lib/cn";
import ScrollAreaGutters from "./ScrollAreaGutters.vue";
import type {
  ScrollAreaActions,
  ScrollAreaEdges,
  ScrollAreaOrientation,
  ScrollAreaOverscroll,
  ScrollAreaSize,
  ScrollAreaTrigger,
} from "./types";
import { useScrollAreaContainer } from "./use-scroll-area-container";

defineOptions({ name: "RaftScrollArea", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    actionsRef?: Ref<ScrollAreaActions | null> | null;
    as?: string;
    contentClass?: string;
    contentStyle?: CSSProperties;
    fade?: boolean;
    hideDelay?: number;
    onEdgeChange?: (edges: ScrollAreaEdges) => void;
    onScroll?: (event: Event) => void;
    orientation?: ScrollAreaOrientation;
    overscroll?: ScrollAreaOverscroll;
    railInset?: Partial<Record<"top" | "bottom" | "left" | "right", number>>;
    size?: ScrollAreaSize;
    style?: StyleValue;
    tabIndex?: number;
    trigger?: ScrollAreaTrigger;
  }>(),
  {
    as: "div",
    fade: false,
    hideDelay: 600,
    orientation: "vertical",
    overscroll: "none",
    size: "medium",
    trigger: "hover",
  },
);

const attrs = useAttrs();

const area = useScrollAreaContainer({
  actionsRef: props.actionsRef ?? undefined,
  fade: props.fade,
  hideDelay: props.hideDelay,
  onEdgeChange: props.onEdgeChange,
  orientation: props.orientation,
  overscroll: props.overscroll,
  railInset: props.railInset,
  size: props.size,
  trigger: props.trigger,
});

const setRoot = (element: unknown) => {
  const root = (element as HTMLElement | null) ?? null;
  area.containerRef.value = root;
  area.frameRef.value = root;
};

const setContent = (element: unknown) => {
  const content = (element as HTMLElement | null) ?? null;
  area.contentRef.value = content;
  area.fadeRef.value = content;
};

const hasContentWrapper = computed(
  () => props.contentClass !== undefined || props.contentStyle !== undefined || props.fade,
);

const rootClass = computed(() => cn(area.blockClassName.value, "r-scroll-area__viewport"));

const rootStyle = computed(() => area.blockStyle.value);

const binding = computed(() => ({
  containerRef: area.containerRef,
  rails: area.rails,
  setDragging: area.setDragging,
  setGuttersRef: area.setGuttersRef,
  setXThumbRef: area.setXThumbRef,
  setYThumbRef: area.setYThumbRef,
}));

defineExpose({
  measure: area.measure,
  scrollToElement: area.scrollToElement,
  scrollable: area.scrollable,
});
</script>

<template>
  <component
    :is="props.as"
    :ref="setRoot"
    data-slot="scroll-area"
    :class="rootClass"
    :style="rootStyle"
    :tabindex="props.tabIndex ?? (area.scrollable() ? 0 : undefined)"
    @scroll="props.onScroll"
    v-bind="attrs"
  >
    <ScrollAreaGutters :binding="binding" />
    <div
      v-if="hasContentWrapper"
      :ref="setContent"
      data-slot="scroll-area-content"
      :class="cn('r-scroll-area__content', props.contentClass)"
      :style="props.contentStyle"
    >
      <slot />
    </div>
    <slot v-else />
  </component>
</template>

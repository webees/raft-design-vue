<script setup lang="ts">
import type { Ref } from "vue";

import { cn } from "../../lib/cn";
import ScrollAreaGutters from "./ScrollAreaGutters.vue";
import type { ScrollAreaActions, ScrollAreaOwnProps } from "./types";
import { useScrollAreaContainer } from "./use-scroll-area-container";

defineOptions({ name: "RaftScrollArea", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    Omit<ScrollAreaOwnProps, "actionsRef" | "class" | "contentClass"> & {
      actionsRef?: Ref<ScrollAreaActions | null> | null;
      contentClass?: string;
    }
  >(),
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

const rootStyle = computed(() => [area.blockStyle.value, props.style]);

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
    <ScrollAreaGutters :binding="area.binding" />
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

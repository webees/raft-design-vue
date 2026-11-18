<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { useHoldsFocusable } from "../../lib/use-holds-focusable";
import ScrollAreaGutters from "../scroll-area/ScrollAreaGutters.vue";
import { useScrollAreaContainer } from "../scroll-area/use-scroll-area-container";
import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerBody", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    asChild?: boolean;
    class?: string;
    scrollArea?: boolean;
    tabIndex?: number;
    wrapperClassName?: string;
  }>(),
  {
    as: "div",
    asChild: false,
    scrollArea: false,
  },
);

const attrs = useAttrs();
const config = useDrawerConfig();
const scrollMode = computed(() => props.scrollArea && config.swipeAxis === "x");

const area = useScrollAreaContainer({
  guttersPosition: "absolute",
  orientation: "both",
  overscroll: "contain",
});

const variants = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }),
);
const classes = computed(() => variants.value.body({ className: props.class }));
const frameClasses = computed(() =>
  cn(area.blockClassName.value, variants.value.bodyFrame({ className: props.wrapperClassName })),
);
const scrollClasses = computed(() =>
  cn(area.scroller.value, variants.value.bodyScroll({ className: props.class })),
);
const holdsFocusable = useHoldsFocusable(area.containerRef);
const guttersBinding = computed(() => ({
  containerRef: area.containerRef,
  rails: area.rails,
  setDragging: area.setDragging,
  setGuttersRef: area.setGuttersRef,
  setXThumbRef: area.setXThumbRef,
  setYThumbRef: area.setYThumbRef,
}));

const effectiveTabIndex = computed(() => {
  if (props.tabIndex !== undefined) {
    return props.tabIndex;
  }
  if (holdsFocusable.value) {
    return -1;
  }
  return area.scrollable() ? 0 : undefined;
});

function setContainer(element: unknown) {
  area.containerRef.value = toElement(element);
}
</script>

<template>
  <div
    v-if="scrollMode"
    :ref="(element) => (area.frameRef.value = element as HTMLElement | null)"
    data-slot="drawer-body-frame"
    :class="frameClasses"
    :style="area.blockStyle.value"
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      :ref="setContainer"
      v-bind="{ ...attrs, class: undefined }"
      data-slot="drawer-body"
      :class="scrollClasses"
      :tabindex="effectiveTabIndex"
    >
      <slot />
    </Primitive>
    <ScrollAreaGutters :binding="guttersBinding" />
  </div>
  <Primitive
    v-else
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="drawer-body"
    :class="classes"
    :tabindex="tabIndex"
  >
    <slot />
  </Primitive>
</template>

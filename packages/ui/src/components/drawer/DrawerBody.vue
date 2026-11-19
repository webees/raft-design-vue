<script setup lang="ts">
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { useHoldsFocusable } from "../../lib/use-holds-focusable";
import ScrollAreaGutters from "../scroll-area/ScrollAreaGutters.vue";
import { useScrollAreaContainer } from "../scroll-area/use-scroll-area-container";
import { useDrawerConfig, useDrawerRecipe } from "./drawer-context";

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

const variants = useDrawerRecipe();
const classes = computed(() => variants.value.body({ className: props.class }));
const frameClasses = computed(() =>
  cn(area.blockClassName.value, variants.value.bodyFrame({ className: props.wrapperClassName })),
);
const scrollClasses = computed(() =>
  cn(area.scroller.value, variants.value.bodyScroll({ className: props.class })),
);
const holdsFocusable = useHoldsFocusable(area.containerRef);
const effectiveTabIndex = computed(() => {
  if (props.tabIndex !== undefined) {
    return props.tabIndex;
  }
  if (holdsFocusable.value) {
    return -1;
  }
  return area.scrollable() ? 0 : undefined;
});
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
      :ref="area.setContainer"
      v-bind="{ ...attrs, class: undefined }"
      data-slot="drawer-body"
      :class="scrollClasses"
      :tabindex="effectiveTabIndex"
    >
      <slot />
    </Primitive>
    <ScrollAreaGutters :binding="area.binding" />
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

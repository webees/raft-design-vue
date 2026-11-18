<script setup lang="ts">
import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { useHoldsFocusable } from "../../lib/use-holds-focusable";
import ScrollAreaGutters from "../scroll-area/ScrollAreaGutters.vue";
import { useScrollAreaContainer } from "../scroll-area/use-scroll-area-container";
import { activityInboxShell } from "./activity-inbox.recipes";

defineOptions({ name: "RaftActivityInboxViewport", inheritAttrs: false });

const attrs = useAttrs();
const styles = activityInboxShell();
const area = useScrollAreaContainer({ guttersPosition: "absolute", overscroll: "contain" });
const holdsFocusable = useHoldsFocusable(area.containerRef);
const frameClass = computed(() =>
  cn(area.blockClassName.value, styles.frame({ class: attrs.frameClass as string | undefined })),
);
const viewportClass = computed(() =>
  cn(area.scroller.value, styles.viewport({ class: attrs.class as string | undefined })),
);
const gutters = computed(() => ({
  containerRef: area.containerRef,
  rails: area.rails,
  setDragging: area.setDragging,
  setGuttersRef: area.setGuttersRef,
  setXThumbRef: area.setXThumbRef,
  setYThumbRef: area.setYThumbRef,
}));
const tabIndex = computed(() => (holdsFocusable.value ? -1 : area.scrollable() ? 0 : undefined));
const setContainer = (element: unknown) => {
  area.containerRef.value = toElement(element);
};
</script>

<template>
  <div data-slot="activity-inbox-viewport-frame" :class="frameClass" :style="area.blockStyle.value">
    <div
      v-bind="{ ...attrs, class: undefined, frameClass: undefined }"
      :ref="setContainer"
      data-slot="activity-inbox-viewport"
      :tabindex="tabIndex"
      :class="viewportClass"
    >
      <slot />
    </div>
    <ScrollAreaGutters :binding="gutters" />
  </div>
</template>

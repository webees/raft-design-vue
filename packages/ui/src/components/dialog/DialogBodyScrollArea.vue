<script setup lang="ts">
import { cn } from "../../lib/cn";
import { useHoldsFocusable } from "../../lib/use-holds-focusable";
import ScrollAreaGutters from "../scroll-area/ScrollAreaGutters.vue";
import { useScrollAreaContainer } from "../scroll-area/use-scroll-area-container";
import { dialog } from "./dialog.variants";
import { dialogSheet, useDialogSheet } from "./dialog-sheet-context";

defineOptions({ name: "RaftDialogBodyScrollArea", inheritAttrs: false });

const props = defineProps<{
  tabIndex?: number;
  wrapperClassName?: string;
}>();

const attrs = useAttrs();
const sheet = useDialogSheet();
const inSheet = computed(() => !!sheet?.sheet.value);

const area = useScrollAreaContainer({
  guttersPosition: "absolute",
  // As the native body, whose `overflow-y: auto` makes the other axis `auto`
  // too: a child wider than the body is scrolled to, not cut off.
  orientation: "both",
  // As PanelScrollViewport: the scroll stops at the body's end, and a Mac
  // trackpad or iOS still bounces it.
  overscroll: "contain",
});

const variants = computed(() => dialog());
const frameClass = computed(() =>
  cn(area.blockClassName.value, variants.value.bodyFrame({ className: props.wrapperClassName })),
);
const scrollClass = computed(() =>
  cn(
    area.scroller.value,
    variants.value.bodyScroll({
      className: cn(
        inSheet.value ? dialogSheet().body() : undefined,
        attrs.class as string | undefined,
      ),
    }),
  ),
);
const holdsFocusable = useHoldsFocusable(area.containerRef);
const effectiveTabIndex = computed(() => {
  if (props.tabIndex !== undefined) return props.tabIndex;
  if (holdsFocusable.value) return -1;
  return area.scrollable() ? 0 : undefined;
});
</script>

<template>
  <div
    :ref="(element) => (area.frameRef.value = element as HTMLElement | null)"
    data-slot="dialog-body-frame"
    :class="frameClass"
    :style="area.blockStyle.value"
  >
    <div
      :ref="area.setContainer"
      v-bind="{ ...attrs, class: undefined }"
      data-slot="dialog-body"
      :class="scrollClass"
      :tabindex="effectiveTabIndex"
    >
      <slot />
    </div>
    <ScrollAreaGutters :binding="area.binding" />
  </div>
</template>

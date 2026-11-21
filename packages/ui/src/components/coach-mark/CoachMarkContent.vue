<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "reka-ui";

import { cn } from "../../lib/cn";
import { omitAttrs } from "../../lib/attrs";
import { frameCollision, readFrameInsets } from "../../lib/frame-insets";
import { useSheetPopupBoundary } from "../../lib/popup-boundary";
import { popover } from "../popover/popover.variants";
import { PopoverArrow } from "../popover";
import { useCoachMarkContext } from "./coach-mark-context";
import { coachMark } from "./coach-mark.variants";

defineOptions({ name: "RaftCoachMarkContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    collisionPadding?: number;
    className?: string;
  }>(),
  { side: "bottom", sideOffset: 8, align: "center", alignOffset: 0, collisionPadding: 8 },
);

const attrs = useAttrs();
const { anchor, popupRef, dismiss } = useCoachMarkContext("Content");
const insets = computed(() => readFrameInsets());
const sheetBoundary = useSheetPopupBoundary();
const collision = computed(() =>
  frameCollision(props.collisionPadding, sheetBoundary.value, insets.value),
);
const collisionBoundary = computed(() => collision.value.collisionBoundary as Element | undefined);
const classes = computed(() =>
  cn(
    popover().content(),
    coachMark().content(),
    props.className,
    attrs.class as string | undefined,
  ),
);
const popupAttrs = computed(() => omitAttrs(attrs, "class"));

function setPopup(element: unknown) {
  popupRef.value = element instanceof HTMLElement ? element : null;
}

function onEscapeKeyDown(event: KeyboardEvent) {
  const from = event.target;
  const popup = popupRef.value;
  if (from instanceof Node && popup?.contains(from)) {
    event.preventDefault();
    dismiss();
    return;
  }
  // Esc elsewhere belongs to what has focus (a composer's suggestions, an
  // edit): leave the event to it and keep the tour open.
  event.preventDefault();
}
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      :reference="anchor ?? undefined"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :collision-padding="collision.collisionPadding"
      :collision-boundary="collisionBoundary"
      :class="popover().positioner()"
      @open-auto-focus.prevent
      @close-auto-focus.prevent
      @interact-outside.prevent
      @focus-outside.prevent
      @escape-key-down="onEscapeKeyDown"
    >
      <div :ref="setPopup" v-bind="popupAttrs" data-slot="coach-mark-content" :class="classes">
        <slot />
      </div>
      <PopoverArrow />
    </PopoverContent>
  </PopoverPortal>
</template>

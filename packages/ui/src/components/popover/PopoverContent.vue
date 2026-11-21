<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "reka-ui";
import PopoverArrow from "./PopoverArrow.vue";
import PopoverPopup from "./PopoverPopup.vue";
import { frameCollision, readFrameInsets } from "../../lib/frame-insets";
import { useSheetPopupBoundary } from "../../lib/popup-boundary";
import { omitAttrs } from "../../lib/attrs";
import { providePopoverSize } from "./popover-context";
import { popover, type PopoverSize } from "./popover.variants";

defineOptions({ name: "RaftPopoverContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    anchor?: Element | null;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    collisionPadding?: number;
    arrow?: boolean;
    size?: PopoverSize;
    forceMount?: boolean;
  }>(),
  {
    anchor: null,
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: 8,
    arrow: true,
    size: "default",
    forceMount: undefined,
  },
);

const attrs = useAttrs();
const insets = computed(() => readFrameInsets());
const sheetBoundary = useSheetPopupBoundary();
const collision = computed(() =>
  frameCollision(props.collisionPadding, sheetBoundary.value, insets.value),
);
const collisionBoundary = computed(() => collision.value.collisionBoundary as Element | undefined);
const positionerClass = computed(() => popover().positioner());
const positionerAttrs = computed(() => omitAttrs(attrs, "class"));

providePopoverSize(() => props.size);
</script>

<template>
  <PopoverPortal :force-mount="forceMount">
    <PopoverContent
      v-bind="positionerAttrs"
      :reference="anchor ?? undefined"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :collision-padding="collision.collisionPadding"
      :collision-boundary="collisionBoundary"
      :force-mount="forceMount"
      data-slot="popover-positioner"
      :class="positionerClass"
      style="
        --available-height: var(--reka-popper-available-height);
        --transform-origin: var(--reka-popper-transform-origin);
      "
    >
      <PopoverPopup :class="attrs.class">
        <slot />
      </PopoverPopup>
      <PopoverArrow v-if="arrow" />
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { PopoverContent, PopoverPortal } from "reka-ui";

import { notificationCenter } from "./notification-center.recipe";
import { useFrameCollisionPadding } from "../../lib/frame-insets";
import { useSheetPopupBoundary } from "../../lib/popup-boundary";

defineOptions({ name: "RaftNotificationCenterPopup", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    viewport?: "desktop" | "mobile";
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    alignOffset?: number;
    collisionPadding?: number;
    avoidCollisions?: boolean;
    initialFocus?: boolean;
    class?: string;
    portalTo?: string | HTMLElement;
  }>(),
  {
    size: "md",
    viewport: "desktop",
    align: "center",
    side: "bottom",
    sideOffset: 4,
    alignOffset: 0,
    collisionPadding: 8,
    avoidCollisions: true,
    initialFocus: false,
  },
);

const attrs = useAttrs();
const collision = useFrameCollisionPadding(() => props.collisionPadding);
const sheetBoundary = useSheetPopupBoundary();
const collisionBoundary = computed(() => sheetBoundary.value as unknown as Element | undefined);
const popupClass = computed(() =>
  notificationCenter({ size: props.size, viewport: props.viewport }).popup({
    class: props.class,
  }),
);
const ariaLabel = computed(
  () => (attrs["aria-label"] as string | undefined) ?? "Notification center",
);
const positionerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <PopoverPortal :to="portalTo" data-raft-ui-overlay="">
    <PopoverContent
      v-bind="positionerAttrs"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
        :collision-padding="collision"
        :collision-boundary="collisionBoundary"
      class="isolate z-popup outline-none"
    >
      <div
        role="dialog"
        :aria-label="ariaLabel"
        data-slot="notification-center-popup"
        :data-size="size"
        :data-viewport="viewport"
        :class="popupClass"
      >
        <slot />
      </div>
    </PopoverContent>
  </PopoverPortal>
</template>

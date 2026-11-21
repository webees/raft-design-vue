<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "reka-ui";

import { notificationCenter } from "./notification-center.recipe";
import {
  BASE_COLLISION_PADDING,
  useContentCollision,
  type PopupPositionerProps,
} from "../../lib/frame-insets";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftNotificationCenterPopup", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    Omit<PopupPositionerProps, "container"> & {
      size?: "sm" | "md" | "lg";
      viewport?: "desktop" | "mobile";
      initialFocus?: boolean;
      class?: string;
      portalTo?: string | HTMLElement;
    }
  >(),
  {
    size: "md",
    viewport: "desktop",
    align: "center",
    side: "bottom",
    sideOffset: 4,
    alignOffset: 0,
    collisionPadding: undefined,
    collisionBoundary: undefined,
    anchor: undefined,
    avoidCollisions: true,
    initialFocus: false,
  },
);

const attrs = useAttrs();
const PHONE_INSET = 8;
const { bindings, ref: setPositioner } = useContentCollision(props, {
  container: () => props.portalTo,
  defaultPadding: () => (props.viewport === "mobile" ? PHONE_INSET : BASE_COLLISION_PADDING),
});
const popupClass = computed(() =>
  notificationCenter({ size: props.size, viewport: props.viewport }).popup({
    class: props.class,
  }),
);
const ariaLabel = computed(
  () => (attrs["aria-label"] as string | undefined) ?? "Notification center",
);
const positionerAttrs = computed(() => omitAttrs(attrs, "class"));
const onOpenAutoFocus = (event: Event) => {
  if (!props.initialFocus) event.preventDefault();
};
</script>

<template>
  <PopoverPortal :to="portalTo" data-raft-ui-overlay="">
    <PopoverContent
      :ref="setPositioner"
      v-bind="{ ...positionerAttrs, ...bindings }"
      @open-auto-focus="onOpenAutoFocus"
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

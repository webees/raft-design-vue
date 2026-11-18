<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { HoverCardContent, HoverCardPortal } from "reka-ui";
import { previewCard } from "./preview-card.variants";
import { useFrameCollisionPadding } from "../../lib/frame-insets";
import { useSheetPopupBoundary } from "../../lib/popup-boundary";

defineOptions({ name: "RaftPreviewCardContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: "profile" | "item";
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    arrowPadding?: number;
    collisionPadding?: number | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
    sticky?: "partial" | "always";
    avoidCollisions?: boolean;
    hideWhenDetached?: boolean;
    portal?: boolean;
    forceMount?: boolean;
  }>(),
  {
    size: "profile",
    side: "bottom",
    align: "start",
    sideOffset: 6,
    alignOffset: 0,
    avoidCollisions: true,
    portal: true,
    forceMount: false,
  },
);

const attrs = useAttrs();
const collision = useFrameCollisionPadding(() => props.collisionPadding ?? 8);
const sheetBoundary = useSheetPopupBoundary();
const collisionBoundary = computed(() => sheetBoundary.value as unknown as Element | undefined);
const styles = computed(() => previewCard({ size: props.size }));
const positionerClass = computed(() => styles.value.positioner());
const popupClass = computed(() => styles.value.popup({ className: attrs.class as string }));
</script>

<template>
  <HoverCardPortal :disabled="!portal">
    <HoverCardContent
      v-bind="{ ...attrs, class: undefined }"
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      :align-offset="alignOffset"
      :arrow-padding="arrowPadding"
      :collision-padding="collision"
      :collision-boundary="collisionBoundary"
      :sticky="sticky"
      :avoid-collisions="avoidCollisions"
      :hide-when-detached="hideWhenDetached"
      :force-mount="forceMount"
      :class="positionerClass"
      data-slot="preview-card-positioner"
      style="--available-height: var(--reka-hover-card-content-available-height); --transform-origin: var(--reka-hover-card-content-transform-origin)"
    >
      <div :data-size="size" :class="popupClass" data-slot="preview-card-content">
        <slot />
      </div>
    </HoverCardContent>
  </HoverCardPortal>
</template>

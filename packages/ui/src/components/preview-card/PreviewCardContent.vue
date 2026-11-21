<script setup lang="ts">
import { HoverCardContent, HoverCardPortal } from "reka-ui";
import { previewCard } from "./preview-card.variants";
import { useContentCollision, type PopupPositionerProps } from "../../lib/frame-insets";

defineOptions({ name: "RaftPreviewCardContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    PopupPositionerProps & {
      size?: "profile" | "item";
      arrowPadding?: number;
      sticky?: "partial" | "always";
      hideWhenDetached?: boolean;
      portal?: boolean;
      forceMount?: boolean;
    }
  >(),
  {
    size: "profile",
    side: "bottom",
    align: "start",
    sideOffset: 6,
    alignOffset: 0,
    avoidCollisions: true,
    collisionBoundary: undefined,
    anchor: undefined,
    container: null,
    portal: true,
    forceMount: false,
  },
);

const attrs = useAttrs();
const { bindings, ref: setPositioner } = useContentCollision(props);
const styles = computed(() => previewCard({ size: props.size }));
const positionerClass = computed(() => styles.value.positioner());
const popupClass = computed(() => styles.value.popup({ className: attrs.class as string }));
</script>

<template>
  <HoverCardPortal :to="container ?? undefined" :disabled="!portal">
    <HoverCardContent
      :ref="setPositioner"
      v-bind="{ ...attrs, class: undefined, ...bindings }"
      :arrow-padding="arrowPadding"
      :sticky="sticky"
      :hide-when-detached="hideWhenDetached"
      :force-mount="forceMount"
      :class="positionerClass"
      data-slot="preview-card-positioner"
      style="
        --available-height: var(--reka-hover-card-content-available-height);
        --transform-origin: var(--reka-hover-card-content-transform-origin);
      "
    >
      <div :data-size="size" :class="popupClass" data-slot="preview-card-content">
        <slot />
      </div>
    </HoverCardContent>
  </HoverCardPortal>
</template>

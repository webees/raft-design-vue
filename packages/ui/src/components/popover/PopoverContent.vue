<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "reka-ui";
import PopoverArrow from "./PopoverArrow.vue";
import PopoverPopup from "./PopoverPopup.vue";
import { useContentCollision, type PopupPositionerProps } from "../../lib/frame-insets";
import { omitAttrs } from "../../lib/attrs";
import { providePopoverSize } from "./popover-context";
import { popover, type PopoverSize } from "./popover.variants";

defineOptions({ name: "RaftPopoverContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    PopupPositionerProps & {
      arrow?: boolean;
      size?: PopoverSize;
      forceMount?: boolean;
    }
  >(),
  {
    anchor: null,
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: undefined,
    collisionBoundary: undefined,
    container: null,
    arrow: true,
    size: "default",
    forceMount: undefined,
  },
);

const attrs = useAttrs();
const { bindings, ref: setPositioner } = useContentCollision(props);
const positionerClass = popover().positioner();
const positionerAttrs = computed(() => omitAttrs(attrs, "class"));

providePopoverSize(() => props.size);
</script>

<template>
  <PopoverPortal :to="container ?? undefined" :force-mount="forceMount">
    <PopoverContent
      :ref="setPositioner"
      v-bind="{ ...positionerAttrs, ...bindings }"
      :reference="anchor ?? undefined"
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

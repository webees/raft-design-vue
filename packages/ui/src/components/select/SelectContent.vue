<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectContent } from "reka-ui";
import SelectPortal from "./SelectPortal.vue";
import { select } from "./select.variants";
import { useFrameCollisionPadding } from "../../lib/frame-insets";
import { useSheetPopupBoundary } from "../../lib/popup-boundary";

defineOptions({ name: "RaftSelectContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    position?: "item-aligned" | "popper";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    collisionPadding?: number;
    prioritizePosition?: boolean;
    asChild?: boolean;
    forceMount?: boolean;
    to?: string | HTMLElement;
  }>(),
  {
    position: "popper",
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: 8,
    prioritizePosition: false,
    asChild: false,
    forceMount: false,
    to: undefined,
  },
);

const attrs = useAttrs();
const collision = useFrameCollisionPadding(() => props.collisionPadding);
const sheetBoundary = useSheetPopupBoundary();
const collisionBoundary = computed(() => sheetBoundary.value as unknown as Element | undefined);
const contentClass = computed(() => select().content({ className: attrs.class as string }));
</script>

<template>
  <SelectPortal :to="to">
    <SelectContent
      v-bind="{ ...attrs, class: undefined }"
      :class="contentClass"
      :position="position"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :collision-padding="collision"
      :collision-boundary="collisionBoundary"
      :prioritize-position="prioritizePosition"
      :as-child="asChild"
      :force-mount="forceMount"
      data-slot="select-content"
      style="
        --available-height: var(--reka-select-content-available-height);
        --available-width: var(--reka-select-content-available-width);
        --anchor-width: var(--reka-select-trigger-width);
      "
    >
      <slot />
    </SelectContent>
  </SelectPortal>
</template>

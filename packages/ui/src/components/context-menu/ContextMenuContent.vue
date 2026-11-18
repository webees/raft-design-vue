<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ContextMenuContent, ContextMenuPortal } from "reka-ui";

import { contextMenu } from "./context-menu.variants";
import { useFrameCollisionPadding } from "../../lib/frame-insets";
import { useSheetPopupBoundary } from "../../lib/popup-boundary";

defineOptions({ name: "RaftContextMenuContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    alignOffset?: number;
    avoidCollisions?: boolean;
    collisionPadding?: number;
    forceMount?: boolean;
    loop?: boolean;
  }>(),
  {
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: 8,
    forceMount: undefined,
    loop: false,
  },
);

const attrs = useAttrs();
const collision = useFrameCollisionPadding(() => props.collisionPadding);
const sheetBoundary = useSheetPopupBoundary();
const collisionBoundary = computed(() => sheetBoundary.value as unknown as Element | undefined);
const positionerClass = computed(() => contextMenu().positioner());
const contentClass = computed(() =>
  contextMenu().content({ class: attrs.class as string | undefined }),
);
const contentAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <ContextMenuPortal :force-mount="forceMount">
    <ContextMenuContent
      v-bind="contentAttrs"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :collision-padding="collision"
      :collision-boundary="collisionBoundary"
      :loop="loop"
      :force-mount="forceMount"
      :class="positionerClass"
    >
      <div data-slot="context-menu-content" :class="contentClass">
        <slot />
      </div>
    </ContextMenuContent>
  </ContextMenuPortal>
</template>

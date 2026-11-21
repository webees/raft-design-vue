<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";
import { useDropdownContent } from "./use-dropdown-content";
import { useContentCollision, type PopupPositionerProps } from "../../lib/frame-insets";

defineOptions({ name: "RaftDropdownMenuContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    PopupPositionerProps & {
      loop?: boolean;
      forceMount?: boolean;
    }
  >(),
  {
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: undefined,
    collisionBoundary: undefined,
    anchor: undefined,
    container: null,
    loop: false,
    forceMount: undefined,
  },
);

const { positionerClass, contentClass, contentAttrs, vars } = useDropdownContent();
const { bindings, ref: setPositioner } = useContentCollision(props);
</script>

<template>
  <DropdownMenuPortal :to="container ?? undefined" :force-mount="forceMount">
    <DropdownMenuContent
      :ref="setPositioner"
      v-bind="{ ...contentAttrs, ...bindings }"
      :loop="loop"
      :force-mount="forceMount"
      :class="positionerClass"
    >
      <div data-slot="dropdown-menu-content" :class="contentClass" :style="vars">
        <slot />
      </div>
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

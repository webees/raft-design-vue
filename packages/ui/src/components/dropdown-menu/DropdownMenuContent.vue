<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";
import { useDropdownContent } from "./use-dropdown-content";

defineOptions({ name: "RaftDropdownMenuContent", inheritAttrs: false });

withDefaults(
  defineProps<{
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    loop?: boolean;
    forceMount?: boolean;
  }>(),
  {
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    loop: false,
    forceMount: undefined,
  },
);

const { positionerClass, contentClass, contentAttrs, vars } = useDropdownContent();
</script>

<template>
  <DropdownMenuPortal :force-mount="forceMount">
    <DropdownMenuContent
      v-bind="contentAttrs"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
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

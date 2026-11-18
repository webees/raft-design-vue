<script setup lang="ts">
import { DropdownMenuSubContent } from "reka-ui";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuSubContent", inheritAttrs: false });

withDefaults(
  defineProps<{
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    forceMount?: boolean;
  }>(),
  {
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    forceMount: undefined,
  },
);

const attrs = useAttrs();
const positionerClass = computed(() => dropdownMenu().positioner());
const contentClass = computed(() =>
  dropdownMenu().content({ class: attrs.class as string | undefined }),
);
const contentAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const vars = { "--available-height": "var(--reka-dropdown-menu-content-available-height)" };
</script>

<template>
  <DropdownMenuSubContent
    v-bind="contentAttrs"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    :avoid-collisions="avoidCollisions"
    :force-mount="forceMount"
    :class="positionerClass"
  >
    <div data-slot="dropdown-menu-content" :class="contentClass" :style="vars">
      <slot />
    </div>
  </DropdownMenuSubContent>
</template>

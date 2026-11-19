<script setup lang="ts">
import { DrawerRoot } from "reka-ui";

import { OverlayLayer, useEnclosingOverlayKind } from "../../lib/overlay-depth";
import { useIsControlled } from "../../lib/use-controlled-state";
import { provideDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawer", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
    modal?: boolean | "trap-focus";
    swipeDirection?: "up" | "down" | "left" | "right";
    snapPoints?: Array<number | string>;
    snapPoint?: number | string | null;
    defaultSnapPoint?: number | string | null;
    snapToSequentialPoints?: boolean;
  }>(),
  {
    modal: true,
    swipeDirection: "down",
  },
);

const emit = defineEmits<{
  "update:open": [open: boolean];
  "update:openComplete": [open: boolean];
  "update:snapPoint": [point: number | string | null];
}>();

const swipeAxis = computed<"x" | "y">(() =>
  props.swipeDirection === "up" || props.swipeDirection === "down" ? "y" : "x",
);

const controlled = useIsControlled("open");
const openProps = computed(() => (controlled.value ? { open: props.open === true } : {}));

provideDrawerConfig(
  reactive({
    modal: computed(() => props.modal === true),
    swipeAxis,
    swipeDirection: computed(() => props.swipeDirection),
    hasSnapPoints: computed(() => (props.snapPoints?.length ?? 0) > 0),
    nested: computed(() => useEnclosingOverlayKind() === "dialog"),
  }),
);
</script>

<template>
  <DrawerRoot
    v-bind="{ ...$attrs, ...openProps }"
    :default-open="defaultOpen"
    :modal="modal"
    :swipe-direction="swipeDirection"
    :snap-points="snapPoints"
    :snap-point="snapPoint"
    :default-snap-point="defaultSnapPoint"
    :snap-to-sequential-points="snapToSequentialPoints"
    data-slot="drawer"
    @update:open="emit('update:open', $event)"
    @update:open-complete="emit('update:openComplete', $event)"
    @update:snap-point="emit('update:snapPoint', $event)"
  >
    <OverlayLayer kind="drawer" :modal="modal === true">
      <slot />
    </OverlayLayer>
  </DrawerRoot>
</template>

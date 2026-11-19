<script setup lang="ts">
import { DrawerContent, DrawerPortal, DrawerViewport, injectDrawerRootContext } from "reka-ui";

import { cn } from "../../lib/cn";
import { usePresenceStyle } from "../../lib/presence-style";
import { useDrawerConfig, useDrawerRecipe } from "./drawer-context";
import { provideDialogSheetReset } from "../dialog/dialog-sheet-context";
import { providePopupSheet } from "../../lib/popup-boundary";
import DrawerOverlay from "./DrawerOverlay.vue";

defineOptions({ name: "RaftDrawerContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    portalTo?: string | HTMLElement;
    showOverlay?: boolean;
  }>(),
  {
    portalTo: "body",
    showOverlay: true,
  },
);

const attrs = useAttrs();
const config = useDrawerConfig();
const variants = useDrawerRecipe();
const popupClass = computed(() => variants.value.popup({ class: props.class }));
const contentClass = computed(() => variants.value.content());
const viewportClass = computed(() =>
  cn(variants.value.viewport(), config.modal && "pointer-events-auto"),
);
const swipeHandleClass = computed(() => variants.value.swipeHandle());
const showSwipeHandle = computed(() => config.hasSnapPoints || config.swipeDirection === "down");

const surface = ref<HTMLElement | null>(null);
const popup = ref<Element | null>(null);
const root = injectDrawerRootContext(null);
usePresenceStyle(() => root?.open.value ?? false, popup);
provideDialogSheetReset();
// A popup opened in the drawer stays in it, under its head.
providePopupSheet({
  head: () => surface.value?.querySelector('[data-slot="drawer-header"]') ?? null,
  surface: () => surface.value,
});
</script>

<template>
  <DrawerPortal :to="portalTo">
    <DrawerOverlay v-if="showOverlay && config.modal === true" />
    <DrawerViewport data-slot="drawer-viewport" :class="viewportClass">
      <DrawerContent ref="popup" v-bind="attrs" data-slot="drawer-popup" :class="popupClass">
        <div
          v-if="showSwipeHandle"
          data-slot="drawer-swipe-handle"
          aria-hidden="true"
          :class="swipeHandleClass"
        />
        <div ref="surface" data-slot="drawer-content" :class="contentClass">
          <slot />
        </div>
      </DrawerContent>
    </DrawerViewport>
  </DrawerPortal>
</template>

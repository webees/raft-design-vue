<script setup lang="ts">
import { DrawerClose } from "reka-ui";

import { Button } from "../button";
import type { ButtonSize, ButtonVariant } from "../button/button.variants";
import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerClose", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    ariaLabel?: string;
    asChild?: boolean;
  }>(),
  { variant: "ghost", ariaLabel: "Close", asChild: false },
);

const attrs = useAttrs();
const config = useDrawerConfig();
const variants = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }),
);
const closeClass = computed(() => variants.value.close({ class: props.class }));
const closeButtonClass = computed(() => (props.size ? undefined : variants.value.closeButton()));
const closeIconClass = computed(() => variants.value.closeIcon());
</script>

<template>
  <DrawerClose v-if="asChild" v-bind="attrs" as-child data-slot="drawer-close">
    <slot />
  </DrawerClose>
  <DrawerClose v-else v-bind="attrs" as-child data-slot="drawer-close">
    <Button
      :variant="variant"
      :size="size ?? 'icon-lg'"
      :class="[closeClass, closeButtonClass]"
      :aria-label="ariaLabel"
    >
      <slot>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" :class="closeIconClass">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="square"
          />
        </svg>
      </slot>
    </Button>
  </DrawerClose>
</template>

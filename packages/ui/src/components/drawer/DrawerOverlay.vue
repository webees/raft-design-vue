<script setup lang="ts">
import { DrawerOverlay, injectDrawerRootContext } from "reka-ui";

import { usePresenceStyle } from "../../lib/presence-style";
import { useDrawerPart } from "./drawer-context";

defineOptions({ name: "RaftDrawerOverlay", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const { attrs, config, recipe: variants } = useDrawerPart();
const classes = computed(() =>
  variants.value.overlay({ class: [props.class, attrs.class as string | undefined] }),
);

const overlay = ref<Element | null>(null);
const root = injectDrawerRootContext(null);
usePresenceStyle(() => root?.open.value ?? false, overlay);
</script>

<template>
  <DrawerOverlay
    ref="overlay"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="drawer-overlay"
    :data-nested="config.nested ? '' : undefined"
    :force-mount="config.nested"
    :class="classes"
  >
    <slot />
  </DrawerOverlay>
</template>

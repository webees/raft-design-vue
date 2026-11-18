<script setup lang="ts">
import { mobileNav } from "./mobile-nav.recipe";
import { useTapActivation } from "../../lib/tap-activation";

defineOptions({ name: "RaftMobileNavItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    selected?: boolean;
    disabled?: boolean;
    /** Render a real `<button>`; set false for a non-native button (e.g. inside a link). */
    nativeButton?: boolean;
    class?: string;
  }>(),
  { selected: false, disabled: false, nativeButton: true },
);

const attrs = useAttrs();
const tapRef = useTapActivation();
const classes = computed(() => mobileNav().item({ class: props.class }));
</script>

<template>
  <component
    :is="nativeButton ? 'button' : 'span'"
    :ref="tapRef"
    v-bind="attrs"
    :type="nativeButton ? 'button' : undefined"
    :role="nativeButton ? undefined : 'button'"
    :tabindex="nativeButton ? undefined : disabled ? -1 : 0"
    :disabled="nativeButton ? disabled : undefined"
    :aria-disabled="!nativeButton && disabled ? 'true' : undefined"
    :aria-pressed="nativeButton ? selected : undefined"
    :data-selected="selected ? 'true' : undefined"
    data-slot="mobile-nav-item"
    :class="classes"
  >
    <slot />
  </component>
</template>

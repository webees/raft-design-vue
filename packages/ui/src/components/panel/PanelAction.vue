<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { useTapActivation } from "../../lib/tap-activation";
import { panelAction } from "./panel.variants";

defineOptions({ name: "RaftPanelAction", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    activateOnTouchEnd?: boolean;
    as?: string;
    asChild?: boolean;
  }>(),
  { disabled: false, activateOnTouchEnd: false, as: "button", asChild: false },
);
const attrs = useAttrs();
const tapRef = useTapActivation(() => props.activateOnTouchEnd);
const rootClass = computed(() => panelAction({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :ref="tapRef"
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-action'"
    data-icon-inset=""
    :data-activate-on-touch-end="activateOnTouchEnd ? '' : undefined"
    :type="as === 'button' ? ((attrs.type as string | undefined) ?? 'button') : undefined"
    :disabled="disabled"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { panelHeader } from "./panel.variants";

defineOptions({ name: "RaftPanelMeta", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ size?: "sm" | "md"; as?: string; asChild?: boolean }>(),
  { size: "sm", as: "div", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  panelHeader({ size: props.size }).meta({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-meta'"
    :data-size="size"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

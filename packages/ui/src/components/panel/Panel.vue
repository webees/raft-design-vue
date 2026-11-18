<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { panel } from "./panel.variants";

defineOptions({ name: "RaftPanel", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ edge?: "attached" | "inset"; as?: string; asChild?: boolean }>(),
  { edge: "inset", as: "section", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  panel({ edge: props.edge }).root({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel'"
    :data-edge="edge"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

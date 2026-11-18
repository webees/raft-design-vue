<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { monoVariants, type TextMonoSize, type TextVariant } from "./text.variants";

defineOptions({ name: "RaftTextMono", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    size?: TextMonoSize;
    variant?: TextVariant;
    as?: string;
    asChild?: boolean;
  }>(),
  { size: "code", as: "p", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  monoVariants({
    size: props.size,
    variant: props.variant,
    class: attrs.class as string,
  }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="text-mono"
    :data-size="size"
    :data-variant="variant"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

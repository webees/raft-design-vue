<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { headingVariants, type HeadingLevel, type TextVariant } from "./text.variants";

defineOptions({ name: "RaftTextHeading", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    level?: HeadingLevel;
    variant?: TextVariant;
    as?: string;
    asChild?: boolean;
  }>(),
  { level: 1, asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  headingVariants({
    level: props.level,
    variant: props.variant,
    class: attrs.class as string,
  }),
);
</script>

<template>
  <Primitive
    :as="as ?? `h${level}`"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="text-heading"
    :data-level="level"
    :data-variant="variant"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

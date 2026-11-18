<script setup lang="ts">
import { Primitive } from "reka-ui";
import { sansVariants, type TextSansSize, type TextVariant } from "./text.variants";

defineOptions({ name: "RaftTextSans", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    size?: TextSansSize;
    variant?: TextVariant;
    as?: string;
    asChild?: boolean;
  }>(),
  { size: "body", as: "p", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  sansVariants({
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
    data-slot="text-sans"
    :data-size="size"
    :data-variant="variant"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { cardVariants } from "./card.variants";
import { useCardVariant } from "./card-context";

defineOptions({ name: "RaftCardHeader", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  cardVariants({ variant: useCardVariant() }).header({ className: attrs.class as string }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="card-header" :class="rootClass">
    <slot />
  </div>
</template>

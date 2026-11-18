<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cardVariants, type CardVariant } from "./card.variants";
import { provideCardVariant } from "./card-context";

defineOptions({ name: "RaftCard", inheritAttrs: false });

const props = withDefaults(defineProps<{ variant?: CardVariant }>(), { variant: "default" });
const attrs = useAttrs();

provideCardVariant(props.variant);

const rootClass = computed(() =>
  cardVariants({ variant: props.variant }).root({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="card"
    :data-variant="variant"
    :class="rootClass"
  >
    <slot />
  </div>
</template>

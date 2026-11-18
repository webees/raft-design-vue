<script setup lang="ts">
import { skeletonVariants, type SkeletonVariant } from "./skeleton.variants";

defineOptions({ name: "RaftSkeleton", inheritAttrs: false });

const props = withDefaults(defineProps<{ variant?: SkeletonVariant }>(), { variant: "block" });
const attrs = useAttrs();

const rootClass = computed(() =>
  skeletonVariants({ variant: props.variant }).root({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    data-slot="skeleton"
    :data-variant="variant"
    :class="rootClass"
  />
</template>

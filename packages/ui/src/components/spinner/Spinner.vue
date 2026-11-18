<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { spinnerVariants, type SpinnerSize, type SpinnerVariant } from "./spinner.variants";

defineOptions({ name: "RaftSpinner", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize;
    variant?: SpinnerVariant;
    label?: string;
  }>(),
  {
    size: "sm",
    variant: "default",
    label: "Loading",
  },
);

const attrs = useAttrs();
const styles = computed(() => spinnerVariants({ size: props.size, variant: props.variant }));
const rootClass = computed(() => styles.value.root({ className: attrs.class as string }));
const ringClass = computed(() => styles.value.ring());
const pixelClass = computed(() => styles.value.pixel());
const ariaLabel = computed(() => (attrs["aria-label"] as string | undefined) ?? props.label);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    role="status"
    :aria-label="ariaLabel"
    data-slot="spinner"
    :data-size="size"
    :class="rootClass"
  >
    <span data-spinner-grid aria-hidden="true" :class="ringClass">
      <span data-spinner-pixel :class="pixelClass" />
      <span data-spinner-pixel :class="pixelClass" />
      <span data-spinner-pixel :class="pixelClass" />
      <span data-spinner-pixel :class="pixelClass" />
    </span>
  </span>
</template>

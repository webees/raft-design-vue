<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { labelVariants, type LabelSize } from "./label.variants";

defineOptions({ name: "RaftLabel", inheritAttrs: false });
const props = withDefaults(
  defineProps<{ size?: LabelSize; disabled?: boolean; as?: string; asChild?: boolean }>(),
  { size: "md", disabled: false, as: "label", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  labelVariants({ size: props.size }).root({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="label"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>

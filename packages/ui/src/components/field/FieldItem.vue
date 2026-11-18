<script setup lang="ts">
import { fieldVariants } from "./field.variants";
import { useFieldContext } from "./field-context";

defineOptions({ name: "RaftFieldItem", inheritAttrs: false });
const props = defineProps<{ size?: "sm" | "md" }>();
const attrs = useAttrs();
const context = useFieldContext();
const rootClass = computed(() =>
  fieldVariants({ size: props.size ?? context?.size ?? "md" }).item({
    className: attrs.class as string,
  }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="field-item" :class="rootClass">
    <slot />
  </div>
</template>

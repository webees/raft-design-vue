<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { fieldVariants } from "./field.variants";
import { useFieldContext } from "./field-context";
import LabelAsterisk from "../label/LabelAsterisk.vue";
import LabelOptional from "../label/LabelOptional.vue";

defineOptions({ name: "RaftFieldLabel", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    required?: boolean;
    optional?: boolean | string;
    size?: "sm" | "md";
  }>(),
  { required: false, optional: false },
);

const attrs = useAttrs();
const context = useFieldContext();

const rootClass = computed(() =>
  fieldVariants({ size: props.size ?? context?.size ?? "md" }).label({
    className: attrs.class as string,
  }),
);
const optionalText = computed(() =>
  typeof props.optional === "string" ? props.optional : "(optional)",
);
</script>

<template>
  <label
    v-bind="{ ...attrs, class: undefined }"
    data-slot="field-label"
    :for="context?.controlId"
    :class="rootClass"
  >
    <slot />
    <LabelAsterisk v-if="required" class="ml-1" />
    <LabelOptional v-if="optional" class="ml-1" :label="optionalText" />
  </label>
</template>

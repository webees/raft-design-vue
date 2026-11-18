<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { fieldVariants } from "./field.variants";
import { useFieldContext } from "./field-context";

defineOptions({ name: "RaftFieldDescription", inheritAttrs: false });
const attrs = useAttrs();
const context = useFieldContext();
const rootClass = computed(() =>
  fieldVariants().description({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="field-description"
    :id="context?.descriptionId"
    :class="rootClass"
  >
    <slot />
  </div>
</template>

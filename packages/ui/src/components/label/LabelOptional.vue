<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { labelVariants } from "./label.variants";

defineOptions({ name: "RaftLabelOptional", inheritAttrs: false });
withDefaults(defineProps<{ label?: string }>(), { label: "(optional)" });
const attrs = useAttrs();
const rootClass = computed(() => labelVariants().sub({ className: attrs.class as string }));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="label-optional" :class="rootClass">
    <slot>{{ label }}</slot>
  </span>
</template>

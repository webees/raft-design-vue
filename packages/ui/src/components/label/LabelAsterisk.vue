<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { labelVariants } from "./label.variants";

defineOptions({ name: "RaftLabelAsterisk", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() => labelVariants().asterisk({ className: attrs.class as string }));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="label-asterisk" :class="rootClass">
    <slot>*</slot>
  </span>
</template>

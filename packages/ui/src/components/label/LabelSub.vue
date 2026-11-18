<script setup lang="ts">
import { labelVariants } from "./label.variants";

defineOptions({ name: "RaftLabelSub", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() => labelVariants().sub({ className: attrs.class as string }));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="label-sub" :class="rootClass">
    <slot />
  </span>
</template>

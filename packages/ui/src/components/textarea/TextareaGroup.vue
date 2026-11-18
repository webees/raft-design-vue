<script setup lang="ts">
import { textareaGroup } from "./textarea.variants";

defineOptions({ name: "RaftTextareaGroup", inheritAttrs: false });
const attrs = useAttrs();
const { root } = textareaGroup();
const rootClass = computed(() => root({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="textarea-group" :class="rootClass">
    <slot />
  </div>
</template>

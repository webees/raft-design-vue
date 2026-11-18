<script setup lang="ts">
import { webTopBar } from "./web-top-bar.variants";

defineOptions({ name: "RaftWebTopBarEnd", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() => webTopBar().end({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="web-top-bar-end" :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { webTopBar } from "./web-top-bar.variants";

defineOptions({ name: "RaftWebTopBarCenter", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() => webTopBar().center({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="web-top-bar-center" :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { progress } from "./progress.recipe";

defineOptions({ name: "RaftProgressHeader", inheritAttrs: false });
const attrs = useAttrs();
const { header } = progress();
const headerClass = computed(() => header({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="progress-header" :class="headerClass">
    <slot />
  </div>
</template>

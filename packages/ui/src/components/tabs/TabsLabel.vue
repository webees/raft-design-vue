<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { tabs } from "./tabs.variants";

defineOptions({ name: "RaftTabsLabel", inheritAttrs: false });
const attrs = useAttrs();
const labelClass = computed(() => tabs().label({ className: attrs.class as string }));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="tabs-label" :class="labelClass">
    <slot />
  </span>
</template>

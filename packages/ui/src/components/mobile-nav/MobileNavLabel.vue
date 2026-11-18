<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { mobileNav } from "./mobile-nav.recipe";

defineOptions({ name: "RaftMobileNavLabel", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => mobileNav().itemLabel({ class: props.class }));
</script>

<template>
  <span v-bind="attrs" data-slot="mobile-nav-item-label" :class="classes">
    <slot />
  </span>
</template>

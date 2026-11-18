<script setup lang="ts">
import { mobileNav } from "./mobile-nav.recipe";

defineOptions({ name: "RaftMobileNavRoot", inheritAttrs: false });

const props = defineProps<{ as?: string; class?: string }>();
const attrs = useAttrs();
const classes = computed(() => mobileNav().root({ class: props.class }));
</script>

<template>
  <component :is="as ?? 'nav'" v-bind="attrs" data-slot="mobile-nav-root" :class="classes">
    <slot />
  </component>
</template>

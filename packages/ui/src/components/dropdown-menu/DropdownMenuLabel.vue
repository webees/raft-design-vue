<script setup lang="ts">
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuLabel", inheritAttrs: false });

const attrs = useAttrs();
const labelClass = computed(() =>
  dropdownMenu().label({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="dropdown-menu-label" :class="labelClass">
    <slot />
  </div>
</template>

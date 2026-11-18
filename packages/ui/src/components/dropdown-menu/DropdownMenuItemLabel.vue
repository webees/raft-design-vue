<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuItemLabel", inheritAttrs: false });

const attrs = useAttrs();
const labelClass = computed(() =>
  dropdownMenu().itemLabel({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dropdown-menu-item-label"
    :class="labelClass"
  >
    <slot />
  </span>
</template>

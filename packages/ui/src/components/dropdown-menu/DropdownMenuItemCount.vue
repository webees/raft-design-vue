<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuItemCount", inheritAttrs: false });

const attrs = useAttrs();
const countClass = computed(() =>
  dropdownMenu().itemCount({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dropdown-menu-item-count"
    :class="countClass"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuItemIcon", inheritAttrs: false });

const attrs = useAttrs();
const iconClass = computed(() =>
  dropdownMenu().itemIcon({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dropdown-menu-item-icon"
    :class="iconClass"
    aria-hidden="true"
  >
    <slot />
  </span>
</template>

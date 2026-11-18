<script setup lang="ts">
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuItemDescription", inheritAttrs: false });

const attrs = useAttrs();
const descriptionClass = computed(() =>
  dropdownMenu().itemDescription({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dropdown-menu-item-description"
    :class="descriptionClass"
  >
    <slot />
  </span>
</template>

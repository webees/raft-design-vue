<script setup lang="ts">
import { DropdownMenuItemIndicator } from "reka-ui";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuItemIndicator", inheritAttrs: false });

const attrs = useAttrs();
const indicatorClass = computed(() =>
  dropdownMenu().indicator({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <DropdownMenuItemIndicator
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dropdown-menu-item-indicator"
    :class="indicatorClass"
  >
    <slot>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M3.5 8.5 6.5 11.5 12.5 5.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </slot>
  </DropdownMenuItemIndicator>
</template>

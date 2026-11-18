<script setup lang="ts">
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuShortcut", inheritAttrs: false });

const attrs = useAttrs();
const shortcutClass = computed(() =>
  dropdownMenu().shortcut({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dropdown-menu-shortcut"
    :class="shortcutClass"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuFooter", inheritAttrs: false });

const attrs = useAttrs();
const footerClass = computed(() =>
  dropdownMenu().footer({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="dropdown-menu-footer"
    :class="footerClass"
  >
    <slot />
  </div>
</template>

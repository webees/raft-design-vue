<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuSeparator } from "reka-ui";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuSeparator", inheritAttrs: false });

const attrs = useAttrs();
const separatorClass = computed(() =>
  dropdownMenu().separator({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <DropdownMenuSeparator data-slot="dropdown-menu-separator" :class="separatorClass" />
</template>

<script setup lang="ts">
import DropdownMenuItemIndicator from "./DropdownMenuItemIndicator.vue";

defineOptions({ name: "RaftDropdownMenuRadioItemIndicator" });
</script>

<template>
  <DropdownMenuItemIndicator data-slot="dropdown-menu-radio-item-indicator">
    <slot />
  </DropdownMenuItemIndicator>
</template>

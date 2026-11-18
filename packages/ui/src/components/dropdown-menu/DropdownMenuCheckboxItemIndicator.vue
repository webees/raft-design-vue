<script setup lang="ts">
import DropdownMenuItemIndicator from "./DropdownMenuItemIndicator.vue";

defineOptions({ name: "RaftDropdownMenuCheckboxItemIndicator" });
</script>

<template>
  <DropdownMenuItemIndicator data-slot="dropdown-menu-checkbox-item-indicator">
    <slot />
  </DropdownMenuItemIndicator>
</template>

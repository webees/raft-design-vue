<script setup lang="ts">
import { DrawerTrigger } from "reka-ui";

defineOptions({ name: "RaftDrawerTrigger", inheritAttrs: false });
</script>

<template>
  <DrawerTrigger v-bind="$attrs" data-slot="drawer-trigger">
    <slot />
  </DrawerTrigger>
</template>

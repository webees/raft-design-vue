<script setup lang="ts">
import { PopoverRoot } from "reka-ui";

defineOptions({ name: "RaftNotificationCenter", inheritAttrs: false });

withDefaults(defineProps<{ modal?: boolean }>(), { modal: false });
</script>

<template>
  <PopoverRoot v-bind="$attrs" :modal="modal">
    <slot />
  </PopoverRoot>
</template>

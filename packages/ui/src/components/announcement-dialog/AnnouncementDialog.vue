<script setup lang="ts">
import { Dialog } from "../dialog";

defineOptions({ name: "RaftAnnouncementDialog", inheritAttrs: false });
</script>

<template>
  <Dialog v-bind="$attrs">
    <slot />
  </Dialog>
</template>

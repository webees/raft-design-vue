<script setup lang="ts">
import { DialogClose } from "../dialog";

defineOptions({ name: "RaftAnnouncementDialogClose", inheritAttrs: false });
</script>

<template>
  <DialogClose v-bind="$attrs">
    <slot />
  </DialogClose>
</template>

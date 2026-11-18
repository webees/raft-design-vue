<script setup lang="ts">
import { DialogTrigger } from "../dialog";

defineOptions({ name: "RaftAnnouncementDialogTrigger", inheritAttrs: false });
</script>

<template>
  <DialogTrigger v-bind="$attrs">
    <slot />
  </DialogTrigger>
</template>

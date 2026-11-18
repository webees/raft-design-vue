<script setup lang="ts">
import { DialogTrigger } from "reka-ui";

defineOptions({ name: "RaftLightboxTrigger", inheritAttrs: false });
</script>

<template>
  <DialogTrigger data-slot="lightbox-trigger" v-bind="$attrs">
    <slot />
  </DialogTrigger>
</template>

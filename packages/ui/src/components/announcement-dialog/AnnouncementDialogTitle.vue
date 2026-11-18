<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogTitle } from "../dialog";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogTitle", inheritAttrs: false });

const attrs = useAttrs();
const titleClass = computed(() => announcement().title({ className: attrs.class as string }));
</script>

<template>
  <DialogTitle v-bind="{ ...attrs, class: undefined }" :class="titleClass">
    <slot />
  </DialogTitle>
</template>

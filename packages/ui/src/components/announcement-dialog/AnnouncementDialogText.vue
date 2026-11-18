<script setup lang="ts">
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogText", inheritAttrs: false });

const attrs = useAttrs();
const textClass = computed(() => announcement().text({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="textClass" data-slot="announcement-text">
    <slot />
  </div>
</template>

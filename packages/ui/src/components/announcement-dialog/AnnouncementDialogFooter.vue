<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogFooter", inheritAttrs: false });

const attrs = useAttrs();
const footerClass = computed(() => announcement().footer({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="footerClass" data-slot="announcement-footer">
    <slot />
  </div>
</template>

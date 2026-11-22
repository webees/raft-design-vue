<script setup lang="ts">
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogLabel", inheritAttrs: false });

const attrs = useAttrs();
const labelClass = computed(() => announcement().label({ className: attrs.class as string }));
const dotClass = announcement().dot();
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="labelClass" data-slot="announcement-label">
    <span aria-hidden="true" :class="dotClass" />
    <slot />
  </div>
</template>

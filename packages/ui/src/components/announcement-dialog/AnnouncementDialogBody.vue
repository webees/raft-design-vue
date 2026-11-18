<script setup lang="ts">
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { announcement } from "./announcement-dialog.variants";

defineOptions({ name: "RaftAnnouncementDialogBody", inheritAttrs: false });

const attrs = useAttrs();
const bodyClass = computed(() => announcement().body({ className: attrs.class as string }));
</script>

<template>
  <ScrollArea
    v-bind="{ ...attrs, class: undefined }"
    :class="bodyClass"
    data-slot="announcement-body"
    tabindex="-1"
  >
    <slot />
  </ScrollArea>
</template>

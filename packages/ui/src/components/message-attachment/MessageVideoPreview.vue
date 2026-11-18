<script setup lang="ts">
import { cn } from "../../lib/cn";
import { messageVideoPreview } from "./message-attachment.variants";

defineOptions({ name: "RaftMessageVideoPreview", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  messageVideoPreview().root({ className: cn(attrs.class as string) }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="message-video-preview" :class="rootClass">
    <slot />
  </div>
</template>

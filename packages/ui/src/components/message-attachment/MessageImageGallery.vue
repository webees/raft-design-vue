<script setup lang="ts">
import { cn } from "../../lib/cn";
import { messageImageGallery } from "./message-attachment.variants";

defineOptions({ name: "RaftMessageImageGallery", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  messageImageGallery().root({ className: cn(attrs.class as string) }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="message-image-gallery" :class="rootClass">
    <slot />
  </div>
</template>

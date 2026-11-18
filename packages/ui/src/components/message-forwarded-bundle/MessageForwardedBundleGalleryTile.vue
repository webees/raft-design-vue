<script setup lang="ts">
import MessageImageGalleryItem from "../message-attachment/MessageImageGalleryItem.vue";
import { messageForwardedBundleGallery } from "./message-forwarded-bundle.recipes";

defineOptions({ name: "RaftMessageForwardedBundleGalleryTile", inheritAttrs: false });
const attrs = useAttrs();
const tileClass = computed(() =>
  messageForwardedBundleGallery().tile({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <MessageImageGalleryItem
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-forwarded-bundle-gallery-tile"
    :class="tileClass"
  >
    <slot />
  </MessageImageGalleryItem>
</template>

<script setup lang="ts">
import { computed } from "vue";

import MessageEmbedFooter from "../message-embed/MessageEmbedFooter.vue";
import { useForwardedBundleFold } from "./message-forwarded-bundle-fold";

defineOptions({ name: "RaftMessageForwardedBundleFooter" });

const fold = useForwardedBundleFold();
const visible = computed(() => !fold?.auto || fold.foldable);
</script>

<template>
  <MessageEmbedFooter v-if="visible" data-slot="message-forwarded-bundle-footer">
    <slot />
  </MessageEmbedFooter>
</template>

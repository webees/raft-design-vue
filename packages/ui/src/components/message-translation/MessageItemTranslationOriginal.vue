<script setup lang="ts">
import { MarkdownBlockquote } from "../markdown";
import { messageTranslation } from "./message-translation.variants";

defineOptions({ name: "RaftMessageItemTranslationOriginal", inheritAttrs: false });

const attrs = useAttrs();
const originalClass = computed(() =>
  messageTranslation().translationOriginal({ className: attrs.class as string }),
);
</script>

<template>
  <MarkdownBlockquote
    v-bind="{ ...attrs, class: undefined }"
    :class="originalClass"
    data-slot="message-item-translation-original"
  >
    <slot />
  </MarkdownBlockquote>
</template>

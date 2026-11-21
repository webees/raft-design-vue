<script setup lang="ts">
import { MessageEmbed } from "../message-embed";
import { messageQuotedPreview } from "./message-quoted-preview.variants";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftMessageQuotedPreview", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  messageQuotedPreview().root({ className: attrs.class as string | undefined }),
);
const rootAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <MessageEmbed v-bind="rootAttrs" data-frame="bar" :class="rootClass">
    <slot />
  </MessageEmbed>
</template>

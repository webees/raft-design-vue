<script setup lang="ts">
import { messageCard } from "../message-embed/message-embed.variants";

defineOptions({ name: "RaftAppLinkCardHost", inheritAttrs: false });

const attrs = useAttrs();
const hostClass = computed(() => messageCard().sourceHost({ className: attrs.class as string }));
const textClass = messageCard().sourceHostText();
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="app-link-card-host" :class="hostClass">
    <span dir="rtl" :class="textClass">
      <span dir="ltr"><slot /></span>
    </span>
  </span>
</template>

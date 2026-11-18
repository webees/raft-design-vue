<script setup lang="ts">
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownBlockquote", inheritAttrs: false });

const attrs = useAttrs();
const blockquoteClass = computed(() => markdown().blockquote({ className: attrs.class as string }));
</script>

<template>
  <blockquote
    v-bind="{ ...attrs, class: undefined }"
    :class="blockquoteClass"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'markdown-blockquote'"
  >
    <slot />
  </blockquote>
</template>

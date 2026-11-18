<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownList", inheritAttrs: false });

const attrs = useAttrs();
const listClass = computed(() => markdown().list({ className: attrs.class as string }));
</script>

<template>
  <ul v-bind="{ ...attrs, class: undefined }" :class="listClass" data-slot="markdown-list">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownImage", inheritAttrs: false });

const attrs = useAttrs();
const imageClass = computed(() => markdown().image({ className: attrs.class as string }));
</script>

<template>
  <img v-bind="{ ...attrs, class: undefined }" :class="imageClass" data-slot="markdown-image" />
</template>

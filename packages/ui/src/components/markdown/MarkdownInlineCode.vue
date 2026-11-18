<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { InlineCode } from "../inline-code";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownInlineCode", inheritAttrs: false });

const attrs = useAttrs();
const inlineCodeClass = computed(() => markdown().inlineCode({ className: attrs.class as string }));
</script>

<template>
  <InlineCode v-bind="{ ...attrs, class: undefined }" :class="inlineCodeClass">
    <slot />
  </InlineCode>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownRule", inheritAttrs: false });

const attrs = useAttrs();
const ruleClass = computed(() => markdown().rule({ className: attrs.class as string }));
</script>

<template>
  <hr v-bind="{ ...attrs, class: undefined }" :class="ruleClass" data-slot="markdown-rule" />
</template>

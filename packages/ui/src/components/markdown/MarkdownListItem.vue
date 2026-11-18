<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownListItem", inheritAttrs: false });

const attrs = useAttrs();
const listItemClass = computed(() => markdown().listItem({ className: attrs.class as string }));
</script>

<template>
  <li v-bind="{ ...attrs, class: undefined }" :class="listItemClass" data-slot="markdown-list-item">
    <slot />
  </li>
</template>

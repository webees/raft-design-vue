<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown, type MarkdownHeadingLevel } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownHeading", inheritAttrs: false });

const props = defineProps<{ level: MarkdownHeadingLevel }>();
const attrs = useAttrs();

const tag = computed(() => `h${props.level}` as const);
const headingClass = computed(() =>
  markdown({ level: props.level }).heading({ className: attrs.class as string }),
);
</script>

<template>
  <component
    :is="tag"
    v-bind="{ ...attrs, class: undefined }"
    :class="headingClass"
    data-slot="markdown-heading"
  >
    <slot />
  </component>
</template>

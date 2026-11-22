<script setup lang="ts">
import { cn } from "../../lib/cn";
import { composerSuggestionList } from "./composer-suggestion.recipe";

defineOptions({ name: "RaftComposerSuggestionIcon", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    variant?: "avatar" | "framed" | "auxiliary" | "inline";
  }>(),
  { variant: "avatar" },
);

const attrs = useAttrs();
const classes = computed(() =>
  composerSuggestionList({ iconVariant: props.variant }).icon({
    class: props.class,
  }),
);
</script>

<template>
  <span v-bind="attrs" :class="classes" data-slot="composer-suggestion-icon">
    <slot />
  </span>
</template>

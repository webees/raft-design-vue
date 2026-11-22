<script setup lang="ts">
import { cn } from "../../lib/cn";
import { composerSuggestionList } from "./composer-suggestion.recipe";

defineOptions({ name: "RaftComposerSuggestionGroup", inheritAttrs: false });

const props = withDefaults(defineProps<{ class?: string; separated?: boolean }>(), {
  separated: false,
});

const attrs = useAttrs();
const classes = computed(() =>
  composerSuggestionList({ separated: props.separated }).group({
    class: props.class,
  }),
);
</script>

<template>
  <div v-bind="attrs" :class="classes" data-slot="composer-suggestion-group">
    <slot />
  </div>
</template>

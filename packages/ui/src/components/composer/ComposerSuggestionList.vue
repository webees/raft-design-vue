<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { composerSuggestionList } from "./composer-suggestion.recipe";

defineOptions({ name: "RaftComposerSuggestionList", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  composerSuggestionList().root({ class: cn(attrs.class as string | undefined, props.class) }),
);
</script>

<template>
  <ScrollArea
    v-bind="attrs"
    :class="classes"
    data-slot="composer-suggestion-list"
    overscroll="contain"
    :tabindex="-1"
  >
    <slot />
  </ScrollArea>
</template>

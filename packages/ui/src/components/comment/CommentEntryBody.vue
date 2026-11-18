<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { comment } from "./comment.recipe";

defineOptions({ name: "RaftCommentEntryBody", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    clamp?: boolean;
    class?: string;
  }>(),
  { as: "p", clamp: false },
);

const attrs = useAttrs();
const classes = computed(() =>
  comment({ clamp: props.clamp }).entryBody({
    class: cn(attrs.class as string | undefined, props.class),
  }),
);
</script>

<template>
  <component
    :is="props.as"
    v-bind="attrs"
    :class="classes"
    data-slot="comment-entry-body"
    :data-clamp="props.clamp ? '' : undefined"
  >
    <slot />
  </component>
</template>

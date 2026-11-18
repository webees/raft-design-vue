<script setup lang="ts">
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { comment } from "./comment.recipe";

defineOptions({ name: "RaftCommentMarker", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    active?: boolean;
    as?: string;
    class?: string;
  }>(),
  { active: false, as: "button" },
);

const attrs = useAttrs();
const classes = computed(() =>
  comment().marker({ class: cn(attrs.class as string | undefined, props.class) }),
);
</script>

<template>
  <Primitive
    :as="props.as"
    v-bind="attrs"
    :class="classes"
    :data-active="props.active ? '' : undefined"
    data-slot="comment-marker"
    :type="props.as === 'button' ? 'button' : undefined"
  >
    <slot />
  </Primitive>
</template>

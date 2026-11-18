<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { buttonVariants } from "../button";

defineOptions({ name: "RaftMessageListJumpPill", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "button",
  asChild: false,
});

const attrs = useAttrs();
const styles = buttonVariants({ variant: "outline", size: "md" });
const rootClass = computed(() => styles.root({ className: attrs.class as string }));
const contentClass = computed(() => styles.content());
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-list-jump-pill"
    :class="rootClass"
    :type="
      as === 'button' && !asChild ? ((attrs.type as string | undefined) ?? 'button') : undefined
    "
  >
    <span data-slot="message-list-jump-pill-content" :class="contentClass">
      <slot />
    </span>
  </Primitive>
</template>

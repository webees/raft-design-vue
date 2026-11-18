<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { X } from "lucide-vue-next";
import { Primitive } from "reka-ui";

import { buttonVariants } from "../button";
import { messageListJump } from "./message-list.recipe";

defineOptions({ name: "RaftMessageListJumpPillDismiss", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean; ariaLabel?: string }>(), {
  as: "button",
  asChild: false,
});

const attrs = useAttrs();
const resolvedAriaLabel = computed(
  () => (attrs["aria-label"] as string | undefined) ?? undefined,
);
const styles = buttonVariants({ variant: "outline", size: "icon-md" });
const slots = messageListJump();
const rootClass = computed(() =>
  styles.root({
    className: slots.dismiss({ className: attrs.class as string }),
  }),
);
const contentClass = computed(() => styles.content());
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-list-jump-pill-dismiss"
    :aria-label="ariaLabel ?? resolvedAriaLabel"
    :class="rootClass"
    :type="as === 'button' && !asChild ? ((attrs.type as string | undefined) ?? 'button') : undefined"
  >
    <span data-slot="message-list-jump-pill-dismiss-content" :class="contentClass">
      <slot><X /></slot>
    </span>
  </Primitive>
</template>

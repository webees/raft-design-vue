<script setup lang="ts">
import { computed, useAttrs } from "vue";

import AvatarBadge from "../avatar/AvatarBadge.vue";
import { messageItem } from "./message-item.recipe";

defineOptions({ name: "RaftMessageItemDelegatedAvatar", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ as?: string; asChild?: boolean; class?: string; deleted?: boolean }>(),
  { as: "span", asChild: false },
);
const attrs = useAttrs();
const classes = computed(() =>
  messageItem().delegatedAvatar({ className: props.class }),
);
</script>

<template>
  <AvatarBadge
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    data-slot="message-item-delegated-avatar"
    :data-deleted="deleted ? '' : undefined"
    :class="classes"
  >
    <slot />
  </AvatarBadge>
</template>

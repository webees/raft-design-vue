<script setup lang="ts">
import { inboxItemRecipe } from "./inbox-item.recipe";

defineOptions({ name: "RaftInboxItemListHeading", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  inboxItemRecipe().itemListHeading({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <h3
    v-bind="{ ...attrs, class: undefined }"
    data-slot="inbox-item-list-heading"
    :class="rootClass"
  >
    <slot />
  </h3>
</template>

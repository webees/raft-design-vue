<script setup lang="ts">
import { inboxItemRecipe } from "./inbox-item.recipe";

defineOptions({ name: "RaftInboxItemLine", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  inboxItemRecipe().itemLine({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="inbox-item-line" :class="rootClass">
    <slot />
  </div>
</template>

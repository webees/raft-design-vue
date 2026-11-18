<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { inboxItemRecipe } from "./inbox-item.recipe";

defineOptions({ name: "RaftInboxItemLeadingBadge", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  inboxItemRecipe().itemLeadingBadge({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="inbox-item-leading-badge" :class="rootClass"><slot /></span>
</template>

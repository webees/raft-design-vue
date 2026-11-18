<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { inboxItemRecipe } from "./inbox-item.recipe";

defineOptions({ name: "RaftInboxItemListGroup", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  inboxItemRecipe().itemListGroup({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="inbox-item-list-group" :class="rootClass"><slot /></div>
</template>

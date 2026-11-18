<script setup lang="ts">
import { CollapsibleTrigger } from "reka-ui";
import { ChevronDown } from "lucide-vue-next";

import { messageActionCard } from "./message-action-card.recipes";

defineOptions({ name: "RaftMessageActionCardCollapseTrigger", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  messageActionCard().collapseTrigger({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <CollapsibleTrigger
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-action-card-collapse-trigger"
    :class="rootClass"
  >
    <ChevronDown aria-hidden="true" />
  </CollapsibleTrigger>
</template>

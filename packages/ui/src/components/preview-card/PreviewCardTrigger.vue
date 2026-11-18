<script setup lang="ts">
import { HoverCardTrigger } from "reka-ui";
import { previewCard } from "./preview-card.variants";

defineOptions({ name: "RaftPreviewCardTrigger", inheritAttrs: false });

withDefaults(defineProps<{ asChild?: boolean }>(), { asChild: false });

const attrs = useAttrs();
const triggerClass = computed(() => previewCard().trigger({ className: attrs.class as string }));
</script>

<template>
  <HoverCardTrigger
    v-bind="{ ...attrs, class: undefined }"
    :as-child="asChild"
    data-slot="preview-card-trigger"
    :class="triggerClass"
  >
    <slot />
  </HoverCardTrigger>
</template>

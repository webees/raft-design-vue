<script setup lang="ts">
import { HoverCardArrow, useDirection } from "reka-ui";
import { previewCard } from "./preview-card.variants";

defineOptions({ name: "RaftPreviewCardArrow", inheritAttrs: false });

const attrs = useAttrs();
const arrowClass = computed(() => previewCard().arrow({ className: attrs.class as string }));
const direction = useDirection();
</script>

<template>
  <HoverCardArrow
    v-bind="{ ...attrs, class: undefined }"
    :width="8"
    :height="8"
    :class="arrowClass"
    data-slot="preview-card-arrow"
    :data-dir="direction"
  />
</template>

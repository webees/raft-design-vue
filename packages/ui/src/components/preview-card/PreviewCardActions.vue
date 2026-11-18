<script setup lang="ts">
import { messageCard } from "../message-embed/message-embed.variants";

defineOptions({ name: "RaftPreviewCardActions", inheritAttrs: false });

const attrs = useAttrs();
const actionsClass = computed(() => messageCard().actions({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="actionsClass"
    data-slot="preview-card-actions"
  >
    <slot />
  </div>
</template>

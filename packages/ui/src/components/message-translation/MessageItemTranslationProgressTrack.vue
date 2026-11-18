<script setup lang="ts">
import { ProgressTrack } from "../progress";
import { messageTranslation } from "./message-translation.variants";

defineOptions({ name: "RaftMessageItemTranslationProgressTrack", inheritAttrs: false });

const attrs = useAttrs();
const trackClass = computed(() =>
  messageTranslation().translationProgressTrack({ className: attrs.class as string }),
);
</script>

<template>
  <ProgressTrack v-bind="{ ...attrs, class: undefined }" :class="trackClass" />
</template>

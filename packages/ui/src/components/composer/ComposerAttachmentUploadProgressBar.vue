<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { composerAttachment } from "./composer-attachment.recipe";

defineOptions({ name: "RaftComposerAttachmentUploadProgressBar", inheritAttrs: false });

const props = defineProps<{ class?: string; value: number }>();
const attrs = useAttrs();
const progress = computed(() => Math.max(4, Math.min(props.value, 100)));
const classes = computed(() =>
  composerAttachment().attachmentUploadProgressBar({
    class: cn(attrs.class as string | undefined, props.class),
  }),
);
const indicatorClasses = computed(() =>
  composerAttachment().attachmentUploadProgressBarIndicator(),
);
</script>

<template>
  <span
    v-bind="attrs"
    aria-hidden="true"
    :class="classes"
    data-slot="composer-attachment-upload-progress-bar"
  >
    <span
      :class="indicatorClasses"
      data-slot="composer-attachment-upload-progress-bar-indicator"
      :style="{ width: `${progress}%` }"
    />
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { composerAttachment } from "./composer-attachment.recipe";

defineOptions({ name: "RaftComposerAttachmentRemove", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  composerAttachment().attachmentRemove({
    class: cn(attrs.class as string | undefined, props.class),
  }),
);
</script>

<template>
  <button v-bind="attrs" :class="classes" data-slot="composer-attachment-remove" type="button">
    <slot />
  </button>
</template>

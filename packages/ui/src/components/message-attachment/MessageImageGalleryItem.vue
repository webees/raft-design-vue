<script setup lang="ts">
import { computed, useAttrs, type StyleValue } from "vue";

import { cn } from "../../lib/cn";
import { messageImageGallery } from "./message-attachment.variants";
import type { MessageImageGalleryItemLayout } from "./message-image-gallery-rows";

defineOptions({ name: "RaftMessageImageGalleryItem", inheritAttrs: false });

const props = defineProps<{ layout?: MessageImageGalleryItemLayout }>();
const attrs = useAttrs();

const rootClass = computed(() =>
  messageImageGallery().item({
    className: cn(attrs.class as string),
    laidOut: props.layout ? true : undefined,
    single: props.layout?.reserved ? true : undefined,
    fit: props.layout?.fit,
  }),
);

const rootStyle = computed<StyleValue>(() =>
  props.layout?.reserved ? { ...props.layout.reserved } : (attrs.style as StyleValue),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    :data-fit="layout?.fit"
    :data-single="layout?.reserved ? 'true' : undefined"
    :data-slot="(attrs['data-slot'] as string) ?? 'message-image-gallery-item'"
    :class="rootClass"
    :style="rootStyle"
  >
    <slot />
  </div>
</template>

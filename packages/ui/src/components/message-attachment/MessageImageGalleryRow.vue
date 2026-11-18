<script setup lang="ts">
import { cn } from "../../lib/cn";
import { messageImageGallery } from "./message-attachment.variants";
import type { MessageImageGalleryRowData } from "./message-image-gallery-rows";

defineOptions({ name: "RaftMessageImageGalleryRow", inheritAttrs: false });

const props = defineProps<{ row: MessageImageGalleryRowData }>();
const attrs = useAttrs();

const single = computed(() => props.row.items.length === 1 && props.row.items[0]?.reserved != null);
const rootClass = computed(() =>
  messageImageGallery().row({
    className: cn(attrs.class as string),
    count: props.row.items.length as 1 | 2 | 3,
    single: single.value,
  }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :data-count="String(row.items.length)"
    data-slot="message-image-gallery-row"
    :class="rootClass"
  >
    <slot />
  </div>
</template>

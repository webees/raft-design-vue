<script setup lang="ts">
import ComposerAttachmentsScrollArea from "./ComposerAttachmentsScrollArea.vue";
import SortableComposerAttachments from "./SortableComposerAttachments.vue";

defineOptions({ name: "RaftSortableComposerAttachmentsScroll", inheritAttrs: false });

defineProps<{
  items: readonly string[];
  container?: Element | DocumentFragment | null;
}>();

const emit = defineEmits<{ reorder: [items: string[]] }>();
</script>

<template>
  <ComposerAttachmentsScrollArea>
    <SortableComposerAttachments
      v-bind="$attrs"
      :items="items"
      :container="container"
      horizontal
      @reorder="emit('reorder', $event)"
    >
      <template #default="slotProps">
        <slot v-bind="slotProps" />
      </template>
    </SortableComposerAttachments>
  </ComposerAttachmentsScrollArea>
</template>

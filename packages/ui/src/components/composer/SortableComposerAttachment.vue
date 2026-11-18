<script setup lang="ts">
import { computed, inject, onBeforeUnmount, watchEffect } from "vue";

import DropPlaceholder from "../drag/DropPlaceholder.vue";
import { useSortableItem } from "../drag/use-sortable-item";
import { composerSortableContextKey } from "./composer-sortable-context";

defineOptions({ name: "RaftSortableComposerAttachment" });

const props = defineProps<{
  id: string;
  /** What the announcements call this attachment. */
  label: string;
}>();

const context = inject(composerSortableContextKey, null);
watchEffect(() => {
  context?.labels.set(props.id, props.label);
});
onBeforeUnmount(() => {
  context?.labels.delete(props.id);
});

const sortable = useSortableItem({
  id: props.id,
  data: { label: props.label },
});

const dragging = computed(() => sortable.dragging.value);
const home = computed(() => !context?.activeId.value || context.home.value);
const place = computed(() => dragging.value && !home.value);
</script>

<template>
  <div
    :ref="sortable.elementRef"
    :aria-label="`Reorder ${label}`"
    class="relative w-max max-w-full shrink-0 cursor-grab touch-manipulation select-none [-webkit-touch-callout:none] active:cursor-grabbing data-drop-place:[&>:not([data-slot=drop-placeholder])]:invisible"
    data-slot="sortable-composer-attachment"
    :data-dragging="dragging ? 'true' : undefined"
    :data-drag-origin="dragging && home ? '' : undefined"
    :data-drop-place="place ? '' : undefined"
    @pointerdown="sortable.onPointerDown"
    @keydown="sortable.onKeydown"
  >
    <slot />
    <DropPlaceholder v-if="place" class="absolute inset-0" />
  </div>
</template>

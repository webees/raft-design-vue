<script setup lang="ts">
import { computed, ref, useAttrs, type ComponentPublicInstance } from "vue";

import { cn } from "../../lib/cn";
import Button from "../button/Button.vue";
import ScrollArea from "../scroll-area/ScrollArea.vue";
import type { ScrollAreaEdges } from "../scroll-area/types";
import { composerAttachment } from "./composer-attachment.recipe";

defineOptions({ name: "RaftComposerAttachmentsScrollArea", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const viewportRef = ref<ComponentPublicInstance | null>(null);
const canPrev = ref(false);
const canNext = ref(false);

const recipe = computed(() => composerAttachment());
const rootClass = computed(() => recipe.value.attachmentsScrollArea({ class: cn(attrs.class as string, props.class) }));
const prevNavClass = computed(() => composerAttachment({ side: "prev" }).attachmentsNav());
const nextNavClass = computed(() => composerAttachment({ side: "next" }).attachmentsNav());
const rowClass = computed(() => recipe.value.attachmentsRow());

const viewport = () => (viewportRef.value?.$el as HTMLElement | null) ?? null;

function handleEdgeChange(edges: ScrollAreaEdges) {
  canPrev.value = !edges.left;
  canNext.value = !edges.right;
}

function scrollByPage(direction: -1 | 1) {
  const node = viewport();
  if (!node) return;
  const page = node.clientWidth;
  if (page <= 0) return;
  const target = Math.round(node.scrollLeft / page) * page + direction * page;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
}
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="composer-attachments-scroll-area"
    :class="rootClass"
  >
    <Button
      v-if="canPrev"
      type="button"
      size="icon-md"
      variant="default"
      aria-label="Scroll attachments left"
      :class="prevNavClass"
      @click="scrollByPage(-1)"
    >
      <slot name="prev">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden class="size-4">
          <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </slot>
    </Button>
    <ScrollArea
      ref="viewportRef"
      data-slot="composer-attachments-viewport"
      orientation="horizontal"
      trigger="scroll"
      size="small"
      overscroll="contain"
      :tab-index="-1"
      :content-class="rowClass"
      @edge-change="handleEdgeChange"
    >
      <slot />
    </ScrollArea>
    <Button
      v-if="canNext"
      type="button"
      size="icon-md"
      variant="default"
      aria-label="Scroll attachments right"
      :class="nextNavClass"
      @click="scrollByPage(1)"
    >
      <slot name="next">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden class="size-4">
          <path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </slot>
    </Button>
  </div>
</template>

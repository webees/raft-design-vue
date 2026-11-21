<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { MessageEmbedContent } from "../message-embed/parts";
import { messageForwardedBundle } from "./message-forwarded-bundle.recipes";
import { useForwardedBundleFold } from "./message-forwarded-bundle-fold";

defineOptions({ name: "RaftMessageForwardedBundleItems" });

const props = withDefaults(defineProps<{ collapsed?: boolean; foldLineLimit?: number }>(), {
  collapsed: undefined,
  foldLineLimit: undefined,
});

const FOLD_LINE_HEIGHT_FALLBACK = 20;
const fold = useForwardedBundleFold();
const controlled = computed(() => props.collapsed !== undefined);
const collapsed = computed(() =>
  controlled.value ? props.collapsed! : (fold?.collapsed ?? false),
);
const lineLimit = computed(() => props.foldLineLimit ?? fold?.foldLineLimit ?? 8);
const container = ref<ComponentPublicInstance | null>(null);
const foldHeight = ref<number | null>(null);
const rootClass = computed(() => messageForwardedBundle({ collapsed: collapsed.value }).items());
const tightFold = computed(() => foldHeight.value !== null && foldHeight.value < 60);

function measure() {
  if (controlled.value || !fold) return;
  const element = container.value?.$el as HTMLElement | undefined;
  if (!element) return;
  const contentSlots = [
    ...element.querySelectorAll<HTMLElement>('[data-slot="message-forwarded-bundle-item-content"]'),
  ];
  const lineHeight =
    Number.parseFloat(getComputedStyle(contentSlots[0] ?? element).lineHeight) ||
    FOLD_LINE_HEIGHT_FALLBACK;
  const height = contentSlots.reduce(
    (total, slot) => total + slot.getBoundingClientRect().height,
    0,
  );
  foldHeight.value = contentSlots.length > 0 ? lineHeight * lineLimit.value : null;
  fold?.reportFold(contentSlots.length > 0 && height > lineHeight * lineLimit.value + 1);
}

let observer: ResizeObserver | null = null;
let mutations: MutationObserver | null = null;

onMounted(() => {
  measure();
  const element = container.value?.$el as HTMLElement | undefined;
  if (element && typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(measure);
    observer.observe(element);
  }
  if (element && typeof MutationObserver !== "undefined") {
    mutations = new MutationObserver(measure);
    mutations.observe(element, { childList: true, subtree: true, characterData: true });
  }
});

watch([collapsed, lineLimit], measure);

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  mutations?.disconnect();
  mutations = null;
});
</script>

<template>
  <MessageEmbedContent
    ref="container"
    :class="rootClass"
    :data-collapsed="collapsed || undefined"
    :data-tight-fold="tightFold || undefined"
    :style="collapsed && foldHeight !== null ? { maxHeight: `${foldHeight}px` } : undefined"
  >
    <slot />
  </MessageEmbedContent>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, useAttrs, watch } from "vue";

import { comment } from "./comment.recipe";
import { resolveCommentMarginLayout } from "./comment-margin-layout";
import {
  provideCommentMargin,
  type CommentMarginPlacement,
} from "./comment-margin-context";

defineOptions({ name: "RaftCommentMargin", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    class?: string;
    gap?: number;
    style?: string | Record<string, string>;
  }>(),
  { as: "div", gap: 8 },
);

const attrs = useAttrs();

type Entry = { top: number; height: number; active: boolean };

const entries = reactive(new Map<string, Entry>());
const observed = new Map<Element, string>();
const animate = ref(false);

const layout = computed(() => {
  const items = [...entries].map(([id, entry]) => ({ id, top: entry.top, height: entry.height }));
  const activeId = [...entries].find(([, entry]) => entry.active)?.[0] ?? null;
  return resolveCommentMarginLayout(items, { gap: props.gap, activeId });
});

const marginClass = computed(() => comment().margin({ class: props.class }));
const marginStyle = computed(() => [props.style, { height: `${layout.value.height}px` }]);

function place(id: string, placement: CommentMarginPlacement | null) {
  const previous = entries.get(id);
  if (placement === null) {
    if (previous) entries.delete(id);
    return;
  }
  if (!previous && placement.top === undefined) return;
  entries.set(id, {
    top: placement.top ?? previous?.top ?? 0,
    height: placement.height ?? previous?.height ?? 0,
    active: placement.active ?? previous?.active ?? false,
  });
}

function heightOf(element: Element) {
  return element.getBoundingClientRect().height;
}

let observer: ResizeObserver | null = null;

function observe(id: string, element: Element) {
  place(id, { height: heightOf(element) });
  if (typeof ResizeObserver === "undefined") return () => {};
  observer ??= new ResizeObserver((records) => {
    for (const record of records) {
      const target = observed.get(record.target);
      if (target) place(target, { height: heightOf(record.target) });
    }
  });
  observed.set(element, id);
  observer.observe(element);
  return () => {
    observer?.unobserve(element);
    observed.delete(element);
  };
}

watch(
  () => entries.size,
  (size) => {
    if (size === 0) return;
    requestAnimationFrame(() => {
      animate.value = true;
    });
  },
);

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  observed.clear();
});

provideCommentMargin({
  animate: () => animate.value,
  place,
  observe,
  topOf: (id) => layout.value.tops[id] ?? 0,
});
</script>

<template>
  <component
    :is="props.as"
    v-bind="attrs"
    :class="marginClass"
    :style="marginStyle"
  >
    <slot />
  </component>
</template>

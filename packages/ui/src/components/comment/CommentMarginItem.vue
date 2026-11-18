<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useId,
  watch,
  type CSSProperties,
} from "vue";

import { cn } from "../../lib/cn";
import { comment } from "./comment.recipe";
import { useCommentMargin } from "./comment-margin-context";

defineOptions({ name: "RaftCommentMarginItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    active?: boolean;
    as?: string;
    class?: string;
    style?: string | CSSProperties;
    top: number;
  }>(),
  { active: false, as: "div" },
);

const attrs = useAttrs();
const margin = useCommentMargin();
const element = ref<HTMLElement | null>(null);
const id = useId();

const resolved = computed(() => margin?.topOf(id) ?? Math.max(props.top, 0));
const classes = computed(() =>
  comment().marginItem({ class: cn(attrs.class as string | undefined, props.class) }),
);
const itemStyle = computed(() => [
  props.style,
  { transform: `translateY(${resolved.value}px)` },
]);

watch(
  () => [props.top, props.active] as const,
  ([top, active]) => margin?.place(id, { top, active }),
  { immediate: true },
);

let unobserve: (() => void) | null = null;

onMounted(() => {
  if (margin && element.value) unobserve = margin.observe(id, element.value);
});

onBeforeUnmount(() => {
  unobserve?.();
  margin?.place(id, null);
});
</script>

<template>
  <component
    :is="props.as"
    ref="element"
    v-bind="attrs"
    :class="classes"
    :data-active="props.active ? '' : undefined"
    :data-animate="margin?.animate() ? '' : undefined"
    data-slot="comment-margin-item"
    :data-top="String(resolved)"
    :style="itemStyle"
  >
    <slot />
  </component>
</template>

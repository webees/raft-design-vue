<script setup lang="ts">
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftTimeline", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    itemPlacement?: "left" | "right";
    horizontal?: boolean;
    iconSize?: number;
    class?: string;
  }>(),
  { size: "md", itemPlacement: "left", horizontal: false, iconSize: undefined },
);

const attrs = useAttrs();

const rootClass = computed(() =>
  cn(
    "r-timeline",
    `r-timeline--${props.size}`,
    props.horizontal ? "r-timeline--horizontal" : `r-timeline--${props.itemPlacement}`,
    props.class,
  ),
);

const mergedStyle = computed(() =>
  props.iconSize === undefined
    ? attrs.style
    : {
        ...(attrs.style as Record<string, string> | undefined),
        "--r-timeline-custom-icon-size": `${props.iconSize}px`,
      },
);
</script>

<template>
  <ol
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    data-slot="timeline"
    :class="rootClass"
    :style="mergedStyle"
  >
    <slot />
  </ol>
</template>

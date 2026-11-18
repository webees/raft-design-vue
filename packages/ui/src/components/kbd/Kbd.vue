<script setup lang="ts">
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftKbd", inheritAttrs: false });
const props = withDefaults(defineProps<{ size?: "sm" | "md" }>(), { size: "sm" });
const attrs = useAttrs();

const rootClass = computed(() =>
  cn(
    "pointer-events-none inline-flex w-fit shrink-0 items-center justify-center gap-1",
    "whitespace-nowrap select-none [&_svg]:pointer-events-none",
    "font-mono font-normal inset-ring inset-ring-line-hairline",
    props.size === "md"
      ? "text-mono-code text-foreground-muted bg-fill-muted [&_svg:not([class*='size-'])]:size-3.5 h-6 min-w-6 rounded-sticker px-1.5"
      : [
          "text-mono-meta text-foreground-hint [&_svg:not([class*='size-'])]:size-3 min-w-4 rounded-[3px] px-1",
          "in-data-[slot=tooltip-content]:text-foreground-on-hud/70",
          "in-data-[slot=tooltip-content]:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--foreground-on-hud)_70%,transparent)]",
        ],
    attrs.class as string,
  ),
);
</script>

<template>
  <kbd
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'kbd'"
    :data-size="size"
    :class="rootClass"
  >
    <slot />
  </kbd>
</template>

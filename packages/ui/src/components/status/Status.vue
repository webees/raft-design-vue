<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { PRESENCE_COLOR, type Presence } from "../../lib/presence";

defineOptions({ name: "RaftStatus", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: "xs" | "sm" | "md" | "lg";
    variant?:
      | "default"
      | "primary"
      | "information"
      | "muted"
      | "accent"
      | "success"
      | "warning"
      | "danger";
    presence?: Presence;
    as?: string;
    asChild?: boolean;
  }>(),
  { size: "md", variant: "default", as: "span", asChild: false },
);

const attrs = useAttrs();
const color = computed(() => {
  if (props.presence) return PRESENCE_COLOR[props.presence];
  return {
    default: "[--status-color:var(--presence-offline)]",
    primary: "[--status-color:var(--presence-busy)]",
    information: "[--status-color:var(--info)]",
    muted: "[--status-color:var(--palette-stone-400)]",
    accent: "[--status-color:var(--attention-400)]",
    success: "[--status-color:var(--success)]",
    warning: "[--status-color:var(--warning)]",
    danger: "[--status-color:var(--danger)]",
  }[props.variant];
});

const rootClass = computed(() =>
  cn(
    "relative inline-block shrink-0 bg-(--status-color) rounded-[2px] border-[1.5px] border-sticker-ink",
    {
      xs: "size-1.5 rounded-[1px] border",
      sm: "size-2",
      md: "size-2.5",
      lg: "size-[11px]",
    }[props.size],
    color.value,
    attrs.class as string,
  ),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string | undefined) ?? 'status'"
    :data-variant="variant"
    :data-size="size"
    :data-presence="presence"
    :class="rootClass"
  />
</template>

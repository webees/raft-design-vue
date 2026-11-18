<script setup lang="ts">
import { cn } from "../../lib/cn";
import { avatarVariants, type AvatarSize } from "./avatar.variants";

defineOptions({ name: "RaftAvatarGroupCount", inheritAttrs: false });
const props = withDefaults(defineProps<{ size?: AvatarSize }>(), { size: "md" });
const attrs = useAttrs();

const countClass = computed(() =>
  avatarVariants({ size: props.size }).root({
    className: cn(
      "bg-fill-muted font-mono text-mono-meta font-bold tabular-nums text-foreground-muted",
      attrs.class as string,
    ),
  }),
);
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="avatar-group-count" :class="countClass">
    <slot />
  </span>
</template>

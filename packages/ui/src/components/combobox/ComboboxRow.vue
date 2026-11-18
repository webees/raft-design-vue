<script setup lang="ts">
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxRow", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() =>
  cn("flex min-w-0 items-center gap-2", props.className, attrs.class as string),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="combobox-row" :class="classes">
    <slot />
  </div>
</template>

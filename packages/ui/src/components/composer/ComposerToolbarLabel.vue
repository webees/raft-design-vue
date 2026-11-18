<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";

defineOptions({ name: "RaftComposerToolbarLabel", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn(
    "inline-flex cursor-pointer select-none items-center",
    "min-h-8 md:pointer-fine:min-h-(--bar-button-size) gap-2",
    "font-sans text-callout font-semibold text-foreground",
    "has-data-[disabled]:cursor-not-allowed has-data-[disabled]:text-foreground-disabled",
    attrs.class as string | undefined,
    props.class,
  ),
);
</script>

<template>
  <label
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    data-slot="composer-toolbar-label"
  >
    <slot />
  </label>
</template>

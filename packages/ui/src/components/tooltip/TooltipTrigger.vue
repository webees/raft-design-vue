<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TooltipTrigger } from "reka-ui";
import { tooltip } from "./tooltip.variants";

defineOptions({ name: "RaftTooltipTrigger", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    asChild?: boolean;
  }>(),
  {
    asChild: false,
  },
);

const attrs = useAttrs();
const triggerClass = computed(() => tooltip().trigger({ class: attrs.class as string | undefined }));
const triggerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <TooltipTrigger v-bind="triggerAttrs" :as-child="props.asChild" :class="triggerClass">
    <slot />
  </TooltipTrigger>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ArrowUpRight } from "lucide-vue-next";
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftTextLinkExternalIcon", inheritAttrs: false });

defineProps<{ label?: string }>();

const attrs = useAttrs();
const markBox = "ml-0.5 inline-flex align-[calc(0.7em/2-0.857em/2)]";
const rootClass = computed(() => cn(markBox, attrs.class as string));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="text-link-external-icon"
  >
    <ArrowUpRight
      aria-hidden="true"
      focusable="false"
      class="size-[0.857em]"
      :stroke-width="2"
    />
    <span v-if="label" class="sr-only"> {{ label }}</span>
  </span>
</template>

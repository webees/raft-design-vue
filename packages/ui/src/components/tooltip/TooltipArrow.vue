<script setup lang="ts">
import { TooltipArrow } from "reka-ui";
import { tooltip } from "./tooltip.variants";

defineOptions({ name: "RaftTooltipArrow", inheritAttrs: false });

const attrs = useAttrs();
const arrowClass = computed(() => tooltip().arrow({ class: attrs.class as string | undefined }));
</script>

<template>
  <TooltipArrow
    v-bind="{ ...attrs, class: undefined }"
    :width="12"
    :height="6"
    data-slot="tooltip-arrow"
    :class="arrowClass"
  >
    <path d="M0 6 6 0l6 6Z" />
  </TooltipArrow>
</template>

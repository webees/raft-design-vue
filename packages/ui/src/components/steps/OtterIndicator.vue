<script setup lang="ts">
import { cn } from "../../lib/cn";
import { observeOtterAnimation } from "./otter-animation-visibility";
import type { StepStatus } from ".";

defineOptions({ name: "RaftOtterIndicator", inheritAttrs: false });

const props = defineProps<{
  status: StepStatus;
  class?: string;
}>();

const attrs = useAttrs();
const root = ref<SVGSVGElement | null>(null);
let disconnect: (() => void) | undefined;

const rootClass = computed(() =>
  cn("r-otter-indicator", `r-otter-indicator--${props.status}`, props.class),
);

onMounted(() => {
  if (root.value) disconnect = observeOtterAnimation(root.value);
});

onBeforeUnmount(() => disconnect?.());
</script>

<template>
  <svg
    v-bind="{ ...attrs, class: undefined }"
    ref="root"
    aria-hidden="true"
    width="100%"
    height="100%"
    data-slot="otter-indicator"
    :class="rootClass"
  >
    <foreignObject :key="`art-${status}`" width="100%" height="100%">
      <div class="r-otter-indicator__viewport">
        <div class="r-otter-indicator__art">
          <template v-if="status === 'wait'">
            <div class="r-otter-indicator__rest" />
          </template>
          <template v-else>
            <div class="r-otter-indicator__base" />
            <div class="r-otter-indicator__frames" />
          </template>
        </div>
      </div>
    </foreignObject>
    <svg
      v-if="status === 'error'"
      viewBox="0 0 48 48"
      width="100%"
      height="100%"
      overflow="visible"
    >
      <text
        :key="`question-${status}`"
        class="r-otter-indicator__question"
        x="40.3"
        y="11.4"
        font-size="11.4"
        font-weight="800"
        transform="rotate(10 40.3 11.4)"
      >
        ?
      </text>
    </svg>
  </svg>
</template>

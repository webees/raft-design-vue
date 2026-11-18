<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { useCopyableCode } from "./copyable-code-context";
import { copyableCode } from "./copyable-code.variants";

defineOptions({ name: "RaftCopyableCode", inheritAttrs: false });

const props = defineProps<{ truncate?: boolean }>();
const attrs = useAttrs();
const size = useCopyableCode("CopyableCode").size;

const scrollClassName =
  "overflow-x-auto overflow-y-hidden break-normal whitespace-nowrap text-clip [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const codeClass = computed(() =>
  cn(copyableCode({ size: size.value }).code(), attrs.class as string),
);
const innerClass = computed(() =>
  cn(copyableCode({ size: size.value }).codeInner(), props.truncate ? scrollClassName : undefined),
);
</script>

<template>
  <code
    v-bind="{ ...attrs, class: undefined }"
    :class="codeClass"
    :data-truncate="truncate ? 'true' : undefined"
    data-slot="copyable-code"
  >
    <span :class="innerClass" data-slot="copyable-code-inner">
      <slot />
    </span>
  </code>
</template>

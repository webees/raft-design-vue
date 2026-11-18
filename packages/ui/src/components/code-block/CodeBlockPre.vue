<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { codeBlock } from "./code-block.variants";
import { useCodeBlockOverflow } from "./use-code-block-overflow";

defineOptions({ name: "RaftCodeBlockPre", inheritAttrs: false });
withDefaults(defineProps<{ as?: string; asChild?: boolean; ariaLabel?: string }>(), {
  ariaLabel: "Code",
});

const attrs = useAttrs();
const { pre } = codeBlock();
const preRef = ref<HTMLElement | null>(null);
const overflowing = useCodeBlockOverflow(preRef);
const rootClass = computed(() => cn(pre(), attrs.class as string));

function setPreRef(element: unknown) {
  preRef.value = toElement(element);
}
</script>

<template>
  <Primitive
    :ref="setPreRef"
    :as="as ?? 'pre'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    :data-overflowing="overflowing ? '' : undefined"
    :tabindex="attrs.tabindex ?? (overflowing ? 0 : undefined)"
    :role="attrs.role ?? (overflowing ? 'region' : undefined)"
    :aria-label="attrs['aria-label'] ?? (overflowing ? ariaLabel : undefined)"
    data-slot="code-block-pre"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { codeBlock } from "./code-block.variants";

defineOptions({ name: "RaftCodeBlock", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { root } = codeBlock();
const rootClass = computed(() => cn(root(), attrs.class as string));
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="code-block"
  >
    <slot />
  </Primitive>
</template>

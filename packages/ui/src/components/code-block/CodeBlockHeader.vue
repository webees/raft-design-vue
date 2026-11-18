<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { codeBlock } from "./code-block.variants";

defineOptions({ name: "RaftCodeBlockHeader", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { header } = codeBlock();
const rootClass = computed(() => cn(header(), attrs.class as string));
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="code-block-header"
  >
    <slot />
  </Primitive>
</template>

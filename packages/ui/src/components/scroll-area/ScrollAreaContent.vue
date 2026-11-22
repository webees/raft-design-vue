<script setup lang="ts">
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftScrollAreaContent", inheritAttrs: false });
const attrs = useAttrs();
const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="scroll-area-content"
    :class="cn('r-scroll-area__content', props.class)"
  >
    <slot />
  </div>
</template>

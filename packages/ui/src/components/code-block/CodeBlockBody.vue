<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { codeBlock } from "./code-block.variants";

defineOptions({ name: "RaftCodeBlockBody", inheritAttrs: false });
defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const { body, corner } = codeBlock();
const rootClass = computed(() => cn(body(), attrs.class as string));
const corners = [
  { x: "left", y: "top" },
  { x: "right", y: "top" },
  { x: "left", y: "bottom" },
  { x: "right", y: "bottom" },
] as const;
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="code-block-body"
  >
    <span
      v-for="point in corners"
      :key="`${point.y}-${point.x}`"
      :class="corner()"
      :data-x="point.x"
      :data-y="point.y"
      aria-hidden="true"
      data-slot="code-block-corner"
    />
    <slot />
  </Primitive>
</template>

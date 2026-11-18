<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { inlineCode } from "./inline-code.variants";

defineOptions({ name: "RaftInlineCode", inheritAttrs: false });

const props = defineProps<{
  as?: string;
  asChild?: boolean;
  /** `message` renders the borderless, baseline-aligned in-message treatment. */
  appearance?: "default" | "message";
}>();

const attrs = useAttrs();
const rootClass = computed(() =>
  cn(inlineCode({ appearance: props.appearance }).root(), attrs.class as string),
);
</script>

<template>
  <Primitive
    :as="as ?? 'code'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="rootClass"
    data-slot="inline-code"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { useOverflowTitle } from "../../lib/use-overflow-title";
import {
  inputGroup,
  type InputGroupAlign,
  type InputGroupVariant,
} from "./input-group.variants";

defineOptions({ name: "RaftInputGroupAddonText", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    align?: InputGroupAlign;
    variant?: InputGroupVariant;
    title?: string;
    class?: string;
    innerClass?: string;
  }>(),
  { align: "inline-start", variant: "default" },
);

const attrs = useAttrs();
const element = ref<HTMLElement | null>(null);
const styles = computed(() =>
  inputGroup({ align: props.align, variant: props.variant }),
);
const textClass = computed(() => cn(styles.value.text(), props.class, attrs.class as string));
const innerClass = computed(() => cn(styles.value.textInner(), props.innerClass));

useOverflowTitle(element, () => props.title);
</script>

<template>
  <span
    ref="element"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="input-group-text"
    :data-align="align"
    :data-variant="variant"
    :data-input-group-trim="variant === 'default' && align === 'inline-end' ? align : undefined"
    :title="title"
    :class="textClass"
  >
    <span data-slot="input-group-text-value" :class="innerClass"><slot /></span>
  </span>
</template>

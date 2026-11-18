<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { inputGroup, type InputGroupAlign, type InputGroupVariant } from "./input-group.variants";

defineOptions({ name: "RaftInputGroupAddon", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    align?: InputGroupAlign;
    variant?: InputGroupVariant;
    class?: string;
  }>(),
  { align: "inline-start", variant: "default" },
);

const attrs = useAttrs();
const addonClass = computed(() =>
  cn(
    inputGroup({ align: props.align, variant: props.variant }).addon(),
    props.class,
    attrs.class as string,
  ),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="input-group-addon"
    :data-align="align"
    :data-variant="variant"
    :data-input-group-trim="variant === 'default' && align === 'inline-end' ? align : undefined"
    :class="addonClass"
  >
    <slot />
  </div>
</template>

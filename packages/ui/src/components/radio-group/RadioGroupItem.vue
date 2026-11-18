<script setup lang="ts">
import { RadioGroupItem } from "reka-ui";
import { cn } from "../../lib/cn";
import RadioGroupIndicator from "./RadioGroupIndicator.vue";

defineOptions({ name: "RaftRadioGroupItem", inheritAttrs: false });
const props = withDefaults(
  defineProps<{ value: string; disabled?: boolean; appearance?: "default" | "none" }>(),
  { disabled: false, appearance: "default" },
);
const attrs = useAttrs();

const itemClass = computed(() =>
  props.appearance === "none"
    ? cn("sr-only", "data-disabled:cursor-not-allowed", attrs.class as string)
    : cn(
        "relative inline-flex size-5 shrink-0 touch-manipulation items-center justify-center rounded-full outline-none",
        "data-disabled:cursor-not-allowed",
        "after:absolute after:-inset-x-3 after:-inset-y-2 after:content-['']",
        "pointer-coarse:after:-inset-y-[calc(--spacing(3)+1.5px)]",
        "[label>&]:my-[max(0px,calc((1lh-1.25rem)/2))]",
        "[label>&]:after:-inset-y-[calc(max(0px,(1lh-1.25rem)/2)+5.5px)]",
        "border-[1.5px] border-line-strong bg-layer-card text-foreground",
        "focus-visible:shadow-focus",
        "data-disabled:border-foreground-disabled data-disabled:bg-fill-muted data-disabled:text-foreground-disabled",
        attrs.class as string,
      ),
);
</script>

<template>
  <RadioGroupItem
    v-bind="{ ...attrs, class: undefined }"
    :value="value"
    :disabled="disabled"
    :data-slot="(attrs['data-slot'] as string) ?? 'radio-group-item'"
    :class="itemClass"
  >
    <slot>
      <RadioGroupIndicator v-if="appearance === 'default'" />
    </slot>
  </RadioGroupItem>
</template>

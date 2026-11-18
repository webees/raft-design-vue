<script setup lang="ts">
import { cn } from "../../lib/cn";
import { inputGroup, type InputGroupSize } from "./input-group.variants";

defineOptions({ name: "RaftInputGroup", inheritAttrs: false });

const props = withDefaults(defineProps<{ size?: InputGroupSize; class?: string }>(), {
  size: "lg",
});

const attrs = useAttrs();
const styles = computed(() => inputGroup({ size: props.size }));
const rootClass = computed(() => cn(styles.value.root(), props.class, attrs.class as string));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="input-group"
    :data-size="size"
    :class="rootClass"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "../../lib/cn";
import { descriptionList } from "./description-list.variants";

defineOptions({ name: "RaftDescriptionTerm", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const termClass = computed(() => cn(descriptionList().label(), props.class, attrs.class as string));
</script>

<template>
  <dt v-bind="{ ...attrs, class: undefined }" data-slot="description-term" :class="termClass">
    <slot />
  </dt>
</template>
